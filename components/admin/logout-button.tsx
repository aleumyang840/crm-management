"use client"

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // Hard refresh to trigger middleware and clear user state
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
    >
      <LogOut className="h-5 w-5 mr-2" />
      Logout
    </button>
  );
}
