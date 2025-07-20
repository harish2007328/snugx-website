
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  read_time?: number;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for demo
  const dummyPosts: Record<string, BlogPost> = {
    '1': {
      id: '1',
      title: 'The Future of Web Design: Trends to Watch in 2024',
      excerpt: 'Explore the latest web design trends that are shaping the digital landscape in 2024, from AI-powered interfaces to sustainable design practices.',
      content: `
        <p>The world of web design is constantly evolving, and 2024 promises to bring some exciting changes to how we create and interact with digital experiences. As technology advances and user expectations grow, designers must stay ahead of the curve to create websites that are not only visually stunning but also highly functional and accessible.</p>

        <h2>1. AI-Powered Design Interfaces</h2>
        <p>Artificial Intelligence is revolutionizing the design process. From automated layout suggestions to intelligent color palette generation, AI tools are becoming indispensable for modern web designers. These tools don't replace human creativity but enhance it, allowing designers to focus on strategic thinking while AI handles repetitive tasks.</p>

        <h2>2. Sustainable Web Design</h2>
        <p>Environmental consciousness is driving a new movement in web design. Sustainable design practices focus on reducing digital carbon footprints through optimized code, efficient hosting, and mindful resource usage. This trend isn't just good for the planet—it also improves website performance and user experience.</p>

        <h2>3. Advanced Micro-Interactions</h2>
        <p>Micro-interactions are becoming more sophisticated, providing users with immediate feedback and creating delightful moments throughout their journey. These small animations and transitions help guide users, provide status updates, and make interfaces feel more intuitive and responsive.</p>

        <h2>4. Voice User Interface Integration</h2>
        <p>With the rise of smart speakers and voice assistants, websites are beginning to incorporate voice user interfaces. This trend makes web experiences more accessible and opens up new possibilities for user interaction, especially for users with disabilities or those in hands-free situations.</p>

        <h2>5. Dark Mode as Standard</h2>
        <p>Dark mode is no longer just a nice-to-have feature—it's becoming expected by users. Beyond aesthetic preferences, dark mode reduces eye strain, saves battery life on OLED screens, and can create more dramatic and engaging visual experiences.</p>

        <h2>Conclusion</h2>
        <p>These trends represent more than just visual changes—they reflect a fundamental shift toward more inclusive, sustainable, and intelligent web experiences. As we move through 2024, successful web designers will be those who can thoughtfully integrate these trends while maintaining focus on user needs and business objectives.</p>
      `,
      author: 'Alex Johnson',
      tags: ['Web Design', 'Trends', 'UX/UI', 'AI', 'Sustainability'],
      featured_image: 'https://images.unsplash.com/photo-1558655146-364adaf25998?w=1200&h=600&fit=crop',
      created_at: '2024-01-20',
      published: true,
      read_time: 8
    },
    '2': {
      id: '2',
      title: 'Optimizing Website Performance: A Complete Guide',
      excerpt: 'Learn how to boost your website\'s performance with proven optimization techniques that improve user experience and search rankings.',
      content: `
        <p>Website performance is crucial for user experience, search engine rankings, and business success. A slow website can drive away potential customers and hurt your bottom line. This comprehensive guide will walk you through proven strategies to optimize your website's performance.</p>

        <h2>Understanding Performance Metrics</h2>
        <p>Before optimizing, you need to understand what to measure. Key metrics include First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT). These Core Web Vitals are essential for both user experience and SEO.</p>

        <h2>Image Optimization</h2>
        <p>Images often account for the majority of a webpage's size. Use modern formats like WebP and AVIF, implement responsive images with srcset, and consider lazy loading for images below the fold. Proper image optimization can reduce page size by 60-80%.</p>

        <h2>Code Splitting and Bundling</h2>
        <p>Don't load unnecessary code. Implement code splitting to load only what's needed for each page, use tree shaking to eliminate dead code, and consider bundling strategies that balance between HTTP requests and cache efficiency.</p>

        <h2>Caching Strategies</h2>
        <p>Implement multiple layers of caching: browser caching for static assets, CDN caching for global distribution, and server-side caching for dynamic content. A well-configured caching strategy can reduce load times by orders of magnitude.</p>

        <h2>Database Optimization</h2>
        <p>Optimize your database queries, use proper indexing, and consider database replication for high-traffic sites. Database performance often becomes the bottleneck as your site grows.</p>
      `,
      author: 'Sarah Chen',
      tags: ['Performance', 'SEO', 'Development', 'Optimization'],
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      created_at: '2024-01-18',
      published: true,
      read_time: 12
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;

      setPost(data || dummyPosts[id] || null);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setPost(dummyPosts[id || '1'] || null);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog">
            <Button className="bg-neon-green text-dark-bg">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/blog">
          <Button variant="outline" className="border-white/20 text-light-text hover:bg-white/10 glass">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <img 
            src={post.featured_image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg mb-8"
          />
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.read_time} min read</span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-white/20 text-light-text hover:bg-white/10 glass"
            >
              <Share2 size={14} />
              Share
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-neon-green/30 text-neon-green">
                <Tag size={12} className="mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-300 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-neon-green [&>h2]:mb-4 [&>h2]:mt-8 [&>p]:mb-6 [&>p]:leading-relaxed [&>ul]:mb-6 [&>li]:mb-2"
          />
        </div>

        {/* Author Bio */}
        <Card className="glass mb-16">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center">
                <User size={24} className="text-dark-bg" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-gray-400">
                  Senior {post.author === 'Alex Johnson' ? 'Creative Director' : 
                         post.author === 'Sarah Chen' ? 'Developer' : 'UX Designer'} at Snugx. 
                  Passionate about creating exceptional digital experiences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="glass text-center mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your <span className="text-neon-green">Digital Presence?</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can help bring your vision to life with cutting-edge design and development.
            </p>
            <Button 
              size="lg" 
              className="bg-neon-green text-dark-bg hover:bg-neon-green/80 font-semibold px-8 py-4 rounded-full neon-glow"
              asChild
            >
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </CardContent>
        </Card>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
