const instructors = [
  {
    name: "Ayesha Malik",
    role: "Web Development Lead",
    bio: "Full-stack developer with 6 years of experience building products with React and Node.js.",
    courses: ["Web Development"],
  },
  {
    name: "Hamza Farooq",
    role: "AI Engineering Lead",
    bio: "Machine learning engineer who has worked on recommendation systems and NLP applications.",
    courses: ["AI Engineering"],
  },
  {
    name: "Zainab Qureshi",
    role: "Data Engineering Lead",
    bio: "Data engineer focused on building reliable pipelines for large-scale analytics platforms.",
    courses: ["Data Engineering"],
  },
  {
    name: "Bilal Ahmed",
    role: "DevOps Lead",
    bio: "DevOps engineer passionate about automation, CI/CD and helping teams ship faster.",
    courses: ["DevOps Fundamentals"],
  },
  {
    name: "Sana Tariq",
    role: "Mobile Development Lead",
    bio: "Mobile developer who has shipped several Flutter apps used by thousands of students.",
    courses: ["Mobile App Development"],
  },
];

export default instructors;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getInstructors() {
  await delay(400);
  return instructors;
}
