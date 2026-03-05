import Foundation

enum MockCatalog {
	static let products: [Product] = cigarettes + cigars + ecigarettes

	static let cigarettes: [Product] = [
		.cigarette(id: "cig-zhonghua-hard", brand: "中华 (Zhonghua)", series: "硬盒", name: "中华", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "上海", price: 70, note: "经典醇厚，烟气细腻，回味干净。", tags: ["经典", "国烟", "硬盒"]),
		.cigarette(id: "cig-zhonghua-soft", brand: "中华 (Zhonghua)", series: "软盒", name: "中华", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "上海", price: 75, note: "香气更柔和，入口顺滑，层次丰富。", tags: ["软盒", "醇和", "高端"]),
		.cigarette(id: "cig-huanghelou-1916", brand: "黄鹤楼 (Huanghelou)", series: "1916", name: "黄鹤楼", subtitle: "烤烟型", tar: "10mg", nicotine: "1.0mg", origin: "湖北·武汉", price: 100, note: "香气饱满，木香与甜润交织，余味悠长。", tags: ["高端", "木香", "甜润"]),
		.cigarette(id: "cig-huanghelou-hardwonder", brand: "黄鹤楼 (Huanghelou)", series: "硬奇景", name: "黄鹤楼", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "湖北·武汉", price: 45, note: "香气清雅，烟劲适中，回甘明显。", tags: ["清雅", "回甘", "硬盒"]),
		.cigarette(id: "cig-yuxi-soft", brand: "玉溪 (Yuxi)", series: "软", name: "玉溪", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "云南·玉溪", price: 23, note: "蜜甜香突出，烟气饱满，劲道适中。", tags: ["云南烟", "蜜甜", "经典"]),
		.cigarette(id: "cig-yuxi-hongta", brand: "玉溪 (Yuxi)", series: "红塔山系", name: "玉溪", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "云南·玉溪", price: 26, note: "香气自然，顺畅不燥，尾段干净。", tags: ["顺滑", "自然香", "口粮"]),
		.cigarette(id: "cig-furongwang-hard", brand: "芙蓉王 (Furongwang)", series: "硬", name: "芙蓉王", subtitle: "烤烟型", tar: "10mg", nicotine: "1.0mg", origin: "湖南·常德", price: 25, note: "香气醇正，入口柔和，平衡耐抽。", tags: ["口粮", "醇正", "耐抽"]),
		.cigarette(id: "cig-furongwang-softblue", brand: "芙蓉王 (Furongwang)", series: "蓝", name: "芙蓉王", subtitle: "烤烟型", tar: "9mg", nicotine: "0.9mg", origin: "湖南·常德", price: 35, note: "清甜细腻，刺激度更低，后味清爽。", tags: ["清甜", "低刺激", "蓝盒"]),
		.cigarette(id: "cig-liqun-hard", brand: "利群 (Liqun)", series: "硬", name: "利群", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "浙江·杭州", price: 14, note: "香气扎实，烟气厚实，略带坚果香。", tags: ["坚果香", "厚实", "性价比"]),
		.cigarette(id: "cig-liqun-sunshine", brand: "利群 (Liqun)", series: "阳光", name: "利群", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "浙江·杭州", price: 50, note: "香气明亮，烟气柔顺，回味甜净。", tags: ["高端", "甜净", "阳光"]),
		.cigarette(id: "cig-furongwang-zuanshi", brand: "芙蓉王 (Furongwang)", series: "钻石", name: "芙蓉王", subtitle: "烤烟型", tar: "8mg", nicotine: "0.8mg", origin: "湖南·常德", price: 60, note: "香气细致，口感柔润，适合轻口味。", tags: ["细致", "轻口", "高端"]),
		.cigarette(id: "cig-zhongnanhai-8mg", brand: "中南海 (Zhongnanhai)", series: "8mg", name: "中南海", subtitle: "混合型", tar: "8mg", nicotine: "0.8mg", origin: "北京", price: 15, note: "清淡爽口，杂气少，偏轻盈风格。", tags: ["清淡", "混合型", "轻盈"]),
		.cigarette(id: "cig-zhongnanhai-5mg", brand: "中南海 (Zhongnanhai)", series: "5mg", name: "中南海", subtitle: "混合型", tar: "5mg", nicotine: "0.5mg", origin: "北京", price: 18, note: "更低刺激，适合想要更轻的口感。", tags: ["低焦", "轻口", "清淡"]),
		.cigarette(id: "cig-yunyan-soft", brand: "云烟 (Yunyan)", series: "软珍品", name: "云烟", subtitle: "烤烟型", tar: "10mg", nicotine: "1.0mg", origin: "云南·昆明", price: 30, note: "甜香浓郁，烟气圆润，尾段净爽。", tags: ["甜香", "圆润", "云南"]),
		.cigarette(id: "cig-hongtashan-classic", brand: "红塔山 (Hongtashan)", series: "经典1956", name: "红塔山", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "云南·玉溪", price: 11, note: "香气直接，劲道足，耐抽口粮。", tags: ["口粮", "劲道", "经典"]),
		.cigarette(id: "cig-jiaozi-soft", brand: "娇子 (Jiaozi)", series: "软", name: "娇子", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "四川·成都", price: 22, note: "香气柔和，回味甜润，刺激适中。", tags: ["甜润", "柔和", "川烟"]),
		.cigarette(id: "cig-jiahe-soft", brand: "南京 (Nanjing)", series: "煊赫门", name: "南京", subtitle: "烤烟型", tar: "10mg", nicotine: "1.0mg", origin: "江苏·南京", price: 18, note: "甜香明显，入口柔，适合新手。", tags: ["甜香", "入门", "煊赫门"]),
		.cigarette(id: "cig-taishan-haoyun", brand: "泰山 (Taishan)", series: "好运", name: "泰山", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "山东·济南", price: 15, note: "香气平衡，略带焦甜，口感顺畅。", tags: ["顺畅", "平衡", "口粮"]),
		.cigarette(id: "cig-lanmeng-hard", brand: "兰州 (Lanzhou)", series: "硬蓝", name: "兰州", subtitle: "烤烟型", tar: "10mg", nicotine: "1.0mg", origin: "甘肃·兰州", price: 16, note: "烟气饱满，香气偏醇，尾段略干。", tags: ["醇", "饱满", "西北"]),
		.cigarette(id: "cig-baisha-hard", brand: "白沙 (Baisha)", series: "硬", name: "白沙", subtitle: "烤烟型", tar: "11mg", nicotine: "1.0mg", origin: "湖南·长沙", price: 10, note: "香气朴实，劲道足，性价比高。", tags: ["性价比", "劲道", "口粮"]),
		.cigarette(id: "cig-honghe-soft", brand: "红河 (Honghe)", series: "软", name: "红河", subtitle: "烤烟型", tar: "10mg", nicotine: "0.9mg", origin: "云南·红河", price: 12, note: "香气自然，烟气柔，适合日常。", tags: ["日常", "柔和", "云南"]),
		.cigarette(id: "cig-suyan", brand: "苏烟 (Suyan)", series: "铂晶", name: "苏烟", subtitle: "烤烟型", tar: "9mg", nicotine: "0.9mg", origin: "江苏·南京", price: 90, note: "香气细腻高级，入口柔顺，余味干净。", tags: ["高端", "细腻", "铂晶"]),
	]

