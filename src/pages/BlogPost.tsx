
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

const BlogPost = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;
      setBlogPost(data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setBlogPost(null);
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

  const generateBlogPostSchema = (post: BlogPost) => {
    // Extract plain text from HTML content for description
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || textContent.substring(0, 160),
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.created_at,
      "dateModified": post.created_at,
      "url": `${window.location.origin}/blog/${post.id}`,
      "keywords": post.tags?.join(', '),
      "image": {
        "@type": "ImageObject",
        "url": post.featured_image || `${window.location.origin}/placeholder.svg`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Your Company Name"
      },
      "articleBody": textContent,
      "wordCount": textContent.split(' ').length,
      "articleSection": post.tags?.[0] || "General"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or hasn't been published yet.</p>
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
    <>
      <Helmet>
        <title>{blogPost.title}</title>
        <meta name="description" content={blogPost.excerpt || blogPost.content.substring(0, 160)} />
        <meta name="keywords" content={blogPost.tags?.join(', ')} />
        <meta name="author" content={blogPost.author} />
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt || blogPost.content.substring(0, 160)} />
        <meta property="og:image" content={blogPost.featured_image} />
        <meta property="og:url" content={`${window.location.origin}/blog/${blogPost.id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt || blogPost.content.substring(0, 160)} />
        <meta name="twitter:image" content={blogPost.featured_image} />
        <script type="application/ld+json">
          {JSON.stringify(generateBlogPostSchema(blogPost))}
        </script>
      </Helmet>

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

        {/* Hero Section */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {blogPost.title}
              </h1>
              
              {blogPost.excerpt && (
                <p className="text-xl text-gray-300 mb-8">
                  {blogPost.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>By {blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{formatDate(blogPost.created_at)}</span>
                </div>
              </div>
              
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {blogPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-white/20 text-gray-400">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            {blogPost.featured_image && (
              <div className="relative mb-12">
                <LazyImage
                  src={blogPost.featured_image}
                  alt={blogPost.title}
                  className="rounded-lg shadow-2xl w-full max-h-96 object-cover"
                  width={800}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent rounded-lg" />
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                className="text-gray-300 text-left [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-neon-green [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:text-left [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-neon-green [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:text-left [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-neon-green [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-left [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-left [&>ul]:mb-4 [&>ul]:text-left [&>ol]:mb-4 [&>ol]:text-left [&>li]:mb-2 [&>li]:text-left [&>blockquote]:border-l-4 [&>blockquote]:border-neon-green [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:text-left [&>code]:bg-white/10 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-neon-green [&>pre]:bg-white/10 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto"
              />
            </div>
          </div>
        </section>

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
    </>
  );
};

export default BlogPost;
