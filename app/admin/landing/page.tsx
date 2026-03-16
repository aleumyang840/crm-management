import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockLandingPages = [
  {
    id: "1",
    name: "Insurance Campaign Seoul",
    slug: "insurance-seoul",
    template: "default",
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Loan Promo 2024",
    slug: "loan-campaign01",
    template: "modern",
    status: "draft",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  }
]

export default function LandingPagesList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Landing Pages</h1>
        <Link href="/admin/landing/create">
          <Button>Create New Page</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <div className="w-full">
          <table className="w-full text-sm text-left">
            <thead className="border-b bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug / URL</th>
                <th className="px-4 py-3 font-medium">Template</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLandingPages.map((page) => (
                <tr key={page.id} className="border-b hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium">{page.name}</td>
                  <td className="px-4 py-3 text-gray-500">/landing/{page.slug}</td>
                  <td className="px-4 py-3 capitalize">{page.template}</td>
                  <td className="px-4 py-3">
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(page.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link href={`/admin/landing/${page.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Link href={`/landing/${page.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
