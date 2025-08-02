import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, LogOut, Mail, Phone, Calendar } from 'lucide-react';
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
  full_page_image?: string;
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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  budget?: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homepageProjects, setHomepageProjects] = useState<string[]>([]);
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
    results: [],
    full_page_image: ''
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
    fetchHomepageProjects();
    fetchContactSubmissions();
    
    // Set up real-time subscription for contact submissions
    const channel = supabase
      .channel('contact-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
        },
        () => {
          fetchContactSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
      toast({
        title: "Error",
        description: "Failed to fetch contact submissions. Please try again.",
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
        results: caseStudy.results,
        full_page_image: caseStudy.full_page_image || null
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

  const fetchHomepageProjects = async () => {
    try {
      const stored = localStorage.getItem('homepage_projects');
      if (stored) {
        setHomepageProjects(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error fetching homepage projects:', error);
    }
  };

  const toggleHomepageProject = (projectId: string) => {
    const updated = homepageProjects.includes(projectId)
      ? homepageProjects.filter(id => id !== projectId)
      : [...homepageProjects, projectId].slice(0, 3);
    
    setHomepageProjects(updated);
    localStorage.setItem('homepage_projects', JSON.stringify(updated));
    
    toast({
      title: "Success",
      description: "Homepage projects updated successfully!"
    });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              Admin <span className="text-neon-green">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base break-all sm:break-normal">Welcome back, {user?.email}</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="btn-secondary w-full sm:w-auto"
            size="sm"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="case-studies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/5 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="case-studies" className="text-white text-xs sm:text-sm py-2 px-1">
              Projects ({caseStudies.length})
            </TabsTrigger>
            <TabsTrigger value="homepage" className="text-white text-xs sm:text-sm py-2 px-1">
              Homepage
            </TabsTrigger>
            <TabsTrigger value="blog-posts" className="text-white text-xs sm:text-sm py-2 px-1">
              Blog ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="contact-submissions" className="text-white text-xs sm:text-sm py-2 px-1">
              Contact ({contactSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="case-studies" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-2xl font-bold">Project Portfolio</h2>
              <Button 
                onClick={() => {
                  setEditingCase(emptyCaseStudy);
                  setShowCaseForm(true);
                }}
                className="btn-primary w-full sm:w-auto text-sm"
                size="sm"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add New Project
              </Button>
            </div>

            {showCaseForm && editingCase && (
              <Card className="glass">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-sm sm:text-base">
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
                <CardContent className="pt-0">
                  <form onSubmit={handleCaseFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-sm">Project Title *</Label>
                        <Input
                          id="title"
                          value={editingCase.title}
                          onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                          className="bg-white/5 border-white/10 text-sm"
                          placeholder="Enter project title"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-sm">Category *</Label>
                        <select
                          id="category"
                          value={editingCase.category}
                          onChange={(e) => setEditingCase({...editingCase, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm">Description *</Label>
                      <Textarea
                        id="description"
                        value={editingCase.description}
                        onChange={(e) => setEditingCase({...editingCase, description: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm min-h-[80px]"
                        placeholder="Brief project description"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client" className="text-sm">Client Name</Label>
                        <Input
                          id="client"
                          value={editingCase.client || ''}
                          onChange={(e) => setEditingCase({...editingCase, client: e.target.value})}
                          className="bg-white/5 border-white/10 text-sm"
                          placeholder="Client or company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-sm">Project Duration</Label>
                        <Input
                          id="duration"
                          value={editingCase.duration || ''}
                          onChange={(e) => setEditingCase({...editingCase, duration: e.target.value})}
                          className="bg-white/5 border-white/10 text-sm"
                          placeholder="e.g., 3 months"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="thumbnail" className="text-sm">Thumbnail Image URL</Label>
                      <Input
                        id="thumbnail"
                        value={editingCase.thumbnail || ''}
                        onChange={(e) => setEditingCase({...editingCase, thumbnail: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="https://example.com/thumbnail.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="full_page_image" className="text-sm">Full Page Screenshot URL</Label>
                      <Input
                        id="full_page_image"
                        value={editingCase.full_page_image || ''}
                        onChange={(e) => setEditingCase({...editingCase, full_page_image: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="https://example.com/full-screenshot.jpg"
                      />
                      <p className="text-xs text-gray-400 mt-1">Full page screenshot to show the complete project layout</p>
                    </div>

                    <div>
                      <Label htmlFor="live_url" className="text-sm">Live Project URL</Label>
                      <Input
                        id="live_url"
                        value={editingCase.live_url || ''}
                        onChange={(e) => setEditingCase({...editingCase, live_url: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="https://project-url.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags" className="text-sm">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={editingCase.tags.join(', ')}
                        onChange={(e) => setEditingCase({...editingCase, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="React, TypeScript, Design"
                      />
                    </div>

                    <div>
                      <Label htmlFor="results" className="text-sm">Key Results (comma-separated)</Label>
                      <Input
                        id="results"
                        value={editingCase.results.join(', ')}
                        onChange={(e) => setEditingCase({...editingCase, results: e.target.value.split(', ').filter(result => result.trim())})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="300% increase in conversions, 50% faster load times"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content" className="text-sm">Detailed Content (HTML)</Label>
                      <Textarea
                        id="content"
                        value={editingCase.content || ''}
                        onChange={(e) => setEditingCase({...editingCase, content: e.target.value})}
                        className="bg-white/5 border-white/10 min-h-[150px] text-sm"
                        placeholder="Detailed project description with HTML formatting"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button type="submit" className="btn-primary text-sm" size="sm">
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
                        className="btn-secondary text-sm"
                        size="sm"
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
                <CardContent className="text-center py-8 sm:py-12 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold mb-2">No Projects Yet</h3>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">Start by creating your first case study to showcase your work.</p>
                  <Button 
                    onClick={() => {
                      setEditingCase(emptyCaseStudy);
                      setShowCaseForm(true);
                    }}
                    className="btn-primary text-sm"
                    size="sm"
                  >
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="glass hover:glass-strong transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-neon-green/20 text-neon-green text-xs">
                          {caseStudy.category}
                        </Badge>
                        {caseStudy.live_url && (
                          <a 
                            href={caseStudy.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-neon-green transition-colors"
                          >
                            <Eye size={14} />
                          </a>
                        )}
                      </div>
                      
                      <h3 className="font-bold mb-2 line-clamp-2 text-sm">{caseStudy.title}</h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{caseStudy.description}</p>
                      
                      {caseStudy.tags && caseStudy.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {caseStudy.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400 px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {caseStudy.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-400 px-1 py-0">
                              +{caseStudy.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-1 sm:gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setEditingCase(caseStudy);
                            setShowCaseForm(true);
                          }}
                          className="btn-secondary flex-1 text-xs px-2 py-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => caseStudy.id && deleteCaseStudy(caseStudy.id)}
                          className="px-2 py-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="homepage" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-2xl font-bold">Homepage Featured Projects</h2>
              <div className="text-xs sm:text-sm text-gray-400">
                Select up to 3 projects to feature on the homepage
              </div>
            </div>

            {caseStudies.length === 0 ? (
              <Card className="glass">
                <CardContent className="text-center py-8 sm:py-12 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold mb-2">No Projects Available</h3>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">Create some case studies first to feature them on the homepage.</p>
                  <Button 
                    onClick={() => {
                      setEditingCase(emptyCaseStudy);
                      setShowCaseForm(true);
                    }}
                    className="btn-primary text-sm"
                    size="sm"
                  >
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {caseStudies.map((caseStudy) => (
                  <Card 
                    key={caseStudy.id} 
                    className={`glass hover:glass-strong transition-all duration-300 cursor-pointer ${
                      homepageProjects.includes(caseStudy.id!) ? 'ring-2 ring-neon-green' : ''
                    }`}
                    onClick={() => caseStudy.id && toggleHomepageProject(caseStudy.id)}
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={caseStudy.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-neon-green/20 text-neon-green text-xs">
                          {caseStudy.category}
                        </Badge>
                        {homepageProjects.includes(caseStudy.id!) && (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-neon-green rounded-full flex items-center justify-center">
                            <span className="text-dark-bg text-xs font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold mb-2 line-clamp-2 text-sm">{caseStudy.title}</h3>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">{caseStudy.description}</p>
                      
                      <div className="text-xs text-center">
                        {homepageProjects.includes(caseStudy.id!) ? (
                          <span className="text-neon-green font-medium">Featured on Homepage</span>
                        ) : (
                          <span className="text-gray-500">Click to feature on homepage</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-white/5 rounded-lg p-3 sm:p-6 border border-white/10">
              <h3 className="text-sm sm:text-lg font-semibold mb-3 text-neon-green">How it works:</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                <li>• Click on any project card to toggle its homepage feature status</li>
                <li>• You can select up to 3 projects to be featured on the homepage</li>
                <li>• Featured projects will appear in the "Success Stories" section</li>
                <li>• Changes are saved automatically and will reflect on the homepage immediately</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="blog-posts" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-2xl font-bold">Blog Management</h2>
              <Button 
                onClick={() => {
                  setEditingBlog(emptyBlogPost);
                  setShowBlogForm(true);
                }}
                className="btn-primary w-full sm:w-auto text-sm"
                size="sm"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add New Post
              </Button>
            </div>

            {showBlogForm && editingBlog && (
              <Card className="glass">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between text-sm sm:text-base">
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
                <CardContent className="pt-0">
                  <form onSubmit={handleBlogFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="blog-title" className="text-sm">Post Title *</Label>
                      <Input
                        id="blog-title"
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-excerpt" className="text-sm">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        value={editingBlog.excerpt || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="Brief description of the post"
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="blog-author" className="text-sm">Author *</Label>
                        <Input
                          id="blog-author"
                          value={editingBlog.author}
                          onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                          className="bg-white/5 border-white/10 text-sm"
                          placeholder="Author name"
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingBlog.published}
                          onCheckedChange={(checked) => setEditingBlog({...editingBlog, published: checked})}
                        />
                        <Label className="flex items-center gap-2 text-sm">
                          {editingBlog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          {editingBlog.published ? 'Published' : 'Draft'}
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="blog-image" className="text-sm">Featured Image URL</Label>
                      <Input
                        id="blog-image"
                        value={editingBlog.featured_image || ''}
                        onChange={(e) => setEditingBlog({...editingBlog, featured_image: e.target.value})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-tags" className="text-sm">Tags (comma-separated)</Label>
                      <Input
                        id="blog-tags"
                        value={editingBlog.tags.join(', ')}
                        onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
                        className="bg-white/5 border-white/10 text-sm"
                        placeholder="web development, design, tutorial"
                      />
                    </div>

                    <div>
                      <Label htmlFor="blog-content" className="text-sm">Content (HTML) *</Label>
                      <Textarea
                        id="blog-content"
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                        className="bg-white/5 border-white/10 min-h-[200px] sm:min-h-[300px] text-sm"
                        placeholder="Write your blog post content here..."
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button type="submit" className="btn-primary text-sm" size="sm">
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
                        className="btn-secondary text-sm"
                        size="sm"
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
                <CardContent className="text-center py-8 sm:py-12 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold mb-2">No Blog Posts Yet</h3>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">Start sharing your thoughts and expertise with your first blog post.</p>
                  <Button 
                    onClick={() => {
                      setEditingBlog(emptyBlogPost);
                      setShowBlogForm(true);
                    }}
                    className="btn-primary text-sm"
                    size="sm"
                  >
                    Write Your First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="glass hover:glass-strong transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600 text-xs" : "bg-gray-600 text-xs"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        <span className="text-xs text-gray-400">By {post.author}</span>
                      </div>
                      
                      <h3 className="font-bold mb-2 line-clamp-2 text-sm">{post.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400 px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-400 px-1 py-0">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-1 sm:gap-2">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setEditingBlog(post);
                            setShowBlogForm(true);
                          }}
                          className="btn-secondary flex-1 text-xs px-2 py-1"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          variant="destructive"
                          onClick={() => post.id && deleteBlogPost(post.id)}
                          className="px-2 py-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact-submissions" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg sm:text-2xl font-bold">Contact Submissions</h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                Real-time updates
              </div>
            </div>

            {contactSubmissions.length === 0 ? (
              <Card className="glass">
                <CardContent className="text-center py-8 sm:py-12 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold mb-2">No Contact Submissions Yet</h3>
                  <p className="text-gray-400 mb-4 text-sm sm:text-base">Contact form submissions will appear here in real-time.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {contactSubmissions.map((submission) => (
                  <Card key={submission.id} className="glass hover:glass-strong transition-all duration-300">
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                            <h3 className="font-bold text-sm sm:text-lg">{submission.name}</h3>
                            {submission.budget && (
                              <Badge variant="secondary" className="bg-neon-green/20 text-neon-green text-xs w-fit">
                                {submission.budget}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2 mb-3 text-xs sm:text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <a 
                                href={`mailto:${submission.email}`} 
                                className="hover:text-neon-green transition-colors break-all"
                              >
                                {submission.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{formatDate(submission.created_at)}</span>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-2 sm:p-4">
                            <h4 className="font-medium mb-2 text-xs sm:text-sm">Message:</h4>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed break-words">{submission.message}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            asChild
                            className="btn-primary text-xs flex-1"
                          >
                            <a href={`mailto:${submission.email}?subject=Re: Your Project Inquiry`}>
                              <Mail className="mr-1 w-3 h-3" />
                              Reply
                            </a>
                          </Button>
                          <Button 
                            size="sm"
                            asChild
                            variant="outline"
                            className="btn-secondary text-xs px-2"
                          >
                            <a href={`tel:${submission.email}`}>
                              <Phone className="w-3 h-3" />
                            </a>
                          </Button>
                        </div>
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
