import { ProjectCard } from "@/components/project-card";

const projects = [
  {
    title: "Big Boss Taxi Homepage",
    description:
      "A company homepage that showcases the latest news and highlights recent events the company has participated in.",
    technologies: ["HTML5", "CSS", "JavaScript", "Bootstrap", "jQuery"],
  },
  {
    title: "Taxi Management System",
    description:
      "A collaborative task management website with real-time updates, data visualization table, and advanced filtering capabilities.The system also allows for the management of taxi drivers and their vehicles.",
    technologies: ["React", "Node.js", "Go", "MySQL"],
  },
  {
    title: "Taxi settlement System",
    description:
      "A system that enables automatic T+1 settlement for taxi online payments, with daily report generation and secure data storage.",
    technologies: [
      "Python",
      "Yedpay API",
      "Octopus API",
      "MySQL",
      "Docker",
      "AWS",
    ],
  },
  {
    title: "Japship",
    description:
      "A full-featured online shopping platform with cart management, payment processing, and order tracking. Built for scalability and performance.",
    technologies: ["PHP", "CSS", "JavaScript", "Docker", "MySQL", "AWS RDS"],
  },
  {
    title: "NewsApp",
    description:
      "A mobile app that allows users to access news from various media platforms, with features like Google account login and the ability to bookmark favorite articles for quick access.",
    technologies: ["Flutter", "Firebase"],
  },
  {
    title: "Hx Blog",
    description:
      "A blog website for companies to share IT-related news, insights, and updates.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Strapi API",
      "PostgreSQL",
    ],
  },
  {
    title: "Soctify ",
    description:
      "A social media platform that allows users to connect with friends and family through real-time chat, personalized accounts, and the ability to share photos, text updates, like posts, and build their own network of friends.",
    technologies: ["PHP", "CSS", "JavaScript", "MySQL", "Docker", "AWS bucket"],
  },
  // {
  //   title: "",
  //   description: "",
  //   technologies: [],
  // },
  // {
  //   title: "",
  //   description: "",
  //   technologies: [],
  // },
  // {
  //   title: "",
  //   description: "",
  //   technologies: [],
  // },
  // {
  //   title: "",
  //   description: "",
  //   technologies: [],
  // },
  // {
  //   title: "",
  //   description: "",
  //   technologies: [],
  // },
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
