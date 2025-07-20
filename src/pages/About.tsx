
import { Users, Award, Target, Heart, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description: "We embrace cutting-edge technologies and design trends to create forward-thinking digital experiences."
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Your success is our success. We're committed to delivering results that exceed expectations."
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description: "Every pixel, every line of code is crafted with precision and attention to detail."
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "We love what we do, and it shows in every project we deliver."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "With 10+ years in digital design, Alex leads our creative vision and ensures every project tells a compelling story.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Sarah brings technical excellence to every project, specializing in modern web technologies and performance optimization.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      name: "Marcus Rodriguez",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Marcus creates intuitive user experiences that not only look beautiful but drive meaningful engagement.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "5", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            We're <span className="text-neon-green">Snugx</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A passionate team of designers and developers dedicated to crafting exceptional digital experiences that drive business growth.
          </p>
          
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
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2019, Snugx began with a simple mission: to help businesses succeed in the digital world through exceptional design and development.
                </p>
                <p>
                  What started as a small team of passionate creatives has grown into a full-service digital agency that has helped over 150 businesses transform their online presence.
                </p>
                <p>
                  We believe that great design isn't just about looking good—it's about creating meaningful connections between brands and their audiences, driving engagement, and ultimately, business growth.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team working together"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass text-center hover:glass-strong transition-all">
                <CardContent className="p-8">
                  <value.icon size={48} className="text-neon-green mx-auto mb-6" />
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The creative minds behind Snugx, dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="glass overflow-hidden hover:glass-strong transition-all group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-neon-green font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-neon-green transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-neon-green transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href={member.social.instagram} className="text-gray-400 hover:text-neon-green transition-colors">
                      <Instagram size={18} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Card className="glass">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-neon-green">Our Mission</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To empower businesses with exceptional digital experiences that drive growth, engagement, and success. We're committed to delivering innovative solutions that not only meet but exceed our clients' expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-neon-green">Our Vision</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be the leading digital agency that transforms how businesses connect with their audiences online. We envision a world where every business, regardless of size, has access to world-class digital experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work <span className="text-neon-green">Together?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something amazing together. We'd love to hear about your project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-8 py-4 text-lg rounded-full neon-glow-strong"
              asChild
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-light-text hover:bg-white/10 px-8 py-4 text-lg rounded-full glass"
              asChild
            >
              <Link to="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
