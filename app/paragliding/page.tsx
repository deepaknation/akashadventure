import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Video, Shield, Car, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ParaglidingPage() {
  const packages = [
    {
      title: 'Short Flight',
      duration: '15-20 Minutes',
      price: '₹2,500',
      features: [
        'Perfect for first-timers',
        'HD video recording',
        'Insurance included',
        'Local transport',
        'Experienced pilot',
        'Safety briefing',
      ],
    },
    {
      title: 'Long Flight',
      duration: '30-35 Minutes',
      price: '₹3,500',
      features: [
        'Extended flight time',
        'More aerial maneuvers',
        'HD video recording',
        'Insurance included',
        'Local transport',
        'Experienced pilot',
        'Safety briefing',
      ],
      popular: true,
    },
    {
      title: 'Photography Flight',
      duration: '25-30 Minutes',
      price: '₹4,000',
      features: [
        'Professional photography',
        'Multiple camera angles',
        'High-resolution photos',
        'HD video recording',
        'Insurance included',
        'Local transport',
      ],
    },
  ];

  const inclusions = [
    { icon: Video, text: 'HD Video Recording' },
    { icon: Shield, text: 'Full Insurance Coverage' },
    { icon: Car, text: 'Local Transport' },
    { icon: MapPin, text: 'Pickup from Hotel' },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-sky-500 to-sky-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Tandem Paragliding</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Soar like a bird over the stunning Bir Billing valley with our certified pilots
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-orange-500">Flight Package</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Select the perfect paragliding experience for your adventure level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                    asChild
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <Link href="/contact">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">What's Included</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {inclusions.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <item.icon className="h-10 w-10 mb-3" />
                  <span className="text-lg font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why <span className="text-orange-500">Bir Billing</span>?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Bir Billing is recognized as one of the top three paragliding sites in the
                  world. Located in the Kangra district of Himachal Pradesh, it offers perfect
                  conditions for both beginners and professional pilots.
                </p>
                <p>
                  The take-off site at Billing (2400m) and landing site at Bir (1400m) provide
                  an ideal 1000m elevation difference. The consistent thermals, stunning
                  Himalayan views, and safe landing areas make it a paragliding paradise.
                </p>
                <p>
                  With our experienced pilots and perfect weather conditions from October to
                  June, you're guaranteed an unforgettable flying experience over pristine
                  valleys, green forests, and traditional Himachali villages.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=1200)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
