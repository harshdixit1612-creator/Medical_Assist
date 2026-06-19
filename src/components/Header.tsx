'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, LifeBuoy, Search, User, CircleUserRound } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isSOSPage = pathname === '/sos';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-brand-navy">
          <Globe className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">Medical Assist</span>
        </Link>

        {/* Desktop Navigation */}
        {!isSOSPage && (
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link href="/sos" className="flex items-center space-x-1 hover:text-brand-navy transition-colors">
              <LifeBuoy className="w-4 h-4" />
              <span>SOS</span>
            </Link>
            
            <Link href="/providers" className="flex items-center space-x-1 bg-brand-blue text-white px-4 py-1.5 rounded-full hover:bg-brand-navy transition-colors">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            
            <button className="flex items-center space-x-1 hover:text-brand-navy transition-colors">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        )}

        {/* User Avatar */}
        <div className="flex items-center">
          <button className="text-brand-navy hover:text-brand-blue transition-colors">
            <CircleUserRound className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
