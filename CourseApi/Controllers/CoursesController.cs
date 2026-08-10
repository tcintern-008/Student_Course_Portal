using Microsoft.AspNetCore.Mvc;
using CourseApi.Models;
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
    public IActionResult GetAll()
    {
        var courses = _courseService.GetAll();
        return Ok(courses);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var course = _courseService.GetById(id);
        if (course == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(course);
    }

    [HttpPost]
    public IActionResult Add([FromBody] Course course)
    {
        var created = _courseService.Add(course);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Course course)
    {
        var updated = _courseService.Update(id, course);
        if (updated == null)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = _courseService.Delete(id);
        if (!deleted)
        {
            return NotFound(new { message = "Course not found" });
        }

        return Ok(new { message = "Course deleted successfully" });
    }
}
