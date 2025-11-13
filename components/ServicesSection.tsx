import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: 'Tandem Paragliding',
      description: 'Experience the thrill of flying with our certified pilots in the world-famous Bir Billing paragliding site.',
      image: 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['15-35 minute flights', 'HD video included', 'All safety gear provided'],
      price: 'Starting from ₹2,500',
      link: '/paragliding',
    },
    {
      title: 'Camping & Trekking',
      description: 'Explore pristine Himalayan trails and camp under the stars in beautiful locations around Bir.',
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Guided treks', 'Camping equipment', 'Meals included'],
      price: 'Starting from ₹1,500',
      link: '/camping-trekking',
    },
    {
      title: 'Bungee Jumping & More',
      description: 'Push your limits with bungee jumping, sky cycling, and Burma bridge adventures.',
      image: 'https://images.pexels.com/photos/163407/box-sport-men-training-163407.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Multiple activities', 'Professional supervision', 'Special combo offers'],
      price: 'Special discounts available',
      link: '/bungee-jumping',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Recommended <span className="text-orange-500">Services</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Choose from our wide range of adventure activities designed for both
            beginners and experienced thrill-seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-shadow border-gray-200 group"
            >
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-orange-500 font-semibold text-lg mb-4">{service.price}</p>
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-600 group/btn"
                >
                  <Link href={service.link}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
