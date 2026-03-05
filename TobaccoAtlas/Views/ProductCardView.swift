import SwiftUI

struct ProductCardView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore

	let product: Product

	var body: some View {
		VStack(alignment: .leading, spacing: 10) {
			ZStack {
				RoundedRectangle(cornerRadius: 14, style: .continuous)
					.fill(Theme.imageBackground)
				ProductPlaceholderImage(category: product.category, size: 56, tint: Theme.accent)
			}
			.frame(height: 108)

			Text(product.brand)
				.font(.headline.weight(.semibold))
				.foregroundStyle(Theme.textPrimary)
				.lineLimit(1)

			Text(product.name)
				.font(.subheadline)
				.foregroundStyle(Theme.textSecondary)
				.lineLimit(1)

			HStack(spacing: 8) {
				Label(product.category.shortTitle, systemImage: product.category.systemImage)
					.font(.caption2.weight(.semibold))
					.foregroundStyle(Theme.textSecondary)
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.chipBackground)
					clipCapsule()

				Spacer(minLength: 0)

				if let price = product.priceCNY {
					Text("¥\(price)")
						.font(.caption.weight(.semibold))
						.foregroundStyle(Theme.muted)
				}
			}
		}
		.padding(14)
		.cardStyle()
	}
}

struct FavoriteToggleButton: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	let product: Product

	private var isFavorite: Bool { favoritesStore.isFavorite(product) }

	var body: some View {
		Button {
			withAnimation(.spring(response: 0.35, dampingFraction: 0.75)) {
				favoritesStore.toggle(product)
			}
		} label: {
			Image(systemName: isFavorite ? "heart.fill" : "heart")
				.font(.system(size: 14, weight: .semibold))
				.foregroundStyle(isFavorite ? Theme.accent : Theme.tabInactive)
				.padding(10)
				.background(Theme.card)
				.clipShape(Circle())
				.overlay { Circle().stroke(Theme.divider, lineWidth: 1) }
				.shadow(color: Theme.shadow, radius: 8, x: 0, y: 3)
				.symbolEffect(.bounce, value: isFavorite)
		}
		.buttonStyle(.plain)
		.accessibilityLabel(isFavorite ? "取消收藏" : "收藏")
	}
}

private extension View {
	@ViewBuilder
	func clipCapsule() -> some View {
		self.clipShape(Capsule())
	}
}

#Preview {
	ProductCardView(product: MockCatalog.products[0])
		.environmentObject(FavoritesStore())
		.padding()
		.colorScheme(.light)
}
