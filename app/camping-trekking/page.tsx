import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MapPin, Tent, Mountain } from 'lucide-react';
import Link from 'next/link';

export default function CampingTrekkingPage() {
  const packages = [
    {
      title: 'Overnight Camping',
      location: 'Bir Forest Camp',
      price: '₹1,500',
      features: [
        'Tent accommodation',
        'Bonfire evening',
        'Dinner & breakfast',
        'Camping equipment',
        'Guide included',
      ],
    },
    {
      title: 'Rajgundha Trek',
      location: '2-Day Trek',
      price: '₹3,500',
      features: [
        'Guided trek',
        'Camping at Rajgundha',
        'All meals included',
        'Camping equipment',
        'Local guide',
        'Beautiful meadows',
      ],
      popular: true,
    },
    {
      title: 'Billing Trek',
      location: 'Day Trek',
      price: '₹1,200',
      features: [
        'Trek to Billing',
        'Experienced guide',
        'Packed lunch',
        'Scenic views',
        'Photo opportunities',
      ],
    },
  ];

  const highlights = [
    {
      icon: Mountain,
      title: 'Scenic Trails',
      description: 'Explore pristine Himalayan trails with breathtaking views',
    },
    {
      icon: Tent,
      title: 'Premium Camping',
      description: 'Quality tents and camping equipment for your comfort',
    },
    {
      icon: MapPin,
      title: 'Expert Guides',
      description: 'Local guides with extensive knowledge of the region',
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Camping & Trekking</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the beauty of the Himalayas through guided treks and camping experiences
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-500">Packages</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose from our carefully curated trekking and camping experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular
                    ? 'border-orange-500 border-2 shadow-xl'
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
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                    {pkg.location}
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
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-full min-h-[400px] order-2 lg:order-1">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl"
                style={{
                  backgroundImage:
                    'url(https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1200)',
                }}
              ></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Explore the <span className="text-orange-500">Himalayas</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our camping and trekking experiences are designed to immerse you in the
                  natural beauty of the Himalayas. Whether you're seeking a peaceful overnight
                  camp or an adventurous multi-day trek, we have the perfect package for you.
                </p>
                <p>
                  Trek through lush forests, alpine meadows, and traditional villages while
                  camping under star-filled skies. Our experienced guides ensure your safety
                  and share fascinating insights about the local culture and ecology.
                </p>
                <p>
                  All our camping packages include quality equipment, meals prepared with fresh
                  local ingredients, and comfortable arrangements to make your outdoor
                  experience truly memorable.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Link href="/contact">Plan Your Trek</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
