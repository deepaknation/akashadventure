import { Calendar, ArrowUpRight, Feather, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'Soaring High Above Bir Billing - Complete Paragliding Guide',
    slug: 'soaring-high-above-bir-billing',
    date: '15 Jan 2025',
    readTime: '8 min read',
    location: 'Billing Launch Point',
    image: '/gallery/IMG-20251120-WA0007.jpg',
    excerpt:
      'Experience the heart-pounding moment when you take off from Billing and glide through the Dhauladhar ranges. We capture the wind conditions, pilot tips, and the surreal views you should not miss.',
    contentHighlights: [
      'Best time of day for thermals and smooth winds',
      'Pre-flight rituals that calm the nerves',
      'Photo spots that capture Bir from the clouds',
      'Safety protocols and equipment checks',
      'What to expect during your first flight',
    ],
    fullContent: `
      <h2>Introduction to Bir Billing Paragliding</h2>
      <p>Bir Billing is recognized as one of the top three paragliding sites in the world. Located in the Kangra district of Himachal Pradesh, it offers perfect conditions for both beginners and professional pilots.</p>
      
      <h2>Best Time for Paragliding</h2>
      <p>The best time of day for paragliding in Bir Billing is typically between 10 AM to 2 PM when thermals are strongest. The ideal months are September to November when weather conditions are most favorable.</p>
      
      <h2>Pre-Flight Preparation</h2>
      <p>Before your flight, our certified pilots will provide a comprehensive safety briefing. This includes:</p>
      <ul>
        <li>Equipment check and harness fitting</li>
        <li>Take-off and landing instructions</li>
        <li>In-flight communication signals</li>
        <li>Emergency procedures</li>
      </ul>
      
      <h2>During Your Flight</h2>
      <p>As you soar above the valley, you'll experience breathtaking views of the Dhauladhar mountain ranges, lush green valleys, and traditional Himachali villages. The flight duration typically ranges from 15-20 minutes for standard flights, and up to 30+ minutes for cross-country flights.</p>
      
      <h2>Safety First</h2>
      <p>At Akash Adventures, safety is our top priority. All our pilots are certified and have 10+ years of experience. We use certified equipment including harnesses, helmets, and reserve parachutes.</p>
      
      <h2>Photo Opportunities</h2>
      <p>Don't forget to capture your adventure! Our GOPRO video recording service ensures you have memories to cherish forever. The best photo spots include the take-off point at Billing (2500m) and the landing site at Bir (1400m).</p>
    `,
  },
  {
    title: 'Complete Guide to Adventure Activities in Bir Billing',
    slug: 'complete-adventure-guide-bir-billing',
    date: '10 Jan 2025',
    readTime: '10 min read',
    location: 'Bir Billing',
    image: '/gallery/bungee.jpg',
    excerpt:
      'Discover all the thrilling adventure activities available in Bir Billing - from paragliding to bungee jumping, camping, and trekking. Your complete guide to making the most of your adventure trip.',
    contentHighlights: [
      'Paragliding experiences and packages',
      'Bungee jumping and extreme sports',
      'Camping and trekking adventures',
      'Best time to visit',
      'What to pack for your adventure',
    ],
    fullContent: `
      <h2>Welcome to Bir Billing - Adventure Capital of India</h2>
      <p>Bir Billing is not just about paragliding. It's a complete adventure destination offering a wide range of thrilling activities for adventure enthusiasts.</p>
      
      <h2>Paragliding Adventures</h2>
      <p>Experience the thrill of flying with our government registered team of 8 certified pilots. We offer:</p>
      <ul>
        <li>Short Flight (15-20 minutes) - Starting from ₹2,000</li>
        <li>Long Flight (30-35 minutes) - Starting from ₹3,500</li>
        <li>Cross Country Flight (20+ minutes) - Starting from ₹3,500</li>
      </ul>
      
      <h2>Bungee Jumping & Extreme Sports</h2>
      <p>Push your limits with our extreme adventure activities:</p>
      <ul>
        <li>Bungee Jumping (50 meters) - ₹3,500</li>
        <li>Sky Cycling (40 meters) - ₹1,500</li>
        <li>Burma Bridge (35 meters) - ₹1,200</li>
        <li>Combo Package (All 3 activities) - ₹4,960 (20% discount)</li>
      </ul>
      
      <h2>Camping & Trekking</h2>
      <p>Explore the pristine Himalayan trails:</p>
      <ul>
        <li>Overnight Camping - Starting from ₹1,000</li>
        <li>Short Trekking (Bir to Billing) - 4:30 hours</li>
        <li>Long Trekking (Billing to Rajgundha) - Multi-day adventure</li>
      </ul>
      
      <h2>Best Time to Visit</h2>
      <p>The best months for adventure activities in Bir Billing are:</p>
      <ul>
        <li>September to November - Perfect weather for paragliding</li>
        <li>March to June - Good for trekking and camping</li>
        <li>December to February - Winter adventures (limited paragliding)</li>
      </ul>
      
      <h2>What to Pack</h2>
      <p>Essential items for your adventure trip:</p>
      <ul>
        <li>Comfortable clothing and sturdy shoes</li>
        <li>Warm layers for mountain weather</li>
        <li>Sunglasses and sunscreen</li>
        <li>Camera or smartphone for photos</li>
        <li>Water bottle and snacks</li>
      </ul>
      
      <h2>Safety & Certification</h2>
      <p>All our activities are conducted with certified professionals and include comprehensive insurance coverage. We follow strict international safety standards.</p>
    `,
  },
];

