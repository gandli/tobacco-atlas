package com.tobaccoatlas.data.mock

import com.tobaccoatlas.data.model.Product
import com.tobaccoatlas.data.model.ProductCategory
import com.tobaccoatlas.data.model.Spec

object MockCatalog {
    val products: List<Product> =
        buildList {
            // --- Cigarettes (20+) ---
            add(
                Product(
                    id = "cig_zhonghua_soft",
                    category = ProductCategory.Cigarette,
                    brand = "中华",
                    series = "经典",
                    nameZh = "中华（软）",
                    nameEn = "Zhonghua (Soft)",
                    type = "烤烟型",
                    origin = "上海",
                    priceCny = 70,
                    descriptionZh = "经典国烟风格，烟气饱满，香气细腻。",
                    descriptionEn = "Classic flagship style with rich smoke and refined aroma.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_zhonghua_hard",
                    category = ProductCategory.Cigarette,
                    brand = "中华",
                    series = "经典",
                    nameZh = "中华（硬）",
                    nameEn = "Zhonghua (Hard)",
                    type = "烤烟型",
                    origin = "上海",
                    priceCny = 65,
                    descriptionZh = "香气浓郁，层次感强，回味干净。",
                    descriptionEn = "Bold aroma with layered taste and clean finish.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_huanghelou_1916",
                    category = ProductCategory.Cigarette,
                    brand = "黄鹤楼",
                    series = "1916",
                    nameZh = "黄鹤楼（1916）",
                    nameEn = "Huanghelou (1916)",
                    type = "烤烟型",
                    origin = "湖北·武汉",
                    priceCny = 100,
                    descriptionZh = "细腻醇厚，香气优雅，口感顺滑。",
                    descriptionEn = "Elegant aroma with smooth, mellow body.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_huanghelou_soft_blue",
                    category = ProductCategory.Cigarette,
                    brand = "黄鹤楼",
                    series = "蓝",
                    nameZh = "黄鹤楼（软蓝）",
                    nameEn = "Huanghelou (Soft Blue)",
                    type = "烤烟型",
                    origin = "湖北·武汉",
                    priceCny = 25,
                    descriptionZh = "清雅柔和，适合日常口粮。",
                    descriptionEn = "Clean and gentle, a daily-friendly choice.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "8 mg"),
                            Spec("烟碱含量", "Nicotine", "0.8 mg"),
                            Spec("一氧化碳", "CO", "9 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_yuxi_soft",
                    category = ProductCategory.Cigarette,
                    brand = "玉溪",
                    series = "经典",
                    nameZh = "玉溪（软）",
                    nameEn = "Yuxi (Soft)",
                    type = "烤烟型",
                    origin = "云南·玉溪",
                    priceCny = 23,
                    descriptionZh = "甜润细腻，烟香纯正，回甘明显。",
                    descriptionEn = "Sweet and smooth with a clean, authentic aroma.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_yuxi_hard",
                    category = ProductCategory.Cigarette,
                    brand = "玉溪",
                    series = "经典",
                    nameZh = "玉溪（硬）",
                    nameEn = "Yuxi (Hard)",
                    type = "烤烟型",
                    origin = "云南·玉溪",
                    priceCny = 22,
                    descriptionZh = "醇厚顺口，香气协调，余味干净。",
                    descriptionEn = "Mellow, balanced aroma with a clean aftertaste.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_furongwang_hard",
                    category = ProductCategory.Cigarette,
                    brand = "芙蓉王",
                    series = "经典",
                    nameZh = "芙蓉王（硬）",
                    nameEn = "Furongwang (Hard)",
                    type = "烤烟型",
                    origin = "湖南·常德",
                    priceCny = 25,
                    descriptionZh = "香气浓郁，劲头适中，口感扎实。",
                    descriptionEn = "Rich aroma with medium strength and solid mouthfeel.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.1 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_furongwang_soft_blue",
                    category = ProductCategory.Cigarette,
                    brand = "芙蓉王",
                    series = "蓝",
                    nameZh = "芙蓉王（软蓝）",
                    nameEn = "Furongwang (Soft Blue)",
                    type = "烤烟型",
                    origin = "湖南·常德",
                    priceCny = 30,
                    descriptionZh = "香甜柔和，适口性佳。",
                    descriptionEn = "Sweet and gentle with good smoothness.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_liqun_hard",
                    category = ProductCategory.Cigarette,
                    brand = "利群",
                    series = "经典",
                    nameZh = "利群（硬）",
                    nameEn = "Liqun (Hard)",
                    type = "烤烟型",
                    origin = "浙江·杭州",
                    priceCny = 16,
                    descriptionZh = "烟香清正，略带甜感，适合日常。",
                    descriptionEn = "Clean aroma with a slight sweetness for daily use.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_liqun_soft_red",
                    category = ProductCategory.Cigarette,
                    brand = "利群",
                    series = "红",
                    nameZh = "利群（软红）",
                    nameEn = "Liqun (Soft Red)",
                    type = "烤烟型",
                    origin = "浙江·杭州",
                    priceCny = 18,
                    descriptionZh = "香气更浓，口感更饱满。",
                    descriptionEn = "More aromatic and fuller-bodied.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.1 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_yunyan_soft_pearl",
                    category = ProductCategory.Cigarette,
                    brand = "云烟",
                    series = "珍品",
                    nameZh = "云烟（软珍品）",
                    nameEn = "Yunyan (Soft Premium)",
                    type = "烤烟型",
                    origin = "云南",
                    priceCny = 23,
                    descriptionZh = "云南烟叶香气突出，顺滑回甘。",
                    descriptionEn = "Distinct Yunnan leaf aroma with smooth finish.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "软盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_yunyan_hard_purple",
                    category = ProductCategory.Cigarette,
                    brand = "云烟",
                    series = "紫",
                    nameZh = "云烟（紫）",
                    nameEn = "Yunyan (Purple)",
                    type = "烤烟型",
                    origin = "云南",
                    priceCny = 10,
                    descriptionZh = "口感偏淡，香气清雅，性价比高。",
                    descriptionEn = "Light-bodied with a gentle aroma and great value.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "8 mg"),
                            Spec("烟碱含量", "Nicotine", "0.8 mg"),
                            Spec("一氧化碳", "CO", "9 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_hongtashan_classic",
                    category = ProductCategory.Cigarette,
                    brand = "红塔山",
                    series = "经典",
                    nameZh = "红塔山（经典）",
                    nameEn = "Hongtashan (Classic)",
                    type = "烤烟型",
                    origin = "云南",
                    priceCny = 8,
                    descriptionZh = "老牌口粮，烟气充实，口感直接。",
                    descriptionEn = "Classic everyday smoke with straightforward taste.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_double_happiness",
                    category = ProductCategory.Cigarette,
                    brand = "红双喜",
                    series = "经典",
                    nameZh = "红双喜（硬）",
                    nameEn = "Double Happiness (Hard)",
                    type = "烤烟型",
                    origin = "上海",
                    priceCny = 9,
                    descriptionZh = "烟草本香明显，口感厚实。",
                    descriptionEn = "Tobacco-forward aroma with a robust mouthfeel.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "11 mg"),
                            Spec("烟碱含量", "Nicotine", "1.1 mg"),
                            Spec("一氧化碳", "CO", "12 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_panda_green",
                    category = ProductCategory.Cigarette,
                    brand = "熊猫",
                    series = "绿",
                    nameZh = "熊猫（绿）",
                    nameEn = "Panda (Green)",
                    type = "烤烟型",
                    origin = "上海",
                    priceCny = 100,
                    descriptionZh = "细腻柔顺，香气克制，余味悠长。",
                    descriptionEn = "Silky and restrained with a long finish.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "8 mg"),
                            Spec("烟碱含量", "Nicotine", "0.8 mg"),
                            Spec("一氧化碳", "CO", "9 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_nanjing_yu",
                    category = ProductCategory.Cigarette,
                    brand = "南京",
                    series = "雨花石",
                    nameZh = "南京（雨花石）",
                    nameEn = "Nanjing (Yuhuashi)",
                    type = "烤烟型",
                    origin = "江苏·南京",
                    priceCny = 50,
                    descriptionZh = "香气清甜，细支顺滑，风格轻盈。",
                    descriptionEn = "Sweet aroma; slim format with a light, smooth profile.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "8 mg"),
                            Spec("烟碱含量", "Nicotine", "0.7 mg"),
                            Spec("一氧化碳", "CO", "9 mg"),
                            Spec("包装", "Pack", "硬盒 20支（细支）"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_suya_hard",
                    category = ProductCategory.Cigarette,
                    brand = "苏烟",
                    series = "经典",
                    nameZh = "苏烟（硬）",
                    nameEn = "Suyan (Hard)",
                    type = "烤烟型",
                    origin = "江苏",
                    priceCny = 45,
                    descriptionZh = "香气饱满，甜润细腻，回味清爽。",
                    descriptionEn = "Full aroma with sweet smoothness and clean finish.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_lotus",
                    category = ProductCategory.Cigarette,
                    brand = "荷花",
                    series = "经典",
                    nameZh = "荷花",
                    nameEn = "Lotus",
                    type = "烤烟型",
                    origin = "河北",
                    priceCny = 35,
                    descriptionZh = "香气柔和，口感细腻，适口性强。",
                    descriptionEn = "Gentle aroma with a smooth, approachable profile.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "0.9 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_wuyang",
                    category = ProductCategory.Cigarette,
                    brand = "五羊",
                    series = "经典",
                    nameZh = "五羊（硬）",
                    nameEn = "Wuyang (Hard)",
                    type = "烤烟型",
                    origin = "广东",
                    priceCny = 8,
                    descriptionZh = "清淡顺口，烟香纯正，老牌口粮。",
                    descriptionEn = "Light and smooth with classic tobacco aroma.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "10 mg"),
                            Spec("烟碱含量", "Nicotine", "1.0 mg"),
                            Spec("一氧化碳", "CO", "11 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_changbai_shan",
                    category = ProductCategory.Cigarette,
                    brand = "长白山",
                    series = "经典",
                    nameZh = "长白山（硬）",
                    nameEn = "Changbaishan (Hard)",
                    type = "烤烟型",
                    origin = "吉林",
                    priceCny = 9,
                    descriptionZh = "风格清爽，香气干净，口感平衡。",
                    descriptionEn = "Crisp style with a clean, balanced taste.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "8 mg"),
                            Spec("烟碱含量", "Nicotine", "0.8 mg"),
                            Spec("一氧化碳", "CO", "9 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cig_golden_leaf",
                    category = ProductCategory.Cigarette,
                    brand = "黄金叶",
                    series = "经典",
                    nameZh = "黄金叶（硬）",
                    nameEn = "Golden Leaf (Hard)",
                    type = "烤烟型",
                    origin = "河南",
                    priceCny = 10,
                    descriptionZh = "烟香浓郁，劲头足，回味偏甜。",
                    descriptionEn = "Aromatic with solid strength and a slightly sweet finish.",
                    specs =
                        listOf(
                            Spec("焦油含量", "Tar", "12 mg"),
                            Spec("烟碱含量", "Nicotine", "1.2 mg"),
                            Spec("一氧化碳", "CO", "13 mg"),
                            Spec("包装", "Pack", "硬盒 20支"),
                        ),
                ),
            )

            // --- Cigars (10+) ---
            add(
                Product(
                    id = "cigar_greatwall_132",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "132",
                    nameZh = "长城（132）",
                    nameEn = "Great Wall (132)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 60,
                    descriptionZh = "中等浓度，坚果与烘烤香为主，回味干净。",
                    descriptionEn = "Medium-bodied with nutty, toasted notes and a clean finish.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "144 mm × RG 50"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "Dominican / China"),
                            Spec("浓度", "Strength", "Medium"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_greatwall_gl1",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "国礼1号",
                    nameZh = "长城（国礼1号）",
                    nameEn = "Great Wall (State Gift No.1)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 120,
                    descriptionZh = "香气细腻，木香与可可感突出，层次丰富。",
                    descriptionEn = "Refined wood and cocoa notes with layered complexity.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "156 mm × RG 52"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Brazil"),
                            Spec("茄芯", "Filler", "Dominican / China"),
                            Spec("浓度", "Strength", "Medium-Full"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_huanghelou_cigar",
                    category = ProductCategory.Cigar,
                    brand = "黄鹤楼雪茄",
                    series = "经典",
                    nameZh = "黄鹤楼雪茄（硬）",
                    nameEn = "Huanghelou Cigar (Hard)",
                    type = "机制雪茄",
                    origin = "湖北·武汉",
                    priceCny = 30,
                    descriptionZh = "淡至中等浓度，甜香明显，燃烧顺畅。",
                    descriptionEn = "Light-to-medium with noticeable sweetness and easy draw.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "100 mm × RG 24"),
                            Spec("茄衣", "Wrapper", "Indonesia"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "China"),
                            Spec("浓度", "Strength", "Light-Medium"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_greatwall_mini",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "迷你",
                    nameZh = "长城（迷你）",
                    nameEn = "Great Wall (Mini)",
                    type = "迷你雪茄",
                    origin = "四川·什邡",
                    priceCny = 25,
                    descriptionZh = "短时享受，香气直接，适合入门。",
                    descriptionEn = "A quick smoke with straightforward aroma; beginner friendly.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "84 mm × RG 20"),
                            Spec("茄衣", "Wrapper", "Indonesia"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "China"),
                            Spec("浓度", "Strength", "Light"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_changcheng_legend",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "传奇",
                    nameZh = "长城（传奇）",
                    nameEn = "Great Wall (Legend)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 80,
                    descriptionZh = "中等偏浓，木香与辛香料感更明显。",
                    descriptionEn = "Medium-full with stronger wood and spice impressions.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "152 mm × RG 54"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Nicaragua"),
                            Spec("茄芯", "Filler", "Nicaragua / China"),
                            Spec("浓度", "Strength", "Medium-Full"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_shifang_robusto",
                    category = ProductCategory.Cigar,
                    brand = "什邡",
                    series = "罗布图",
                    nameZh = "什邡（罗布图）",
                    nameEn = "Shifang (Robusto)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 50,
                    descriptionZh = "中等浓度，可可与咖啡香，烟气厚。",
                    descriptionEn = "Medium-bodied with cocoa/coffee notes and thick smoke.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "124 mm × RG 50"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Brazil"),
                            Spec("茄芯", "Filler", "Dominican / China"),
                            Spec("浓度", "Strength", "Medium"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_greatwall_torpedo",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "鱼雷",
                    nameZh = "长城（鱼雷）",
                    nameEn = "Great Wall (Torpedo)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 90,
                    descriptionZh = "风味集中，前段甜香，中后段木香增强。",
                    descriptionEn = "Concentrated flavor: sweet start, stronger wood mid-late.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "156 mm × RG 52"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "Dominican / China"),
                            Spec("浓度", "Strength", "Medium"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_hhl_mini",
                    category = ProductCategory.Cigar,
                    brand = "黄鹤楼雪茄",
                    series = "迷你",
                    nameZh = "黄鹤楼雪茄（迷你）",
                    nameEn = "Huanghelou Cigar (Mini)",
                    type = "迷你雪茄",
                    origin = "湖北·武汉",
                    priceCny = 20,
                    descriptionZh = "淡雅甜香，适合快速小憩。",
                    descriptionEn = "Light sweet aroma for a short break.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "84 mm × RG 20"),
                            Spec("茄衣", "Wrapper", "Indonesia"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "China"),
                            Spec("浓度", "Strength", "Light"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_greatwall_small",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "小号",
                    nameZh = "长城（小号）",
                    nameEn = "Great Wall (Small Format)",
                    type = "机制雪茄",
                    origin = "四川·什邡",
                    priceCny = 18,
                    descriptionZh = "燃烧顺畅，香气直接，易入口。",
                    descriptionEn = "Easy draw and direct aroma, very approachable.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "100 mm × RG 24"),
                            Spec("茄衣", "Wrapper", "Indonesia"),
                            Spec("茄套", "Binder", "Indonesia"),
                            Spec("茄芯", "Filler", "China"),
                            Spec("浓度", "Strength", "Light-Medium"),
                        ),
                ),
            )
            add(
                Product(
                    id = "cigar_greatwall_churchill",
                    category = ProductCategory.Cigar,
                    brand = "长城",
                    series = "丘吉尔",
                    nameZh = "长城（丘吉尔）",
                    nameEn = "Great Wall (Churchill)",
                    type = "手卷雪茄",
                    origin = "四川·什邡",
                    priceCny = 110,
                    descriptionZh = "时间更长，风味递进明显，尾段更浓。",
                    descriptionEn = "Longer smoke with clear progression and stronger finish.",
                    specs =
                        listOf(
                            Spec("尺寸", "Size", "178 mm × RG 47"),
                            Spec("茄衣", "Wrapper", "Ecuador"),
                            Spec("茄套", "Binder", "Brazil"),
                            Spec("茄芯", "Filler", "Dominican / China"),
                            Spec("浓度", "Strength", "Medium-Full"),
                        ),
                ),
            )

            // --- E-cigarettes (10+) ---
            add(
                Product(
                    id = "ecig_relx_phantom",
                    category = ProductCategory.ECigarette,
                    brand = "RELX 悦刻",
                    series = "幻影",
                    nameZh = "悦刻（幻影）",
                    nameEn = "RELX (Phantom)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 299,
                    descriptionZh = "换弹式主机，吸阻稳定，口味丰富。",
                    descriptionEn = "Pod system with stable draw and diverse flavors.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "380 mAh"),
                            Spec("烟液容量", "E-liquid", "1.9 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% (30 mg/ml) / 5% (50 mg/ml)"),
                            Spec("特色功能", "Features", "Leak-resistant design"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_relx_infinity",
                    category = ProductCategory.ECigarette,
                    brand = "RELX 悦刻",
                    series = "无限",
                    nameZh = "悦刻（无限）",
                    nameEn = "RELX (Infinity)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 269,
                    descriptionZh = "轻巧机身，磁吸烟弹，适合随身。",
                    descriptionEn = "Lightweight body with magnetic pods for daily carry.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "380 mAh"),
                            Spec("烟液容量", "E-liquid", "1.9 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% / 5%"),
                            Spec("特色功能", "Features", "Auto draw, magnetic pod"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_yooz_mini",
                    category = ProductCategory.ECigarette,
                    brand = "YOOZ 柚子",
                    series = "Mini",
                    nameZh = "柚子（Mini）",
                    nameEn = "YOOZ (Mini)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 199,
                    descriptionZh = "小巧便携，口味偏清爽。",
                    descriptionEn = "Compact pod device with refreshing flavor profiles.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "400 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% / 5%"),
                            Spec("特色功能", "Features", "LED indicator"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_yooz_zero2",
                    category = ProductCategory.ECigarette,
                    brand = "YOOZ 柚子",
                    series = "Zero 2",
                    nameZh = "柚子（Zero 2）",
                    nameEn = "YOOZ (Zero 2)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 229,
                    descriptionZh = "更强续航，吸阻更稳定，适合通勤。",
                    descriptionEn = "Better battery life and stable draw for commuting.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "450 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% / 5%"),
                            Spec("特色功能", "Features", "Leak reduction"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_moti_s",
                    category = ProductCategory.ECigarette,
                    brand = "MOTI 魔笛",
                    series = "S",
                    nameZh = "魔笛（S）",
                    nameEn = "MOTI (S)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 199,
                    descriptionZh = "入门友好，烟雾量适中，口味选择多。",
                    descriptionEn = "Beginner-friendly with moderate vapor and many flavors.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "500 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% / 5%"),
                            Spec("特色功能", "Features", "Fast charge"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_snowplus_pro",
                    category = ProductCategory.ECigarette,
                    brand = "SNOWPLUS 雪加",
                    series = "Pro",
                    nameZh = "雪加（Pro）",
                    nameEn = "SNOWPLUS (Pro)",
                    type = "换弹式",
                    origin = "中国",
                    priceCny = 259,
                    descriptionZh = "口味偏甜香，气流更顺滑。",
                    descriptionEn = "Sweeter profiles with smoother airflow.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Pod system"),
                            Spec("电池容量", "Battery", "400 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml (pod)"),
                            Spec("尼古丁含量", "Nicotine", "3% / 5%"),
                            Spec("特色功能", "Features", "Anti-leak pod"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_vaporesso_xros3",
                    category = ProductCategory.ECigarette,
                    brand = "Vaporesso",
                    series = "XROS 3",
                    nameZh = "Vaporesso（XROS 3）",
                    nameEn = "Vaporesso (XROS 3)",
                    type = "注油式",
                    origin = "中国",
                    priceCny = 199,
                    descriptionZh = "可注油，支持多档气流，适合进阶玩家。",
                    descriptionEn = "Refillable pods with adjustable airflow for advanced users.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Refillable pod"),
                            Spec("电池容量", "Battery", "1000 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml"),
                            Spec("尼古丁含量", "Nicotine", "0–50 mg/ml (depends on e-liquid)"),
                            Spec("特色功能", "Features", "Adjustable airflow"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_geekvape_wenax",
                    category = ProductCategory.ECigarette,
                    brand = "Geekvape",
                    series = "Wenax",
                    nameZh = "Geekvape（Wenax）",
                    nameEn = "Geekvape (Wenax)",
                    type = "注油式",
                    origin = "中国",
                    priceCny = 179,
                    descriptionZh = "口感偏清爽，兼顾烟弹与注油仓。",
                    descriptionEn = "Crisp flavor with both cartridge and refill options.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Refillable pod"),
                            Spec("电池容量", "Battery", "1100 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml"),
                            Spec("尼古丁含量", "Nicotine", "0–50 mg/ml (depends on e-liquid)"),
                            Spec("特色功能", "Features", "Button + auto draw"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_aspire_minican",
                    category = ProductCategory.ECigarette,
                    brand = "Aspire",
                    series = "Minican",
                    nameZh = "Aspire（Minican）",
                    nameEn = "Aspire (Minican)",
                    type = "注油式",
                    origin = "中国",
                    priceCny = 129,
                    descriptionZh = "小巧耐用，适合盐油口味。",
                    descriptionEn = "Small and sturdy; works well with nic salts.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Refillable pod"),
                            Spec("电池容量", "Battery", "350 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml"),
                            Spec("尼古丁含量", "Nicotine", "0–50 mg/ml (depends on e-liquid)"),
                            Spec("特色功能", "Features", "Compact body"),
                        ),
                ),
            )
            add(
                Product(
                    id = "ecig_uwell_caliburn",
                    category = ProductCategory.ECigarette,
                    brand = "Uwell",
                    series = "Caliburn A3",
                    nameZh = "Uwell（Caliburn A3）",
                    nameEn = "Uwell (Caliburn A3)",
                    type = "注油式",
                    origin = "中国",
                    priceCny = 169,
                    descriptionZh = "口感细腻，烟雾量适中，入门到进阶均衡。",
                    descriptionEn = "Smooth flavor and moderate vapor, a balanced all-rounder.",
                    specs =
                        listOf(
                            Spec("设备类型", "Device", "Refillable pod"),
                            Spec("电池容量", "Battery", "520 mAh"),
                            Spec("烟液容量", "E-liquid", "2.0 ml"),
                            Spec("尼古丁含量", "Nicotine", "0–50 mg/ml (depends on e-liquid)"),
                            Spec("特色功能", "Features", "Fast charge"),
                        ),
                ),
            )
        }
}

