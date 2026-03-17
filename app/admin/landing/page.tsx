"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, ExternalLink, Copy, Pencil, Loader2 } from "lucide-react"

interface LandingPage {
  id: string
  name: string
  slug: string
  template: string
  status: string
  lead_count: number
  created_at: string
}

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  active:   { label: "Active",   variant: "default"     },
  draft:    { label: "Draft",    variant: "secondary"   },
  inactive: { label: "Inactive", variant: "destructive" },
}

export default function LandingPagesListPage() {
  const [pages, setPages] = useState<LandingPage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const fetchPages = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/landing")
      const data = await res.json()
      setPages(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPages() }, [])

  const handleClone = async (page: LandingPage) => {
    const newSlug = `${page.slug}-copy-${Date.now().toString().slice(-4)}`
    const res = await fetch("/api/landing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${page.name} (복사본)`,
        slug: newSlug,
        template: page.template,
        status: "draft",
      }),
    })
    if (res.ok) fetchPages()
    else alert("복사 실패. 다시 시도해 주세요.")
  }

  const filtered = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landing Pages</h1>
          <p className="text-muted-foreground mt-1 text-sm">총 {pages.length}개의 캠페인 페이지</p>
        </div>
        <Link href="/admin/landing/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> 새 페이지 만들기
          </Button>
        </Link>
      </div>

      {/* 검색 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="이름 또는 슬러그 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 테이블 */}
      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> 불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground space-y-3">
            <p>{search ? "검색 결과가 없습니다." : "아직 랜딩 페이지가 없어요."}</p>
            {!search && (
              <Link href="/admin/landing/create">
                <Button size="sm" variant="outline">첫 페이지 만들기</Button>
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="border-b bg-gray-50/80 text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium w-[30%]">캠페인 이름</th>
                <th className="px-5 py-3 font-medium">URL</th>
                <th className="px-5 py-3 font-medium">상태</th>
                <th className="px-5 py-3 font-medium text-center">리드 수</th>
                <th className="px-5 py-3 font-medium">등록일</th>
                <th className="px-5 py-3 font-medium text-right">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((page) => {
                const badge = STATUS_BADGE[page.status] ?? { label: page.status, variant: "secondary" as const }
                return (
                  <tr key={page.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-800">{page.name}</td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
                        /landing/{page.slug}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </td>
                    <td className="px-5 py-4 text-center font-medium">{page.lead_count ?? 0}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(page.created_at).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/landing/${page.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" title="미리보기">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" title="복사" onClick={() => handleClone(page)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Link href={`/admin/landing/${page.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Pencil className="h-3 w-3" /> 수정
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
