import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <Button variant="default" size="lg">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  )
}