	static let cigars: [Product] = [
		.cigar(id: "cigar-changcheng-132", brand: "长城 (Great Wall)", series: "132", name: "长城", subtitle: "机器卷制", size: "150mm × RG 42", wrapper: "康涅狄格", binder: "云南", filler: "云南", strength: "中", origin: "四川·什邡", price: 80, note: "奶油与坚果香，燃烧均匀，口感温和。", tags: ["国茄", "奶油", "入门"]),
		.cigar(id: "cigar-changcheng-shengshi", brand: "长城 (Great Wall)", series: "盛世3号", name: "长城", subtitle: "手工卷制", size: "152mm × RG 50", wrapper: "厄瓜多尔", binder: "多米尼加", filler: "多米尼加/云南", strength: "中浓", origin: "四川·什邡", price: 260, note: "木香与咖啡香突出，后段胡椒感增强。", tags: ["手工", "木香", "咖啡"]),
		.cigar(id: "cigar-wangguan-guocui", brand: "王冠 (Wangguan)", series: "国粹", name: "王冠", subtitle: "手工卷制", size: "140mm × RG 46", wrapper: "厄瓜多尔", binder: "多米尼加", filler: "多米尼加", strength: "中", origin: "安徽·合肥", price: 180, note: "烘烤香与可可感，烟气细腻，收尾干净。", tags: ["可可", "细腻", "国粹"]),
		.cigar(id: "cigar-wangguan-classic", brand: "王冠 (Wangguan)", series: "经典", name: "王冠", subtitle: "机器卷制", size: "120mm × RG 40", wrapper: "康涅狄格", binder: "印尼", filler: "云南", strength: "淡", origin: "安徽·合肥", price: 60, note: "轻柔奶香，甜润不冲，适合日常。", tags: ["淡", "奶香", "日常"]),
		.cigar(id: "cigar-huanghelou-snowdream", brand: "黄鹤楼雪茄 (Huanghelou Cigar)", series: "雪之梦9号", name: "黄鹤楼雪茄", subtitle: "手工卷制", size: "127mm × RG 54", wrapper: "厄瓜多尔", binder: "多米尼加", filler: "多米尼加", strength: "中", origin: "湖北·武汉", price: 300, note: "甜香与木香平衡，烟气厚实，层次丰富。", tags: ["雪之梦", "厚实", "甜香"]),
		.cigar(id: "cigar-shandong-taishan", brand: "泰山雪茄 (Taishan Cigar)", series: "黑豹", name: "泰山雪茄", subtitle: "机器卷制", size: "150mm × RG 44", wrapper: "马杜罗", binder: "印尼", filler: "云南", strength: "中浓", origin: "山东·济南", price: 120, note: "可可与焦糖香，后段胡椒感明显。", tags: ["马杜罗", "焦糖", "胡椒"]),
		.cigar(id: "cigar-changcheng-mini", brand: "长城 (Great Wall)", series: "迷你咖啡", name: "长城", subtitle: "小雪茄", size: "90mm × RG 26", wrapper: "印尼", binder: "印尼", filler: "云南", strength: "淡", origin: "四川·什邡", price: 35, note: "咖啡甜香，口感轻松，适合短抽。", tags: ["迷你", "咖啡", "短抽"]),
		.cigar(id: "cigar-wangguan-104", brand: "王冠 (Wangguan)", series: "104", name: "王冠", subtitle: "手工卷制", size: "152mm × RG 52", wrapper: "厄瓜多尔", binder: "尼加拉瓜", filler: "尼加拉瓜", strength: "浓", origin: "安徽·合肥", price: 320, note: "胡椒与木香强烈，浓郁厚重，适合老手。", tags: ["浓", "胡椒", "木香"]),
		.cigar(id: "cigar-huanghelou-classic", brand: "黄鹤楼雪茄 (Huanghelou Cigar)", series: "经典", name: "黄鹤楼雪茄", subtitle: "机器卷制", size: "125mm × RG 42", wrapper: "康涅狄格", binder: "印尼", filler: "云南", strength: "中", origin: "湖北·武汉", price: 110, note: "奶油木香，燃烧稳定，甜润回味。", tags: ["奶油", "木香", "稳定"]),
		.cigar(id: "cigar-changcheng-guoyun", brand: "长城 (Great Wall)", series: "国韵", name: "长城", subtitle: "手工卷制", size: "127mm × RG 48", wrapper: "厄瓜多尔", binder: "多米尼加", filler: "多米尼加/云南", strength: "中", origin: "四川·什邡", price: 220, note: "坚果与蜂蜜甜感，烟气细腻顺滑。", tags: ["国韵", "蜂蜜", "坚果"]),
	]

