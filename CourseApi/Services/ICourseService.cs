using CourseApi.Models;

namespace CourseApi.Services;

public interface ICourseService
{
    List<Course> GetAll();
    Course? GetById(int id);
    Course Add(Course course);
    Course? Update(int id, Course course);
    bool Delete(int id);
}
