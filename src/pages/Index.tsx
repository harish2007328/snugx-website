
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center justify-center px-4 pt-32 pb-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
              Transform Your
              <span className="text-neon-green block font-black">Digital Presence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              We create stunning websites and powerful digital experiences that convert visitors into customers and drive business growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-neon-green text-dark-bg hover:bg-neon-green/90 font-bold px-10 py-6 text-lg rounded-full border-3 border-neon-green hover:border-neon-green/90 transition-all group shadow-lg" asChild>
              <Link to="/contact">
                Get Your Free Quote
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-light-text hover:bg-white/10 hover:border-white/50 px-10 py-6 text-lg rounded-full font-semibold transition-all shadow-lg" asChild>
              <Link to="/case-studies">View Our Work</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 mt-16">
            <div className="flex items-center space-x-2">
              <CheckCircle size={18} className="text-neon-green" />
              <span className="font-medium">Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={18} className="text-neon-green" />
              <span className="font-medium">14-Day Turnaround</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={18} className="text-neon-green" />
              <span className="font-medium">100% Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-secondary border-2 border-white/20 text-center p-8 hover:border-neon-green/50 transition-all shadow-lg">
                <CardContent className="p-0">
                  <div className="text-5xl font-black text-neon-green mb-3">{stat.number}</div>
                  <div className="text-gray-300 font-semibold">{stat.label}</div>
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
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              Our <span className="text-neon-green">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              We specialize in creating digital experiences that not only look amazing but drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-secondary border-2 border-white/20 hover:border-neon-green/50 transition-all duration-300 group shadow-lg">
                <CardContent className="p-10 text-center">
                  <service.icon size={56} className="text-neon-green mx-auto mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                  <p className="text-gray-300 mb-8 font-medium">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center space-x-3 text-sm text-gray-400">
                        <CheckCircle size={16} className="text-neon-green" />
                        <span className="font-medium">{feature}</span>
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
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              Success <span className="text-neon-green">Stories</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              See how we've helped businesses like yours achieve extraordinary digital growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-secondary border-2 border-white/20 hover:border-neon-green/50 transition-all group overflow-hidden shadow-lg">
              <div className="aspect-video bg-neon-green/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">E-commerce Redesign</h3>
                <p className="text-gray-400 mb-6 font-medium">300% increase in conversions</p>
                <Button variant="outline" size="sm" className="border-2 border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:border-neon-green font-semibold">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-2 border-white/20 hover:border-neon-green/50 transition-all group overflow-hidden shadow-lg">
              <div className="aspect-video bg-blue-500/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">SaaS Platform</h3>
                <p className="text-gray-400 mb-6 font-medium">250% user engagement boost</p>
                <Button variant="outline" size="sm" className="border-2 border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:border-neon-green font-semibold">
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary border-2 border-white/20 hover:border-neon-green/50 transition-all group overflow-hidden shadow-lg">
              <div className="aspect-video bg-purple-500/20" />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">Brand Identity</h3>
                <p className="text-gray-400 mb-6 font-medium">Complete digital transformation</p>
                <Button variant="outline" size="sm" className="border-2 border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:border-neon-green font-semibold">
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-neon-green text-dark-bg hover:bg-neon-green/90 font-bold px-10 py-6 rounded-full border-2 border-neon-green shadow-lg" asChild>
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
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
              What Our <span className="text-neon-green">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary border-2 border-white/20 shadow-lg">
                <CardContent className="p-10">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-neon-green fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 italic font-medium text-lg">"{testimonial.text}"</p>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-neon-green font-semibold">{testimonial.company}</div>
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
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            Ready to <span className="text-neon-green">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-gray-300 font-medium">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-neon-green text-dark-bg hover:bg-neon-green/90 font-bold px-10 py-6 text-lg rounded-full border-2 border-neon-green shadow-lg" asChild>
              <Link to="/contact">Start Your Project Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-light-text hover:bg-white/10 hover:border-white/50 px-10 py-6 text-lg rounded-full font-semibold shadow-lg" asChild>
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
