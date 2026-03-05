export type ProductCategory = "cigarette" | "cigar" | "ecig"

export type Strength = "淡" | "中" | "浓"

export type BaseProduct = {
  id: string
  category: ProductCategory
  brand: string
  series: string
  nameZh: string
  nameEn?: string
  origin: string
  priceCny: number
  notes: string
  tags: string[]
}

export type CigaretteProduct = BaseProduct & {
  category: "cigarette"
  kind: "烤烟" | "混合型" | "薄荷" | "爆珠" | "细支" | "中支"
  tarMg: number
  nicotineMg: number
  pack: "硬盒" | "软包" | "铁盒" | "礼盒"
}

export type CigarProduct = BaseProduct & {
  category: "cigar"
  size: string
  wrapper: string
  binder: string
  filler: string
  strength: Strength
}

export type EcigProduct = BaseProduct & {
  category: "ecig"
  deviceType: "一次性" | "换弹式" | "开放式"
  batteryMah: number
  liquidMl: number
  nicotinePercent: number
  flavors: string[]
  features: string[]
}

export type Product = CigaretteProduct | CigarProduct | EcigProduct

