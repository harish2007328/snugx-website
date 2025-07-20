import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  created_at: string;
  published: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [loading, setLoading] = useState(true);

  // Dummy data for demo
  const dummyPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Web Design: Trends to Watch in 2024',
      excerpt: 'Explore the latest web design trends that are shaping the digital landscape in 2024, from AI-powered interfaces to sustainable design practices.',
      content: 'Full blog content here...',
      author: 'Alex Johnson',
      tags: ['Web Design', 'Trends', 'UX/UI'],
      featured_image: 'https://images.unsplash.com/photo-1558655146-364adaf25998?w=800&h=400&fit=crop',
      created_at: '2024-01-20',
      published: true
    },
    {
      id: '2',
      title: 'Optimizing Website Performance: A Complete Guide',
      excerpt: 'Learn how to boost your website\'s performance with proven optimization techniques that improve user experience and search rankings.',
      content: 'Full blog content here...',
      author: 'Sarah Chen',
      tags: ['Performance', 'SEO', 'Development'],
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      created_at: '2024-01-18',
      published: true
    },
    {
      id: '3',
      title: 'Building Accessible Websites: Best Practices',
      excerpt: 'Discover essential accessibility principles and practical tips to make your websites inclusive for all users.',
      content: 'Full blog content here...',
      author: 'Marcus Rodriguez',
      tags: ['Accessibility', 'Best Practices', 'Inclusive Design'],
      featured_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
      created_at: '2024-01-15',
      published: true
    },
    {
      id: '4',
      title: 'The Psychology of Color in Web Design',
      excerpt: 'Understanding how colors influence user behavior and emotions can significantly impact your website\'s effectiveness.',
      content: 'Full blog content here...',
      author: 'Alex Johnson',
      tags: ['Color Theory', 'Psychology', 'Design'],
      featured_image: 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800&h=400&fit=crop',
      created_at: '2024-01-12',
      published: true
    },
    {
      id: '5',
      title: 'Mobile-First Design Strategy',
      excerpt: 'Why starting your design process with mobile in mind leads to better user experiences across all devices.',
      content: 'Full blog content here...',
      author: 'Sarah Chen',
      tags: ['Mobile Design', 'Responsive', 'Strategy'],
      featured_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
      created_at: '2024-01-10',
      published: true
    },
    {
      id: '6',
      title: 'Converting Visitors to Customers: CRO Essentials',
      excerpt: 'Master the art of conversion rate optimization with proven strategies that turn website visitors into paying customers.',
      content: 'Full blog content here...',
      author: 'Marcus Rodriguez',
      tags: ['CRO', 'Conversion', 'Marketing'],
      featured_image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop',
      created_at: '2024-01-08',
      published: true
    }
  ];

  const allTags = ['All', 'Web Design', 'Development', 'UX/UI', 'SEO', 'Performance', 'Accessibility', 'Trends'];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag !== 'All') {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedTag]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data && data.length > 0 ? data : dummyPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts(dummyPosts);
    } finally {
      setLoading(false);
    }
  };

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
            Design <span className="text-neon-green">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Stay updated with the latest trends, tips, and insights from the world of web design and development.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-light-text placeholder:text-gray-500 w-80"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full ${
                    selectedTag === tag 
                      ? 'bg-neon-green text-dark-bg hover:bg-neon-green/80' 
                      : 'border-white/20 text-light-text hover:bg-white/10 glass'
                  }`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Article</h2>
            
            <Card className="glass overflow-hidden hover:glass-strong transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto">
                  <img 
                    src={filteredPosts[0].featured_image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{formatDate(filteredPosts[0].created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 hover:text-neon-green transition-colors">
                    {filteredPosts[0].title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredPosts[0].tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-neon-green/30 text-neon-green">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold rounded-full w-fit"
                    asChild
                  >
                    <Link to={`/blog/${filteredPosts[0].id}`}>
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Latest Articles</h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Card key={post.id} className="glass hover:glass-strong transition-all group overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 group-hover:text-neon-green transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-neon-green/30 text-neon-green hover:bg-neon-green/10 group"
                      asChild
                    >
                      <Link to={`/blog/${post.id}`}>
                        Read Article
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

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-neon-green/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay in the <span className="text-neon-green">Loop</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest design insights and industry trends delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border-white/10 text-light-text placeholder:text-gray-500"
            />
            <Button className="btn-primary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;