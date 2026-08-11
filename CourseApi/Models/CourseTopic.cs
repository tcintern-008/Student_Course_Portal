namespace CourseApi.Models;

public class CourseTopic
{
    public int Id { get; set; }

    public int CourseId { get; set; }
    public Course? Course { get; set; }

    public string Text { get; set; } = string.Empty;
}
