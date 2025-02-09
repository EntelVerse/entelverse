import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6">
          <AlertCircle size={48} className="text-red-500" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-content-secondary mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-interactive hover:bg-interactive-hover text-base rounded-lg transition-colors"
        >
          <Home size={20} />
          Return to Home
        </Link>
      </div>
    </div>
  );
}