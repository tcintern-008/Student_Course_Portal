const courses = [
  {
    slug: "web-development",
    title: "Web Development",
    instructor: "Ayesha Malik",
    duration: "12 Weeks",
    level: "Beginner",
    summary: "Learn to build modern, responsive websites using HTML, CSS, JavaScript and React.",
    description:
      "This course takes you from the basics of HTML and CSS to building full React applications. You'll work on real projects, learn how the modern web works, and get comfortable with tools developers use every day like Git and npm.",
    topics: ["HTML & CSS Fundamentals", "JavaScript (ES6+)", "React & Component Design", "Responsive Design with Tailwind", "Deploying Projects"],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    instructor: "Hamza Farooq",
    duration: "14 Weeks",
    level: "Intermediate",
    summary: "Understand machine learning fundamentals and how to build and deploy AI-powered applications.",
    description:
      "A hands-on course covering the core ideas behind machine learning and modern AI systems. You'll explore how models are trained, how to use pretrained models in your own apps, and how AI engineering differs from traditional software development.",
    topics: ["Python for AI", "Machine Learning Basics", "Neural Networks", "Working with LLM APIs", "Deploying AI Features"],
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    instructor: "Zainab Qureshi",
    duration: "10 Weeks",
    level: "Intermediate",
    summary: "Learn how to design pipelines that move and transform data reliably at scale.",
    description:
      "Covers the fundamentals of building data pipelines, from collecting raw data to storing it in a way that's easy to query. You'll get practical experience with databases, ETL processes and basic pipeline automation.",
    topics: ["SQL & Databases", "ETL Pipelines", "Data Warehousing", "Workflow Automation", "Cloud Data Tools"],
  },
  {
    slug: "devops-fundamentals",
    title: "DevOps Fundamentals",
    instructor: "Bilal Ahmed",
    duration: "8 Weeks",
    level: "Beginner",
    summary: "Get introduced to CI/CD, containers, and the tools that connect development with operations.",
    description:
      "An introductory course to the DevOps mindset and toolchain. You'll learn how code moves from a developer's machine to production, and get hands-on practice with Git workflows, Docker, and simple CI/CD pipelines.",
    topics: ["Git & Version Control", "CI/CD Pipelines", "Docker Basics", "Linux & Shell Scripting", "Monitoring & Logging"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    instructor: "Sana Tariq",
    duration: "10 Weeks",
    level: "Beginner",
    summary: "Build cross-platform mobile apps using Flutter and connect them to real backends.",
    description:
      "Focuses on building mobile apps that work on both Android and iOS from a single codebase. You'll learn Flutter's widget system, state management, and how to connect an app to a backend service like Firebase.",
    topics: ["Dart Basics", "Flutter Widgets", "State Management", "Firebase Integration", "Publishing Apps"],
  },
];

export default courses;

// Simulates fetching from a real backend/API. Swap this out later
// once the course data actually lives in a database.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCourses() {
  await delay(400);
  return courses;
}

export async function getCourseBySlug(slug) {
  await delay(400);
  return courses.find((course) => course.slug === slug) || null;
}

export async function getRelatedCourses(slug, level) {
  await delay(200);
  return courses
    .filter((c) => c.slug !== slug && c.level === level)
    .concat(courses.filter((c) => c.slug !== slug && c.level !== level))
    .slice(0, 3);
}
