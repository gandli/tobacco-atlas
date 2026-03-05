import SwiftUI

struct ProductCardView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore

	let product: Product

	private var isFavorite: Bool {
		favoritesStore.isFavorite(product)
	}

	var body: some View {
		VStack(alignment: .leading, spacing: 10) {
			HStack(alignment: .top) {
				VStack(alignment: .leading, spacing: 6) {
					Text(product.brand)
						.font(.caption.weight(.semibold))
						.foregroundStyle(Theme.muted)
						.lineLimit(1)

					Text(product.name)
						.font(.headline.weight(.semibold))
						.foregroundStyle(.white)
						.lineLimit(1)

					Text(product.series)
						.font(.subheadline)
						.foregroundStyle(.white.opacity(0.92))
						.lineLimit(1)
				}

				Spacer(minLength: 8)

				Image(systemName: isFavorite ? "heart.fill" : "heart")
					.font(.system(size: 14, weight: .semibold))
					.foregroundStyle(isFavorite ? Theme.accent : Theme.muted)
					.symbolEffect(.bounce, value: isFavorite)
			}

			HStack(spacing: 8) {
				Label(product.category.shortTitle, systemImage: product.category.systemImage)
					.font(.caption2.weight(.semibold))
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.secondary.opacity(0.65))
					clipCapsule()

				if let price = product.priceCNY {
					Text("¥\(price)")
						.font(.caption2.weight(.semibold))
						.foregroundStyle(.white.opacity(0.92))
						.padding(.horizontal, 10)
						.padding(.vertical, 6)
						.background(Theme.secondary.opacity(0.65))
						clipCapsule()
				}

				Spacer(minLength: 0)
			}
		}
		.padding(14)
		.background(cardBackground)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
		.contentShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
	}

	private var cardBackground: some View {
		RoundedRectangle(cornerRadius: 18, style: .continuous)
			.fill(Theme.card)
			overlayGradient()
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
				.foregroundStyle(isFavorite ? Theme.accent : Theme.muted)
				.padding(10)
				.background(Theme.secondary.opacity(0.65))
				.clipShape(Circle())
				.overlay { Circle().stroke(Theme.divider, lineWidth: 1) }
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

	@ViewBuilder
	func overlayGradient() -> some View {
		self.overlay(alignment: .topTrailing) {
			Circle()
				.fill(
					LinearGradient(
						colors: [Theme.accent.opacity(0.35), Color.clear],
						startPoint: .top,
						endPoint: .bottom
					)
				)
				.frame(width: 120, height: 120)
				.offset(x: 42, y: -42)
				.blendMode(.plusLighter)
		}
	}
}

#Preview {
	ProductCardView(product: MockCatalog.products[0])
		.environmentObject(FavoritesStore())
		.padding()
		.preferredColorScheme(.dark)
}
