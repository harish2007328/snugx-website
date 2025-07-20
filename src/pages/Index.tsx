
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Palette, Code, Rocket, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Palette,
      title: "Web Design",
      description: "Stunning, user-centric designs that captivate and convert your audience.",
      features: ["UI/UX Design", "Responsive Design", "Brand Integration"]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and applications built with cutting-edge technology.",
      features: ["React Development", "Full-Stack Solutions", "Performance Optimization"]
    },
    {
      icon: Zap,
      title: "Webflow & Framer",
      description: "No-code solutions that deliver exceptional performance and flexibility.",
      features: ["Webflow Development", "Framer Prototypes", "CMS Integration"]
    }
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "2.5x", label: "Average ROI Increase" },
    { number: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStartup Inc.",
      text: "Snugx transformed our digital presence completely. Our conversion rate increased by 300% after the redesign.",
      rating: 5
    },
    {
      name: "Mike Chen",
      company: "E-commerce Plus",
      text: "The team's attention to detail and technical expertise exceeded our expectations. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "Creative Agency",
      text: "Professional, creative, and delivered on time. Our new website is exactly what we envisioned.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform Your
              <span className="text-neon-green block animate-glow">Digital Presence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We create stunning websites and powerful digital experiences that convert visitors into customers and drive business growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-8 py-4 text-lg rounded-full neon-glow-strong group"
              asChild
            >
              <Link to="/contact">
                Get Your Free Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
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

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400 mt-12">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span>14-Day Turnaround</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span>100% Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass text-center p-6 hover:glass-strong transition-all">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-neon-green mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-neon-green">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We specialize in creating digital experiences that not only look amazing but drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass hover:glass-strong transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <service.icon size={48} className="text-neon-green mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                        <CheckCircle size={14} className="text-neon-green" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="text-neon-green">Stories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how we've helped businesses like yours achieve extraordinary digital growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="glass hover:glass-strong transition-all group overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-neon-green/20 to-transparent" />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">E-commerce Redesign</h3>
                <p className="text-gray-400 mb-4">300% increase in conversions</p>
                <Button variant="outline" size="sm" className="border-neon-green/30 text-neon-green hover:bg-neon-green/10">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-strong transition-all group overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-transparent" />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">SaaS Platform</h3>
                <p className="text-gray-400 mb-4">250% user engagement boost</p>
                <Button variant="outline" size="sm" className="border-neon-green/30 text-neon-green hover:bg-neon-green/10">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="glass hover:glass-strong transition-all group overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-transparent" />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Brand Identity</h3>
                <p className="text-gray-400 mb-4">Complete digital transformation</p>
                <Button variant="outline" size="sm" className="border-neon-green/30 text-neon-green hover:bg-neon-green/10">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-8 py-4 rounded-full"
              asChild
            >
              <Link to="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-neon-green">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-neon-green fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-neon-green text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to <span className="text-neon-green">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-gray-300">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-8 py-4 text-lg rounded-full neon-glow-strong"
              asChild
            >
              <Link to="/contact">Start Your Project Today</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-light-text hover:bg-white/10 px-8 py-4 text-lg rounded-full glass"
              asChild
            >
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