export default function BlogPage() {
  const [featuredPost] = blogPosts;
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-[url('/gallery/DSC_0166.JPG')] bg-cover bg-center" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 text-orange-100 font-medium uppercase tracking-[0.3em]">
            <Feather className="h-5 w-5" />
            Flight Diaries
            <Feather className="h-5 w-5 rotate-180" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Stories From The Skies Of Bir Billing
          </h1>
          <p className="text-xl sm:text-2xl text-orange-50/90 max-w-3xl mx-auto leading-relaxed">
            Real moments, pro tips, and soulful journeys from India’s paragliding
            capital. Get inspired before you strap in for your next flight.
          </p>
        </div>
      </section>

      <section className="relative -mt-24 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="rounded-3xl overflow-hidden shadow-2xl shadow-orange-200/60 bg-white">
            <div className="grid lg:grid-cols-2">
              <div
                className="h-80 lg:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-orange-500 font-semibold uppercase tracking-wider mb-6">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span>{featuredPost.readTime}</span>
                    <span className="inline-flex items-center gap-2 text-orange-600/80">
                      <MapPin className="h-4 w-4" />
                      {featuredPost.location}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    {featuredPost.contentHighlights.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                  <div className="mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Link href={`/faq/${featuredPost.slug}`}>
                      Read Full Story
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-8 mt-16 md:grid-cols-2">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/faq/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-orange-100/60 hover:border-orange-200 shadow-lg shadow-orange-100/40 transition-transform hover:-translate-y-1 block"
              >
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-sm text-orange-500 font-semibold uppercase tracking-wider mb-4">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    {post.contentHighlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-400"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href={`/faq/${post.slug}`}
                      className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Read Full Blog
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-3xl p-10 sm:p-12 text-center shadow-xl shadow-orange-200/60">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fly Smarter With Our Adventure Briefings
            </h2>
            <p className="text-lg text-orange-50/90 max-w-3xl mx-auto mb-8">
              Subscribe to get curated flight windows, gear checklists, and local
              stories from Bir Billing straight to your inbox before your next
              trip.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
              >
                <Link href="/contact">Join The Insider List</Link>
              </Button>
              <Link
                href="/about"
                className="text-white/80 hover:text-white font-semibold"
              >
                Learn more about our team →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
