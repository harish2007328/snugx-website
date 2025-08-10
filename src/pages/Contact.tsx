
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const Contact = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    referral: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            ...formData,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully! 🎉",
        description: "I'll get back to you within 24 hours with a detailed proposal.",
      });

      setFormData({ 
        name: '', email: '', phone: '', company: '', 
        projectType: '', budget: '', timeline: '', message: '', referral: '' 
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or reach out directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Let's Build Something <span className="text-neon-green">Extraordinary</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Ready to transform your digital presence? Fill out the form below and I'll get back to you with a customized proposal within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="bg-gradient-to-br from-dark-bg via-secondary/20 to-dark-bg border border-white/10 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Full Name *</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/5 border-white/20 text-light-text placeholder:text-gray-500 focus:border-neon-green/50 h-12"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Email Address *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/5 border-white/20 text-light-text placeholder:text-gray-500 focus:border-neon-green/50 h-12"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/5 border-white/20 text-light-text placeholder:text-gray-500 focus:border-neon-green/50 h-12"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Company/Organization</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-white/5 border-white/20 text-light-text placeholder:text-gray-500 focus:border-neon-green/50 h-12"
                    placeholder="Your Company Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Project Type *</label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-light-text h-12">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-bg border-white/10">
                      <SelectItem value="website" className="text-light-text hover:bg-white/10">New Website</SelectItem>
                      <SelectItem value="redesign" className="text-light-text hover:bg-white/10">Website Redesign</SelectItem>
                      <SelectItem value="ecommerce" className="text-light-text hover:bg-white/10">E-commerce Store</SelectItem>
                      <SelectItem value="webapp" className="text-light-text hover:bg-white/10">Web Application</SelectItem>
                      <SelectItem value="maintenance" className="text-light-text hover:bg-white/10">Maintenance & Support</SelectItem>
                      <SelectItem value="other" className="text-light-text hover:bg-white/10">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Budget Range *</label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-light-text h-12">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-bg border-white/10">
                      <SelectItem value="starter" className="text-light-text hover:bg-white/10">₹6,999 (Starter)</SelectItem>
                      <SelectItem value="standard" className="text-light-text hover:bg-white/10">₹14,999 (Standard)</SelectItem>
                      <SelectItem value="premium" className="text-light-text hover:bg-white/10">₹29,999+ (Premium)</SelectItem>
                      <SelectItem value="custom" className="text-light-text hover:bg-white/10">Custom Quote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">Timeline *</label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-light-text h-12">
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-bg border-white/10">
                      <SelectItem value="asap" className="text-light-text hover:bg-white/10">ASAP</SelectItem>
                      <SelectItem value="1-2weeks" className="text-light-text hover:bg-white/10">1-2 weeks</SelectItem>
                      <SelectItem value="1month" className="text-light-text hover:bg-white/10">Within a month</SelectItem>
                      <SelectItem value="2-3months" className="text-light-text hover:bg-white/10">2-3 months</SelectItem>
                      <SelectItem value="flexible" className="text-light-text hover:bg-white/10">Flexible timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-neon-green">How did you find me?</label>
                  <Select value={formData.referral} onValueChange={(value) => handleInputChange('referral', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-light-text h-12">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-bg border-white/10">
                      <SelectItem value="google" className="text-light-text hover:bg-white/10">Google Search</SelectItem>
                      <SelectItem value="social" className="text-light-text hover:bg-white/10">Social Media</SelectItem>
                      <SelectItem value="referral" className="text-light-text hover:bg-white/10">Referral</SelectItem>
                      <SelectItem value="portfolio" className="text-light-text hover:bg-white/10">Previous Work</SelectItem>
                      <SelectItem value="other" className="text-light-text hover:bg-white/10">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-neon-green">Project Details *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white/5 border-white/20 text-light-text placeholder:text-gray-500 min-h-[140px] focus:border-neon-green/50 resize-none"
                  placeholder="Tell me about your project goals, specific features you need, target audience, design preferences, and any other important details..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-green text-dark-bg hover:bg-neon-green/90 font-semibold py-4 h-14 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/25"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-dark-bg border-t-transparent"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Send Project Details</span>
                      <Send className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 p-6 bg-neon-green/5 border border-neon-green/20 rounded-lg">
              <p className="text-sm text-gray-300 text-center">
                <span className="text-neon-green font-semibold">Quick Response Guaranteed:</span> I typically respond within 2-4 hours during business hours. 
                For urgent projects, feel free to reach out directly at <span className="text-neon-green">hello@snugx.in</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
