// 雪茄保存指南核心数据

export interface PreservationTip {
  id: string;
  icon: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  detailsZh: string[];
  detailsEn: string[];
}

export interface HumidityZone {
  name: string;
  range: string;
  description: string;
  recommendation: string;
}

export interface StorageType {
  id: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  prosZh: string[];
  prosEn: string[];
  consZh: string[];
  consEn: string[];
  recommended: boolean;
}

export interface TroubleshootingIssue {
  id: string;
  symptomZh: string;
  symptomEn: string;
  causeZh: string;
  causeEn: string;
  solutionZh: string[];
  solutionEn: string[];
  severity: "low" | "medium" | "high";
}

export interface FAQ {
  questionZh: string;
  questionEn: string;
  answerZh: string;
  answerEn: string;
}

// 核心保存贴士
export const preservationTips: PreservationTip[] = [
  {
    id: "humidity",
    icon: "droplet",
    titleZh: "湿度控制",
    titleEn: "Humidity Control",
    descriptionZh: "保持 65-70% 的相对湿度是雪茄保存的关键",
    descriptionEn: "Maintaining 65-70% relative humidity is crucial for cigar preservation",
    detailsZh: [
      "理想湿度范围：65-70% RH",
      "湿度过高会导致霉变和燃烧问题",
      "湿度过低会使雪茄干燥，影响口感",
      "使用数字湿度计定期监测",
      "准备保湿包作为湿度缓冲"
    ],
    detailsEn: [
      "Ideal humidity range: 65-70% RH",
      "Too high humidity causes mold and burning issues",
      "Too low humidity dries out cigars, affecting flavor",
      "Use digital hygrometer for regular monitoring",
      "Keep humidity packs as buffer"
    ]
  },
  {
    id: "temperature",
    icon: "thermometer",
    titleZh: "温度控制",
    titleEn: "Temperature Control",
    descriptionZh: "稳定的温度环境确保雪茄陈化质量",
    descriptionEn: "Stable temperature environment ensures cigar aging quality",
    detailsZh: [
      "理想温度：18-21°C (64-70°F)",
      "避免温度剧烈波动",
      "高温会加速烟草甲虫孵化",
      "低温会抑制陈化过程",
      "远离热源和阳光直射"
    ],
    detailsEn: [
      "Ideal temperature: 18-21°C (64-70°F)",
      "Avoid drastic temperature fluctuations",
      "High temperatures accelerate tobacco beetle hatching",
      "Low temperatures inhibit aging process",
      "Keep away from heat sources and direct sunlight"
    ]
  },
  {
    id: "light",
    icon: "sun-off",
    titleZh: "避光存储",
    titleEn: "Dark Storage",
    descriptionZh: "紫外线会损害雪茄的风味和色泽",
    descriptionEn: "UV light damages cigar flavor and color",
    detailsZh: [
      "阳光中的紫外线会分解烟草油脂",
      "导致风味流失和颜色褪色",
      "使用不透明的存储容器",
      "存放在阴暗的柜子或房间",
      "避免展示柜长期受光"
    ],
    detailsEn: [
      "UV rays in sunlight break down tobacco oils",
      "Causes flavor loss and color fading",
      "Use opaque storage containers",
      "Store in dark cabinets or rooms",
      "Avoid long-term light exposure in display cases"
    ]
  },
  {
    id: "ventilation",
    icon: "wind",
    titleZh: "通风要求",
    titleEn: "Ventilation Requirements",
    descriptionZh: "适当的空气流通防止异味和霉变",
    descriptionEn: "Proper air circulation prevents odors and mold",
    detailsZh: [
      "需要微弱的空气交换",
      "完全密封会导致异味积聚",
      "过度通风会使湿度流失",
      "定期打开保湿盒换气",
      "避免与强烈气味物品共存"
    ],
    detailsEn: [
      "Needs minimal air exchange",
      "Complete sealing causes odor buildup",
      "Excessive ventilation causes humidity loss",
      "Open humidor regularly for air exchange",
      "Avoid storing with strong-smelling items"
    ]
  },
  {
    id: "long-term",
    icon: "clock",
    titleZh: "长期保存",
    titleEn: "Long-term Storage",
    descriptionZh: "陈年雪茄需要更精细的管理",
    descriptionEn: "Aged cigars require more careful management",
    detailsZh: [
      "长期保存建议湿度 65-68%",
      "温度保持更严格稳定",
      "使用西班牙雪松木保湿盒",
      "定期检查雪茄状态",
      "记录陈化时间和条件"
    ],
    detailsEn: [
      "Long-term storage recommends 65-68% humidity",
      "Maintain stricter temperature stability",
      "Use Spanish cedar humidors",
      "Regularly inspect cigar condition",
      "Document aging time and conditions"
    ]
  },
  {
    id: "short-term",
    icon: "calendar",
    titleZh: "短期保存",
    titleEn: "Short-term Storage",
    descriptionZh: "日常享用的雪茄可以简化保存",
    descriptionEn: "Daily enjoyment cigars can have simplified storage",
    detailsZh: [
      "短期保存湿度 68-70%",
      "密封盒 + 保湿包即可",
      "避免频繁开合容器",
      "计划 1-3 个月内消耗",
      "无需复杂的陈化管理"
    ],
    detailsEn: [
      "Short-term storage at 68-70% humidity",
      "Sealed container + humidity pack is sufficient",
      "Avoid frequent opening of containers",
      "Plan to consume within 1-3 months",
      "No need for complex aging management"
    ]
  }
];

