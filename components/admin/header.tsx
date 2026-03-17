import { User, LogIn } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { LogoutButton } from '@/components/admin/logout-button';

export async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white/50 backdrop-blur-xl px-6">
      <div className="flex flex-1 items-center">
        {/* Placeholder for search or other header elements */}
      </div>
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 pr-4 border-r">
              <User className="h-5 w-5 mr-2" />
              Admin User
            </button>
            <LogoutButton />
          </>
        ) : (
          <Link href="/admin/login" className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
