import { ProjectCard } from "@/components/project-card";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart management, payment processing, and order tracking. Built for scalability and performance.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, team workspaces, and advanced filtering capabilities.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered tool that helps users generate blog posts, social media content, and marketing copy using advanced language models.",
    technologies: ["Python", "FastAPI", "OpenAI API", "React", "PostgreSQL"],
  },
  {
    title: "Fitness Tracking App",
    description:
      "A mobile-first fitness application for tracking workouts, nutrition, and progress with personalized recommendations.",
    technologies: ["React Native", "Firebase", "TypeScript", "Chart.js"],
  },
  {
    title: "Real Estate Platform",
    description:
      "A comprehensive real estate listing platform with map integration, virtual tours, and mortgage calculators.",
    technologies: ["Next.js", "Mapbox", "Prisma", "AWS S3", "Tailwind CSS"],
  },
  {
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard for managing multiple social media accounts with scheduling and performance insights.",
    technologies: ["Vue.js", "D3.js", "Express", "Redis", "OAuth 2.0"],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">My Work</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
