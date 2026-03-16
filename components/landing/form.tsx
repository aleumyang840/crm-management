"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LeadForm({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Placeholder for API call to /api/lead
    setTimeout(() => {
      setLoading(false)
      alert("상담 신청이 완료되었습니다!") // Submission successful
    }, 1000)
  }

  return (
    <section id="lead-form" className="py-24 bg-gray-50 flex justify-center relative overflow-hidden">
      <div className="max-w-xl w-full px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">상담 신청하기</h2>
          <p className="text-gray-500 mt-3 text-lg">아래 폼을 작성해주시면 빠르게 연락드리겠습니다.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-semibold">이름 (Full Name)</Label>
            <Input id="name" placeholder="홍길동" required className="h-12 bg-gray-50/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-semibold">연락처 (Phone Number)</Label>
            <Input id="phone" type="tel" placeholder="010-1234-5678" required className="h-12 bg-gray-50/50" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region" className="text-gray-700 font-semibold">거주 지역 (Region)</Label>
            <Input id="region" placeholder="서울시 강남구" required className="h-12 bg-gray-50/50" />
          </div>
          <div className="grid grid-cols-3 gap-4">
             <div className="space-y-2">
                <Label htmlFor="birth_year" className="text-gray-700 font-semibold">출생 연도</Label>
                <Input id="birth_year" placeholder="1990" required className="h-12 bg-gray-50/50" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="birth_month" className="text-gray-700 font-semibold">월</Label>
                <Input id="birth_month" placeholder="05" required className="h-12 bg-gray-50/50" />
             </div>
             <div className="space-y-2">
                <Label htmlFor="birth_day" className="text-gray-700 font-semibold">일</Label>
                <Input id="birth_day" placeholder="15" required className="h-12 bg-gray-50/50" />
             </div>
          </div>
          <input type="hidden" name="landing_slug" value={slug} />
          
          <div className="pt-4">
            <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-lg shadow-lg" disabled={loading}>
              {loading ? "제출 중..." : "무료 상담 신청하기"}
            </Button>
          </div>
        </form>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute bottom-0 -translate-y-1/2 right-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
    </section>
  )
}
