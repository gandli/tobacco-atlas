import Foundation

enum ProductCategory: String, Codable, CaseIterable, Identifiable {
	case cigarette
	case cigar
	case ecigarette

	var id: String { rawValue }

	var title: String {
		switch self {
		case .cigarette: return "卷烟 / Cigarettes"
		case .cigar: return "雪茄 / Cigars"
		case .ecigarette: return "电子烟 / E‑cigarettes"
		}
	}

	var shortTitle: String {
		switch self {
		case .cigarette: return "卷烟"
		case .cigar: return "雪茄"
		case .ecigarette: return "电子烟"
		}
	}

	var systemImage: String {
		switch self {
		case .cigarette: return "flame.fill"
		case .cigar: return "leaf.fill"
		case .ecigarette: return "bolt.fill"
		}
	}

	var placeholderAssetName: String {
		switch self {
		case .cigarette: return "PlaceholderCigarette"
		case .cigar: return "PlaceholderCigar"
		case .ecigarette: return "PlaceholderECigarette"
		}
	}
}

struct ProductSpec: Identifiable, Hashable, Codable {
	let id: String
	let label: String
	let value: String

	init(_ id: String, _ label: String, _ value: String) {
		self.id = id
		self.label = label
		self.value = value
	}
}

struct Product: Identifiable, Hashable, Codable {
	let id: String
	let category: ProductCategory
	let brand: String
	let series: String
	let name: String
	let subtitle: String
	let origin: String
	let priceCNY: Int?
	let tastingNote: String
	let specs: [ProductSpec]
	let tags: [String]

	var displayTitle: String { "\(name) · \(series)" }
	var searchableText: String {
		([brand, series, name, subtitle, origin, tastingNote] + tags).joined(separator: " ")
	}
}
