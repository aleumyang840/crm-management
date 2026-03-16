import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold tracking-tight">Lead #{id}</h1>
          <Badge>New</Badge>
        </div>
        <Link href="/admin/leads">
          <Button variant="outline">Back to Leads</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-500">Name:</span>
              <p className="mt-1">Hong Gildong</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Phone:</span>
              <p className="mt-1">010-1234-5678</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Region:</span>
              <p className="mt-1">Seoul</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Birth Date:</span>
              <p className="mt-1">1990-05-15</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Source Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-500">UTM Source:</span>
              <p className="mt-1 text-muted-foreground">facebook</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">UTM Campaign:</span>
              <p className="mt-1 text-muted-foreground">summer_sale</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
