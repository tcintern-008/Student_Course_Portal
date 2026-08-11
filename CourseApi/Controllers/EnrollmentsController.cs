using Microsoft.AspNetCore.Mvc;
using CourseApi.Data;
using CourseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public EnrollmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var enrollments = await _db.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Course)
            .ToListAsync();

        return Ok(enrollments);
    }

    [HttpPost]
    public async Task<IActionResult> Enroll([FromBody] Enrollment enrollment)
    {
        var studentExists = await _db.Students.AnyAsync(s => s.Id == enrollment.StudentId);
        if (!studentExists)
        {
            return NotFound(new { message = "Student not found" });
        }

        var courseExists = await _db.Courses.AnyAsync(c => c.Id == enrollment.CourseId);
        if (!courseExists)
        {
            return NotFound(new { message = "Course not found" });
        }

        var alreadyEnrolled = await _db.Enrollments.AnyAsync(e =>
            e.StudentId == enrollment.StudentId && e.CourseId == enrollment.CourseId);

        if (alreadyEnrolled)
        {
            return Conflict(new { message = "Student is already enrolled in this course" });
        }

        enrollment.EnrolledOn = DateTime.UtcNow;
        _db.Enrollments.Add(enrollment);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = enrollment.Id }, enrollment);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Unenroll(int id)
    {
        var enrollment = await _db.Enrollments.FindAsync(id);
        if (enrollment == null)
        {
            return NotFound(new { message = "Enrollment not found" });
        }

        _db.Enrollments.Remove(enrollment);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Enrollment removed successfully" });
    }
}
