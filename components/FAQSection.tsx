'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How much does paragliding cost?',
      answer:
        'Our tandem paragliding flights cost ₹2,000 per person for single person flights and ₹1,700 per person for group bookings (2+ persons). Cross country flights (20+ minutes) start from ₹3,500. All packages include GOPRO video recording, pick up & drop service, and well-skilled pilots with 10+ years experience. Additional ₹500 charge applies for passengers weighing 90-110 kg.',
    },
    {
      question: 'What is included in the package?',
      answer:
        'All our packages include GOPRO video shooting, pick up & drop service, 10-20 minutes flying time in the air, well-skilled pilots with 10+ years experience, all necessary safety gear including harnesses, helmets, and reserve parachutes, comprehensive insurance coverage, and pre-flight safety briefings.',
    },
    {
      question: 'What is the best time for paragliding in Bir Billing?',
      answer:
        'The best flying months are September to November, offering clear skies and stable winds. These months provide perfect weather conditions for paragliding with excellent thermals and stunning views of the Himachal Pradesh landscape.',
    },
    {
      question: 'Is paragliding safe?',
      answer:
        'Yes, paragliding with us is extremely safe. We are government registered and have a team of 8 certified paragliding licensed pilots with 10+ years of experience. All paragliding sessions are conducted with certified tandem pilots, safety gear including harnesses, helmets, and reserve parachutes. Pre-flight safety briefings and equipment checks are mandatory. Weather conditions are carefully monitored, and flights may be rescheduled for adverse weather conditions.',
    },
    {
      question: 'Do I need any prior experience?',
      answer:
        'No prior experience is required for tandem paragliding. Our experienced pilots will handle all the technical aspects while you simply enjoy the flight. A basic physical fitness level is sufficient.',
    },
    {
      question: 'What is the weight limit?',
      answer:
        'The weight limit for participants is between 28 kg to 90 kg. If you weigh between 90 kg to 110 kg, an additional charge of ₹500 applies. For participants outside this range, please contact us in advance to make special arrangements. The recommended age is 16-45 years.',
    },
    {
      question: 'How do I book?',
      answer:
        'You can book directly through our website, call us, or send a WhatsApp message. We recommend booking in advance, especially during peak season. A small advance payment may be required to confirm your booking.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Wear comfortable clothing suitable for outdoor activities. We recommend full pants, closed shoes (sports shoes or trekking shoes), and layers as temperature varies with altitude. Avoid loose accessories that might fall during flight.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Get answers to common questions about our adventure activities
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg px-6"
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
    </section>
  );
}
