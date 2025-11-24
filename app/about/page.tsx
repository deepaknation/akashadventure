import { Button } from '@/components/ui/button';
import { Shield, Award, Users, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We use certified equipment and follow strict safety protocols.',
    },
    {
      icon: Award,
      title: 'Expert Team',
      description: 'Our pilots and guides are certified professionals with years of experience.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'We are committed to providing personalized service and unforgettable experiences.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our adventure services.',
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your trusted partner for adventure experiences in Bir Billing
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-orange-500">Akash Adventures</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Akash Adventures is a government registered adventure company in Bir Billing,
                  Himachal Pradesh. We provide the best paragliding services in Bir Billing with
                  a team of eight certified paragliding licensed professionals who have 10+ years
                  of experience in the adventure tourism industry. We have established ourselves as
                  the premier choice for paragliding and adventure sports in the region.
                </p>
                <p>
                  Founded with a passion for adventure and a commitment to safety, we specialize
                  in tandem paragliding, camping, trekking, bungee jumping, and various extreme
                  sports. Our team of certified professionals with paragliding licenses ensures
                  that every adventure is not only thrilling but also completely safe.
                </p>
                <p>
                  We take pride in our state-of-the-art equipment, comprehensive insurance
                  coverage, and personalized service. Whether you're a first-time flyer or an
                  experienced adventurer, we create unforgettable experiences tailored to your
                  comfort level. All our paragliding sessions are conducted with certified tandem
                  pilots, safety gear including harnesses, helmets, and reserve parachutes.
                </p>
                <p>
                  Our office is located at Bir Billing Road Near Tourism Office, and we're open
                  7 days a week to serve you. We accept multiple payment methods including Google Pay,
                  Phone Pe, Cash, Net Banking, and Paytm for your convenience.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl"
                style={{
                  backgroundImage:
                    'url(/gallery/DSC_0166.JPG)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied adventurers who have experienced the thrill with us
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100"
          >
            <Link href="/contact">Book Your Experience</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
