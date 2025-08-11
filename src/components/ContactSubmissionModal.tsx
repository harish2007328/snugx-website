
import { X, Mail, Phone, Calendar, Building, Clock, DollarSign, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface ContactSubmissionModalProps {
  submission: ContactSubmission;
  isOpen: boolean;
  onClose: () => void;
}

const ContactSubmissionModal = ({ submission, isOpen, onClose }: ContactSubmissionModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProjectTypeColor = (type?: string) => {
    switch (type) {
      case 'website': return 'bg-blue-500/20 text-blue-400';
      case 'redesign': return 'bg-purple-500/20 text-purple-400';
      case 'ecommerce': return 'bg-green-500/20 text-green-400';
      case 'webapp': return 'bg-orange-500/20 text-orange-400';
      case 'maintenance': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-neon-green/20 text-neon-green';
    }
  };

  const getBudgetColor = (budget?: string) => {
    switch (budget) {
      case 'starter': return 'bg-yellow-500/20 text-yellow-400';
      case 'standard': return 'bg-blue-500/20 text-blue-400';
      case 'premium': return 'bg-purple-500/20 text-purple-400';
      case 'custom': return 'bg-neon-green/20 text-neon-green';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Contact Submission Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neon-green/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white font-medium">{submission.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <a 
                      href={`mailto:${submission.email}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      {submission.email}
                    </a>
                  </div>
                </div>

                {submission.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone Number</p>
                      <a 
                        href={`tel:${submission.phone}`}
                        className="text-green-400 hover:text-green-300 transition-colors font-medium"
                      >
                        {submission.phone}
                      </a>
                    </div>
                  </div>
                )}

                {submission.company && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Company</p>
                      <p className="text-white font-medium">{submission.company}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Submitted On</p>
                    <p className="text-white font-medium">{formatDate(submission.created_at)}</p>
                  </div>
                </div>

                {submission.project_type && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Project Type</p>
                      <Badge className={`${getProjectTypeColor(submission.project_type)} border-0 font-medium`}>
                        {submission.project_type?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Badge>
                    </div>
                  </div>
                )}

                {submission.budget && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Budget Range</p>
                      <Badge className={`${getBudgetColor(submission.budget)} border-0 font-medium`}>
                        {submission.budget === 'starter' && '₹6,999 (Starter)'}
                        {submission.budget === 'standard' && '₹14,999 (Standard)'}
                        {submission.budget === 'premium' && '₹29,999+ (Premium)'}
                        {submission.budget === 'custom' && 'Custom Quote'}
                      </Badge>
                    </div>
                  </div>
                )}

                {submission.timeline && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Timeline</p>
                      <p className="text-white font-medium capitalize">{submission.timeline?.replace('-', ' to ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Project Message</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 leading-relaxed">{submission.message}</p>
              </div>
            </div>

            {/* Referral */}
            {submission.referral && (
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">How They Found Us</h3>
                <Badge className="bg-neon-green/20 text-neon-green border-0 font-medium">
                  {submission.referral === 'google' && 'Google Search'}
                  {submission.referral === 'linkedin' && 'LinkedIn'}
                  {submission.referral === 'twitter' && 'Twitter / X'}
                  {submission.referral === 'referral' && 'Referral'}
                  {submission.referral === 'other' && 'Other'}
                </Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t border-white/10 pt-6 flex gap-3">
              <Button 
                asChild
                className="bg-neon-green text-dark-bg hover:bg-neon-green/90 flex-1"
              >
                <a href={`mailto:${submission.email}?subject=Re: Your Project Inquiry - ${submission.name}`}>
                  <Mail className="mr-2 w-4 h-4" />
                  Reply via Email
                </a>
              </Button>
              {submission.phone && (
                <Button 
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <a href={`tel:${submission.phone}`}>
                    <Phone className="mr-2 w-4 h-4" />
                    Call
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissionModal;
