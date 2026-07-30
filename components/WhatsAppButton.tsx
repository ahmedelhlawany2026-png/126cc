'use client';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg animate-[wa-glow_2.2s_ease-in-out_infinite] hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[wa-ping_2.2s_ease-in-out_infinite]" />
      <svg viewBox="0 0 32 32" className="relative w-7 h-7 fill-white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.65 4.53 1.78 6.4L4 29l7.79-1.75A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3Zm0 21.6c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.63 1.04 1-4.5-.25-.4A9.55 9.55 0 0 1 5.4 15c0-5.85 4.76-10.6 10.6-10.6S26.6 9.15 26.6 15 21.85 24.6 16.001 24.6Zm5.79-7.94c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1.01 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55-.19-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.67 0 1.57 1.14 3.09 1.3 3.31.16.21 2.24 3.42 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.19-1.5-.08-.14-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
