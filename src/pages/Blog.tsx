
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';

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

  const getAllTags = () => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags?.includes(selectedTag));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          
          {/* Tag Filter */}
          {getAllTags().length > 0 && (
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
              {getAllTags().map((tag) => (
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
                <h3 className="text-2xl font-bold mb-2">No Blog Posts Yet</h3>
                <p className="text-xl text-gray-400 mb-6">
                  {selectedTag === 'All' 
                    ? 'No blog posts have been published yet.' 
                    : `No blog posts found for the "${selectedTag}" tag.`
                  }
                </p>
                <p className="text-gray-500">
                  Visit the admin panel to create your first blog post.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="glass hover:glass-strong transition-all duration-300 group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.created_at)}
                      </div>
                      <span className="text-sm text-gray-400">By {post.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-neon-green transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags && post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                          +{post.tags.length - 3}
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
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your <span className="text-neon-green">Project?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can bring your vision to life with cutting-edge web solutions.
          </p>
          
          <Button 
            size="lg" 
            className="btn-primary px-8 py-4"
            asChild
          >
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
