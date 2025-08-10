import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Palette, Code, Rocket, Users, Award, CheckCircle, User, Smartphone, ShoppingBag, Briefcase, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';
import React from 'react';

// Lazy load heavy components
const DotLottieReact = React.lazy(() => 
  import('@lottiefiles/dotlottie-react').then(module => ({ default: module.DotLottieReact }))
);

// Lazy load icon libraries
const IconLibraries = React.lazy(() => 
  Promise.all([
    import('react-icons/fa'),
    import('react-icons/si'),
    import('react-icons/vsc'),
    import('react-icons/tb'),
    import('react-icons/cg')
  ]).then(([fa, si, vsc, tb, cg]) => ({
    default: {
      FaReact: fa.FaReact,
      FaFigma: fa.FaFigma,
      FaGithub: fa.FaGithub,
      SiTypescript: si.SiTypescript,
      SiVite: si.SiVite,
      SiTailwindcss: si.SiTailwindcss,
      SiSupabase: si.SiSupabase,
      SiVercel: si.SiVercel,
      SiNotion: si.SiNotion,
      SiOpenai: si.SiOpenai,
      SiAdobephotoshop: si.SiAdobephotoshop,
      SiAdobeillustrator: si.SiAdobeillustrator,
      SiFramer: si.SiFramer,
      SiWebflow: si.SiWebflow,
      SiGoogleanalytics: si.SiGoogleanalytics,
      VscVscode: vsc.VscVscode,
      TbBrandRumble: tb.TbBrandRumble,
      CgInfinity: cg.CgInfinity
    }
  }))
);

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
  const [currentServicePage, setCurrentServicePage] = useState(0);
  const servicesPerPage = window.innerWidth < 768 ? 1 : 3;
  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    fetchFeaturedCaseStudies();
    
    // Preload critical images
    const preloadImages = [
      '/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png',
      '/hero-images/c1.png',
      '/hero-images/c2.png',
      '/hero-images/c3.png'
    ];
    
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
    
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
            // Defer stats animation to avoid blocking
            requestAnimationFrame(() => {
              setTimeout(animateStats, 100);
            });
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
      icon: Code, // Using Code icon from already imported lucide-react icons
      title: "Web Design & Development",
      description: "Custom-built websites with stunning UI and smooth UX — from landing pages to full-scale platforms.",
      features: []
    },
    {
      icon: Smartphone, // Using Smartphone icon from lucide-react
      title: "UI/UX Design",
      description: "Intuitive interfaces crafted with user psychology in mind — for mobile, desktop, and beyond.",
      features: []
    },
    {
      icon: ShoppingBag, // Replace with appropriate SVG import
      title: "Portfolio & Personal Websites",
      description: "Stand out with a pixel-perfect personal site or creative portfolio — ideal for freelancers, students, and creators.",
      features: []
    },
    {
      icon: Briefcase, // Replace with appropriate SVG import
      title: "Business Websites for Startups",
      description: "One-page, multi-page, or full-service sites built to convert visitors into customers — fast.",
      features: []
    },
    {
      icon: Sparkles, // Replace with appropriate SVG import
      title: "SEO & Performance Optimization",
      description: "We make your website lightning-fast, search-friendly, and ready to rank with clean code and structured design.",
      features: []
    },
    {
      icon: Users, // Replace with appropriate SVG import
      title: "Admin Dashboard & CMS Integration",
      description: "Want to manage your own blogs or content? We integrate Supabase so you stay in control without touching code.",
      features: []
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

  // Sample avatar images
  const avatarImages = ["/hero-images/c1.png", "/hero-images/c2.png", "/hero-images/c3.png", "/hero-images/c4.png", "/hero-images/c5.png"];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex items-center justify-center px-4 pt-28 pb-40  bg-dark-bg hero-noise-effect overflow-hidden">
        {/* Blurred Circles */}
        <div className="hero-blur-circle-1" aria-hidden="true"></div>
        <div className="hero-blur-circle-2"></div>
        <div className="hero-blur-circle-3"></div>
        
        {/* Comet Animations */}
        <div className="comet comet-1"></div>
        <div className="comet comet-2"></div>
        <div className="comet comet-3"></div>
        <div className="comet comet-4"></div>

        {/* bottom or upper circle */}
        <div className="circle"></div>
        <div
          className='Btm-text scroll-down-indicator cursor-pointer'
          onClick={() => statsRef.current?.scrollIntoView({ behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          aria-label="Scroll down to view more content"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              statsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          >
          Scroll Down
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='ml-2 inline-block'
          >
            <line x1='12' y1='5' x2='12' y2='19'></line>
            <polyline points='19 12 12 19 5 12'></polyline>
          </svg>
        </div>
        
        <div className="w-full mx-auto text-center space-y-8 md:space-y-12 relative z-10 max-w-none px-8">
          {/* Free Consultation Badge */}
          <div className="inline-flex items-center space-x-2 bg-secondary/50 backdrop-blur-sm border border-neon-green/30 rounded-full px-2.5 py-1 text-sm font-medium performance-optimized">
            <div className="w-2 h-2 glow-dot"></div>
            <span>Free Consultation</span>
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight">
              We craft <span className="text-neon-green font-bold">bold ✦</span>
              <br />
              websites that just hit.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
              From scroll to click, we design sites that vibe, move, and convert — built for brands that get it.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center ">
            <Button size="lg" className="btn-primary px-8 py-4 text-base group" asChild>
              <Link to="/contact">
                Book a call
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="btn-secondary px-8 py-4 text-base" asChild>
              <Link to="/case-studies">View Our Works</Link>
            </Button>
          </div>
          
        </div>
        
        {/* Half oval with shadow */}
        
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-secondary/0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <Card key={index} className="bg-gradient-to-br from-dark-bg via-secondary/30 to-dark-bg border border-white/10 text-center p-5 hover:border-neon-green/30 hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm w-full">
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

      
      {/* Featured Case Studies Section */}
      <section className="py-20 px-4 bg-dark-bg">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {featuredCaseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:shadow-neon-green/20 transition-all duration-500 ease-in-out aspect-[1/1.3] bg-dark-bg">
                  <LazyImage
                    src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
                    alt={caseStudy.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />
                  <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-left">{caseStudy.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm text-left">
                      {caseStudy.description && (caseStudy.description.length > 70 
                          ? `${caseStudy.description.substring(0, 70)}...` 
                          : caseStudy.description)}
                    </p>
                    {caseStudy.results && caseStudy.results.length > 0 && (
                      <p className="text-neon-green text-xs font-semibold uppercase tracking-wider text-left">
                        {caseStudy.results[0].length > 30
                          ? `${caseStudy.results[0].substring(0, 30)}...` 
                          : caseStudy.results[0]}
                      </p>
                    )}
                    <Button 
                      variant="outline" 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full border-neon-green bg-neon-green text-dark-bg transition-all duration-300 p-0 flex items-center justify-center" 
                      size="icon" 
                      aria-label={`View ${caseStudy.title} case study details`}
                      asChild
                    >
                      <Link to={`/case-studies/${caseStudy.id}`}>
                        <ArrowRight className="w-5 h-5 rotate-[-45deg]" />
                      </Link>
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


      {/* Why Choose Us Section */}
      <section className="relative py-20 px-4 bg-dark-bg z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why Brands Choose <LazyImage src="/lovable-uploads/c94513f9-081b-4657-a347-eb2609c9a02f.png" alt="Snugx logo" className="inline-block h-10 align-center" width={120} height={40} /></h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Small tweaks. Big impact. Here's what sets us apart.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-5 gap-8 min-h-[650px]">
            <Card className="relative md:col-span-2 md:row-span-3 bg-gradient-to-br from-secondary/20 to-dark-bg border border-white/10 p-5 flex flex-col justify-between overflow-hidden min-h-[300px] max-h-[370px]">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-gray-400">Easy edits, no waiting.</p>
              </div>
              <div className="bento-lottie-container-1 mt-8 flex-grow">
                <LazyImage src="/bento-files/real-time.svg" alt="Real-time updates visualization" className="bento-svg-1" width={350} height={350} />
              </div>
              <div className='bottom-gradient-1'></div>
            </Card>
            <Card className="relative md:col-span-4 md:row-span-3 bg-gradient-to-br from-secondary/20 to-dark-bg border border-white/10 p-5 flex flex-col justify-between overflow-hidden min-h-[250px] max-h-[370px]">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">Design That Converts</h3>
                <p className="text-gray-400">Built to work better.</p>
              </div>
              <div className="bento-lottie-container-2 mt-8 flex-grow">
                <React.Suspense fallback={<div className="w-full h-full bg-white/5 rounded animate-pulse" />}>
                  <DotLottieReact
                    src="/bento-files/graph.json"
                    loop
                    autoplay
                    className="bento-lottie-2"
                  />
                </React.Suspense>
              </div>
              <div className='bottom-gradient-2'></div>
            </Card>
            <Card className="relative md:col-span-4 md:row-span-2 bg-gradient-to-br from-secondary/20 to-dark-bg border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[240px]">
              <div className="text-left z-[1]">
                <h3 className="text-2xl font-semibold mb-2">Lightning-Fast Delivery</h3>
                <p className="text-gray-400">No stress!!.</p>
              </div>
              <div className="bento-lottie-container-3 mt-8 flex-grow self-end">
                <React.Suspense fallback={<div className="w-full h-full bg-white/5 rounded animate-pulse" />}>
                  <DotLottieReact
                    src="/bento-files/thunder.json"
                    loop
                    autoplay
                    className="bento-lottie-3"
                  />
                </React.Suspense>
              </div>
              <div className='bottom-gradient-3'></div>
            </Card>
            <Card className="relative md:col-span-2 md:row-span-2 bg-gradient-to-br from-secondary/20 to-dark-bg border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[240px]">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-2">Perfectly Placed Pixels</h3>
                <p className="text-gray-400">Built to look great.</p>
              </div>
              <div className="bento-lottie-container-4 mt-8 flex-grow">
                <React.Suspense fallback={<div className="w-full h-full bg-white/5 rounded animate-pulse" />}>
                  <DotLottieReact
                    src="/bento-files/pixel.json"
                    loop
                    autoplay
                    className="bento-lottie-4"
                  />
                </React.Suspense>
              </div>
              <div className='bottom-gradient-4'></div>
            </Card>
          </div>
        </div>
      </section>


      {/* Stack and Tools Section */}
      <section className="py-20 md:py-20 md:pb-40 px-4 bg-dark-bg" aria-label="Technology stack and tools">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Stack & <span className="text-neon-green">Tools We Use ✦</span></h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">We use the best tools to build the best products.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-7 gap-y-6">
            <React.Suspense fallback={
              // Fallback with simple text-based tools list
              ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'VS Code', 'GitHub', 'Vercel', 'GSAP', 'Figma', 'Photoshop', 'Illustrator', 'Framer', 'Webflow', 'Relume', 'ChatGPT', 'Google Analytics', 'Notion'].map((tool, index) => (
                <div key={index} className="flex items-center gap-4 text-white hover:text-neon-green transition-colors">
                  <div className="w-8 h-8 bg-white/10 rounded animate-pulse"></div>
                  <span className="text-xs text-left font-medium">{tool}</span>
                </div>
              ))
            }>
              <IconLibraries>
                {(icons) => [
                  // Development
                  { icon: <icons.FaReact/>, name: 'React' },
                  { icon: <icons.SiTypescript/>, name: 'TypeScript' },
                  { icon: <icons.SiVite/>, name: 'Vite' },
                  { icon: <icons.SiTailwindcss/>, name: 'Tailwind CSS' },
                  { icon: <icons.SiSupabase/>, name: 'Supabase' },
                  { icon: <icons.VscVscode />, name: 'VS Code' },
                  { icon: <icons.FaGithub/>, name: 'GitHub' },
                  { icon: <icons.SiVercel/>, name: 'Vercel' },
                  { icon: <icons.CgInfinity />, name: 'GSAP' },
                  
                  // Design
                  { icon: <icons.FaFigma/>, name: 'Figma' },
                  { icon: <icons.SiAdobephotoshop />, name: 'Photoshop' },
                  { icon: <icons.SiAdobeillustrator />, name: 'Illustrator' },
                  { icon: <icons.SiFramer />, name: 'Framer' },
                  { icon: <icons.SiWebflow />, name: 'Webflow' },
                  { icon: <icons.TbBrandRumble />, name: 'Relume' },
                  
                  // AI & Analytics
                  { icon: <icons.SiOpenai />, name: 'ChatGPT' },
                  { icon: <icons.SiGoogleanalytics/>, name: 'Google Analytics' },
                  
                  // Project Management
                  { icon: <icons.SiNotion/>, name: 'Notion' },
                ].map((tool, index) => (
                  <div key={index} className="flex items-center gap-4 text-white hover:text-neon-green transition-colors">
                    <div className="text-3xl">{tool.icon}</div>
                    <span className="text-xs text-left font-medium">{tool.name}</span>
                  </div>
                ))}
              </IconLibraries>
            </React.Suspense>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="relative py-20 px-4 bg-secondary/0 overflow-hidden">
      <div className="process-gradient"></div>
        <div className="relative max-w-7xl mx-auto px-8 ">
          <div className="relative text-center mb-[160px] z-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our <span className="text-neon-green">Process ✦</span></h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">A clear, transparent approach to delivering <br /> exceptional digital experiences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="process-card">
              <div className="absolute top-[-20px] right-[-20px] bg-neon-green text-dark-bg rounded-full w-16 h-16 flex items-center justify-center font-bold text-3xl">1</div>
              <h3 className="text-2xl font-semibold mb-4">Client Meeting</h3>
              <p className="text-gray-300">Collaborating to understand your vision and define project goals.</p>
            </div>
            <div className="process-card">
              <div className="absolute top-[-20px] right-[-20px] bg-neon-green text-dark-bg rounded-full w-16 h-16 flex items-center justify-center font-bold text-3xl">2</div>
              <h3 className="text-2xl font-semibold mb-4">Design & Prototyping</h3>
              <p className="text-gray-300">Crafting intuitive interfaces and interactive prototypes for approval.</p>
            </div>
            <div className="process-card">
              <div className="absolute top-[-20px] right-[-20px] bg-neon-green text-dark-bg rounded-full w-16 h-16 flex items-center justify-center font-bold text-3xl">3</div>
              <h3 className="text-2xl font-semibold mb-4">Development</h3>
              <p className="text-gray-300">Building a robust, scalable, and secure application from the ground up.</p>
            </div>
            <div className="process-card">
              <div className="absolute top-[-20px] right-[-20px] bg-neon-green text-dark-bg rounded-full w-16 h-16 flex items-center justify-center font-bold text-3xl">4</div>
              <h3 className="text-2xl font-semibold mb-4">Deployment</h3>
              <p className="text-gray-300">Launching the application and ensuring a seamless transition to production.</p>
            </div>

            {/* Animated Connectors */}
            <div className="hidden md:flex absolute top-1/2 left-0 w-full h-full justify-around items-center -z-10">
              <div className="w-1/4 h-0.5 bg-neon-green/30 relative">
                <div className="absolute top-0 left-0 h-full bg-neon-green animate-draw-line" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="w-1/4 h-0.5 bg-neon-green/30 relative">
                <div className="absolute top-0 left-0 h-full bg-neon-green animate-draw-line" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="w-1/4 h-0.5 bg-neon-green/30 relative">
                <div className="absolute top-0 left-0 h-full bg-neon-green animate-draw-line" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-8 md:grid md:grid-cols-2 md:gap-16 items-start">
          <div className="md:sticky md:top-40 text-center md:text-left mb-12 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
              Our <span className="text-neon-green">Expertise ✦</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto md:mx-0 font-normal">
              We specialize in creating digital experiences that not only look amazing but drive real business results.
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="relative bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 group backdrop-blur-sm overflow-hidden">
                <div className="absolute bottom-[-300px] right-[-300px] h-[600px] w-[600px] bg-gradient-to-tl from-[#e5ff00] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none rounded-[50%] blur-[32px]"></div>
                <CardContent className="p-6 text-left relative">
                  <div className="flex items-start flex-col">
                    <div className="flex-grow mb-8">
                      <div className="mb-6">
                        <service.icon size={60} className="text-neon-green group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 font-normal text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <Button size="lg" className="btn-secondary px-8 py-4 text-base w-fit" asChild>
                      <Link to="/case-studies">View Our Works</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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

          <div className="relative testimonial-columns z-1 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            {/* Column 1 - Moving Up */}
            <div className="testimonial-column animate-scroll-up">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={`col1-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <LazyImage
                          src={`/hero-images/c${(index % 5) + 1}.png`}
                          alt={testimonial.name}
                          className="w-8 h-8 rounded-full object-cover mr-4"
                          width={32}
                          height={32}
                        />
                        <div>
                          <div className="font-semibold text-sm text-left">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs text-left">{testimonial.company}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic font-normal text-sm text-left">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Column 2 - Moving Down */}
            <div className="testimonial-column animate-scroll-down">
              {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                <Card key={`col2-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <LazyImage
                          src={`/hero-images/c${((index + 2) % 5) + 1}.png`}
                          alt={testimonial.name}
                          className="w-8 h-8 rounded-full object-cover mr-4"
                          width={32}
                          height={32}
                        />
                        <div>
                          <div className="font-semibold text-sm text-left">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs text-left">{testimonial.company}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic font-normal text-sm text-left">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Column 3 - Moving Up */}
            <div className="testimonial-column animate-scroll-up">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={`col3-${index}`} className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 hover:border-neon-green/30 hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 backdrop-blur-sm flex-shrink-0">
                  <CardContent className="p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <LazyImage
                          src={`/hero-images/c${((index + 4) % 5) + 1}.png`}
                          alt={testimonial.name}
                          className="w-8 h-8 rounded-full object-cover mr-4"
                          width={32}
                          height={32}
                        />
                        <div>
                          <div className="font-semibold text-sm text-left">{testimonial.name}</div>
                          <div className="text-neon-green font-medium text-xs text-left">{testimonial.company}</div>
                        </div>
                      </div>

                      <p className="text-gray-300 italic font-normal text-sm text-left">"{testimonial.text}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mx-auto">
        <div className="max-w-7xl mx-auto text-center space-y-10 py-20 px-6 bg-[#e5ff00] max-w-7xl mx-auto rounded-[10px]">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-relaxed">
            Ready to <span className="bg-[#1a1a1a] text-[#f5f5f5] text-[#1a1a1a] font-bold px-4 py-1 rounded-md">Transform ✦</span> Your Business?
          </h2>
          <p className="text-lg text-[#111111]/80 font-normal">
            Join hundreds of successful businesses that chose Snugx for their digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-[#111111] text-[#f5f5f5] border-2 border-[#111111]/50 hover:bg-[#f5f5f5]/90 hover:text-[#111111] transition-colors duration-300 px-10 py-4 rounded-full" asChild>
              <Link to="/contact">Start Your Project Today</Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-[#111111]/50 text-[#111111] hover:bg-[#f5f5f5]/90 hover:text-[#111111] transition-colors duration-300 px-10 py-4 rounded-full" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;