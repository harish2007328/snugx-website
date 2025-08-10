
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Mail, Phone, Building, Clock, DollarSign, Users, MessageSquare } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  budget?: string;
  timeline?: string;
  message: string;
  referral?: string;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error loading submissions",
        description: "Failed to fetch contact submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getBudgetColor = (budget?: string) => {
    switch (budget) {
      case 'starter': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'standard': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'premium': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'custom': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProjectTypeColor = (type?: string) => {
    switch (type) {
      case 'website': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'redesign': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'ecommerce': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'webapp': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'maintenance': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Contact Submissions</h2>
        <Badge variant="outline" className="text-neon-green border-neon-green/30">
          {submissions.length} Total
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          {submissions.length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-400">No contact submissions yet</p>
                <p className="text-gray-500 mt-2">Submissions will appear here when users fill out the contact form</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border-white/20 backdrop-blur-sm hover:border-neon-green/30 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-white mb-2">{submission.name}</CardTitle>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(submission.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {submission.project_type && (
                        <Badge className={`${getProjectTypeColor(submission.project_type)} border`}>
                          {submission.project_type.charAt(0).toUpperCase() + submission.project_type.slice(1)}
                        </Badge>
                      )}
                      {submission.budget && (
                        <Badge className={`${getBudgetColor(submission.budget)} border`}>
                          {submission.budget.charAt(0).toUpperCase() + submission.budget.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Mail className="w-4 h-4 text-neon-green" />
                      <span>{submission.email}</span>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Phone className="w-4 h-4 text-neon-green" />
                        <span>{submission.phone}</span>
                      </div>
                    )}
                    {submission.company && (
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Building className="w-4 h-4 text-neon-green" />
                        <span>{submission.company}</span>
                      </div>
                    )}
                    {submission.timeline && (
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Clock className="w-4 h-4 text-neon-green" />
                        <span>{submission.timeline}</span>
                      </div>
                    )}
                  </div>

                  {submission.referral && (
                    <div className="flex items-center space-x-3 text-gray-300">
                      <Users className="w-4 h-4 text-neon-green" />
                      <span>Found via: {submission.referral}</span>
                    </div>
                  )}

                  <Separator className="bg-white/10" />

                  {/* Message */}
                  <div>
                    <h4 className="text-sm font-semibold text-neon-green mb-2 uppercase tracking-wider">Project Details</h4>
                    <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-lg border border-white/10">
                      {submission.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactSubmissions;
