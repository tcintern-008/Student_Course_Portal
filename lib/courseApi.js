const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5242";

async function handleResponse(res) {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchCourses() {
  const res = await fetch(`${API_BASE_URL}/api/courses`, { cache: "no-store" });
  return handleResponse(res);
}

export async function fetchCourseBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${slug}`, { cache: "no-store" });
  if (res.status === 404) {
    return null;
  }
  return handleResponse(res);
}

export async function createCourse(course) {
  const res = await fetch(`${API_BASE_URL}/api/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return handleResponse(res);
}

export async function updateCourse(slug, course) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return handleResponse(res);
}

export async function deleteCourse(slug) {
  const res = await fetch(`${API_BASE_URL}/api/courses/${slug}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
