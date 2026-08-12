using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CourseApi.Dtos;
using CourseApi.Services;

namespace CourseApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CoursesController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var courses = await _courseService.GetAllAsync();
        return Ok(courses);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? query, [FromQuery] string? level, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 50) pageSize = 10;

        var result = await _courseService.SearchAsync(query, level, page, pageSize);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var course = await _courseService.GetBySlugAsync(slug);
        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(course);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CourseUpsertDto dto)
    {
        var created = await _courseService.AddAsync(dto);
        if (created == null)
        {
            return Conflict(new { message = "A course with this slug already exists" });
        }

        return CreatedAtAction(nameof(GetBySlug), new { slug = created.Slug }, created);
    }

    [Authorize]
    [HttpPut("{slug}")]
    public async Task<IActionResult> Update(string slug, [FromBody] CourseUpsertDto dto)
    {
        var updated = await _courseService.UpdateAsync(slug, dto);
        if (updated == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(updated);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{slug}")]
    public async Task<IActionResult> Delete(string slug)
    {
        var deleted = await _courseService.DeleteAsync(slug);
        if (!deleted)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(new { message = "Course deleted successfully" });
    }
}
