
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  content: string;
  client: string;
  duration: string;
  results: string[];
  full_page_image: string;
  created_at: string;
}

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCaseStudy();
    }
  }, [id]);

  const fetchCaseStudy = async () => {
    if (!id) {
      console.log('No ID provided');
      setError('No case study ID provided');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching case study with ID:', id);
      
      const { data, error: supabaseError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

      console.log('Supabase response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        if (supabaseError.code === 'PGRST116') {
          setError('Case study not found');
        } else {
          setError('Failed to fetch case study');
        }
      } else if (data) {
        console.log('Case study found:', data);
        setCaseStudy(data);
        setError(null);
      } else {
        console.log('No data returned');
        setError('Case study not found');
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      setError('Failed to fetch case study');
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    console.log('No ID in URL params, redirecting to case studies');
    return <Navigate to="/case-studies" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    console.log('Error state or no case study:', { error, caseStudy });
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The case study you\'re looking for doesn\'t exist.'}</p>
          <Link to="/case-studies">
            <Button className="bg-neon-green text-dark-bg">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/case-studies">
          <Button variant="outline" className="border-white/20 text-light-text hover:bg-white/10 glass">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Case Studies
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-neon-green/20 text-neon-green mb-4">
              {caseStudy.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              {caseStudy.description}
            </p>
            
            {caseStudy.live_url && (
              <Button 
                className="btn-primary mb-12"
                asChild
              >
                <a href={caseStudy.live_url} target="_blank" rel="noopener noreferrer">
                  View Live Site
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Main Project Image */}
          <div className="relative mb-16">
            <img 
              src={caseStudy.full_page_image || caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop'}
              alt={caseStudy.title}
              className="rounded-lg shadow-2xl w-full max-h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Left Column - Project Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-left">Project Overview</h2>
                
                <div className="space-y-6">
                  {caseStudy.duration && (
                    <div className="flex items-start gap-4">
                      <Calendar className="w-6 h-6 text-neon-green mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Duration</h3>
                        <p className="text-gray-400">{caseStudy.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {caseStudy.client && (
                    <div className="flex items-start gap-4">
                      <Tag className="w-6 h-6 text-neon-green mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">Client</h3>
                        <p className="text-gray-400">{caseStudy.client}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-6 h-6 text-neon-green mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Category</h3>
                      <p className="text-gray-400">{caseStudy.category}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-white/20 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              <img 
                src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'}
                alt={`${caseStudy.title} preview`}
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      {caseStudy.content && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                className="text-gray-300 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-neon-green [&>h2]:mb-4 [&>h2]:mt-8 [&>p]:mb-4 [&>ul]:mb-4 [&>li]:mb-2"
              />
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-r from-neon-green/10 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-neon-green">Results</span> Achieved
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-neon-green mb-2">
                      {result.split(' ')[0]}
                    </div>
                    <p className="text-gray-300">
                      {result.split(' ').slice(1).join(' ')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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

export default CaseStudyDetail;
