using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models;

public class Course
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [StringLength(150, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "Instructor is required")]
    [StringLength(100)]
    public string Instructor { get; set; } = string.Empty;

    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Range(1, 52, ErrorMessage = "Duration must be between 1 and 52 weeks")]
    public int DurationWeeks { get; set; }
}
