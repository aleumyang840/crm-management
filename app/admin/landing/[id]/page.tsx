import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function EditLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Landing Page (ID: {id})</h1>
        <Link href="/admin/landing">
          <Button variant="outline">Back to List</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-muted-foreground">Landing page editing form and builder goes here.</p>
      </div>
    </div>
  )
}
