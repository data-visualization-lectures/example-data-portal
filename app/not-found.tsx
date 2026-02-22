import Link from "next/link";
import { Database } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-indigo-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6 max-w-sm">
        The dataset or page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/datasets"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg font-medium transition-colors"
      >
        Browse all datasets
      </Link>
    </div>
  );
}
