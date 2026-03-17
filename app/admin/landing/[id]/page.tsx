"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Loader2, Sparkles, Trash2, ExternalLink } from "lucide-react"

function toSlug(value: string): string {
  return value
    .toLowerCase().trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9ㄱ-ㅎ가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

const STATUS_OPTIONS = [
  { value: "draft",    label: "Draft",    desc: "비공개, 수정 중",   color: "secondary"   as const },
  { value: "active",   label: "Active",   desc: "외부 접근 허용",    color: "default"     as const },
  { value: "inactive", label: "Inactive", desc: "페이지 비활성",     color: "destructive" as const },
]

const TEMPLATE_OPTIONS = [
  { value: "default", label: "Default — Hero + Features + CTA + Form" },
  { value: "minimal", label: "Minimal — Hero + Form" },
]

type LandingStatus = "draft" | "active" | "inactive"
type LandingTemplate = "default" | "minimal"

interface LandingPageForm {
  name: string
  slug: string
  template: LandingTemplate
  status: LandingStatus
}

interface LandingPage {
  id: string; name: string; slug: string; template: string; status: string;
}

export default function EditLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = React.use(params)

  const [original, setOriginal] = useState<LandingPage | null>(null)
  const [form, setForm] = useState<LandingPageForm>({ name: "", slug: "", template: "default", status: "draft" })
  const [slugEdited, setSlugEdited] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch(`/api/landing/${id}`)
      .then((r) => r.json())
      .then((data: LandingPage) => {
        setOriginal(data)
        setForm({ name: data.name, slug: data.slug, template: data.template as LandingTemplate, status: data.status as LandingStatus })
      })
  }, [id])

  const handleNameChange = (value: string) => {
    setForm((prev) => ({ ...prev, name: value, slug: slugEdited ? prev.slug : toSlug(value) }))
  }

  const handleSubmit = async () => {
    setError(""); setSaved(false)
    if (!form.name.trim() || !form.slug.trim()) { setError("이름과 슬러그는 필수입니다."); return; }
    setLoading(true)
    try {
      const res = await fetch(`/api/landing/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "저장 실패"); }
      else { setSaved(true); setTimeout(() => setSaved(false), 2000) }
    } catch { setError("서버 오류가 발생했습니다.") }
    finally { setLoading(false) }
  }

  const handleDelete = async () => {
    if (!confirm(`"${form.name}" 랜딩 페이지를 삭제하시겠습니까? (연결된 리드 데이터는 유지됩니다.)`)) return;
    setDeleting(true)
    try {
      const res = await fetch(`/api/landing/${id}`, { method: "DELETE" })
      if (res.ok) { router.push("/admin/landing"); router.refresh() }
      else { const d = await res.json(); setError(d.error || "삭제 실패") }
    } catch { setError("서버 오류.") }
    finally { setDeleting(false) }
  }

  if (!original) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-3" /> 데이터를 불러오는 중...
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">랜딩 페이지 수정</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            URL:{" "}
            <a href={`/landing/${original.slug}`} target="_blank" rel="noreferrer"
              className="text-blue-600 underline font-mono text-xs inline-flex items-center gap-1">
              /landing/{original.slug} <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/landing"><Button variant="outline">목록으로</Button></Link>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {error && <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {saved && <div className="rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">✅ 저장되었습니다.</div>}

      <Card>
        <CardHeader><CardTitle>기본 정보</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">캠페인 이름 *</Label>
            <Input id="name" value={form.name} onChange={(e) => handleNameChange(e.target.value)} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">URL 슬러그 *</Label>
              <span className="text-xs text-muted-foreground font-mono text-blue-600">/landing/{form.slug}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground shrink-0">/landing/</div>
              <Input id="slug" className="flex-1 font-mono" value={form.slug}
                onChange={(e) => { setSlugEdited(true); setForm((p) => ({ ...p, slug: toSlug(e.target.value) })) }} />
              <Button type="button" variant="ghost" size="sm"
                onClick={() => { setSlugEdited(false); setForm((p) => ({ ...p, slug: toSlug(p.name) })) }}>
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>템플릿</Label>
            <Select value={form.template} onValueChange={(v) => setForm((p) => ({ ...p, template: v as LandingTemplate }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 상태 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>발행 상태</CardTitle>
          <CardDescription>현재: <Badge variant={STATUS_OPTIONS.find(s => s.value === form.status)?.color}>{form.status}</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {STATUS_OPTIONS.map((s) => (
              <button key={s.value} type="button"
                onClick={() => setForm((p) => ({ ...p, status: s.value as LandingStatus }))}
                className={`rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                  form.status === s.value ? "border-blue-500 bg-blue-50 shadow-sm" : "border-transparent bg-gray-50/80"
                }`}>
                <Badge variant={s.color} className="mb-2 text-xs">{s.value}</Badge>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full h-12" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        변경사항 저장
      </Button>
    </div>
  )
}
