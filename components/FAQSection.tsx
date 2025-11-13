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
        'Our tandem paragliding flights start from ₹2,500 for a 15-20 minute short flight and ₹3,500 for a 30-35 minute long flight. All packages include HD video recording, insurance, local transport, and experienced pilot.',
    },
    {
      question: 'What is included in the package?',
      answer:
        'All our packages include HD video recording of your flight, comprehensive insurance coverage, local transport to and from the take-off site, all necessary safety equipment, pre-flight safety briefing, and an experienced certified pilot.',
    },
    {
      question: 'What is the best time for paragliding in Bir Billing?',
      answer:
        'The best time for paragliding is from October to June. The peak season is from October to November and March to June when weather conditions are most favorable. Early morning and late afternoon flights offer the best thermals and views.',
    },
    {
      question: 'Is paragliding safe?',
      answer:
        'Yes, paragliding with us is extremely safe. We use certified equipment that meets international safety standards, employ only licensed and experienced pilots, conduct thorough safety briefings, and maintain strict safety protocols. Weather conditions are carefully monitored before each flight.',
    },
    {
      question: 'Do I need any prior experience?',
      answer:
        'No prior experience is required for tandem paragliding. Our experienced pilots will handle all the technical aspects while you simply enjoy the flight. A basic physical fitness level is sufficient.',
    },
    {
      question: 'What is the weight limit?',
      answer:
        'The weight limit for tandem paragliding is typically between 30 kg to 100 kg. For passengers outside this range, please contact us in advance to make special arrangements.',
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
