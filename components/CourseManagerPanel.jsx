"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse, deleteCourse } from "@/lib/courseApi";

const emptyForm = {
  slug: "",
  title: "",
  instructor: "",
  duration: "",
  level: "",
  summary: "",
  description: "",
  topics: "",
};

export default function CourseManagerPanel({ courses }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      slug: form.slug,
      title: form.title,
      instructor: form.instructor,
      duration: form.duration,
      level: form.level,
      summary: form.summary,
      description: form.description,
      topics: form.topics.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingSlug) {
        await updateCourse(editingSlug, payload);
      } else {
        await createCourse(payload);
      }
      setForm(emptyForm);
      setEditingSlug(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(course) {
    setEditingSlug(course.slug);
    setForm({
      slug: course.slug,
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      summary: course.summary,
      description: course.description,
      topics: course.topics.join(", "),
    });
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(emptyForm);
  }

  async function handleDelete(slug) {
    setError(null);
    try {
      await deleteCourse(slug);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mt-16 rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-bold">Manage Courses</h2>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="slug" placeholder="slug (e.g. web-development)" value={form.slug} onChange={handleChange} disabled={!!editingSlug} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="duration" placeholder="Duration (e.g. 8 Weeks)" value={form.duration} onChange={handleChange} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="level" placeholder="Level (Beginner/Intermediate)" value={form.level} onChange={handleChange} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="summary" placeholder="Short summary" value={form.summary} onChange={handleChange} required className="rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea name="description" placeholder="Full description" value={form.description} onChange={handleChange} className="sm:col-span-2 rounded-lg border border-border px-3 py-2 text-sm" />
        <input name="topics" placeholder="Topics, comma separated" value={form.topics} onChange={handleChange} className="sm:col-span-2 rounded-lg border border-border px-3 py-2 text-sm" />

        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={submitting} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {submitting ? "Saving..." : editingSlug ? "Update Course" : "Add Course"}
          </button>
          {editingSlug && (
            <button type="button" onClick={cancelEdit} className="rounded-lg border border-border px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <ul className="mt-6 divide-y divide-border">
        {courses.map((course) => (
          <li key={course.slug} className="flex items-center justify-between py-3 text-sm">
            <span>{course.title}</span>
            <div className="flex gap-3">
              <button onClick={() => startEdit(course)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(course.slug)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