	static let ecigarettes: [Product] = [
		.ecig(id: "ecig-relx-infinity", brand: "RELX 悦刻 (RELX)", series: "幻影 / Infinity", name: "悦刻", subtitle: "换弹式", battery: "380mAh", liquid: "1.9ml", nicotine: "3% / 30mg", flavors: "冰柠檬、绿豆冰、经典烟草", feature: "磁吸弹仓、震动提醒", origin: "深圳", price: 299, note: "雾化细腻，口感干净，抽吸阻尼接近真烟。", tags: ["换弹", "经典", "细腻"]),
		.ecig(id: "ecig-relx-lite", brand: "RELX 悦刻 (RELX)", series: "轻风 / Lite", name: "悦刻", subtitle: "一次性", battery: "400mAh", liquid: "2.0ml", nicotine: "2% / 20mg", flavors: "西瓜冰、薄荷", feature: "即拆即用", origin: "深圳", price: 59, note: "轻巧便携，冷感明显，适合短期使用。", tags: ["一次性", "便携", "冷感"]),
		.ecig(id: "ecig-yooz-mini", brand: "YOOZ 柚子 (YOOZ)", series: "Mini", name: "柚子", subtitle: "换弹式", battery: "350mAh", liquid: "1.6ml", nicotine: "3% / 30mg", flavors: "冰葡萄、铁观音", feature: "防漏油结构", origin: "深圳", price: 269, note: "吸阻偏轻，香气清晰，适合清爽口味。", tags: ["防漏", "清爽", "换弹"]),
		.ecig(id: "ecig-yooz-neo", brand: "YOOZ 柚子 (YOOZ)", series: "NEO", name: "柚子", subtitle: "换弹式", battery: "400mAh", liquid: "2.0ml", nicotine: "3% / 30mg", flavors: "青提冰、薄荷", feature: "快充、童锁", origin: "深圳", price: 299, note: "雾化量适中，冷感突出，适合喜欢清凉的人。", tags: ["童锁", "快充", "清凉"]),
		.ecig(id: "ecig-snowplus-pro", brand: "SnowPlus 雪加 (SnowPlus)", series: "Pro", name: "雪加", subtitle: "换弹式", battery: "450mAh", liquid: "2.0ml", nicotine: "3% / 30mg", flavors: "乌龙茶、冰可乐", feature: "呼吸灯、震动反馈", origin: "深圳", price: 289, note: "口感偏甜润，茶系风味表现不错。", tags: ["茶味", "呼吸灯", "甜润"]),
		.ecig(id: "ecig-moti-s", brand: "MOTI 魔笛 (MOTI)", series: "S", name: "魔笛", subtitle: "换弹式", battery: "400mAh", liquid: "2.0ml", nicotine: "3% / 30mg", flavors: "百香果、薄荷", feature: "陶瓷雾化芯", origin: "深圳", price: 299, note: "雾化柔顺，香气集中，适合果味。", tags: ["陶瓷芯", "果味", "顺滑"]),
		.ecig(id: "ecig-flow-folu", brand: "FLOW 福禄 (FOLU)", series: "Classic", name: "福禄", subtitle: "换弹式", battery: "350mAh", liquid: "1.9ml", nicotine: "3% / 30mg", flavors: "冰薄荷、红茶", feature: "气道优化、低冷凝", origin: "深圳", price: 259, note: "吸阻适中，冷凝控制不错，体验稳定。", tags: ["稳定", "低冷凝", "换弹"]),
		.ecig(id: "ecig-vtv-pod", brand: "VTV (VTV)", series: "Pod", name: "VTV", subtitle: "换弹式", battery: "380mAh", liquid: "2.0ml", nicotine: "3% / 30mg", flavors: "经典烟草、蓝莓冰", feature: "轻量机身", origin: "深圳", price: 199, note: "风味直给，雾量偏足，性价比路线。", tags: ["性价比", "雾量", "轻量"]),
		.ecig(id: "ecig-lami-disposable", brand: "LAMI (LAMI)", series: "一次性600口", name: "LAMI", subtitle: "一次性", battery: "500mAh", liquid: "3.0ml", nicotine: "2% / 20mg", flavors: "芒果冰、荔枝", feature: "大容量烟液", origin: "深圳", price: 69, note: "续航更长，果味明显，冷感中等。", tags: ["一次性", "大容量", "果味"]),
		.ecig(id: "ecig-ruyan", brand: "如烟 (Ruyan)", series: "经典", name: "如烟", subtitle: "套装式", battery: "650mAh", liquid: "补充式", nicotine: "可选 0–3%", flavors: "烟草、薄荷", feature: "早期品牌、补充式烟油", origin: "北京", price: 399, note: "偏传统路线，可玩性更高，但需要维护。", tags: ["补充式", "可玩", "传统"]),
	]
}

