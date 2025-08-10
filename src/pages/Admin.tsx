
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContactSubmissions from '@/components/ContactSubmissions';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { MessageSquare, FileText, Users, BarChart3 } from 'lucide-react';

const Admin = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Manage your portfolio content and view contact submissions
          </p>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger 
              value="contacts" 
              className="flex items-center space-x-2 data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="case-studies"
              className="flex items-center space-x-2 data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg"
            >
              <FileText className="w-4 h-4" />
              <span>Case Studies</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blog"
              className="flex items-center space-x-2 data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg"
            >
              <Users className="w-4 h-4" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="flex items-center space-x-2 data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            <ContactSubmissions />
          </TabsContent>

          <TabsContent value="case-studies" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Case Studies Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Case studies management will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Blog Posts Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Blog posts management will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Analytics dashboard will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
