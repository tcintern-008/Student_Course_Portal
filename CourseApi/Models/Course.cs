using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models;

public class Course
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Slug is required")]
    [StringLength(150)]
    public string Slug { get; set; } = string.Empty;

    [Required(ErrorMessage = "Title is required")]
    [StringLength(150, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "Instructor is required")]
    public int InstructorId { get; set; }
    public Instructor? Instructor { get; set; }

    [Required(ErrorMessage = "Duration is required")]
    public string Duration { get; set; } = string.Empty;

    [Required(ErrorMessage = "Level is required")]
    public string Level { get; set; } = string.Empty;

    [Required(ErrorMessage = "Summary is required")]
    [StringLength(300)]
    public string Summary { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public ICollection<CourseTopic> Topics { get; set; } = new List<CourseTopic>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();

    public int? CreatedByUserId { get; set; }
    public User? CreatedByUser { get; set; }
}
