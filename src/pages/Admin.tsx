
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
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

interface CaseStudy {
  id?: string;
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
}

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  featured_image: string;
  published: boolean;
}

const Admin = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const { toast } = useToast();

  const emptyCaseStudy: CaseStudy = {
    title: '',
    description: '',
    thumbnail: '',
    category: '',
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
    author: '',
    tags: [],
    featured_image: '',
    published: false
  };

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
    }
  };

  const saveCaseStudy = async (caseStudy: CaseStudy) => {
    try {
      if (caseStudy.id) {
        const { error } = await supabase
          .from('case_studies')
          .update(caseStudy)
          .eq('id', caseStudy.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([caseStudy]);

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
      toast({
        title: "Error",
        description: "Failed to save case study. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveBlogPost = async (blogPost: BlogPost) => {
    try {
      if (blogPost.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(blogPost)
          .eq('id', blogPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogPost]);

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
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteCaseStudy = async (id: string) => {
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
      toast({
        title: "Error",
        description: "Failed to delete case study. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
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
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin <span className="text-neon-green">Dashboard</span>
        </h1>

        <Tabs defaultValue="case-studies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="case-studies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Case Studies</h2>
              <Button 
                onClick={() => {
                  setEditingCase(emptyCaseStudy);
                  setShowCaseForm(true);
                }}
                className="bg-neon-green text-dark-bg hover:bg-neon-green/80"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Case Study
              </Button>
            </div>

            {showCaseForm && editingCase && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>
                    {editingCase.id ? 'Edit Case Study' : 'Add New Case Study'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingCase.title}
                        onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input
                        value={editingCase.category}
                        onChange={(e) => setEditingCase({...editingCase, category: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingCase.description}
                      onChange={(e) => setEditingCase({...editingCase, description: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Client</Label>
                      <Input
                        value={editingCase.client}
                        onChange={(e) => setEditingCase({...editingCase, client: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input
                        value={editingCase.duration}
                        onChange={(e) => setEditingCase({...editingCase, duration: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Thumbnail URL</Label>
                    <Input
                      value={editingCase.thumbnail}
                      onChange={(e) => setEditingCase({...editingCase, thumbnail: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Live URL</Label>
                    <Input
                      value={editingCase.live_url}
                      onChange={(e) => setEditingCase({...editingCase, live_url: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={editingCase.tags.join(', ')}
                      onChange={(e) => setEditingCase({...editingCase, tags: e.target.value.split(', ')})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Results (comma-separated)</Label>
                    <Input
                      value={editingCase.results.join(', ')}
                      onChange={(e) => setEditingCase({...editingCase, results: e.target.value.split(', ')})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Content (HTML)</Label>
                    <Textarea
                      value={editingCase.content}
                      onChange={(e) => setEditingCase({...editingCase, content: e.target.value})}
                      className="bg-white/5 border-white/10 min-h-[200px]"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => saveCaseStudy(editingCase)}
                      className="bg-neon-green text-dark-bg hover:bg-neon-green/80"
                    >
                      <Save className="mr-2 w-4 h-4" />
                      Save
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditingCase(null);
                        setShowCaseForm(false);
                      }}
                      className="border-white/20"
                    >
                      <X className="mr-2 w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="glass">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={caseStudy.thumbnail || 'https://via.placeholder.com/400x200'}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">{caseStudy.title}</h3>
                    <Badge variant="secondary" className="mb-2">{caseStudy.category}</Badge>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{caseStudy.description}</p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setEditingCase(caseStudy);
                          setShowCaseForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => caseStudy.id && deleteCaseStudy(caseStudy.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog-posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <Button 
                onClick={() => {
                  setEditingBlog(emptyBlogPost);
                  setShowBlogForm(true);
                }}
                className="bg-neon-green text-dark-bg hover:bg-neon-green/80"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Blog Post
              </Button>
            </div>

            {showBlogForm && editingBlog && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>
                    {editingBlog.id ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      value={editingBlog.excerpt}
                      onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={editingBlog.author}
                        onChange={(e) => setEditingBlog({...editingBlog, author: e.target.value})}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={editingBlog.published}
                        onCheckedChange={(checked) => setEditingBlog({...editingBlog, published: checked})}
                      />
                      <Label>Published</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Featured Image URL</Label>
                    <Input
                      value={editingBlog.featured_image}
                      onChange={(e) => setEditingBlog({...editingBlog, featured_image: e.target.value})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={editingBlog.tags.join(', ')}
                      onChange={(e) => setEditingBlog({...editingBlog, tags: e.target.value.split(', ')})}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label>Content (HTML)</Label>
                    <Textarea
                      value={editingBlog.content}
                      onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                      className="bg-white/5 border-white/10 min-h-[200px]"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => saveBlogPost(editingBlog)}
                      className="bg-neon-green text-dark-bg hover:bg-neon-green/80"
                    >
                      <Save className="mr-2 w-4 h-4" />
                      Save
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setEditingBlog(null);
                        setShowBlogForm(false);
                      }}
                      className="border-white/20"
                    >
                      <X className="mr-2 w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="glass">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.featured_image || 'https://via.placeholder.com/400x200'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <h3 className="font-bold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">By {post.author}</p>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setEditingBlog(post);
                          setShowBlogForm(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => post.id && deleteBlogPost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
