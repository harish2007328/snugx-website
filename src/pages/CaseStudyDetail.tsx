
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, User, Clock, Target, Award } from 'lucide-react';
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
  original_image?: string;
  category: string;
  live_url: string;
  tags: string[];
  content: string;
  client: string;
  duration: string;
  results: string[];
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
          <div className="animate-spin w-12 h-12 border-3 border-neon-green border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    console.log('Error state or no case study:', { error, caseStudy });
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <ExternalLink className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-lg text-gray-400 mb-8">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <Link to="/case-studies">
            <Button className="bg-neon-green text-dark-bg hover:bg-neon-green/90 px-6 py-3">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/case-studies">
            <Button variant="outline" className="border-white/20 text-light-text hover:bg-white/10 hover:border-neon-green hover:text-neon-green transition-all duration-300">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 px-4 py-2 text-sm font-semibold">
                  {caseStudy.category}
                </Badge>
                
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
                  {caseStudy.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>
              
              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 text-gray-400">
                {caseStudy.client && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-neon-green" />
                    <span className="font-medium">{caseStudy.client}</span>
                  </div>
                )}
                {caseStudy.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neon-green" />
                    <span className="font-medium">{caseStudy.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-neon-green" />
                  <span className="font-medium">{new Date(caseStudy.created_at).getFullYear()}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {caseStudy.live_url && (
                  <Button 
                    size="lg"
                    className="bg-neon-green text-dark-bg hover:bg-neon-green/90 px-8 py-4 text-lg font-semibold shadow-lg shadow-neon-green/25"
                    asChild
                  >
                    <a href={caseStudy.live_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 w-5 h-5" />
                      View Live Project
                    </a>
                  </Button>
                )}
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 px-8 py-4 text-lg"
                  asChild
                >
                  <Link to="/contact">
                    <Target className="mr-2 w-5 h-5" />
                    Start Similar Project
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Project Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img 
                  src={caseStudy.original_image || caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop'}
                  alt={caseStudy.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-neon-green/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-neon-green/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      {caseStudy.tags && caseStudy.tags.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-300 mb-4">Technologies Used</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent mx-auto"></div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {caseStudy.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-white/20 text-gray-300 bg-white/5 backdrop-blur-sm hover:border-neon-green hover:text-neon-green transition-all duration-300 px-4 py-2 text-sm"
                >
                  <Tag className="w-3 h-3 mr-2" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      {caseStudy.content && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-xl max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                className="text-gray-300 leading-relaxed [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-neon-green [&>h2]:mb-6 [&>h2]:mt-12 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mb-4 [&>h3]:mt-8 [&>p]:mb-6 [&>p]:text-lg [&>ul]:mb-6 [&>li]:mb-3 [&>li]:text-lg [&>blockquote]:border-l-4 [&>blockquote]:border-neon-green [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-400"
              />
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {caseStudy.results && caseStudy.results.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 via-transparent to-blue-500/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6">
                <Award className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-medium text-gray-300">Project Impact</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Results <span className="text-neon-green">Delivered</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-green/20 to-blue-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-neon-green">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {result}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent">
            Ready for Similar Results?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Let's discuss how we can transform your vision into a digital masterpiece that delivers exceptional results.
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
              <Link to="/case-studies">View More Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
