
import { useState, useEffect } from 'react';
import { ExternalLink, Filter, ArrowRight } from 'lucide-react';
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
  category: string;
  live_url: string;
  tags: string[];
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
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading case studies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-neon-green">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Explore how we've helped businesses transform their digital presence and achieve remarkable growth.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredStudies.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <ExternalLink className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
                <p className="text-xl text-gray-400 mb-6">
                  {selectedCategory === 'All' 
                    ? 'No case studies have been created yet.' 
                    : `No case studies found for the "${selectedCategory}" category.`
                  }
                </p>
                <p className="text-gray-500">
                  Visit the admin panel to add your first project showcase.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study) => (
                <Card key={study.id} className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:shadow-neon-green/20 transition-all duration-500 ease-in-out aspect-[1/1.3] bg-dark-bg">
                  <img 
                    src={study.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-transparent" />
                  <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 text-left">{study.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm text-left">
                      {study.description && (study.description.length > 70 
                          ? `${study.description.substring(0, 70)}...` 
                          : study.description)}
                    </p>
                    <p className="text-neon-green text-xs font-semibold uppercase tracking-wider text-left">
                      {study.category}
                    </p>
                    <Button 
                      variant="outline" 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full border-neon-green bg-neon-green text-dark-bg transition-all duration-300 p-0 flex items-center justify-center" 
                      size="icon" 
                      asChild
                    >
                      <Link to={`/case-studies/${study.id}`}>
                        <ArrowRight className="w-5 h-5 rotate-[-45deg]" />
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
    </div>
  );
};

export default CaseStudies;
