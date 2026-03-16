import { LogOut, User } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white/50 backdrop-blur-xl px-6">
      <div className="flex flex-1 items-center">
        {/* Placeholder for search or other header elements */}
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <User className="h-5 w-5 mr-2" />
          Admin User
        </button>
        <button className="flex items-center text-sm font-medium text-red-600 hover:text-red-700">
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
}
