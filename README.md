# Student Course Portal

A multi-page Student Course Portal built with Next.js (App Router) as part of the Web Development Track internship task at **Think and Code**.

**Intern:** Rayyan Bashir · Student ID: SP24-BCS-059 · Intern ID: tcintern-008

## Live Demo

https://tcintern-008.github.io/Student_Course_Portal/

## About

This project explores Next.js App Router fundamentals: file-based routing, shared layouts, dynamic routes, and navigation with `next/link`. It's a simple course catalog with static data (no backend yet).

## Pages

- `/` - Home
- `/courses` - All courses
- `/courses/[slug]` - Course details (dynamic route, e.g. `/courses/web-development`)
- `/instructors` - Instructor list
- `/contact` - Contact form
- Custom 404 page

## Features

- Next.js App Router with file-based routing
- Shared layout with Navbar and Footer
- Dynamic routes generated from static course data
- Dark / light theme toggle (saved to localStorage)
- Fully responsive with Tailwind CSS
- Reusable components in `components/`

## Tech Stack

Next.js, React, Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

```bash
npm run build
```

This project is configured for static export (`output: "export"`) and deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.
