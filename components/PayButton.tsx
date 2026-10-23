'use client';

export function PayButton({ orderId }: { orderId: string }) {
  return (
    <button onClick={async () => { await fetch(`/api/orders/${orderId}/pay`, { method: 'POST' }); }} className="btn-primary">
      Pay now
    </button>
  );
}
