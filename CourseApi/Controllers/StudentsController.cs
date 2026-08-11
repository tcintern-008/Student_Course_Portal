using Microsoft.AspNetCore.Mvc;
using CourseApi.Data;
using CourseApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public StudentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var students = await _db.Students.ToListAsync();
        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var student = await _db.Students
            .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student == null)
        {
            return NotFound(new { message = "Student not found" });
        }

        return Ok(student);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] Student student)
    {
        var emailExists = await _db.Students.AnyAsync(s => s.Email == student.Email);
        if (emailExists)
        {
            return Conflict(new { message = "A student with this email already exists" });
        }

        _db.Students.Add(student);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = student.Id }, student);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Student student)
    {
        var existing = await _db.Students.FindAsync(id);
        if (existing == null)
        {
            return NotFound(new { message = "Student not found" });
        }

        existing.Name = student.Name;
        existing.Email = student.Email;
        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.Students.FindAsync(id);
        if (existing == null)
        {
            return NotFound(new { message = "Student not found" });
        }

        _db.Students.Remove(existing);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Student deleted successfully" });
    }
}
