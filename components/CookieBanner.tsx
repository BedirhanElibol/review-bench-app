'use client';

export function CookieBanner({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed bottom-0 inset-x-0 p-4 bg-white shadow-lg">
      <p>We use cookies to improve your experience and for analytics.</p>
      <button onClick={onAccept} className="btn-primary">Accept all</button>
    </div>
  );
}
