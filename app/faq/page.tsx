import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'How do I book an adventure?',
          answer:
            'You can book directly through our website, call us at +91 98765 43210, or send us a WhatsApp message. We recommend booking in advance, especially during peak season (October-November and March-June).',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept cash, UPI, credit/debit cards, and online bank transfers. A small advance payment may be required to confirm your booking, with the balance payable on the day of the activity.',
        },
        {
          question: 'What is your cancellation policy?',
          answer:
            'Cancellations made 48 hours before the scheduled activity receive a full refund. Cancellations within 24-48 hours receive 50% refund. No refund for same-day cancellations. Weather-related cancellations are fully refundable or can be rescheduled.',
        },
      ],
    },
    {
      category: 'Paragliding',
      questions: [
        {
          question: 'How much does paragliding cost?',
          answer:
            'Our tandem paragliding flights start from ₹2,500 for a 15-20 minute short flight and ₹3,500 for a 30-35 minute long flight. All packages include HD video recording, insurance, local transport, and experienced pilot.',
        },
        {
          question: 'What is included in the paragliding package?',
          answer:
            'All our packages include HD video recording of your flight, comprehensive insurance coverage, local transport to and from the take-off site, all necessary safety equipment, pre-flight safety briefing, and an experienced certified pilot.',
        },
        {
          question: 'What is the best time for paragliding?',
          answer:
            'The best time for paragliding in Bir Billing is from October to June. The peak season is from October to November and March to June when weather conditions are most favorable. Early morning and late afternoon flights offer the best thermals and views.',
        },
        {
          question: 'Is paragliding safe?',
          answer:
            'Yes, paragliding with us is extremely safe. We use certified equipment meeting international safety standards, employ only licensed and experienced pilots, conduct thorough safety briefings, and maintain strict safety protocols. Weather conditions are carefully monitored before each flight.',
        },
        {
          question: 'Do I need prior experience?',
          answer:
            'No prior experience is required for tandem paragliding. Our experienced pilots handle all technical aspects while you simply enjoy the flight. Basic physical fitness is sufficient.',
        },
        {
          question: 'What is the weight limit?',
          answer:
            'The weight limit for tandem paragliding is typically between 30 kg to 100 kg. For passengers outside this range, please contact us in advance to make special arrangements.',
        },
      ],
    },
    {
      category: 'Camping & Trekking',
      questions: [
        {
          question: 'What should I bring for camping?',
          answer:
            'We provide tents, sleeping bags, and camping equipment. You should bring comfortable clothing, a jacket for cold nights, personal toiletries, a flashlight, and any personal medications. We recommend layers as mountain weather can change quickly.',
        },
        {
          question: 'Are meals included in camping packages?',
          answer:
            'Yes, all our camping packages include meals. We serve freshly prepared food using local ingredients. Special dietary requirements can be accommodated with advance notice.',
        },
        {
          question: 'What is the difficulty level of treks?',
          answer:
            'We offer treks for all fitness levels. Our day treks are suitable for beginners, while multi-day treks require moderate fitness. Each trek listing includes difficulty ratings and fitness requirements.',
        },
      ],
    },
    {
      category: 'Extreme Sports',
      questions: [
        {
          question: 'Is bungee jumping scary?',
          answer:
            'Bungee jumping is an adrenaline-pumping activity that many find thrilling rather than scary. Our professional team provides thorough briefing and support. First-timers are welcome, and our safety record is impeccable.',
        },
        {
          question: 'What safety measures are in place?',
          answer:
            'All extreme sports activities use internationally certified equipment that is regularly inspected. Activities are supervised by trained professionals with years of experience. Comprehensive safety briefings are mandatory before each activity.',
        },
        {
          question: 'Can I do multiple activities in one day?',
          answer:
            'Yes, we offer combo packages that let you experience multiple activities in one day at discounted rates. Contact us to create a customized adventure package.',
        },
      ],
    },
    {
      category: 'Practical Information',
      questions: [
        {
          question: 'What should I wear?',
          answer:
            'Wear comfortable outdoor clothing. For paragliding, wear full pants and closed shoes (sports or trekking shoes). Avoid loose accessories. For camping and trekking, layered clothing is recommended. For extreme sports, comfortable athletic wear is suitable.',
        },
        {
          question: 'How do I reach Bir Billing?',
          answer:
            'Bir Billing is accessible by road from Dharamshala (70 km), Pathankot (140 km), and Chandigarh (240 km). The nearest airport is Dharamshala (Gaggal Airport). We can arrange transportation from these locations.',
        },
        {
          question: 'Do you provide accommodation?',
          answer:
            "While we don't directly provide accommodation, we can recommend excellent hotels, guesthouses, and homestays in Bir to suit all budgets. We can also assist with booking.",
        },
        {
          question: 'What if weather is bad on my booking day?',
          answer:
            'Safety is our priority. If weather conditions are unsuitable, we will reschedule your activity at no extra charge or provide a full refund. We monitor weather continuously and will inform you in advance of any changes.',
        },
      ],
    },
  ];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gradient-to-b from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about our adventure activities
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${categoryIndex}-${index}`}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-orange-500 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6">
              Can't find the answer you're looking for? Our team is here to help!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
