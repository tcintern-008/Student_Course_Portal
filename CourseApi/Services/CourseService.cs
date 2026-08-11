using CourseApi.Data;
using CourseApi.Dtos;
using CourseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.Services;

public class CourseService : ICourseService
{
    private readonly AppDbContext _db;

    public CourseService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CourseDto>> GetAllAsync()
    {
        return await _db.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Topics)
            .Select(c => ToDto(c))
            .ToListAsync();
    }

    public async Task<CourseDto?> GetBySlugAsync(string slug)
    {
        var course = await _db.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Topics)
            .FirstOrDefaultAsync(c => c.Slug == slug);

        return course == null ? null : ToDto(course);
    }

    public async Task<CourseDto?> AddAsync(CourseUpsertDto dto)
    {
        var slugExists = await _db.Courses.AnyAsync(c => c.Slug == dto.Slug);
        if (slugExists)
        {
            return null;
        }

        var instructor = await GetOrCreateInstructorAsync(dto.Instructor);

        var course = new Course
        {
            Slug = dto.Slug,
            Title = dto.Title,
            InstructorId = instructor.Id,
            Duration = dto.Duration,
            Level = dto.Level,
            Summary = dto.Summary,
            Description = dto.Description,
            Topics = dto.Topics.Select(t => new CourseTopic { Text = t }).ToList()
        };

        _db.Courses.Add(course);
        await _db.SaveChangesAsync();

        course.Instructor = instructor;
        return ToDto(course);
    }

    public async Task<CourseDto?> UpdateAsync(string slug, CourseUpsertDto dto)
    {
        var course = await _db.Courses
            .Include(c => c.Topics)
            .FirstOrDefaultAsync(c => c.Slug == slug);

        if (course == null)
        {
            return null;
        }

        var instructor = await GetOrCreateInstructorAsync(dto.Instructor);

        course.Title = dto.Title;
        course.InstructorId = instructor.Id;
        course.Duration = dto.Duration;
        course.Level = dto.Level;
        course.Summary = dto.Summary;
        course.Description = dto.Description;

        _db.CourseTopics.RemoveRange(course.Topics);
        course.Topics = dto.Topics.Select(t => new CourseTopic { Text = t }).ToList();

        await _db.SaveChangesAsync();

        course.Instructor = instructor;
        return ToDto(course);
    }

    public async Task<bool> DeleteAsync(string slug)
    {
        var course = await _db.Courses.FirstOrDefaultAsync(c => c.Slug == slug);
        if (course == null)
        {
            return false;
        }

        _db.Courses.Remove(course);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<PagedResult<CourseDto>> SearchAsync(string? query, string? level, int page, int pageSize)
    {
        var courses = _db.Courses
            .Include(c => c.Instructor)
            .Include(c => c.Topics)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query))
        {
            courses = courses.Where(c => c.Title.Contains(query) || c.Summary.Contains(query));
        }

        if (!string.IsNullOrWhiteSpace(level))
        {
            courses = courses.Where(c => c.Level == level);
        }

        var totalCount = await courses.CountAsync();

        var items = await courses
            .OrderBy(c => c.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => ToDto(c))
            .ToListAsync();

        return new PagedResult<CourseDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        };
    }

    private async Task<Instructor> GetOrCreateInstructorAsync(string name)
    {
        var instructor = await _db.Instructors.FirstOrDefaultAsync(i => i.Name == name);
        if (instructor != null)
        {
            return instructor;
        }

        instructor = new Instructor { Name = name };
        _db.Instructors.Add(instructor);
        await _db.SaveChangesAsync();
        return instructor;
    }

    private static CourseDto ToDto(Course course)
    {
        return new CourseDto
        {
            Slug = course.Slug,
            Title = course.Title,
            Instructor = course.Instructor?.Name ?? string.Empty,
            Duration = course.Duration,
            Level = course.Level,
            Summary = course.Summary,
            Description = course.Description,
            Topics = course.Topics.Select(t => t.Text).ToList()
        };
    }
}
