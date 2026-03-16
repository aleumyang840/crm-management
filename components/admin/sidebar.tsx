import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Image as ImageIcon 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Landing Pages', href: '/admin/landing', icon: FileText },
  { name: 'Leads CRM', href: '/admin/leads', icon: Users },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6 border-b">
        <span className="text-lg font-bold">Admin CMS + CRM</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100/50 hover:text-gray-900 text-gray-700 transition-colors"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-900" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
