import { Smartphone, Server, Globe, Cloud } from "lucide-react";

const techStack = {
  frontend: {
    title: "Frontend",
    icon: Smartphone,
    items: ["Flutter / Web UI", "Responsive Design", "Cross-platform Support"],
    color: "primary",
  },
  backend: {
    title: "Backend",
    icon: Server,
    items: ["Firebase Authentication", "Firestore Database", "Cloud Functions", "Firebase Storage"],
    color: "secondary",
  },
  apis: {
    title: "APIs",
    icon: Globe,
    items: ["Google Maps API", "Push Notifications", "SMS/Email Gateway"],
    color: "accent",
  },
  cloud: {
    title: "Cloud",
    icon: Cloud,
    items: ["Google Cloud Platform", "Auto-scaling", "Global CDN"],
    color: "success",
  },
};

export const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Technology Stack
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built with{" "}
            <span className="text-gradient-emergency">Modern Tech</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Leveraging industry-leading technologies for reliability, security, and performance at scale.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {Object.values(techStack).map((tech, index) => (
            <div
              key={tech.title}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center ${
                tech.color === 'primary' ? 'gradient-emergency shadow-emergency' :
                tech.color === 'secondary' ? 'gradient-safety shadow-safety' :
                tech.color === 'accent' ? 'bg-accent' :
                'bg-success'
              }`}>
                <tech.icon className={`w-6 h-6 ${
                  tech.color === 'primary' || tech.color === 'secondary' ? 'text-white' :
                  tech.color === 'accent' ? 'text-accent-foreground' :
                  'text-success-foreground'
                }`} />
              </div>

              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                {tech.title}
              </h3>

              {/* Items */}
              <ul className="space-y-2">
                {tech.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      tech.color === 'primary' ? 'bg-primary' :
                      tech.color === 'secondary' ? 'bg-secondary' :
                      tech.color === 'accent' ? 'bg-accent' :
                      'bg-success'
                    }`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border">
          <h3 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            System Architecture
          </h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            {/* User Device */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-emergency flex items-center justify-center shadow-emergency mb-3">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <p className="font-semibold text-foreground">User Device</p>
              <p className="text-xs text-muted-foreground">Mobile App</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary" />
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-secondary" />
            </div>
            <div className="lg:hidden h-8 w-1 bg-gradient-to-b from-primary to-secondary" />

            {/* Backend */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-safety flex items-center justify-center shadow-safety mb-3">
                <Server className="w-10 h-10 text-white" />
              </div>
              <p className="font-semibold text-foreground">Backend</p>
              <p className="text-xs text-muted-foreground">Firebase Services</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center">
              <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent" />
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-accent" />
            </div>
            <div className="lg:hidden h-8 w-1 bg-gradient-to-b from-secondary to-accent" />

            {/* Cloud */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-accent flex items-center justify-center mb-3 shadow-lg">
                <Cloud className="w-10 h-10 text-accent-foreground" />
              </div>
              <p className="font-semibold text-foreground">Cloud</p>
              <p className="text-xs text-muted-foreground">GCP Infrastructure</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center">
              <div className="w-16 h-1 bg-gradient-to-r from-accent to-success" />
              <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-success" />
            </div>
            <div className="lg:hidden h-8 w-1 bg-gradient-to-b from-accent to-success" />

            {/* External Services */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-success flex items-center justify-center mb-3 shadow-lg">
                <Globe className="w-10 h-10 text-success-foreground" />
              </div>
              <p className="font-semibold text-foreground">Services</p>
              <p className="text-xs text-muted-foreground">APIs & Notifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
