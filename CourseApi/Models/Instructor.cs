using System.ComponentModel.DataAnnotations;

namespace CourseApi.Models;

public class Instructor
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Instructor name is required")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
