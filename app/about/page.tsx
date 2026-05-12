import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Code, User } from "lucide-react"

const workExperience = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company",
    period: "2022 - Present",
    description: "Leading frontend development and architecting scalable web applications.",
  },
  {
    title: "Software Engineer",
    company: "Startup Inc",
    period: "2020 - 2022",
    description: "Built and maintained full-stack applications using modern technologies.",
  },
  {
    title: "Junior Developer",
    company: "Agency Co",
    period: "2018 - 2020",
    description: "Developed responsive websites and collaborated with design teams.",
  },
]

const education = [
  {
    degree: "Master of Computer Science",
    school: "University of Technology",
    year: "2018",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "State University",
    year: "2016",
  },
]

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript",
  "Node.js", "Python", "PostgreSQL", "MongoDB",
  "Tailwind CSS", "Git", "Docker", "AWS",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About Me</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, experience, and skills.
          </p>
        </div>

        {/* Short Introduction */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a passionate software developer with over 5 years of experience building 
              web applications. I love turning complex problems into simple, beautiful, and 
              intuitive solutions. When I&apos;m not coding, you can find me exploring new 
              technologies, contributing to open-source projects, or enjoying the outdoors.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Work Experience */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {workExperience.map((job, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-primary">{job.company}</p>
                  <p className="text-xs text-muted-foreground mb-2">{job.period}</p>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-border">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-primary">{edu.school}</p>
                  <p className="text-xs text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm py-1.5 px-3"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
