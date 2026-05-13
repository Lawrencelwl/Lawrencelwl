import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotatingDeveloperTitle } from "@/components/rotating-developer-title";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      {/* Center Card with blurred photo background */}
      <Card className="relative overflow-hidden max-w-4xl w-full mx-auto bg-card/30 backdrop-blur-xl border-border/50 shadow-2xl">
        {/* Blurred background image */}
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }}
        />

        <CardContent className="p-10 sm:p-14 lg:p-16 text-center relative z-10">
          <div className="space-y-6">
            <div className="space-y-2">
              {/* <p className="text-primary font-medium tracking-wide uppercase text-sm">
                Welcome to Lawrencelwl's Website
              </p> */}
              <RotatingDeveloperTitle />
            </div>
            {/* 
            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              I create beautiful and functional web experiences. Passionate
              about clean code, modern design, and building products that make a
              difference.
            </p> */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="group">
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/work">View My Work</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
