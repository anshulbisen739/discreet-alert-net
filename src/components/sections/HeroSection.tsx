import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Play, MapPin, Shield, Smartphone } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Emergency Safety System</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Silent Emergency{" "}
              <span className="text-gradient-emergency">Assistance</span>{" "}
              for Your Safety
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Send alerts silently. Get help instantly. Our advanced system ensures your safety when you need it most, without alerting potential threats.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button variant="hero" size="xl">
                  <AlertTriangle className="w-5 h-5" />
                  Get Started
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                View Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>24/7 Active Monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Real-time Location</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative max-w-md mx-auto">
              {/* Phone Mockup */}
              <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/16]">
                  {/* Phone Screen Content */}
                  <div className="h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="h-8 bg-muted flex items-center justify-center">
                      <div className="w-20 h-1 bg-foreground/20 rounded-full" />
                    </div>
                    
                    {/* App Content */}
                    <div className="flex-1 p-6 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-muted/50 to-background">
                      {/* SOS Button */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping-slow" />
                        <button className="relative w-32 h-32 rounded-full gradient-emergency shadow-emergency flex items-center justify-center animate-pulse-emergency">
                          <span className="text-primary-foreground font-display font-bold text-2xl">SOS</span>
                        </button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground text-center">
                        Tap to send silent alert
                      </p>

                      {/* Quick Actions */}
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-primary" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-accent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-background rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold text-foreground">Tracking Active</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contacts</p>
                    <p className="text-sm font-semibold text-foreground">3 Notified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.8C96 41.7 192 33.3 288 37.5C384 41.7 480 58.3 576 62.5C672 66.7 768 58.3 864 50C960 41.7 1056 33.3 1152 37.5C1248 41.7 1344 58.3 1392 66.7L1440 75V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
