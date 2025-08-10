
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
    project_type: '',
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
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully! 🎉",
        description: "I'll get back to you within 24 hours with a detailed proposal.",
      });

      setFormData({ 
        name: '', email: '', phone: '', company: '', 
        project_type: '', budget: '', timeline: '', message: '', referral: '' 
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
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
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Let's Build Something <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Extraordinary</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your digital presence? Fill out the form below and I'll get back to you with a customized proposal within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Full Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 h-12 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 h-12 transition-all duration-200"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 h-12 transition-all duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Company/Organization</label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 h-12 transition-all duration-200"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Project Type *</label>
                    <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-200">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-xl">
                        <SelectItem value="website" className="text-white hover:bg-white/10 focus:bg-white/10">New Website</SelectItem>
                        <SelectItem value="redesign" className="text-white hover:bg-white/10 focus:bg-white/10">Website Redesign</SelectItem>
                        <SelectItem value="ecommerce" className="text-white hover:bg-white/10 focus:bg-white/10">E-commerce Store</SelectItem>
                        <SelectItem value="webapp" className="text-white hover:bg-white/10 focus:bg-white/10">Web Application</SelectItem>
                        <SelectItem value="maintenance" className="text-white hover:bg-white/10 focus:bg-white/10">Maintenance & Support</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Budget Range *</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-200">
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-xl">
                        <SelectItem value="starter" className="text-white hover:bg-white/10 focus:bg-white/10">₹6,999 (Starter)</SelectItem>
                        <SelectItem value="standard" className="text-white hover:bg-white/10 focus:bg-white/10">₹14,999 (Standard)</SelectItem>
                        <SelectItem value="premium" className="text-white hover:bg-white/10 focus:bg-white/10">₹29,999+ (Premium)</SelectItem>
                        <SelectItem value="custom" className="text-white hover:bg-white/10 focus:bg-white/10">Custom Quote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">Timeline *</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-200">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-xl">
                        <SelectItem value="asap" className="text-white hover:bg-white/10 focus:bg-white/10">ASAP</SelectItem>
                        <SelectItem value="1-2weeks" className="text-white hover:bg-white/10 focus:bg-white/10">1-2 weeks</SelectItem>
                        <SelectItem value="1month" className="text-white hover:bg-white/10 focus:bg-white/10">Within a month</SelectItem>
                        <SelectItem value="2-3months" className="text-white hover:bg-white/10 focus:bg-white/10">2-3 months</SelectItem>
                        <SelectItem value="flexible" className="text-white hover:bg-white/10 focus:bg-white/10">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">How did you find me?</label>
                    <Select value={formData.referral} onValueChange={(value) => handleInputChange('referral', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-200">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-xl">
                        <SelectItem value="google" className="text-white hover:bg-white/10 focus:bg-white/10">Google Search</SelectItem>
                        <SelectItem value="social" className="text-white hover:bg-white/10 focus:bg-white/10">Social Media</SelectItem>
                        <SelectItem value="referral" className="text-white hover:bg-white/10 focus:bg-white/10">Referral</SelectItem>
                        <SelectItem value="portfolio" className="text-white hover:bg-white/10 focus:bg-white/10">Previous Work</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-6">Tell Me About Your Project</h2>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Project Details *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[160px] focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 resize-none transition-all duration-200"
                    placeholder="Tell me about your project goals, specific features you need, target audience, design preferences, and any other important details..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-semibold py-4 h-16 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent"></div>
                      <span>Sending Your Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <span>Send Project Details</span>
                      <Send className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer Note */}
            <div className="mt-10 p-6 bg-gradient-to-r from-green-400/10 to-emerald-500/10 border border-green-400/20 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                <span className="text-green-400 font-semibold">Quick Response Guaranteed:</span> I typically respond within 2-4 hours during business hours. 
                For urgent projects, feel free to reach out directly at <span className="text-green-400 font-medium">hello@snugx.in</span>
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
