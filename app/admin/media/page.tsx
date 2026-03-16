import { Button } from "@/components/ui/button"

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
        <Button>Upload Image to R2</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Placeholders for images */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-white rounded-md border flex flex-col items-center justify-center p-2 hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex-1 w-full bg-gray-100 rounded flex items-center justify-center mb-2">
              <span className="text-gray-400">img.png</span>
            </div>
            <div className="text-xs text-gray-500 truncate w-full text-center">
              sample-{i}.png
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
