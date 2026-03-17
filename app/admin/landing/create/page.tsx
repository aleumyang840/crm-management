"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Loader2, Sparkles } from "lucide-react"

// 이름 → slug 자동 변환 함수
function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")          // 공백, 언더스코어 → 하이픈
    .replace(/[^a-z0-9ㄱ-ㅎ가-힣-]/g, "") // 특수문자 제거
    .replace(/-+/g, "-")               // 연속 하이픈 정리
    .replace(/^-|-$/g, "")            // 앞뒤 하이픈 제거
}

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft (작성중)", color: "secondary" as const },
  { value: "active", label: "Active (운영중)", color: "default" as const },
  { value: "inactive", label: "Inactive (중지)", color: "destructive" as const },
]

const TEMPLATE_OPTIONS = [
  { value: "default", label: "Default — Hero + Features + CTA + Form" },
  { value: "minimal", label: "Minimal — Hero + Form" },
]

type LandingStatus = "draft" | "active" | "inactive"
type LandingTemplate = "default" | "minimal"

interface LandingForm {
  name: string
  slug: string
  template: LandingTemplate
  status: LandingStatus
}

export default function CreateLandingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<LandingForm>({
    name: "",
    slug: "",
    template: "default",
    status: "draft",
  })
  const [slugEdited, setSlugEdited] = useState(false)

  // name 변경 시 slug 자동 생성
  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugEdited ? prev.slug : toSlug(value),
    }))
  }

  const handleSlugChange = (value: string) => {
    setSlugEdited(true)
    setForm((prev) => ({ ...prev, slug: toSlug(value) }))
  }

  const handleSubmit = async (status: string) => {
    setError("")
    if (!form.name.trim()) { setError("캠페인 이름을 입력해 주세요."); return; }
    if (!form.slug.trim()) { setError("슬러그를 입력해 주세요."); return; }

    setLoading(true)
    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "생성 실패. 다시 시도해 주세요.")
      } else {
        router.push("/admin/landing")
        router.refresh()
      }
    } catch (e) {
      setError("서버 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === form.status)

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">새 랜딩 페이지 만들기</h1>
          <p className="text-muted-foreground mt-1 text-sm">캠페인 URL과 템플릿을 설정하세요.</p>
        </div>
        <Link href="/admin/landing">
          <Button variant="outline">취소</Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>캠페인 이름을 입력하면 URL 슬러그가 자동 생성됩니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 캠페인 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name">캠페인 이름 *</Label>
            <Input
              id="name"
              placeholder="예: 여름 보험 캠페인"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">URL 슬러그 *</Label>
              {form.slug && (
                <span className="text-xs text-muted-foreground">
                  미리보기: <span className="font-mono text-blue-600">/landing/{form.slug}</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground shrink-0">
                /landing/
              </div>
              <Input
                id="slug"
                className="flex-1 font-mono"
                placeholder="summer-insurance-2024"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                title="이름으로 재생성"
                onClick={() => {
                  setSlugEdited(false)
                  setForm((prev) => ({ ...prev, slug: toSlug(prev.name) }))
                }}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">소문자, 숫자, 하이픈(-) 만 사용 가능합니다.</p>
          </div>

          {/* 템플릿 */}
          <div className="space-y-2">
            <Label>템플릿</Label>
            <Select
              value={form.template}
              onValueChange={(v) => setForm((prev) => ({ ...prev, template: v as LandingTemplate }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 상태 선택 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>발행 상태</CardTitle>
          <CardDescription>초기 상태를 선택하거나 하단 버튼으로 바로 운영 상태로 저장할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, status: s.value as LandingStatus }))}
                className={`rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                  form.status === s.value
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-transparent bg-gray-50/80 hover:bg-gray-100/60"
                }`}
              >
                <Badge variant={s.color} className="mb-2 text-xs">{s.value}</Badge>
                <p className="text-sm font-medium text-gray-800">{s.label.split(" ")[0]}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.value === "draft" ? "비공개, 수정 중" : s.value === "active" ? "외부 접근 허용" : "페이지 비활성"}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex gap-3 pt-2">
        <Button
          className="flex-1 h-12"
          onClick={() => handleSubmit(form.status)}
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          저장하기 ({currentStatus?.label.split(" ")[0]})
        </Button>
      </div>
    </div>
  )
}
