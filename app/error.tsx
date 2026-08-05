'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-4xl font-bold mb-4">500 - Server Error</h2>
      <button onClick={() => reset()} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
        Try Again
      </button>
    </div>
  );
}
