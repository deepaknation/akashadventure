import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Zap, Award } from 'lucide-react';
import Link from 'next/link';

export default function BungeeJumpingPage() {
  const activities = [
    {
      title: 'Bungee Jumping',
      height: '50 Meters',
      price: '₹3,500',
      features: [
        'Professional supervision',
        'International safety standards',
        'Photo & video package',
        'Certificate of bravery',
        'Insurance included',
      ],
      popular: true,
    },
    {
      title: 'Sky Cycling',
      height: '40 Meters',
      price: '₹1,500',
      features: [
        'Cycle in the sky',
        'Safety harness',
        'Breathtaking views',
        'Photo opportunities',
        'Guide assistance',
      ],
    },
    {
      title: 'Burma Bridge',
      height: '35 Meters',
      price: '₹1,200',
      features: [
        'Rope bridge crossing',
        'Safety equipment',
        'Stunning valley views',
        'Professional guide',
        'Perfect for beginners',
      ],
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">Extreme Adventures</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Push your limits with bungee jumping, sky cycling, and more extreme sports
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-orange-500">Thrill</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Experience the ultimate adrenaline rush with our extreme adventure activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className={`relative ${
                  activity.popular
                    ? 'border-orange-500 border-2 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                {activity.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Thrilling
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{activity.title}</CardTitle>
                  <CardDescription className="flex items-center justify-center text-lg">
                    <Zap className="h-5 w-5 mr-2 text-orange-500" />
                    {activity.height}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-orange-500">{activity.price}</span>
                    <span className="text-gray-600"> / person</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {activity.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      activity.popular
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    <Link 
                      href={`/contact?service=Bungee Jumping&package=${encodeURIComponent(activity.title)}&price=${encodeURIComponent(activity.price)}&duration=${encodeURIComponent(activity.height)}`}
                    >
                      Book Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Combo Offer Available!</h3>
            <p className="text-xl mb-6">
              Book all three activities and get 20% discount
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-2xl line-through opacity-75">₹6,200</div>
              <div className="text-4xl font-bold">₹4,960</div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              <Link href="/contact">Book Combo Package</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Safety is <span className="text-orange-500">Paramount</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At Akash Adventures, we never compromise on safety. All our extreme sports
                  activities are conducted under strict international safety standards with
                  state-of-the-art equipment.
                </p>
                <p>
                  Our equipment is regularly inspected and certified. Each activity is
                  supervised by trained professionals who have years of experience in adventure
                  sports. We provide comprehensive safety briefings before every activity.
                </p>
                <p>
                  Whether it's your first bungee jump or you're an experienced thrill-seeker,
                  our team ensures that your adventure is not only exhilarating but also
                  completely safe.
                </p>
              </div>
              <div className="mt-8 flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Certified & Insured
                  </h4>
                  <p className="text-gray-600">
                    All our activities are certified and include comprehensive insurance coverage
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px]">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl"
                style={{
                  backgroundImage:
                    'url(/gallery/bungee.jpg)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
