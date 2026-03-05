import Foundation
import SwiftUI

@MainActor
final class FavoritesStore: ObservableObject {
	@AppStorage("favorites_v1") private var favoritesData: Data = Data()
	@Published private(set) var favorites: Set<String> = []

	init() {
		loadFromStorage()
	}

	func isFavorite(_ product: Product) -> Bool {
		favorites.contains(product.id)
	}

	func toggle(_ product: Product) {
		if favorites.contains(product.id) {
			favorites.remove(product.id)
		} else {
			favorites.insert(product.id)
		}
		persist()
	}

	func favoritesList(from allProducts: [Product]) -> [Product] {
		allProducts.filter { favorites.contains($0.id) }
	}

	private func loadFromStorage() {
		guard !favoritesData.isEmpty else {
			favorites = []
			return
		}
		do {
			let decoded = try JSONDecoder().decode([String].self, from: favoritesData)
			favorites = Set(decoded)
		} catch {
			favorites = []
		}
	}

	private func persist() {
		let ids = Array(favorites).sorted()
		do {
			favoritesData = try JSONEncoder().encode(ids)
		} catch {
			// If encoding fails, keep in-memory state but don't crash.
		}
	}
}

