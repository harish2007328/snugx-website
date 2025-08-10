
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      console.error('Error submitting form:', error);
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
    <div className="min-h-screen pt-24 bg-gradient-to-br from-dark-bg via-dark-bg/95 to-secondary/5">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-light-text to-neon-green bg-clip-text text-transparent">
            Let's Create Something
            <br />
            <span className="text-neon-green">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transform your digital presence with cutting-edge design and development. 
            Fill out the form below and receive a customized proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-bold text-center text-white">
                Start Your Project
              </CardTitle>
              <p className="text-center text-gray-300 text-lg mt-4">
                Share your vision and let's bring it to life together
              </p>
            </CardHeader>
            
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-neon-green/60 focus:ring-neon-green/20 h-14 text-lg transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-neon-green/60 focus:ring-neon-green/20 h-14 text-lg transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Phone and Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-neon-green/60 focus:ring-neon-green/20 h-14 text-lg transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Company/Organization
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-neon-green/60 focus:ring-neon-green/20 h-14 text-lg transition-all duration-300"
                      placeholder="Your Company Name"
                    />
                  </div>
                </div>

                {/* Project Type and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Project Type *
                    </label>
                    <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-14 text-lg">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20">
                        <SelectItem value="website" className="text-light-text hover:bg-white/10">New Website</SelectItem>
                        <SelectItem value="redesign" className="text-light-text hover:bg-white/10">Website Redesign</SelectItem>
                        <SelectItem value="ecommerce" className="text-light-text hover:bg-white/10">E-commerce Store</SelectItem>
                        <SelectItem value="webapp" className="text-light-text hover:bg-white/10">Web Application</SelectItem>
                        <SelectItem value="maintenance" className="text-light-text hover:bg-white/10">Maintenance & Support</SelectItem>
                        <SelectItem value="other" className="text-light-text hover:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Budget Range *
                    </label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-14 text-lg">
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20">
                        <SelectItem value="starter" className="text-light-text hover:bg-white/10">₹6,999 (Starter)</SelectItem>
                        <SelectItem value="standard" className="text-light-text hover:bg-white/10">₹14,999 (Standard)</SelectItem>
                        <SelectItem value="premium" className="text-light-text hover:bg-white/10">₹29,999+ (Premium)</SelectItem>
                        <SelectItem value="custom" className="text-light-text hover:bg-white/10">Custom Quote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Timeline and Referral Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      Timeline *
                    </label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-14 text-lg">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20">
                        <SelectItem value="asap" className="text-light-text hover:bg-white/10">ASAP</SelectItem>
                        <SelectItem value="1-2weeks" className="text-light-text hover:bg-white/10">1-2 weeks</SelectItem>
                        <SelectItem value="1month" className="text-light-text hover:bg-white/10">Within a month</SelectItem>
                        <SelectItem value="2-3months" className="text-light-text hover:bg-white/10">2-3 months</SelectItem>
                        <SelectItem value="flexible" className="text-light-text hover:bg-white/10">Flexible timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                      How did you find me?
                    </label>
                    <Select value={formData.referral} onValueChange={(value) => handleInputChange('referral', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-14 text-lg">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-bg border-white/20">
                        <SelectItem value="google" className="text-light-text hover:bg-white/10">Google Search</SelectItem>
                        <SelectItem value="social" className="text-light-text hover:bg-white/10">Social Media</SelectItem>
                        <SelectItem value="referral" className="text-light-text hover:bg-white/10">Referral</SelectItem>
                        <SelectItem value="portfolio" className="text-light-text hover:bg-white/10">Previous Work</SelectItem>
                        <SelectItem value="other" className="text-light-text hover:bg-white/10">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white uppercase tracking-wider">
                    Project Details *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 min-h-[160px] focus:border-neon-green/60 focus:ring-neon-green/20 resize-none text-lg transition-all duration-300"
                    placeholder="Tell me about your project goals, specific features you need, target audience, design preferences, and any other important details..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-neon-green to-neon-green/80 text-dark-bg hover:from-neon-green/90 hover:to-neon-green/70 font-bold py-6 h-16 text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-neon-green/30 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-3 border-dark-bg border-t-transparent"></div>
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

              {/* Response Time Info */}
              <div className="mt-10 p-6 bg-neon-green/10 border border-neon-green/30 rounded-xl backdrop-blur-sm">
                <p className="text-center text-gray-200 leading-relaxed">
                  <span className="text-neon-green font-bold text-lg">⚡ Quick Response Guaranteed</span>
                  <br />
                  I typically respond within 2-4 hours during business hours. 
                  For urgent projects, reach out directly at{' '}
                  <a href="mailto:hello@snugx.in" className="text-neon-green font-semibold hover:underline">
                    hello@snugx.in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
