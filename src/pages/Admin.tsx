
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CaseStudy {
  id?: string;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  live_url?: string;
  tags: string[];
  content?: string;
  client?: string;
  duration?: string;
  results: string[];
}

interface BlogPost {
  id?: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  tags: string[];
  featured_image?: string;
  published: boolean;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyCaseStudy: CaseStudy = {
    title: '',
    description: '',
    thumbnail: '',
    category: 'E-commerce',
    live_url: '',
    tags: [],
    content: '',
    client: '',
    duration: '',
    results: []
  };

  const emptyBlogPost: BlogPost = {
    title: '',
    excerpt: '',
    content: '',
    author: user?.email || '',
    tags: [],
    featured_image: '',
    published: false
  };

  const categories = ['E-commerce', 'SaaS', 'Corporate', 'Portfolio', 'Startup'];

  useEffect(() => {
    fetchCaseStudies();
    fetchBlogPosts();
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
      toast({
        title: "Error",
        description: "Failed to fetch case studies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
      toast({
        title: "Error",
        description: "Failed to fetch blog posts. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveCaseStudy = async (caseStudy: CaseStudy) => {
    try {
      const caseStudyData = {
        title: caseStudy.title,
        description: caseStudy.description,
        thumbnail: caseStudy.thumbnail || null,
        category: caseStudy.category,
        live_url: caseStudy.live_url || null,
        tags: caseStudy.tags,
        content: caseStudy.content || null,
        client: caseStudy.client || null,
        duration: caseStudy.duration || null,
        results: caseStudy.results
      };

      if (caseStudy.id) {
        const { error } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('id', caseStudy.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([caseStudyData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Case study ${caseStudy.id ? 'updated' : 'created'} successfully!`,
      });

      fetchCaseStudies();
      setEditingCase(null);
      setShowCaseForm(false);
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: "Failed to save case study. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveBlogPost = async (blogPost: BlogPost) => {
    try {
      const blogPostData = {
        title: blogPost.title,
        excerpt: blogPost.excerpt || null,
        content: blogPost.content,
        author: blogPost.author,
        tags: blogPost.tags,
        featured_image: blogPost.featured_image || null,
        published: blogPost.published
      };

      if (blogPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogPostData)
          .eq('id', blogPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogPostData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Blog post ${blogPost.id ? 'updated' : 'created'} successfully!`,
      });

      fetchBlogPosts();
      setEditingBlog(null);
      setShowBlogForm(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteCaseStudy = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Case study deleted successfully!",
      });

      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Failed to delete case study. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });

      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCaseFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCase) {
      saveCaseStudy(editingCase);
    }
  };

  const handleBlogFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      saveBlogPost(editingBlog);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Signed out successfully!"
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Admin <span className="text-neon-green">Dashboard</span>
            </h1>
            <p className="text-gray-400">Welcome back, {user?.email}</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="btn-secondary"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="case-studies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-8">
            <TabsTrigger value="case-studies" className="text-white">
              Case Studies ({caseStudies.length})
            </TabsTrigger>
            <TabsTrigger value="blog-posts" className="text-white">
              Blog Posts ({blogPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="case-studies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Project Portfolio</h2>
              <Button 
                onClick={() => {
                  setEditingCase(emptyCaseStudy);
                  setShowCaseForm(true);
                }}
                className="btn-primary"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add New Project
              </Button>
            </div>

            {showCaseForm && editingCase && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {editingCase.id ? 'Edit Project' : 'Add New Project'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingCase(null);
                        setShowCaseForm(false);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCaseFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Project Title *</Label>
                        <Input
                          id="title"
                          value={editingCase.title}
                          onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                          className="bg-white/5 border-white/10"
                          placeholder="Enter project title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          value={editingCase.category}
                          onChange={(e) => setEditingCase({...editingCase, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white"
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={editingCase.description}
                        onChange={(e) => setEditingCase({...editingCase, description: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="Brief project description"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client">Client Name</Label>
                        <Input
                          id="client"
                          value={editingCase.client || ''}
                          onChange={(e) => setEditingCase({...editingCase, client: e.target.value})}
                          className="bg-white/5 border-white/10"
                          placeholder="Client or company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Project Duration</Label>
                        <Input
                          id="duration"
                          value={editingCase.duration || ''}
                          onChange={(e) => setEditingCase({...editingCase, duration: e.target.value})}
                          className="bg-white/5 border-white/10"
                          placeholder="e.g., 3 months"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
                      <Input
                        id="thumbnail"
                        value={editingCase.thumbnail || ''}
                        onChange={(e) => setEditingCase({...editingCase, thumbnail: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="live_url">Live Project URL</Label>
                      <Input
                        id="live_url"
                        value={editingCase.live_url || ''}
                        onChange={(e) => setEditingCase({...editingCase, live_url: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="https://project-url.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={editingCase.tags.join(', ')}
                        onChange={(e) => setEditingCase({...editingCase, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
                        className="bg-white/5 border-white/10"
                        placeholder="React, TypeScript, Design"
                      />
                    </div>

                    <div>
                      <Label htmlFor="results">Key Results (comma-separated)</Label>
                      <Input
                        id="results"
                        value={editingCase.results.join(', ')}
                        onChange={(e) => setEditingCase({...editingCase, results: e.target.value.split(', ').filter(result => result.trim())})}
                        className="bg-white/5 border-white/10"
                        placeholder="300% increase in conversions, 50% faster load times"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Detailed Content (HTML)</Label>
                      <Textarea
                        id="content"
                        value={editingCase.content || ''}
                        onChange={(e) => setEditingCase({...editingCase, content: e.target.value})}
                        className="bg-white/5 border-white/10 min-h-[200px]"
                        placeholder="Detailed project description with HTML formatting"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="btn-primary">
                        <Save className="mr-2 w-4 h-4" />
                        {editingCase.id ? 'Update Project' : 'Create Project'}
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingCase(null);
                          setShowCaseForm(false);
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {caseStudies.length === 0 ? (
              <Card className="glass">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Projects Yet</h3>
                  <p className="text-gray-400 mb-4">Start by creating your first case study to showcase your work.</p>
                  <Button 
                    onClick={() => {
                      setEditingCase(emptyCaseStudy);
                      setShowCaseForm(true);
                    }}
                    className="btn-primary"
                  >
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="glass hover:glass-strong transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
                          {caseStudy.category}
                        </Badge>
                        {caseStudy.live_url && (
                          <a 
                            href={caseStudy.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <Eye size={16} />
                          </a>
                        )}
                      </div>
                      
                      <h3 className="font-bold mb-2 line-clamp-2">{caseStudy.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{caseStudy.description}</p>
                      
                      {caseStudy.tags && caseStudy.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {caseStudy.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                          {caseStudy.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                              +{caseStudy.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setEditingCase(caseStudy);
                            setShowCaseForm(true);
                          }}
                          className="btn-secondary flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => caseStudy.id && deleteCaseStudy(caseStudy.id)}
                          className="px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="blog-posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Management</h2>
              <Button 
                onClick={() => {
                  setEditingBlog(emptyBlogPost);
                  setShowBlogForm(true);
                }}
                className="btn-primary"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add New Post
              </Button>
            </div>

            {showBlogForm && editingBlog && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {editingBlog.id ? 'Edit Blog Post' : 'Add New Blog Post'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingBlog(null);
                        setShowBlogForm(false);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="blog-title">Post Title *</Label>
                      <Input
                        id="blog-title"
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-excerpt">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        value={editingBlog.excerpt || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="Brief description of the post"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blog-author">Author *</Label>
                        <Input
                          id="blog-author"
                          value={editingBlog.author}
                          onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                          className="bg-white/5 border-white/10"
                          placeholder="Author name"
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingBlog.published}
                          onCheckedChange={(checked) => setEditingBlog({...editingBlog, published: checked})}
                        />
                        <Label className="flex items-center gap-2">
                          {editingBlog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          {editingBlog.published ? 'Published' : 'Draft'}
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="blog-image">Featured Image URL</Label>
                      <Input
                        id="blog-image"
                        value={editingBlog.featured_image || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, featured_image: e.target.value})}
                        className="bg-white/5 border-white/10"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
                      <Input
                        id="blog-tags"
                        value={editingBlog.tags.join(', ')}
                        onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
                        className="bg-white/5 border-white/10"
                        placeholder="web development, design, tutorial"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-content">Content (HTML) *</Label>
                      <Textarea
                        id="blog-content"
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                        className="bg-white/5 border-white/10 min-h-[300px]"
                        placeholder="Write your blog post content here..."
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="btn-primary">
                        <Save className="mr-2 w-4 h-4" />
                        {editingBlog.id ? 'Update Post' : 'Create Post'}
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingBlog(null);
                          setShowBlogForm(false);
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {blogPosts.length === 0 ? (
              <Card className="glass">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Blog Posts Yet</h3>
                  <p className="text-gray-400 mb-4">Start sharing your thoughts and expertise with your first blog post.</p>
                  <Button 
                    onClick={() => {
                      setEditingBlog(emptyBlogPost);
                      setShowBlogForm(true);
                    }}
                    className="btn-primary"
                  >
                    Write Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="glass hover:glass-strong transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600" : "bg-gray-600"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-xs text-gray-400">By {post.author}</span>
                      </div>
                      
                      <h3 className="font-bold mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setEditingBlog(post);
                            setShowBlogForm(true);
                          }}
                          className="btn-secondary flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => post.id && deleteBlogPost(post.id)}
                          className="px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
