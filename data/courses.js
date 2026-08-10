import { fetchCourses, fetchCourseBySlug } from "@/lib/courseApi";

export async function getCourses() {
  return fetchCourses();
}

export async function getCourseBySlug(slug) {
  return fetchCourseBySlug(slug);
}

export async function getRelatedCourses(slug, level) {
  const courses = await fetchCourses();
  return courses
    .filter((c) => c.slug !== slug && c.level === level)
    .concat(courses.filter((c) => c.slug !== slug && c.level !== level))
    .slice(0, 3);
}
