'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { formatContactFormMessage, getWhatsAppUrl, QUERY_WHATSAPP_NUMBER } from '@/lib/whatsapp';

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  // Auto-fill form from URL parameters
  useEffect(() => {
    const service = searchParams.get('service');
    const packageName = searchParams.get('package');
    const price = searchParams.get('price');
    const duration = searchParams.get('duration');
    
    if (service) {
      setFormData(prev => ({
        ...prev,
        service: packageName ? `${service} - ${packageName}` : service,
        message: price && duration 
          ? `Package: ${packageName || service}\nPrice: ${price}\nDuration: ${duration}`
          : prev.message
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatContactFormMessage(formData);
    const whatsappUrl = getWhatsAppUrl(message, QUERY_WHATSAPP_NUMBER);
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 7580053446, +91 7590053446',
      link: 'tel:+917580053446',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+91 7580053446',
      link: 'https://wa.me/917580053446',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@akashadventures.co.in',
      link: 'mailto:info@akashadventures.co.in',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Bir Billing Road Near Tourism Office',
      link: 'https://maps.app.goo.gl/MFSBRLXp1MLNWoMn9?g_st=awb',
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with us to book your adventure or ask any questions
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a <span className="text-orange-500">Message</span>
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Adventure</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you shortly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 7580053446"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Interested In *</Label>
                      <Input
                        id="service"
                        placeholder="e.g., Paragliding, Camping, Bungee Jumping"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Any special requests or questions..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      Submit Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Get in <span className="text-orange-500">Touch</span>
              </h2>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                      <info.icon className="h-6 w-6 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Monday - Sunday:</span> 7:00 AM - 7:00 PM
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    We're available 7 days a week during the adventure season. For
                    emergency bookings or inquiries, please call or WhatsApp us directly.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Payment Methods
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
                  <div className="flex items-center">
                    <span className="text-sm">Google Pay</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Phone Pe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Cash</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Net Banking</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Paytm</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2576.0570847189883!2d76.7236034!3d32.0448823!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b94c4119f2c5%3A0x7a6ecfe92348d456!2sBir%20Billing%20Paragliding%20%7C%20Akash%20Adventures!5e1!3m2!1sen!2sin!4v1763885851840!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="bg-white p-4 text-center">
                  <a
                    href="https://maps.app.goo.gl/MFSBRLXp1MLNWoMn9?g_st=awb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600 font-semibold"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
