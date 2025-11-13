import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Award, Tag, DollarSign } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Certified pilots and top-grade equipment for your security',
    },
    {
      icon: Award,
      title: 'Best Pilots',
      description: 'Experienced professionals with thousands of successful flights',
    },
    {
      icon: Tag,
      title: 'Special Offers',
      description: 'Competitive pricing with exclusive packages for direct bookings',
    },
    {
      icon: DollarSign,
      title: 'All-In Pricing',
      description: 'No hidden costs - includes video, insurance, and transport',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Your New Adventure <span className="text-orange-500">Starts Here</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Akash Adventures is the largest and most trusted adventure company in
            Bir Billing. With over a decade of experience, we specialize in tandem
            paragliding, camping, trekking, and extreme adventure sports. Our
            certified team ensures your safety while delivering unforgettable
            experiences in the Himalayas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group hover:border-orange-200"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                <feature.icon className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
