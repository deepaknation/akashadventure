import { Calendar, ArrowUpRight, Feather, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'Soaring High Above Bir Billing',
    slug: 'soaring-high-above-bir-billing',
    date: '12 Nov 2025',
    readTime: '5 min read',
    location: 'Billing Launch Point',
    image:
      'https://images.pexels.com/photos/1562176/pexels-photo-1562176.jpeg?auto=compress&cs=tinysrgb&w=1920',
    excerpt:
      'Experience the heart-pounding moment when you take off from Billing and glide through the Dhauladhar ranges. We capture the wind conditions, pilot tips, and the surreal views you should not miss.',
    contentHighlights: [
      'Best time of day for thermals and smooth winds',
      'Pre-flight rituals that calm the nerves',
      'Photo spots that capture Bir from the clouds',
    ],
  },
  {
    title: 'Preparing For Your First Tandem Flight',
    slug: 'prepping-for-your-first-tandem-flight',
    date: '03 Nov 2025',
    readTime: '7 min read',
    location: 'Bir Training Ground',
    image:
      'https://images.pexels.com/photos/12480863/pexels-photo-12480863.jpeg?auto=compress&cs=tinysrgb&w=1920',
    excerpt:
      'From what to pack to how to breathe when your feet leave the ridge—this guide walks you through every minute of your first tandem paragliding adventure in Bir Billing.',
    contentHighlights: [
      'Packing checklist for mountain weather',
      'Safety briefing decoded in simple language',
      'Mindset hacks to enjoy every second in the air',
    ],
  },
  {
    title: 'Why Bir Billing Is India’s Paragliding Capital',
    slug: 'why-bir-billing-is-paragliding-capital',
    date: '22 Oct 2025',
    readTime: '6 min read',
    location: 'Bir Village',
    image:
      'https://images.pexels.com/photos/3874347/pexels-photo-3874347.jpeg?auto=compress&cs=tinysrgb&w=1920',
    excerpt:
      'We map the evolution of Bir Billing from a serene Tibetan colony to the bustling paragliding capital. Discover the local legends, annual competitions, and hidden cafés loved by pilots.',
    contentHighlights: [
      'Historic milestones that shaped Bir Billing',
      'Community-led sustainability initiatives',
      'Offbeat cafés and stays curated for flyers',
    ],
  },
];

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="pt-20 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-[url('https://images.pexels.com/photos/2894054/pexels-photo-2894054.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center" />
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
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Story
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-8 mt-16 md:grid-cols-2">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-orange-100/60 hover:border-orange-200 shadow-lg shadow-orange-100/40 transition-transform hover:-translate-y-1"
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
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                    >
                      Continue Reading
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
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
