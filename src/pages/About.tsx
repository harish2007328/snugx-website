
import { Code, Coffee, Laptop, Award, Target, Heart, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const About = () => {
  useScrollToTop();

  const values = [
    {
      icon: Code,
      title: "Code Excellence",
      description: "Every line of code is crafted with precision and passion for creating exceptional digital experiences."
    },
    {
      icon: Coffee,
      title: "Creative Process",
      description: "Fueled by coffee and creativity, I transform ideas into stunning digital realities."
    },
    {
      icon: Target,
      title: "Client Success",
      description: "Your success is my mission. I'm committed to delivering results that exceed expectations."
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "I love what I do, and it shows in every project I deliver with dedication and enthusiasm."
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "5", label: "Years Experience" }
  ];

  const techStack = [
    "React", "TypeScript", "Node.js", "Python", "Next.js", "Tailwind CSS", 
    "Supabase", "MongoDB", "AWS", "Figma", "Adobe Creative Suite"
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-left lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Hi, I'm <span className="text-neon-green">Harish</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                A passionate tech enthusiast and full-stack developer who transforms ideas into exceptional digital experiences. 
                One developer, unlimited possibilities.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {techStack.slice(0, 6).map((tech, index) => (
                  <span key={index} className="bg-neon-green/10 text-neon-green px-3 py-1 rounded-full text-sm border border-neon-green/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative bg-gradient-to-br from-neon-green/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-neon-green/20">
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <Laptop size={64} className="text-neon-green mx-auto mb-4" />
                    <p className="text-sm text-gray-300">ASUS ExpertBook</p>
                    <p className="text-xs text-gray-400">My coding companion</p>
                  </div>
                  <div className="text-center">
                    <Coffee size={64} className="text-neon-green mx-auto mb-4" />
                    <p className="text-sm text-gray-300">Coffee</p>
                    <p className="text-xs text-gray-400">Fuel for creativity</p>
                  </div>
                  <div className="text-center">
                    <Code size={64} className="text-neon-green mx-auto mb-4" />
                    <p className="text-sm text-gray-300">Clean Code</p>
                    <p className="text-xs text-gray-400">My philosophy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">My Journey</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  What started as curiosity about how websites work has evolved into a passion for creating digital experiences that make a difference. Armed with my ASUS ExpertBook and fueled by endless cups of coffee, I've built Snugx from the ground up.
                </p>
                <p>
                  As a solo developer and tech enthusiast, I wear many hats - designer, developer, project manager, and problem solver. This gives me the unique ability to understand every aspect of your project and deliver cohesive, high-quality solutions.
                </p>
                <p>
                  Every project is personal to me. When you succeed, I succeed. That's the foundation of how I work - treating each project as if it were my own.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face"
                alt="Harish working on his laptop"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
              <div className="absolute bottom-4 left-4 bg-dark-bg/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-neon-green font-semibold">Harish</p>
                <p className="text-xs text-gray-400">Founder & Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">How I Work</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These principles guide every project I take on and define my approach to development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 text-center hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <value.icon size={48} className="text-neon-green mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">My Tech Arsenal</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            The tools and technologies I use to bring your ideas to life.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-neon-green/10 to-neon-green/5 border border-neon-green/20 rounded-full px-6 py-3 text-neon-green font-semibold hover:bg-neon-green/20 transition-all duration-300 cursor-pointer">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Card className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-green/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-neon-green">My Mission</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To help businesses and individuals establish a powerful digital presence through exceptional web development. I believe every project deserves personal attention and innovative solutions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-green/10 to-transparent rounded-full -translate-y-16 -translate-x-16" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-neon-green">My Vision</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To bridge the gap between complex technology and simple solutions. I envision a world where every business can have access to top-tier digital experiences, regardless of their size or budget.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mx-auto">
        <div className="max-w-7xl mx-auto text-center space-y-10 py-20 px-6 bg-[#e5ff00] rounded-[10px]">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-relaxed">
            Ready to <span className="bg-[#1a1a1a] text-[#f5f5f5] font-bold px-4 py-1 rounded-md">Collaborate ✦</span>?
          </h2>
          <p className="text-lg text-[#111111]/80 font-normal">
            Let's work together to bring your digital vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-[#111111] text-[#f5f5f5] border-2 border-[#111111]/50 hover:bg-[#f5f5f5]/90 hover:text-[#111111] transition-colors duration-300 px-10 py-4 rounded-full" asChild>
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-[#111111]/50 text-[#111111] hover:bg-[#f5f5f5]/90 hover:text-[#111111] transition-colors duration-300 px-10 py-4 rounded-full" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
