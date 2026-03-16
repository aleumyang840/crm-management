"use client"

import { LeadsTable } from "@/components/tables/leads-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns" // need to install this or use raw Date logic. We can use native Intl.DateTimeFormat

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "landing_slug",
    header: "Landing Page",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status")
      let variant = "default"
      if (status === "new") variant = "secondary"
      if (status === "completed") variant = "default"
      
      return <Badge variant={variant as any}>{status}</Badge>
    }
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }: any) => {
      return <span>{new Date(row.getValue("created_at")).toLocaleDateString()}</span>
    }
  }
]

// Mock data for UI testing
const mockData = [
  {
    id: "1",
    name: "Hong Gildong",
    phone: "010-1234-5678",
    landing_slug: "insurance-seoul",
    status: "new",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Kim Chulsoo",
    phone: "010-9876-5432",
    landing_slug: "loan-campaign01",
    status: "contacted",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  }
]

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Leads CRM</h1>
      </div>
      <LeadsTable columns={columns} data={mockData} />
    </div>
  )
}
