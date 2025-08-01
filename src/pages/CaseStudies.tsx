
import { useState, useEffect } from 'react';
import { ExternalLink, Filter, ArrowRight, Clock, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  original_image?: string;
  category: string;
  live_url: string;
  tags: string[];
  client: string;
  duration: string;
  created_at: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'E-commerce', 'SaaS', 'Corporate', 'Portfolio', 'Startup'];

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredStudies(caseStudies);
    } else {
      setFilteredStudies(caseStudies.filter(study => study.category === selectedCategory));
    }
  }, [caseStudies, selectedCategory]);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setCaseStudies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-3 border-neon-green border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-400">Crafting your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-blue-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Our Success Stories</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-white to-neon-green bg-clip-text text-transparent">
            Portfolio
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover how we transform ideas into digital masterpieces that drive growth and captivate audiences
          </p>
          
          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-neon-green text-dark-bg shadow-lg shadow-neon-green/25 scale-105' 
                    : 'border-white/20 text-gray-300 hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredStudies.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <ExternalLink className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-300">No Projects Yet</h3>
              <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                {selectedCategory === 'All' 
                  ? 'Our portfolio is coming soon. Great things are in development.' 
                  : `No projects found in the "${selectedCategory}" category.`
                }
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredStudies.map((study) => (
                <Card key={study.id} className="group relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-neon-green/20">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={study.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 left-4 bg-neon-green/90 text-dark-bg backdrop-blur-sm border-0 font-semibold">
                      {study.category}
                    </Badge>
                    
                    {/* Live URL Icon */}
                    {study.live_url && (
                      <a 
                        href={study.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-neon-green hover:text-dark-bg transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Project Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      {study.client && (
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{study.client}</span>
                        </div>
                      )}
                      {study.duration && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{study.duration}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Title */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-neon-green transition-colors duration-300">
                      {study.title}
                    </h3>
                    
                    {/* Project Description */}
                    <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {study.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400 bg-white/5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* View Details Button */}
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 group/btn transition-all duration-300"
                      asChild
                    >
                      <Link to={`/case-studies/${study.id}`}>
                        <span className="mr-2">Explore Project</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-blue-500/5 to-purple-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
            Your Story Awaits
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Ready to join our portfolio of success stories? Let's create something extraordinary together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      <Footer />
    </div>
  );
};

export default CaseStudies;