private extension Product {
	static func cigarette(
		id: String,
		brand: String,
		series: String,
		name: String,
		subtitle: String,
		tar: String,
		nicotine: String,
		origin: String,
		price: Int,
		note: String,
		tags: [String]
	) -> Product {
		Product(
			id: id,
			category: .cigarette,
			brand: brand,
			series: series,
			name: name,
			subtitle: subtitle,
			origin: origin,
			priceCNY: price,
			tastingNote: note,
			specs: [
				.init("cig-type", "类型 / Type", subtitle),
				.init("cig-tar", "焦油 / Tar", tar),
				.init("cig-nicotine", "烟碱 / Nicotine", nicotine),
				.init("cig-origin", "产地 / Origin", origin),
				.init("cig-price", "价格 / Price", "¥\(price) / 包"),
			],
			tags: tags
		)
	}

	static func cigar(
		id: String,
		brand: String,
		series: String,
		name: String,
		subtitle: String,
		size: String,
		wrapper: String,
		binder: String,
		filler: String,
		strength: String,
		origin: String,
		price: Int,
		note: String,
		tags: [String]
	) -> Product {
		Product(
			id: id,
			category: .cigar,
			brand: brand,
			series: series,
			name: name,
			subtitle: subtitle,
			origin: origin,
			priceCNY: price,
			tastingNote: note,
			specs: [
				.init("cigar-size", "尺寸 / Size", size),
				.init("cigar-wrapper", "茄衣 / Wrapper", wrapper),
				.init("cigar-binder", "茄套 / Binder", binder),
				.init("cigar-filler", "茄芯 / Filler", filler),
				.init("cigar-strength", "浓度 / Strength", strength),
				.init("cigar-origin", "产地 / Origin", origin),
				.init("cigar-price", "价格 / Price", "¥\(price) / 支"),
			],
			tags: tags
		)
	}

	static func ecig(
		id: String,
		brand: String,
		series: String,
		name: String,
		subtitle: String,
		battery: String,
		liquid: String,
		nicotine: String,
		flavors: String,
		feature: String,
		origin: String,
		price: Int,
		note: String,
		tags: [String]
	) -> Product {
		Product(
			id: id,
			category: .ecigarette,
			brand: brand,
			series: series,
			name: name,
			subtitle: subtitle,
			origin: origin,
			priceCNY: price,
			tastingNote: note,
			specs: [
				.init("ecig-type", "设备类型 / Type", subtitle),
				.init("ecig-battery", "电池 / Battery", battery),
				.init("ecig-liquid", "烟液 / Liquid", liquid),
				.init("ecig-nicotine", "尼古丁 / Nicotine", nicotine),
				.init("ecig-flavors", "口味 / Flavors", flavors),
				.init("ecig-feature", "特色 / Feature", feature),
				.init("ecig-origin", "产地 / Origin", origin),
				.init("ecig-price", "价格 / Price", "¥\(price)"),
			],
			tags: tags
		)
	}
}

