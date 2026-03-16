import { Users, UserPlus, FileText, Activity } from 'lucide-react'
import { StatCard } from '@/components/admin/stat-card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value="1,234"
          description="+20.1% from last month"
          icon={Users}
        />
        <StatCard
          title="Leads Today"
          value="45"
          description="+15% from yesterday"
          icon={UserPlus}
        />
        <StatCard
          title="Active Landing Pages"
          value="12"
          description="3 campaigns draft"
          icon={FileText}
        />
        <StatCard
          title="Conversion Rate"
          value="4.2%"
          description="+1.2% from last week"
          icon={Activity}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow pb-4">
          <div className="flex flex-col space-y-1.5 p-6 border-b mb-4">
            <h3 className="font-semibold leading-none tracking-tight text-lg">Recent Leads</h3>
            <p className="text-sm text-muted-foreground">The most recent leads captured across all landing pages.</p>
          </div>
          <div className="px-6">
            <div className="h-48 flex items-center justify-center border border-dashed rounded-lg bg-gray-50/50">
              <span className="text-muted-foreground text-sm">Leads Table Component Here</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow pb-4">
          <div className="flex flex-col space-y-1.5 p-6 border-b mb-4">
            <h3 className="font-semibold leading-none tracking-tight text-lg">Top Landing Pages</h3>
            <p className="text-sm text-muted-foreground">Most active pages by total volume.</p>
          </div>
          <div className="px-6">
            <div className="h-48 flex items-center justify-center border border-dashed rounded-lg bg-gray-50/50">
               <span className="text-muted-foreground text-sm">Ranking Component Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
