import SwiftUI

struct ProductDetailView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	let product: Product

	private var isFavorite: Bool { favoritesStore.isFavorite(product) }

	var body: some View {
		ScrollView {
			VStack(alignment: .leading, spacing: 16) {
				hero
					.padding(.top, 6)

				specs

				note
			}
			.padding(.horizontal, 16)
			.padding(.bottom, 24)
		}
		.background(Theme.background)
		.navigationTitle(product.name)
		.navigationBarTitleDisplayMode(.inline)
		.toolbar {
			ToolbarItem(placement: .topBarTrailing) {
				Button {
					withAnimation(.spring(response: 0.35, dampingFraction: 0.75)) {
						favoritesStore.toggle(product)
					}
				} label: {
					Image(systemName: isFavorite ? "heart.fill" : "heart")
						.foregroundStyle(isFavorite ? Theme.accent : Theme.tabInactive)
						.symbolEffect(.bounce, value: isFavorite)
				}
				.accessibilityLabel(isFavorite ? "取消收藏" : "收藏")
			}
		}
	}

	private var hero: some View {
		VStack(alignment: .leading, spacing: 10) {
			HStack(alignment: .center, spacing: 12) {
				Image(systemName: product.category.systemImage)
					.font(.system(size: 20, weight: .semibold))
					.foregroundStyle(Theme.accent)
					.frame(width: 40, height: 40)
					.background(Theme.imageBackground)
					clipCapsule()

				VStack(alignment: .leading, spacing: 2) {
					Text(product.brand)
						.font(.subheadline.weight(.semibold))
						.foregroundStyle(Theme.muted)
					Text(product.displayTitle)
						.font(.title3.weight(.semibold))
						.foregroundStyle(Theme.textPrimary)
						.lineLimit(2)
				}

				Spacer(minLength: 0)
			}

			HStack(spacing: 10) {
				Text(product.subtitle)
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.textSecondary)
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.chipBackground)
					clipCapsule()

				Text(product.origin)
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.textSecondary)
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.chipBackground)
					clipCapsule()

				if let price = product.priceCNY {
					Text("¥\(price)")
						.font(.caption.weight(.semibold))
						.foregroundStyle(Theme.muted)
						.padding(.horizontal, 10)
						.padding(.vertical, 6)
						.background(Theme.chipBackground)
						clipCapsule()
				}

				Spacer(minLength: 0)
			}
		}
		.padding(16)
		.cardStyle()
		.transition(.opacity.combined(with: .move(edge: .bottom)))
	}

	private var specs: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("参数 / Specs")
				.font(.headline)
				.foregroundStyle(Theme.textPrimary)

			VStack(spacing: 0) {
				ForEach(product.specs) { spec in
					HStack(alignment: .top, spacing: 12) {
						Text(spec.label)
							.font(.subheadline.weight(.semibold))
							.foregroundStyle(Theme.textSecondary)
							.frame(width: 128, alignment: .leading)

						Text(spec.value)
							.font(.subheadline)
							.foregroundStyle(Theme.textPrimary)
							.frame(maxWidth: .infinity, alignment: .leading)
					}
					.padding(.vertical, 10)

					if spec.id != product.specs.last?.id {
						Divider().overlay(Theme.divider)
					}
				}
			}
			.padding(.horizontal, 14)
			.cardStyle()
		}
	}

	private var note: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("口感 / Notes")
				.font(.headline)
				.foregroundStyle(Theme.textPrimary)

			Text(product.tastingNote)
				.font(.body)
				.foregroundStyle(Theme.textSecondary)
				.frame(maxWidth: .infinity, alignment: .leading)
				.padding(16)
				.cardStyle()
		}
	}
}

private extension View {
	@ViewBuilder
	func clipCapsule() -> some View {
		self.clipShape(Capsule())
	}
}

#Preview {
	NavigationStack {
		ProductDetailView(product: MockCatalog.products[0])
			.environmentObject(FavoritesStore())
	}
	.colorScheme(.light)
}
