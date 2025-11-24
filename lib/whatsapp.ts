// WhatsApp utility functions

// WhatsApp numbers - Update these with your actual WhatsApp numbers
// Format: 919876543210 (country code + number without + or spaces)
export const WHATSAPP_NUMBERS = ['917580053446', '917590053446']; // Both WhatsApp numbers
export const QUERY_WHATSAPP_NUMBER = '917590053446'; // For queries/contact form

/**
 * Format WhatsApp URL with message for a specific number
 */
export function getWhatsAppUrl(message: string, number?: string): string {
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = number || WHATSAPP_NUMBERS[0];
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp for all numbers with the same message
 */
export function openWhatsAppForAllNumbers(message: string): void {
  WHATSAPP_NUMBERS.forEach((number, index) => {
    // Add a small delay between opening each WhatsApp chat to avoid popup blockers
    setTimeout(() => {
      const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }, index * 300); // 300ms delay between each
  });
}

/**
 * Format contact form message for WhatsApp
 */
export function formatContactFormMessage(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}): string {
  let message = `*New Contact Form Inquiry*\n\n`;
  message += `*Name:* ${data.name}\n`;
  message += `*Email:* ${data.email}\n`;
  message += `*Phone:* ${data.phone}\n`;
  message += `*Service Interested In:* ${data.service}\n`;
  if (data.date) {
    message += `*Preferred Date:* ${data.date}\n`;
  }
  if (data.message) {
    message += `*Message:* ${data.message}\n`;
  }
  return message;
}

/**
 * Format booking form message for WhatsApp
 */
export function formatBookingFormMessage(data: {
  name: string;
  contact: string;
  experience: string;
  date: string;
}): string {
  let message = `*New Booking Inquiry*\n\n`;
  message += `*Name:* ${data.name}\n`;
  message += `*Contact:* ${data.contact}\n`;
  if (data.experience) {
    message += `*Experience:* ${data.experience}\n`;
  }
  if (data.date) {
    message += `*Preferred Date:* ${data.date}\n`;
  }
  return message;
}

/**
 * Format package booking message for WhatsApp
 */
export function formatPackageBookingMessage(data: {
  packageName: string;
  price?: string;
  duration?: string;
  location?: string;
  serviceType?: string;
}): string {
  let message = `*New Package Booking Inquiry*\n\n`;
  message += `*Package:* ${data.packageName}\n`;
  if (data.price) {
    message += `*Price:* ${data.price}\n`;
  }
  if (data.duration) {
    message += `*Duration:* ${data.duration}\n`;
  }
  if (data.location) {
    message += `*Location:* ${data.location}\n`;
  }
  if (data.serviceType) {
    message += `*Service Type:* ${data.serviceType}\n`;
  }
  message += `\nPlease provide your details to confirm the booking.`;
  return message;
}

