import { Shield, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Technology", href: "#technology" },
      { name: "Pricing", href: "#" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-emergency flex items-center justify-center shadow-emergency">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-background">
                Silent<span className="text-primary">SOS</span>
              </span>
            </a>
            <p className="text-background/70 max-w-sm mb-6 leading-relaxed">
              Empowering individuals with silent emergency assistance technology. Your safety is our priority, every moment of every day.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} SilentSOS. All rights reserved.
          </p>
          <p className="text-sm text-background/50">
            Built with ❤️ for a safer world
          </p>
        </div>
      </div>
    </footer>
  );
};
