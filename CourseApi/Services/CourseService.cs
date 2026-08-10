using CourseApi.Models;

namespace CourseApi.Services;

public class CourseService : ICourseService
{
    private readonly List<Course> _courses = new()
    {
        new Course { Id = 1, Title = "Web Development Fundamentals", Instructor = "Ahmed Raza", Description = "HTML, CSS, and JavaScript basics", DurationWeeks = 6 },
        new Course { Id = 2, Title = "React for Beginners", Instructor = "Sana Malik", Description = "Component based UI development", DurationWeeks = 8 },
        new Course { Id = 3, Title = "ASP.NET Core APIs", Instructor = "Bilal Khan", Description = "Building REST APIs with .NET", DurationWeeks = 10 }
    };

    private int _nextId = 4;

    public List<Course> GetAll()
    {
        return _courses;
    }

    public Course? GetById(int id)
    {
        return _courses.FirstOrDefault(c => c.Id == id);
    }

    public Course Add(Course course)
    {
        course.Id = _nextId++;
        _courses.Add(course);
        return course;
    }

    public Course? Update(int id, Course course)
    {
        var existing = _courses.FirstOrDefault(c => c.Id == id);
        if (existing == null)
        {
            return null;
        }

        existing.Title = course.Title;
        existing.Instructor = course.Instructor;
        existing.Description = course.Description;
        existing.DurationWeeks = course.DurationWeeks;
        return existing;
    }

    public bool Delete(int id)
    {
        var existing = _courses.FirstOrDefault(c => c.Id == id);
        if (existing == null)
        {
            return false;
        }

        _courses.Remove(existing);
        return true;
    }
}
