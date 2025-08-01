import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  live_url: string;
  tags: string[];
  client: string;
  duration: string;
}

const Index = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      setCaseStudies([]);
    }
  };

  const faqs = [
    {
      question: "What types of projects do you specialize in?",
      answer:
        "We specialize in a wide range of digital solutions, including web development, mobile app development, e-commerce platforms, and custom software solutions. Our expertise spans across various industries, ensuring tailored solutions for each client.",
    },
    {
      question: "How does your pricing structure work?",
      answer:
        "Our pricing is customized based on the scope and complexity of each project. We offer flexible pricing models, including fixed-price, hourly rates, and value-based pricing. We ensure transparency and work closely with our clients to align our pricing with their budget and objectives.",
    },
    {
      question: "What is your approach to project management?",
      answer:
        "We follow an agile project management approach, emphasizing collaboration, flexibility, and continuous improvement. Our dedicated project managers ensure clear communication, manage timelines effectively, and adapt to evolving requirements to deliver successful outcomes.",
    },
    {
      question: "How do you ensure the quality of your work?",
      answer:
        "Quality is at the core of our processes. We employ rigorous testing methodologies, conduct thorough code reviews, and adhere to industry best practices. Our commitment to quality ensures that our solutions are reliable, scalable, and meet the highest standards.",
    },
    {
      question: "What kind of support do you offer after project completion?",
      answer:
        "We provide comprehensive post-launch support, including maintenance, updates, and technical assistance. Our support packages are designed to ensure the long-term success of our solutions, with options for ongoing enhancements and dedicated support teams.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-light-text">
      {/* Hero Section */}
      <section className="py-40 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-blue-500/5 to-purple-500/10 z-0"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            Crafting Digital Experiences
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            We transform ideas into innovative digital solutions. Elevate your
            business with our expert web development, cutting-edge design, and
            strategic digital marketing services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-neon-green text-dark-bg hover:bg-neon-green/90 px-8 py-4 text-lg font-semibold shadow-lg shadow-neon-green/25"
              asChild
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green px-8 py-4 text-lg"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies Section - Updated Design */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-300 tracking-wide">
                OUR PORTFOLIO
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
              Success Stories
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover how we transform ambitious ideas into digital
              masterpieces that drive growth and captivate audiences worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {caseStudies.slice(0, 3).map((study, index) => (
              <div key={study.id} className="group relative">
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-neon-green/30 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-green/10">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={
                        study.thumbnail ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                      }
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-neon-green/90 text-dark-bg backdrop-blur-sm border-0 font-bold text-xs tracking-wide">
                      {study.category}
                    </Badge>

                    {/* Project Number */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Project Meta */}
                    <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-4">
                        {study.client && (
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {study.client}
                          </span>
                        )}
                        {study.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {study.duration}
                          </span>
                        )}
                      </div>
                      {study.live_url && (
                        <a
                          href={study.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-green transition-colors duration-300 line-clamp-2">
                      {study.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs border-white/20 text-gray-400 bg-white/5 hover:border-neon-green/50 hover:text-neon-green transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {study.tags && study.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-white/20 text-gray-400 bg-white/5"
                        >
                          +{study.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* View Project Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 group/btn transition-all duration-300 font-medium"
                      asChild
                    >
                      <Link to={`/case-studies/${study.id}`}>
                        <span className="mr-2">Explore Project</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>

                  {/* Hover Effect Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/0 via-neon-green/0 to-neon-green/0 group-hover:from-neon-green/5 group-hover:via-transparent group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none"></div>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-neon-green/10 to-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-neon-green/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-green to-neon-green/90 text-dark-bg hover:from-neon-green/90 hover:to-neon-green px-8 py-4 text-lg font-bold shadow-lg shadow-neon-green/25 hover:shadow-neon-green/40 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to="/case-studies" className="flex items-center gap-2">
                <span>View Full Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-300 mb-16 leading-relaxed">
            Empowering businesses with cutting-edge digital solutions. From
            bespoke web development to strategic digital marketing, we drive
            growth and create lasting impact.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl font-semibold text-neon-green mb-4">
                  Web Development
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Crafting responsive, scalable, and user-friendly websites
                  tailored to your unique business needs.
                </p>
              </CardContent>
            </Card>

            {/* UI/UX Design */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl font-semibold text-neon-green mb-4">
                  UI/UX Design
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Creating intuitive and visually stunning interfaces that
                  enhance user engagement and drive conversions.
                </p>
              </CardContent>
            </Card>

            {/* Digital Marketing */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl font-semibold text-neon-green mb-4">
                  Digital Marketing
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Implementing data-driven strategies to boost your online
                  presence, attract targeted traffic, and maximize ROI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-neon-green/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="py-4 font-medium text-gray-300 hover:text-neon-green data-[state=open]:text-neon-green transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <p className="text-gray-300 italic mb-4 leading-relaxed">
                  "Working with this team was a game-changer for our business.
                  Their innovative solutions and dedication to excellence
                  exceeded our expectations."
                </p>
                <div className="text-sm text-gray-400">— John Smith, CEO</div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6">
                <p className="text-gray-300 italic mb-4 leading-relaxed">
                  "The level of expertise and creativity this team brought to
                  our project was outstanding. They truly understood our vision
                  and delivered exceptional results."
                </p>
                <div className="text-sm text-gray-400">— Emily Johnson, Marketing Director</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Let's collaborate to transform your ideas into impactful digital
            solutions. Contact us today to discuss your project and explore the
            possibilities.
          </p>
          <Button
            size="lg"
            className="bg-neon-green text-dark-bg hover:bg-neon-green/90 px-8 py-4 text-lg font-semibold shadow-lg shadow-neon-green/25"
            asChild
          >
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