// 湿度区域说明
export const humidityZones: HumidityZone[] = [
  {
    name: "过低",
    range: "< 60%",
    description: "雪茄会迅速干燥，茄衣开裂，风味严重流失",
    recommendation: "立即增加湿度，使用蒸馏水或保湿液"
  },
  {
    name: "偏低",
    range: "60-64%",
    description: "雪茄偏干，燃烧较快，口感偏淡",
    recommendation: "适当增加湿度至理想范围"
  },
  {
    name: "理想",
    range: "65-70%",
    description: "最佳保存条件，雪茄缓慢陈化，风味发展良好",
    recommendation: "保持当前条件，定期监测"
  },
  {
    name: "偏高",
    range: "71-75%",
    description: "雪茄过湿，燃烧困难，可能影响口感",
    recommendation: "降低湿度，增加通风"
  },
  {
    name: "过高",
    range: "> 75%",
    description: "极易霉变，烟草甲虫风险高，雪茄可能损坏",
    recommendation: "立即降低湿度，检查是否有霉变"
  }
];

// 存储设备类型
export const storageTypes: StorageType[] = [
  {
    id: "humidor",
    nameZh: "传统保湿盒",
    nameEn: "Traditional Humidor",
    descriptionZh: "西班牙雪松木制成的专业雪茄存储盒",
    descriptionEn: "Professional cigar storage box made of Spanish cedar",
    prosZh: [
      "天然调湿性能",
      "雪松木香气有益陈化",
      "美观大方，适合收藏",
      "容量大，可长期存储"
    ],
    prosEn: [
      "Natural humidity regulation",
      "Cedar aroma benefits aging",
      "Elegant appearance, suitable for collection",
      "Large capacity for long-term storage"
    ],
    consZh: [
      "价格较高",
      "需要定期保养",
      "初次使用需要 seasoning",
      "体积较大"
    ],
    consEn: [
      "Higher price",
      "Requires regular maintenance",
      "Needs seasoning before first use",
      "Bulky size"
    ],
    recommended: true
  },
  {
    id: "tupperdor",
    nameZh: "密封盒 + 保湿包",
    nameEn: "Tupperdor (Sealed Container + Boveda)",
    descriptionZh: "食品级密封盒配合双向保湿包的经济方案",
    descriptionEn: "Economical solution with food-grade sealed container and two-way humidity packs",
    prosZh: [
      "成本低廉",
      "维护简单",
      "保湿包自动调节",
      "密封性能好"
    ],
    prosEn: [
      "Low cost",
      "Simple maintenance",
      "Automatic humidity regulation by packs",
      "Good sealing performance"
    ],
    consZh: [
      "缺乏雪松木益处",
      "外观普通",
      "需要定期更换保湿包",
      "容量有限"
    ],
    consEn: [
      "Lacks cedar benefits",
      "Plain appearance",
      "Needs regular pack replacement",
      "Limited capacity"
    ],
    recommended: true
  },
  {
    id: "wineador",
    nameZh: "红酒柜改造",
    nameEn: "Wineador (Wine Cooler Conversion)",
    descriptionZh: "使用红酒恒温柜改造的大容量存储方案",
    descriptionEn: "Large capacity storage using converted wine cooler",
    prosZh: [
      "容量非常大",
      "温度控制精准",
      "适合大量收藏",
      "可可视化展示"
    ],
    prosEn: [
      "Very large capacity",
      "Precise temperature control",
      "Suitable for large collections",
      "Visible display possible"
    ],
    consZh: [
      "改造复杂",
      "初始投资高",
      "耗电",
      "需要额外加湿设备"
    ],
    consEn: [
      "Complex conversion",
      "High initial investment",
      "Power consumption",
      "Needs additional humidification"
    ],
    recommended: false
  },
  {
    id: "travel",
    nameZh: "旅行保湿管",
    nameEn: "Travel Humidor Tube",
    descriptionZh: "便携式雪茄管，适合短期外出携带",
    descriptionEn: "Portable cigar tube for short-term travel",
    prosZh: [
      "便携耐用",
      "保护雪茄不受挤压",
      "自带保湿功能",
      "价格适中"
    ],
    prosEn: [
      "Portable and durable",
      "Protects cigars from crushing",
      "Built-in humidity control",
      "Moderate price"
    ],
    consZh: [
      "容量小",
      "不适合长期存储",
      "保湿能力有限"
    ],
    consEn: [
      "Small capacity",
      "Not suitable for long-term storage",
      "Limited humidity control"
    ],
    recommended: false
  }
];

