
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  created_at: string;
}

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for demo
  const dummyData: Record<string, CaseStudy> = {
    '1': {
      id: '1',
      title: 'E-commerce Platform Redesign',
      description: 'Complete redesign of an e-commerce platform that increased conversions by 300% and improved user engagement significantly.',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      category: 'E-commerce',
      live_url: 'https://example.com',
      tags: ['Web Design', 'UX/UI', 'Conversion Optimization', 'React', 'Shopify'],
      content: `
        <h2>The Challenge</h2>
        <p>Our client, a growing e-commerce business, was struggling with a 2% conversion rate and high bounce rates. Their existing website was outdated, slow, and not mobile-optimized.</p>
        
        <h2>Our Approach</h2>
        <p>We conducted extensive user research and competitor analysis to understand the pain points. Our strategy focused on:</p>
        <ul>
          <li>Streamlining the checkout process</li>
          <li>Improving product discovery</li>
          <li>Optimizing for mobile devices</li>
          <li>Enhancing site performance</li>
        </ul>
        
        <h2>The Solution</h2>
        <p>We delivered a completely redesigned e-commerce platform with modern UI/UX, fast loading times, and intuitive navigation. The new design featured a clean, minimal aesthetic with strategic use of colors and typography to guide users toward conversion.</p>
        
        <h2>Technologies Used</h2>
        <p>React, Next.js, Tailwind CSS, Shopify Plus, Google Analytics 4, Hotjar for user behavior analysis.</p>
      `,
      client: 'TechStore Inc.',
      duration: '12 weeks',
      results: [
        '300% increase in conversion rate',
        '65% reduction in bounce rate',
        '150% increase in average order value',
        '90% improvement in page load speed',
        '40% increase in mobile conversions'
      ],
      created_at: '2024-01-15'
    },
    '2': {
      id: '2',
      title: 'SaaS Dashboard Interface',
      description: 'Modern dashboard design for a SaaS platform with improved user experience and 250% increase in user engagement.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      category: 'SaaS',
      live_url: 'https://example.com',
      tags: ['Dashboard Design', 'UX/UI', 'Data Visualization', 'React', 'TypeScript'],
      content: `
        <h2>The Challenge</h2>
        <p>A SaaS company needed to redesign their complex dashboard to improve user engagement and reduce customer churn. The existing interface was cluttered and difficult to navigate.</p>
        
        <h2>Our Approach</h2>
        <p>We redesigned the entire user experience focusing on data hierarchy, intuitive navigation, and actionable insights.</p>
        
        <h2>The Solution</h2>
        <p>A clean, modern dashboard with improved data visualization, better information architecture, and enhanced user workflows.</p>
      `,
      client: 'DataFlow Pro',
      duration: '10 weeks',
      results: [
        '250% increase in user engagement',
        '40% reduction in support tickets',
        '30% decrease in customer churn',
        '80% faster task completion'
      ],
      created_at: '2024-01-10'
    }
  };

  useEffect(() => {
    fetchCaseStudy();
  }, [id]);

  const fetchCaseStudy = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setCaseStudy(data || dummyData[id] || null);
    } catch (error) {
      console.error('Error fetching case study:', error);
      // Use dummy data as fallback
      setCaseStudy(dummyData[id || '1'] || null);
    } finally {
      setLoading(false);
    }
  };

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

  if (!caseStudy) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
                  className="btn-primary"
                  asChild
                >
                  <a href={caseStudy.live_url} target="_blank" rel="noopener noreferrer">
                    View Live Site
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
            
            <div className="relative">
              <img 
                src={caseStudy.thumbnail}
                alt={caseStudy.title}
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass text-center">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Duration</h3>
                <p className="text-gray-400">{caseStudy.duration}</p>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <Tag className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Client</h3>
                <p className="text-gray-400">{caseStudy.client}</p>
              </CardContent>
            </Card>
            
            <Card className="glass text-center">
              <CardContent className="p-6">
                <ExternalLink className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-gray-400">{caseStudy.category}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {caseStudy.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-white/20 text-gray-400">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Similar <span className="text-neon-green">Results?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can transform your business with a custom digital solution.
          </p>
          
          <Button 
            size="lg" 
           className="btn-primary px-8 py-4"
            asChild
          >
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
