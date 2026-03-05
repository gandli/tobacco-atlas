import Link from "next/link"

export default function NotFound() {
  return (
    <div className="py-14">
      <div className="rounded-2xl border hairline bg-panel-strong p-5 shadow-soft">
        <div className="text-sm text-muted">404</div>
        <h1 className="mt-1 text-xl font-semibold tracking-tight">页面不存在 / Not found</h1>
        <p className="mt-2 text-sm text-muted">你要找的产品或页面可能已被移动，或者尚未收录。</p>
        <Link
          href="/brands"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-ember-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-ember-500/90"
        >
          返回品牌 / Back to Brands
        </Link>
      </div>
    </div>
  )
}
