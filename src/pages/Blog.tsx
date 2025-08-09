
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import LazyImage from '@/components/LazyImage';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  featured_image: string;
  published: boolean;
  created_at: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getTopTags = () => {
    const tagCounts = new Map<string, number>();
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([tag]) => tag);
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTag && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const generateBlogSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Our Blog",
      "description": "Stay updated with the latest insights, tutorials, and industry trends in web development and design.",
      "url": `${window.location.origin}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "Your Company Name"
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "datePublished": post.created_at,
        "url": `${window.location.origin}/blog/${post.id}`,
        "keywords": post.tags?.join(', '),
        "image": post.featured_image
      }))
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Our Blog - Latest Insights and Tutorials</title>
        <meta name="description" content="Stay updated with the latest insights, tutorials, and industry trends in web development and design." />
        <meta name="keywords" content={getTopTags().join(', ')} />
        <script type="application/ld+json">
          {JSON.stringify(generateBlogSchema())}
        </script>
      </Helmet>

      <div className="min-h-screen pt-24">
        {/* Header */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-neon-green">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Stay updated with the latest insights, tutorials, and industry trends in web development and design.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-neon-green"
              />
            </div>
            
            {/* Top Tags Filter */}
            {getTopTags().length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-12">
                <Button
                  variant={selectedTag === 'All' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag('All')}
                  className={`rounded-full ${
                    selectedTag === 'All' 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  All
                </Button>
                {getTopTags().map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full ${
                      selectedTag === tag 
                        ? 'btn-primary' 
                        : 'btn-secondary'
                    }`}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Tag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No Blog Posts Found</h3>
                  <p className="text-xl text-gray-400 mb-6">
                    {searchQuery 
                      ? `No blog posts found matching "${searchQuery}"` 
                      : selectedTag === 'All' 
                        ? 'No blog posts have been published yet.' 
                        : `No blog posts found for the "${selectedTag}" tag.`
                    }
                  </p>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try a different search term.' : 'Visit the admin panel to create your first blog post.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="glass hover:glass-strong transition-all duration-300 group overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <LazyImage
                        src={post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={600}
                        height={400}
                      />
                    </div>
                    
                    <CardContent className="p-6 text-left">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.created_at)}
                        </div>
                        <span className="text-sm text-gray-400">By {truncateText(post.author, 15)}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-neon-green transition-colors text-left">
                        {truncateText(post.title, 60)}
                      </h3>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2 text-left">
                        {truncateText(post.excerpt || '', 100)}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                            {truncateText(tag, 12)}
                          </Badge>
                        ))}
                        {post.tags && post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full btn-secondary group"
                        asChild
                      >
                        <Link to={`/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
    </>
  );
};

export default Blog;
