
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Palette, Code, Rocket, Users, Award, CheckCircle, User } from 'lucide-react';
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

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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

  // Sample avatar images from Unsplash
  const avatarImages = [
    "/hero-images/c1.png",
    "/hero-images/c2.png",
    "/hero-images/c3.png",
    "/hero-images/c4.png",
    "/hero-images/c5.png"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center justify-center px-4 pt-32 pb-16 bg-dark-bg hero-noise-effect overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          {/* Free Consultation Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm border border-neon-green/30 rounded-full px-4 py-2 text-sm font-medium">
            <div className="w-2 h-2 glow-dot"></div>
            <span>Free Consultation</span>
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
              We craft <span className="text-neon-green font-semibold">bold ✦</span>
              <br />
              websites that just hit.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
              From scroll to click, we design sites that vibe, move, and convert — built for brands that get it.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="btn-primary px-8 py-4 text-base group" asChild>
              <Link to="/contact">
                <User className="mr-2 w-5 h-5" />
                Book a call With Harish
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="btn-secondary px-8 py-4 text-base" asChild>
              <Link to="/case-studies">View Our Works</Link>
            </Button>
          </div>

          {/* Avatar Stack and Text */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="avatar-stack">
              {avatarImages.map((src, index) => (
                <div key={index} className="avatar-item w-12 h-12">
                  <img 
                    src={src} 
                    alt={`Happy client ${index + 1}`}
                    className="w-full h-full object-cover rounded-full"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-medium">30+ Happy agencies, startups, and consultants</p>
          </div>
        </div>
        
        {/* Half oval with shadow */}
        <div className="hero-oval"></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-secondary border-2 border-light-text/20 text-center p-8 hover:border-neon-green/50 transition-all">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-neon-green mb-3">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              Our <span className="text-neon-green">Expertise ✦</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal">
              We specialize in creating digital experiences that not only look amazing but drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-secondary border-2 border-light-text/20 hover:border-neon-green/50 transition-all duration-300 group">
                <CardContent className="p-10 text-center">
                  <service.icon size={48} className="text-neon-green mx-auto mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-6">{service.title}</h3>
                  <p className="text-gray-300 mb-8 font-normal">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-neon-green" />
                        <span className="font-normal">{feature}</span>
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
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              Success <span className="text-neon-green">Stories ✦</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal">
              See how we've helped businesses like yours achieve extraordinary digital growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-secondary border-2 border-light-text/20 hover:border-neon-green/50 transition-all group overflow-hidden">
              <div className="aspect-video bg-neon-green/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-3">E-commerce Redesign</h3>
                <p className="text-gray-400 mb-6 font-normal">300% increase in conversions</p>
                <Button className="btn-secondary" size="sm">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-2 border-light-text/20 hover:border-neon-green/50 transition-all group overflow-hidden">
              <div className="aspect-video bg-neon-green/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-3">SaaS Platform</h3>
                <p className="text-gray-400 mb-6 font-normal">250% user engagement boost</p>
                <Button className="btn-secondary" size="sm">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-2 border-light-text/20 hover:border-neon-green/50 transition-all group overflow-hidden">
              <div className="aspect-video bg-neon-green/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-3">Brand Identity</h3>
                <p className="text-gray-400 mb-6 font-normal">Complete digital transformation</p>
                <Button className="btn-secondary" size="sm">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-primary px-10 py-4" asChild>
              <Link to="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              What Our <span className="text-neon-green">Clients Say ✦</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary border-2 border-light-text/20">
                <CardContent className="p-10">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-neon-green fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 italic font-normal text-base">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-base">{testimonial.name}</div>
                    <div className="text-neon-green font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Ready to <span className="text-neon-green">Transform ✦</span> Your Business?
          </h2>
          <p className="text-lg text-gray-300 font-normal">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="btn-primary px-10 py-4" asChild>
              <Link to="/contact">Start Your Project Today</Link>
            </Button>
            <Button size="lg" className="btn-secondary px-10 py-4" asChild>
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
