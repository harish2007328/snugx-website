import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Palette, Code, Rocket, Users, Award, CheckCircle, User, Smartphone, ShoppingBag, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';

const Index = () => {
  interface CaseStudy {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    results: string[];
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [featuredCaseStudies, setFeaturedCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetchFeaturedCaseStudies();
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Trigger stats animation when stats section is visible
          if (entry.target === statsRef.current && !hasAnimated) {
            setHasAnimated(true);
            animateStats();
          }
        }
      });
    }, observerOptions);
    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchFeaturedCaseStudies = async () => {
    try {
      // Get homepage project IDs from localStorage
      const homepageProjects = JSON.parse(localStorage.getItem('homepage_projects') || '[]');
      
      if (homepageProjects.length === 0) {
        // Fallback to latest 3 if no homepage projects selected
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFeaturedCaseStudies(data || []);
      } else {
        // Fetch specific homepage projects
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .in('id', homepageProjects);

        if (error) throw error;
        setFeaturedCaseStudies(data || []);
      }

    } catch (error) {
      console.error('Error fetching featured case studies:', error);
    }
  };
  const animateStats = () => {
    const targets = [150, 98, 2.5, 24];
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats(targets.map(target => {
        const current = Math.round(target * progress);
        return current;
      }));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepDuration);
  };

  const services = [
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Custom-built websites with stunning UI and smooth UX — from landing pages to full-scale platforms."
    },
    {
      icon: Smartphone,
      title: "UI/UX Design",
      description: "Intuitive interfaces crafted with user psychology in mind — for mobile, desktop, and beyond."
    },
    {
      icon: ShoppingBag,
      title: "Portfolio & Personal Websites",
      description: "Stand out with a pixel-perfect personal site or creative portfolio — ideal for freelancers, students, and creators."
    },
    {
      icon: Briefcase,
      title: "Business Websites for Startups",
      description: "One-page, multi-page, or full-service sites built to convert visitors into customers — fast."
    },
    {
      icon: Sparkles,
      title: "SEO & Performance Optimization",
      description: "We make your website lightning-fast, search-friendly, and ready to rank with clean code and structured design."
    },
    {
      icon: Users,
      title: "Admin Dashboard & CMS Integration",
      description: "Want to manage your own blogs or content? We integrate Supabase so you stay in control without touching code."
    }
  ];

  const stats = [{
    number: "150+",
    label: "Projects\nCompleted"
  }, {
    number: "98%",
    label: "Client\nSatisfaction"
  }, {
    number: "2.5x",
    label: "Average ROI\nIncrease"
  }, {
    number: "24/7",
    label: "Support\nAvailable"
  }];

  const testimonials = [{
    name: "Sarah Johnson",
    company: "TechStartup Inc.",
    text: "Snugx transformed our digital presence completely. Our conversion rate increased by 300% after the redesign.",
    rating: 5
  }, {
    name: "Mike Chen",
    company: "E-commerce Plus",
    text: "The team's attention to detail and technical expertise exceeded our expectations. Highly recommended!",
    rating: 5
  }, {
    name: "Emily Rodriguez",
    company: "Creative Agency",
    text: "Professional, creative, and delivered on time. Our new website is exactly what we envisioned.",
    rating: 5
  }, {
    name: "Sarah Johnson",
    company: "TechStartup Inc.",
    text: "Snugx transformed our digital presence completely. Our conversion rate increased by 300% after the redesign.",
    rating: 5
  }, {
    name: "Mike Chen",
    company: "E-commerce Plus",
    text: "The team's attention to detail and technical expertise exceeded our expectations. Highly recommended!",
    rating: 5
  }, {
    name: "Emily Rodriguez",
    company: "Creative Agency",
    text: "Professional, creative, and delivered on time. Our new website is exactly what we envisioned.",
    rating: 5
  }];

  const avatarImages = ["/hero-images/c1.png", "/hero-images/c2.png", "/hero-images/c3.png", "/hero-images/c4.png", "/hero-images/c5.png"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center justify-center px-4 pt-32 pb-16 bg-dark-bg hero-noise-effect overflow-hidden">
        {/* Blurred Circles */}
        <div className="hero-blur-circle-1"></div>
        <div className="hero-blur-circle-2"></div>
        <div className="hero-blur-circle-3"></div>
        
        {/* Comet Animations */}
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
        <div className="comet comet-4"></div>
        
        <div className="w-full mx-auto text-center space-y-12 relative z-10 max-w-none px-8">
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
          <div className="mt-16 mb-16 flex flex-col sm:flex-row items-center justify-center gap-6 mx-0 my-[6px]">
            <div className="avatar-stack">
              {avatarImages.map((src, index) => <div key={index} className="avatar-item w-6 h-6">
                  <img src={src} alt={`Happy client ${index + 1}`} className="w-full h-full object-cover rounded-full" loading="eager" />
                </div>)}
            </div>
            <p className="text-gray-400 text-sm font-medium">30+ Happy agencies, startups, and consultants</p>
          </div>
        </div>
        
        {/* Half oval with shadow */}
        
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-secondary/0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <Card key={index} className="bg-gradient-to-br from-dark-bg via-secondary/30 to-dark-bg border border-white/10 text-center p-8 hover:border-neon-green/30 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-neon-green mb-3">
                    {index === 0 && `${animatedStats[0]}+`}
                    {index === 1 && `${animatedStats[1]}%`}
                    {index === 2 && `${animatedStats[2]}x`}
                    {index === 3 && `${Math.floor(animatedStats[3])}/7`}
                  </div>
                  <div className="text-gray-300 font-medium bg-black/0 whitespace-pre-line leading-tight">{stat.label}</div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              Our <span className="text-neon-green">Expertise ✦</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal">
              We specialize in creating digital experiences that not only look amazing but drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 group backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8 h-full">
                  <div className="flex items-center justify-center w-16 h-16 bg-neon-green/10 rounded-2xl mb-6 group-hover:bg-neon-green/20 transition-colors">
                    <service.icon size={32} className="text-neon-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-300 font-normal text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies Preview */}
      <section className="py-20 px-4 bg-black/0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              Success <span className="text-neon-green">Stories ✦</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal">
              See how we've helped businesses like yours achieve extraordinary digital growth.
            </p>
          </div>

          {featuredCaseStudies.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Case Studies Yet</h3>
              <p className="text-xl text-gray-400 mb-6">
                Add your first case study from the admin panel to showcase your work.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredCaseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 group overflow-hidden backdrop-blur-sm">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-8 relative">
                    <h3 className="text-xl font-semibold mb-3">{caseStudy.title}</h3>
                    <p className="text-gray-400 mb-6 font-normal">{caseStudy.description}</p>
                    {caseStudy.results && caseStudy.results.length > 0 && (
                      <p className="text-neon-green text-sm mb-4 font-medium">{caseStudy.results[0]}</p>
                    )}
                    <Button className="bg-white/5 border border-white/20 text-light-text hover:bg-neon-green/10 hover:border-neon-green/30 transition-all duration-300" size="sm" asChild>
                      <Link to={`/case-studies/${caseStudy.id}`}>View Case Study</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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

      {/* Testimonials Vertical Carousel */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              What Our <span className="text-neon-green">Clients Say ✦</span>
            </h2>
          </div>

          <div className="testimonial-columns">
            {/* Column 1 - Moving Up */}
            <div className="flex flex-col space-y-6 animate-scroll-up">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={`col1-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-neon-green/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <img 
                          src="/lovable-uploads/6cd327ef-2a7c-4c5f-95e5-b3b6b4e7fad0.png"
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs">{testimonial.company}</div>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-neon-green fill-current" />)}
                      </div>
                      <p className="text-gray-300 italic font-normal text-sm">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Column 2 - Moving Down */}
            <div className="flex flex-col space-y-6 animate-scroll-down hidden lg:flex">
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                <Card key={`col2-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-neon-green/10 to-transparent rounded-full -translate-y-8 -translate-x-8" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <img 
                          src="/lovable-uploads/6cd327ef-2a7c-4c5f-95e5-b3b6b4e7fad0.png"
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs">{testimonial.company}</div>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-neon-green fill-current" />)}
                      </div>
                      <p className="text-gray-300 italic font-normal text-sm">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Column 3 - Moving Up Fast */}
            <div className="flex flex-col space-y-6 animate-scroll-up-fast hidden md:flex">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={`col3-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-neon-green/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <img 
                          src="/lovable-uploads/6cd327ef-2a7c-4c5f-95e5-b3b6b4e7fad0.png"
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs">{testimonial.company}</div>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-neon-green fill-current" />)}
                      </div>
                      <p className="text-gray-300 italic font-normal text-sm">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 via-transparent to-neon-green/5"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-neon-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-green/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-neon-green/10 border border-neon-green/20 rounded-full px-6 py-3 text-sm font-medium">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-neon-green">Free Consultation Available</span>
          </div>

          {/* Main heading */}
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Ready to <span className="text-neon-green">Transform ✦</span><br />
            Your Business?
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button size="lg" className="btn-primary px-12 py-6 text-lg font-semibold group shadow-lg shadow-neon-green/20 hover:shadow-xl hover:shadow-neon-green/30 transition-all duration-300" asChild>
              <Link to="/contact">
                Start Your Project Today
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" className="btn-secondary px-12 py-6 text-lg font-semibold border-2 border-white/20 hover:border-neon-green/30 transition-all duration-300" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span className="text-sm">No long-term contracts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span className="text-sm">Money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-neon-green" />
              <span className="text-sm">24/7 support included</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
