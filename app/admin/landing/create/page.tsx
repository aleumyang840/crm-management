import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function CreateLandingPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create Landing Page</h1>
        <Link href="/admin/landing">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input id="name" placeholder="e.g. Summer Insurance Campaign" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground bg-gray-50 border rounded-md px-3 py-2 text-sm">/landing/</span>
              <Input id="slug" placeholder="e.g. summer-insurance-2024" className="flex-1" />
            </div>
            <p className="text-xs text-muted-foreground">Only use lowercase letters, numbers, and hyphens.</p>
          </div>

          <div className="space-y-2">
            <Label>Template Design</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Template (Hero + Features + Form)</SelectItem>
                <SelectItem value="minimal">Minimal Template (Hero + Form Only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex space-x-2">
            <Button className="flex-1">Save as Draft</Button>
            <Button variant="secondary" className="flex-1">Publish Now</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Visual Template Editor Placeholders would go here */}
    </div>
  )
}
