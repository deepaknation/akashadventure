'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Clock, Video, Shield, Car } from 'lucide-react';
import { formatBookingFormMessage, getWhatsAppUrl, QUERY_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function OffersSection() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    experience: '',
    date: '',
  });

  const packages = [
    {
      title: 'Short Flight',
      duration: '15-20 Minutes',
      price: '₹1,700 +',
      features: [
        'HD Video Recording',
        'Insurance Included',
        'Local Transport',
        'Experienced Pilot',
        'Safety Briefing',
        'licensed pilots',
      ],
    },
    {
      title: 'Long Flight',
      duration: '30-35 Minutes',
      price: '₹3,000 +',
      features: [
        'Extended Flight Time',
        'HD Video Recording',
        'Insurance Included',
        'Local Transport',
        'Experienced Pilot',
        'Safety Briefing',
      ],
      popular: true,
    },
  ];

  const handlePackageClick = (pkg: typeof packages[0]) => {
    setFormData(prev => ({
      ...prev,
      experience: pkg.title,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatBookingFormMessage({
      ...formData,
      experience: formData.experience || 'Not specified',
    });
    const whatsappUrl = getWhatsAppUrl(message, QUERY_WHATSAPP_NUMBER);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="offers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Special <span className="text-orange-500">Offers</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Book directly with us and get the best flying times with premium
            inclusions at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${
                pkg.popular
                  ? 'border-orange-500 border-2 shadow-xl scale-105'
                  : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl mb-2">{pkg.title}</CardTitle>
                <CardDescription className="flex items-center justify-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-orange-500" />
                  {pkg.duration}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-orange-500">{pkg.price}</span>
                  <span className="text-gray-600"> / person</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Book Your Adventure</CardTitle>
              <CardDescription>Fill in your details and we'll contact you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    placeholder="Phone or Email"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    placeholder="Short/Long Flight"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
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
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  Submit Booking
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8" />
              <span className="text-lg font-semibold">HD Video Included</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8" />
              <span className="text-lg font-semibold">Full Insurance</span>
            </div>
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8" />
              <span className="text-lg font-semibold">Local Transport</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
