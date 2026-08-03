/** @type {import('next').NextConfig} */
const repoName = "Student_Course_Portal";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.GITHUB_ACTIONS ? `/${repoName}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repoName}/` : "",
};

export default nextConfig;
