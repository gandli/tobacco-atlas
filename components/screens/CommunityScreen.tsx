"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { cx } from "@/lib/utils"

type Post = {
  id: string
  user: string
  title: string
  body: string
  tags: string[]
  time: string
}

const posts: Post[] = [
  {
    id: "p1",
    user: "烟火研究所",
    title: "卷烟里“香甜”和“干净”的差别怎么判断？",
    body: "同样是甜，有的偏蜂蜜、有的偏焦糖。你通常用哪些关键词来描述？分享一下你的口粮。",
    tags: ["卷烟", "口感", "新手"],
    time: "刚刚",
  },
  {
    id: "p2",
    user: "小雪茄玩家",
    title: "长城 132 与 王冠 经典，入门该怎么选？",
    body: "我更怕苦和辣，想要木香+奶油感。你们觉得哪款更友好？",
    tags: ["雪茄", "入门", "长城"],
    time: "2h",
  },
  {
    id: "p3",
    user: "雾化器收集者",
    title: "换弹 vs 一次性：你更在意口感还是省事？",
    body: "一次性真的方便，但有些口味层次不够。换弹又要维护。你怎么选？",
    tags: ["电子烟", "对比", "体验"],
    time: "1d",
  },
]

export function CommunityScreen() {
  const [likes, setLikes] = useState<Record<string, number>>({ p1: 42, p2: 18, p3: 67 })

  const list = useMemo(() => posts, [])

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="讨论 / Talk"
        title="社区 / Community"
        subtitle="模拟社区：可用于未来接入评论、动态与评分系统。"
      />

      <div className="grid gap-3">
        {list.map((p, i) => (
          <article
            key={p.id}
            className="animate-fade-up rounded-2xl border hairline bg-panel p-4 shadow-soft"
            style={{ animationDelay: `${Math.min(i * 25, 200)}ms` }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span className="truncate">{p.user}</span>
                  <span className="h-1 w-1 rounded-full bg-black/20" />
                  <span>{p.time}</span>
                </div>
              </div>
              <Badge tone="accent">{likes[p.id] ?? 0} 赞</Badge>
            </div>

            <p className="mt-3 text-sm text-ink-700">{p.body}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] text-ink-700">
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <Button
                variant="soft"
                size="sm"
                onClick={() => setLikes((s) => ({ ...s, [p.id]: (s[p.id] ?? 0) + 1 }))}
              >
                点赞 / Like
              </Button>
              <button
                type="button"
                className={cx(
                  "rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink-700 transition hover:bg-black/5",
                )}
              >
                评论 / Comment (Mock)
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
