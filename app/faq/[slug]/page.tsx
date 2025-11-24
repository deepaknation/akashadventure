import { Calendar, ArrowLeft, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

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
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Introduction to Bir Billing Paragliding</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">Bir Billing is recognized as one of the top three paragliding sites in the world. Located in the Kangra district of Himachal Pradesh, it offers perfect conditions for both beginners and professional pilots.</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Best Time for Paragliding</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">The best time of day for paragliding in Bir Billing is typically between 10 AM to 2 PM when thermals are strongest. The ideal months are September to November when weather conditions are most favorable.</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Pre-Flight Preparation</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">Before your flight, our certified pilots will provide a comprehensive safety briefing. This includes:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>Equipment check and harness fitting</li>
        <li>Take-off and landing instructions</li>
        <li>In-flight communication signals</li>
        <li>Emergency procedures</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">During Your Flight</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">As you soar above the valley, you'll experience breathtaking views of the Dhauladhar mountain ranges, lush green valleys, and traditional Himachali villages. The flight duration typically ranges from 15-20 minutes for standard flights, and up to 30+ minutes for cross-country flights.</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Safety First</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">At Akash Adventures, safety is our top priority. All our pilots are certified and have 10+ years of experience. We use certified equipment including harnesses, helmets, and reserve parachutes.</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Photo Opportunities</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">Don't forget to capture your adventure! Our GOPRO video recording service ensures you have memories to cherish forever. The best photo spots include the take-off point at Billing (2500m) and the landing site at Bir (1400m).</p>
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
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Welcome to Bir Billing - Adventure Capital of India</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">Bir Billing is not just about paragliding. It's a complete adventure destination offering a wide range of thrilling activities for adventure enthusiasts.</p>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Paragliding Adventures</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">Experience the thrill of flying with our government registered team of 8 certified pilots. We offer:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>Short Flight (15-20 minutes) - Starting from ₹2,500</li>
        <li>Long Flight (30-35 minutes) - Starting from ₹3,500</li>
        <li>Cross Country Flight (20+ minutes) - Starting from ₹3,500</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Bungee Jumping & Extreme Sports</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">Push your limits with our extreme adventure activities:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>Bungee Jumping (50 meters) - ₹3,500</li>
        <li>Sky Cycling (40 meters) - ₹1,500</li>
        <li>Burma Bridge (35 meters) - ₹1,200</li>
        <li>Combo Package (All 3 activities) - ₹4,960 (20% discount)</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Camping & Trekking</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">Explore the pristine Himalayan trails:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>Overnight Camping - Starting from ₹1,000</li>
        <li>Short Trekking (Bir to Billing) - 4:30 hours</li>
        <li>Long Trekking (Billing to Rajgundha) - Multi-day adventure</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Best Time to Visit</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">The best months for adventure activities in Bir Billing are:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>September to November - Perfect weather for paragliding</li>
        <li>March to June - Good for trekking and camping</li>
        <li>December to February - Winter adventures (limited paragliding)</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">What to Pack</h2>
      <p class="text-lg text-gray-700 mb-4 leading-relaxed">Essential items for your adventure trip:</p>
      <ul class="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
        <li>Comfortable clothing and sturdy shoes</li>
        <li>Warm layers for mountain weather</li>
        <li>Sunglasses and sunscreen</li>
        <li>Camera or smartphone for photos</li>
        <li>Water bottle and snacks</li>
      </ul>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">Safety & Certification</h2>
      <p class="text-lg text-gray-700 mb-6 leading-relaxed">All our activities are conducted with certified professionals and include comprehensive insurance coverage. We follow strict international safety standards.</p>
    `,
  },
];

// --- YEH CODE ADD KIYA HAI (Start) ---
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
// --- YEH CODE ADD KIYA HAI (End) ---

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-orange-600 hover:text-orange-700"
          >
            <Link href="/faq">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div
            className="h-96 rounded-2xl bg-cover bg-center mb-8"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-orange-600 font-semibold mb-6">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {post.location}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: post.fullContent }}
            className="blog-content"
          />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Button
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Link href="/contact">Book Your Adventure Now</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}