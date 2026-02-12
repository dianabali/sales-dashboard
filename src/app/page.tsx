import Link from 'next/link';
import { Text, Button } from '@/components/atoms';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <Text variant="h1" as="h1" className="text-blue-600 mb-4">
          Sales Dashboard
        </Text>
        <Text variant="h3" as="h2" className="text-gray-700 mb-6">
          Real-time Analytics & Performance Tracking
        </Text>
        <Text variant="body" className="text-gray-600 mb-8">
          A modern, component-based sales dashboard built with Next.js 15, featuring interactive charts,
          real-time filtering, and comprehensive analytics.
        </Text>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-left">
          <Text variant="h3" as="h3" className="mb-4">
            Features
          </Text>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Interactive charts (Bar, Line, Pie)</li>
            <li>✓ Custom sales threshold filtering</li>
            <li>✓ Real-time data updates</li>
            <li>✓ API integration ready</li>
            <li>✓ Atomic design architecture</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
