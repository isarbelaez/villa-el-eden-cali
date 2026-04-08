export const buildWhatsAppURL = (phone: string, message: string) => {
  const normalized = message.normalize("NFC");
  const encoded = encodeURIComponent(normalized);

  const isMobile = /Android|iPhone/i.test(navigator.userAgent);

  if (isMobile) {
    return `whatsapp://send?phone=${phone}&text=${encoded}`;
  }

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
};