// 常见问题诊断
export const troubleshootingIssues: TroubleshootingIssue[] = [
  {
    id: "over-humidified",
    symptomZh: "雪茄过湿",
    symptomEn: "Over-humidified Cigars",
    causeZh: "湿度超过 75%，环境过于潮湿",
    causeEn: "Humidity above 75%, environment too moist",
    solutionZh: [
      "立即降低保湿盒湿度至 65%",
      "打开保湿盒通风 1-2 小时",
      "移除额外加湿源",
      "使用干燥的保湿包吸收多余水分",
      "检查是否有霉变迹象"
    ],
    solutionEn: [
      "Immediately reduce humidor humidity to 65%",
      "Open humidor for ventilation 1-2 hours",
      "Remove additional humidification sources",
      "Use dry humidity packs to absorb excess moisture",
      "Check for signs of mold"
    ],
    severity: "medium"
  },
  {
    id: "under-humidified",
    symptomZh: "雪茄过干",
    symptomEn: "Under-humidified Cigars",
    causeZh: "湿度低于 60%，环境过于干燥",
    causeEn: "Humidity below 60%, environment too dry",
    solutionZh: [
      "缓慢提升湿度，每周增加 3-5%",
      "使用蒸馏水或保湿液补充",
      "检查保湿盒密封性",
      "避免快速加湿导致茄衣开裂",
      "严重干燥的雪茄可能需要数周恢复"
    ],
    solutionEn: [
      "Gradually increase humidity, 3-5% per week",
      "Replenish with distilled water or humidifying solution",
      "Check humidor seal integrity",
      "Avoid rapid humidification causing wrapper cracks",
      "Severely dried cigars may need weeks to recover"
    ],
    severity: "medium"
  },
  {
    id: "mold",
    symptomZh: "白色霉斑",
    symptomEn: "White Mold Spots",
    causeZh: "湿度过高且通风不良",
    causeEn: "Excessive humidity with poor ventilation",
    solutionZh: [
      "立即隔离发霉雪茄",
      "轻微霉斑可用软布轻拭",
      "降低湿度至 65% 以下",
      "加强通风换气",
      "严重霉变的雪茄应当丢弃",
      "彻底清洁保湿盒"
    ],
    solutionEn: [
      "Immediately isolate moldy cigars",
      "Light mold can be gently wiped with soft cloth",
      "Reduce humidity below 65%",
      "Improve ventilation",
      "Discard severely moldy cigars",
      "Thoroughly clean the humidor"
    ],
    severity: "high"
  },
  {
    id: "plume",
    symptomZh: "白色结晶（疑似油霜）",
    symptomEn: "White Crystals (Suspected Plume)",
    causeZh: "可能是烟草油脂析出或早期霉变",
    causeEn: "Could be tobacco oil crystallization or early mold",
    solutionZh: [
      "仔细观察：油霜呈细微结晶，霉变呈绒毛状",
      "油霜无害，是陈化良好的标志",
      "如不确定，按霉变处理",
      "保持适当湿度防止真正霉变"
    ],
    solutionEn: [
      "Observe carefully: plume is fine crystals, mold is fuzzy",
      "Plume is harmless, sign of good aging",
      "If unsure, treat as mold",
      "Maintain proper humidity to prevent actual mold"
    ],
    severity: "low"
  },
  {
    id: "beetles",
    symptomZh: "烟草甲虫",
    symptomEn: "Tobacco Beetles",
    causeZh: "高温高湿环境导致虫卵孵化",
    causeEn: "High temperature and humidity cause egg hatching",
    solutionZh: [
      "立即隔离受感染雪茄",
      "冷冻处理：-18°C 冷冻 3 天，然后冷藏解冻 1 天",
      "检查其他雪茄是否有小孔",
      "清洁并消毒保湿盒",
      "预防：保持温度低于 21°C",
      "严重感染需丢弃所有雪茄"
    ],
    solutionEn: [
      "Immediately isolate infected cigars",
      "Freeze treatment: -18°C for 3 days, then thaw in refrigerator 1 day",
      "Check other cigars for small holes",
      "Clean and disinfect humidor",
      "Prevention: keep temperature below 21°C",
      "Severe infestation requires discarding all cigars"
    ],
    severity: "high"
  },
  {
    id: "cracked-wrapper",
    symptomZh: "茄衣开裂",
    symptomEn: "Cracked Wrapper",
    causeZh: "湿度骤变或过于干燥",
    causeEn: "Sudden humidity change or too dry",
    solutionZh: [
      "轻微开裂可用植物胶修复",
      "缓慢调整湿度避免进一步开裂",
      "优先吸食开裂雪茄",
      "预防：避免湿度剧烈波动"
    ],
    solutionEn: [
      "Minor cracks can be repaired with vegetable gum",
      "Adjust humidity slowly to prevent further cracking",
      "Prioritize smoking cracked cigars",
      "Prevention: avoid drastic humidity fluctuations"
    ],
    severity: "low"
  }
];

