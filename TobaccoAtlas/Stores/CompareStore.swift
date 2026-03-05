import Foundation
import SwiftUI

@MainActor
final class CompareStore: ObservableObject {
	static let maxItems = 3

	@AppStorage("compare_ids_v1") private var compareData: Data = Data()
	@Published private(set) var selectedIDs: [String] = []

	var canCompare: Bool { selectedIDs.count >= 2 }

	init() {
		load()
	}

	func contains(_ product: Product) -> Bool {
		selectedIDs.contains(product.id)
	}

	func toggle(_ product: Product) {
		if let index = selectedIDs.firstIndex(of: product.id) {
			selectedIDs.remove(at: index)
			persist()
			return
		}

		guard selectedIDs.count < Self.maxItems else { return }
		selectedIDs.append(product.id)
		persist()
	}

	func clear() {
		selectedIDs = []
		persist()
	}

	func products(from catalog: [Product]) -> [Product] {
		let map = Dictionary(uniqueKeysWithValues: catalog.map { ($0.id, $0) })
		return selectedIDs.compactMap { map[$0] }
	}

	private func load() {
		guard !compareData.isEmpty else {
			selectedIDs = []
			return
		}
		do {
			selectedIDs = try JSONDecoder().decode([String].self, from: compareData)
		} catch {
			selectedIDs = []
		}
	}

	private func persist() {
		do {
			compareData = try JSONEncoder().encode(selectedIDs)
		} catch {
			// Keep in-memory state.
		}
	}
}

