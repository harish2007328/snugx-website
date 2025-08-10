
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
    <div className="min-h-screen pt-24 bg-dark-bg text-light-text">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-light-text">
            Let's Build Something <span className="text-neon-green">Extraordinary</span>
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
                <h2 className="text-2xl font-semibold text-light-text mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Full Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-light-text placeholder:text-gray-400 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 h-12 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-light-text placeholder:text-gray-400 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 h-12 transition-all duration-200"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-light-text placeholder:text-gray-400 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 h-12 transition-all duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Company/Organization</label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-white/10 border-white/20 text-light-text placeholder:text-gray-400 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 h-12 transition-all duration-200"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-semibold text-light-text mb-6">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Project Type *</label>
                    <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-light-text h-12 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 transition-all duration-200">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20 backdrop-blur-xl">
                        <SelectItem value="website" className="text-light-text hover:bg-white/10 focus:bg-white/10">New Website</SelectItem>
                        <SelectItem value="redesign" className="text-light-text hover:bg-white/10 focus:bg-white/10">Website Redesign</SelectItem>
                        <SelectItem value="ecommerce" className="text-light-text hover:bg-white/10 focus:bg-white/10">E-commerce Store</SelectItem>
                        <SelectItem value="webapp" className="text-light-text hover:bg-white/10 focus:bg-white/10">Web Application</SelectItem>
                        <SelectItem value="maintenance" className="text-light-text hover:bg-white/10 focus:bg-white/10">Maintenance & Support</SelectItem>
                        <SelectItem value="other" className="text-light-text hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Budget Range *</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-light-text h-12 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 transition-all duration-200">
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20 backdrop-blur-xl">
                        <SelectItem value="starter" className="text-light-text hover:bg-white/10 focus:bg-white/10">₹6,999 (Starter)</SelectItem>
                        <SelectItem value="standard" className="text-light-text hover:bg-white/10 focus:bg-white/10">₹14,999 (Standard)</SelectItem>
                        <SelectItem value="premium" className="text-light-text hover:bg-white/10 focus:bg-white/10">₹29,999+ (Premium)</SelectItem>
                        <SelectItem value="custom" className="text-light-text hover:bg-white/10 focus:bg-white/10">Custom Quote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">Timeline *</label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-light-text h-12 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 transition-all duration-200">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20 backdrop-blur-xl">
                        <SelectItem value="asap" className="text-light-text hover:bg-white/10 focus:bg-white/10">ASAP</SelectItem>
                        <SelectItem value="1-2weeks" className="text-light-text hover:bg-white/10 focus:bg-white/10">1-2 weeks</SelectItem>
                        <SelectItem value="1month" className="text-light-text hover:bg-white/10 focus:bg-white/10">Within a month</SelectItem>
                        <SelectItem value="2-3months" className="text-light-text hover:bg-white/10 focus:bg-white/10">2-3 months</SelectItem>
                        <SelectItem value="flexible" className="text-light-text hover:bg-white/10 focus:bg-white/10">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-light-text">How did you find me?</label>
                    <Select value={formData.referral} onValueChange={(value) => handleInputChange('referral', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-light-text h-12 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 transition-all duration-200">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20 backdrop-blur-xl">
                        <SelectItem value="google" className="text-light-text hover:bg-white/10 focus:bg-white/10">Google Search</SelectItem>
                        <SelectItem value="linkedin" className="text-light-text hover:bg-white/10 focus:bg-white/10">LinkedIn</SelectItem>
                        <SelectItem value="twitter" className="text-light-text hover:bg-white/10 focus:bg-white/10">Twitter / X</SelectItem>
                        <SelectItem value="referral" className="text-light-text hover:bg-white/10 focus:bg-white/10">Referral</SelectItem>
                        <SelectItem value="other" className="text-light-text hover:bg-white/10 focus:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <h2 className="text-2xl font-semibold text-light-text mb-6">Your Message</h2>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-light-text">Tell me about your project *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/10 border-white/20 text-light-text placeholder:text-gray-400 focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 min-h-[150px] transition-all duration-200"
                    placeholder="Describe your project goals, target audience, and any specific features you need."
                  />
                </div>
              </div>

              {/* Submission */}
              <div className="flex justify-end pt-8">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-neon-green text-dark-bg font-bold py-3 px-8 rounded-full hover:bg-neon-green/90 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center gap-2 h-14"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send size={18} />}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
