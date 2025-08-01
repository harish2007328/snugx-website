import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Mail, Calendar, User, ExternalLink, Eye, Image } from 'lucide-react';

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    original_image: '',
    category: '',
    live_url: '',
    tags: '',
    content: '',
    client: '',
    duration: '',
    results: ''
  });

  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: '',
    featured_image: '',
    published: false
  });

  useEffect(() => {
    fetchCaseStudies();
    fetchBlogPosts();
    fetchContactSubmissions();
  }, []);

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
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setContactSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      setContactSubmissions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const caseStudyData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      results: formData.results.split('\n').map(result => result.trim()).filter(result => result)
    };

    if (editingCaseStudy) {
      const { error } = await supabase
        .from('case_studies')
        .update(caseStudyData)
        .eq('id', editingCaseStudy.id);
      
      if (!error) {
        fetchCaseStudies();
        resetForm();
        setIsDialogOpen(false);
      }
    } else {
      const { error } = await supabase
        .from('case_studies')
        .insert([caseStudyData]);
      
      if (!error) {
        fetchCaseStudies();
        resetForm();
        setIsDialogOpen(false);
      }
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogPostData = {
      ...blogFormData,
      tags: blogFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (editingBlogPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update(blogPostData)
        .eq('id', editingBlogPost.id);

      if (!error) {
        fetchBlogPosts();
        resetBlogForm();
        setIsBlogDialogOpen(false);
      }
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert([blogPostData]);

      if (!error) {
        fetchBlogPosts();
        resetBlogForm();
        setIsBlogDialogOpen(false);
      }
    }
  };

  const deleteCaseStudy = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this case study?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchCaseStudies();
      }
    }
  };

  const deleteBlogPost = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
    if (confirmDelete) {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchBlogPosts();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail: '',
      original_image: '',
      category: '',
      live_url: '',
      tags: '',
      content: '',
      client: '',
      duration: '',
      results: ''
    });
    setEditingCaseStudy(null);
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      tags: '',
      featured_image: '',
      published: false
    });
    setEditingBlogPost(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={signOut} variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10">
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="case-studies" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-white/5 backdrop-blur-sm">
            <TabsTrigger value="case-studies" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">
              Contact Submissions
            </TabsTrigger>
          </TabsList>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Case Studies</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Case Study
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-bg border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingCaseStudy ? 'Edit Case Study' : 'Add New Case Study'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
                        <Input
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="e.g., E-commerce, SaaS"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-white/5 border-white/20 text-white min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                          <Image className="w-4 h-4" />
                          Thumbnail Image URL
                        </label>
                        <Input
                          value={formData.thumbnail}
                          onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                          <Image className="w-4 h-4" />
                          Original Project Image URL
                        </label>
                        <Input
                          value={formData.original_image}
                          onChange={(e) => setFormData({...formData, original_image: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="https://example.com/original-project.jpg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Client</label>
                        <Input
                          value={formData.client}
                          onChange={(e) => setFormData({...formData, client: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="Client Name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Duration</label>
                        <Input
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="e.g., 3 months"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Live URL</label>
                        <Input
                          value={formData.live_url}
                          onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Tags (comma-separated)</label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        className="bg-white/5 border-white/20 text-white"
                        placeholder="React, TypeScript, Tailwind CSS"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Content (HTML)</label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="bg-white/5 border-white/20 text-white min-h-[150px]"
                        placeholder="Detailed project description in HTML..."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Results (one per line)</label>
                      <Textarea
                        value={formData.results}
                        onChange={(e) => setFormData({...formData, results: e.target.value})}
                        className="bg-white/5 border-white/20 text-white min-h-[100px]"
                        placeholder="50% increase in conversions&#10;200% growth in traffic&#10;Enhanced user experience"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button type="submit" className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
                        {editingCaseStudy ? 'Update Case Study' : 'Create Case Study'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          resetForm();
                          setIsDialogOpen(false);
                        }}
                        className="border-white/20 text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {caseStudies.map((study) => (
                <Card key={study.id} className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <CardHeader className="p-4">
                    <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-white/5">
                      {(study.original_image || study.thumbnail) ? (
                        <img 
                          src={study.original_image || study.thumbnail} 
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-white text-lg line-clamp-2">{study.title}</CardTitle>
                      <Badge variant="secondary" className="bg-neon-green/20 text-neon-green whitespace-nowrap text-xs">
                        {study.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3">{study.description}</p>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingCaseStudy(study);
                          setFormData({
                            title: study.title,
                            description: study.description,
                            thumbnail: study.thumbnail,
                            original_image: study.original_image || '',
                            category: study.category,
                            live_url: study.live_url,
                            tags: study.tags?.join(', ') || '',
                            content: study.content,
                            client: study.client || '',
                            duration: study.duration || '',
                            results: study.results?.join('\n') || ''
                          });
                          setIsDialogOpen(true);
                        }}
                        className="border-white/20 text-gray-300 hover:bg-white/10 text-xs flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      
                      {study.live_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-white/20 text-gray-300 hover:bg-white/10 text-xs"
                        >
                          <a href={study.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteCaseStudy(study.id)}
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Dialog open={isBlogDialogOpen} onOpenChange={setIsBlogDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-bg border border-white/20">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
                        <Input
                          value={blogFormData.title}
                          onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Author</label>
                        <Input
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Excerpt</label>
                      <Textarea
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        className="bg-white/5 border-white/20 text-white min-h-[80px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Content (HTML)</label>
                      <Textarea
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        className="bg-white/5 border-white/20 text-white min-h-[150px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Featured Image URL</label>
                        <Input
                          value={blogFormData.featured_image}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featured_image: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block">Tags (comma-separated)</label>
                        <Input
                          value={blogFormData.tags}
                          onChange={(e) => setBlogFormData({ ...blogFormData, tags: e.target.value })}
                          className="bg-white/5 border-white/20 text-white"
                          placeholder="React, JavaScript, Web Development"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label htmlFor="published" className="text-sm font-medium text-gray-300">Published</label>
                      <Input
                        type="checkbox"
                        id="published"
                        checked={blogFormData.published}
                        onChange={(e) => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                        className="bg-white/5 border-white/20 text-white h-5 w-5"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button type="submit" className="bg-neon-green text-dark-bg hover:bg-neon-green/90">
                        {editingBlogPost ? 'Update Blog Post' : 'Create Blog Post'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetBlogForm();
                          setIsBlogDialogOpen(false);
                        }}
                        className="border-white/20 text-gray-300 hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <CardHeader className="p-4">
                    <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-white/5">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-white text-lg line-clamp-2">{post.title}</CardTitle>
                      {post.published ? (
                        <Badge variant="secondary" className="bg-neon-green/20 text-neon-green whitespace-nowrap text-xs">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-white/20 text-gray-300 whitespace-nowrap text-xs">
                          Draft
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingBlogPost(post);
                          setBlogFormData({
                            title: post.title,
                            excerpt: post.excerpt,
                            content: post.content,
                            author: post.author,
                            tags: post.tags?.join(', ') || '',
                            featured_image: post.featured_image,
                            published: post.published
                          });
                          setIsBlogDialogOpen(true);
                        }}
                        className="border-white/20 text-gray-300 hover:bg-white/10 text-xs flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteBlogPost(post.id)}
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Contact Submissions</h2>
              <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
                {contactSubmissions.length} Total Submissions
              </Badge>
            </div>

            {contactSubmissions.length === 0 ? (
              <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No Submissions Yet</h3>
                  <p className="text-gray-400">Contact form submissions will appear here when received.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contactSubmissions.map((submission) => (
                  <Card key={submission.id} className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <CardTitle className="text-white text-lg flex items-center gap-2">
                            <User className="w-4 h-4 text-neon-green" />
                            {submission.name}
                          </CardTitle>
                          <p className="text-gray-400 text-sm mt-1">{submission.email}</p>
                        </div>
                        <div className="text-right text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(submission.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0">
                      {submission.budget && (
                        <div className="mb-3">
                          <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                            Budget: {submission.budget}
                          </Badge>
                        </div>
                      )}
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {submission.message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
