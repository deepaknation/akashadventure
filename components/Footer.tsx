import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/gallery/akashadventurelogo.png"
                alt="Akash Adventures Logo"
                width={240}
                height={240}
                className="h-32 w-auto object-contain"
              />
              {/* <span className="text-xl font-bold text-white">
                Akash Adventures
              </span> */}
            </div>
            <p className="text-sm mb-4">
              Experience the thrill of paragliding, camping, and adventure sports
              in the beautiful Bir Billing, Himachal Pradesh.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100089731390005"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/akashadventure007"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@fly.adventure5032"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm mt-4">
              Website: <a href="https://akashadventures.co.in" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">akashadventures.co.in</a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/paragliding" className="hover:text-orange-500 transition-colors">
                  Tandem Paragliding
                </Link>
              </li>
              <li>
                <Link href="/camping-trekking" className="hover:text-orange-500 transition-colors">
                  Camping & Trekking
                </Link>
              </li>
              <li>
                <Link href="/bungee-jumping" className="hover:text-orange-500 transition-colors">
                  Bungee Jumping
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/MFSBRLXp1MLNWoMn9?g_st=awb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  Bir Billing Road Near Tourism Office, Himachal Pradesh
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:+917580053446" className="hover:text-orange-500 transition-colors block">
                    +91 7580053446
                  </a>
                  <a href="tel:+917590053446" className="hover:text-orange-500 transition-colors block">
                    +91 7590053446
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:info@akashadventures.co.in"
                  className="text-sm hover:text-orange-500 transition-colors"
                >
                  solomanrendy@gmail.com

                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Akash Adventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