// 常见问题 FAQ
export const faqs: FAQ[] = [
  {
    questionZh: "新买的保湿盒需要如何处理？",
    questionEn: "How should I prepare a new humidor?",
    answerZh: "新保湿盒需要'seasoning'（养盒）过程：1) 用蒸馏水轻擦内部雪松木；2) 放入加湿器并关闭盒盖；3) 等待 1-2 周让木材吸收水分；4) 湿度稳定在 70% 后即可使用。这个过程防止干燥的木材吸收雪茄的水分。",
    answerEn: "New humidors need a 'seasoning' process: 1) Lightly wipe interior cedar with distilled water; 2) Place humidifier and close lid; 3) Wait 1-2 weeks for wood to absorb moisture; 4) Ready to use when humidity stabilizes at 70%. This prevents dry wood from absorbing moisture from cigars."
  },
  {
    questionZh: "雪茄可以保存多久？",
    questionEn: "How long can cigars be stored?",
    answerZh: "在理想条件下，雪茄可以保存数年甚至数十年。优质手工雪茄在适当陈化后风味会提升。一般建议：1-2 年内享用日常雪茄；3-5 年或更久用于收藏级雪茄。定期检查状态，确保保存条件稳定。",
    answerEn: "Under ideal conditions, cigars can be stored for years or even decades. Premium handmade cigars improve with proper aging. General recommendation: enjoy daily cigars within 1-2 years; 3-5 years or more for collector-grade cigars. Regularly inspect condition and ensure stable storage."
  },
  {
    questionZh: "需要多久检查一次雪茄？",
    questionEn: "How often should I check my cigars?",
    answerZh: "建议每周检查一次湿度和温度读数。每月打开保湿盒快速查看雪茄状态，闻气味是否有异常。每季度进行一次更详细的检查，轻轻触摸雪茄确认弹性。长期存储的雪茄可以每月检查一次。",
    answerEn: "Recommend checking humidity and temperature readings weekly. Open humidor monthly for quick visual inspection and smell for abnormalities. Perform detailed inspection quarterly, gently touching cigars to confirm elasticity. Long-term stored cigars can be checked monthly."
  },
  {
    questionZh: "不同品牌的雪茄可以混放吗？",
    questionEn: "Can different brand cigars be stored together?",
    answerZh: "可以混放，但要注意：1) 不同风味的雪茄可能互相影响，建议分区存放；2) 强烈风味的雪茄（如调味雪茄）应单独存放；3) 古巴和非古巴雪茄传统上分开存放，但现代观点认为可以共存；4) 确保所有雪茄都处于相似的湿度条件。",
    answerEn: "Yes, but with considerations: 1) Different flavored cigars may influence each other, consider separate sections; 2) Strong-flavored cigars (like flavored cigars) should be stored separately; 3) Cuban and non-Cuban cigars traditionally stored separately, but modern view allows coexistence; 4) Ensure all cigars are at similar humidity conditions."
  },
  {
    questionZh: "旅行时如何携带雪茄？",
    questionEn: "How to travel with cigars?",
    answerZh: "旅行携带建议：1) 使用专用旅行保湿管或小型保湿盒；2) 放入保湿包保持湿度；3) 避免托运，随身携带以防极端温度；4) 长途旅行选择坚固的保护盒；5) 到达目的地后尽快放入存储环境。短途 1-2 天可不带保湿设备。",
    answerEn: "Travel tips: 1) Use dedicated travel humidor tubes or small humidors; 2) Include humidity packs; 3) Avoid checked baggage, carry-on to prevent extreme temperatures; 4) Choose sturdy protective cases for long trips; 5) Place in storage environment ASAP upon arrival. Short trips of 1-2 days may not need humidity control."
  },
  {
    questionZh: "保湿包多久需要更换？",
    questionEn: "How often do humidity packs need replacement?",
    answerZh: "双向保湿包（如 Boveda）通常 2-4 个月更换一次，取决于：1) 保湿盒密封性；2) 开合频率；3) 环境条件。当保湿包变硬、结晶或明显干瘪时需要更换。建议备用一些保湿包，发现失效立即更换。",
    answerEn: "Two-way humidity packs (like Boveda) typically last 2-4 months, depending on: 1) Humidor seal quality; 2) Opening frequency; 3) Environmental conditions. Replace when packs become hard, crystallized, or noticeably shriveled. Keep spare packs and replace immediately when ineffective."
  }
];

// 保湿包推荐
export const humidityPackRecommendations = [
  {
    brand: "Boveda",
    sizes: ["8g", "49g", "60g"],
    rhOptions: ["65%", "69%", "72%"],
    description: "双向控湿，最可靠的选择",
    recommended: true
  },
  {
    brand: "Xikar",
    sizes: ["Propylene Glycol Solution"],
    rhOptions: ["N/A"],
    description: "液体保湿液，需配合海绵使用",
    recommended: false
  },
  {
    brand: "Heart of the Club",
    sizes: ["Various"],
    rhOptions: ["65%", "69%", "72%"],
    description: "类似 Boveda 的双向保湿包",
    recommended: true
  }
];

// 湿度计校准方法
export const hygrometerCalibration = {
  method: "盐测试法",
  steps: [
    "准备一个小瓶盖，装入少量食盐",
    "滴几滴水使盐湿润但不溶解",
    "将湿度计和盐瓶盖一起放入密封袋",
    "密封后等待 6-8 小时",
    "读取湿度计读数，应该显示 75%",
    "如有偏差，记录差值用于后续校正",
    "数字湿度计可按说明书校准"
  ],
  frequency: "建议每 6 个月校准一次"
};
