import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <Link href="/" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue-bright transition-colors">
        Return Home
      </Link>
    </div>
  );
}
