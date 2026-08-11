using CourseApi.Dtos;

namespace CourseApi.Services;

public interface ICourseService
{
    Task<List<CourseDto>> GetAllAsync();
    Task<CourseDto?> GetBySlugAsync(string slug);
    Task<CourseDto?> AddAsync(CourseUpsertDto dto);
    Task<CourseDto?> UpdateAsync(string slug, CourseUpsertDto dto);
    Task<bool> DeleteAsync(string slug);
    Task<PagedResult<CourseDto>> SearchAsync(string? query, string? level, int page, int pageSize);
}
