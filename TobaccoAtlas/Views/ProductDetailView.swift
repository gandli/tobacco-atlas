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
						.foregroundStyle(isFavorite ? Theme.accent : .white.opacity(0.9))
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
					.background(Theme.secondary.opacity(0.7))
					clipCapsule()

				VStack(alignment: .leading, spacing: 2) {
					Text(product.brand)
						.font(.subheadline.weight(.semibold))
						.foregroundStyle(Theme.muted)
					Text(product.displayTitle)
						.font(.title3.weight(.semibold))
						.foregroundStyle(.white)
						.lineLimit(2)
				}

				Spacer(minLength: 0)
			}

			HStack(spacing: 10) {
				Text(product.subtitle)
					.font(.caption.weight(.semibold))
					.foregroundStyle(.white.opacity(0.92))
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.secondary.opacity(0.65))
					clipCapsule()

				Text(product.origin)
					.font(.caption.weight(.semibold))
					.foregroundStyle(.white.opacity(0.92))
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.secondary.opacity(0.65))
					clipCapsule()

				if let price = product.priceCNY {
					Text("¥\(price)")
						.font(.caption.weight(.semibold))
						.foregroundStyle(.white.opacity(0.92))
						.padding(.horizontal, 10)
						.padding(.vertical, 6)
						.background(Theme.secondary.opacity(0.65))
						clipCapsule()
				}

				Spacer(minLength: 0)
			}
		}
		.padding(16)
		.background(Theme.card)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
		.transition(.opacity.combined(with: .move(edge: .bottom)))
	}

	private var specs: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("参数 / Specs")
				.font(.headline)

			VStack(spacing: 0) {
				ForEach(product.specs) { spec in
					HStack(alignment: .top, spacing: 12) {
						Text(spec.label)
							.font(.subheadline.weight(.semibold))
							.foregroundStyle(.white.opacity(0.92))
							.frame(width: 128, alignment: .leading)

						Text(spec.value)
							.font(.subheadline)
							.foregroundStyle(Theme.muted)
							.frame(maxWidth: .infinity, alignment: .leading)
					}
					.padding(.vertical, 10)

					if spec.id != product.specs.last?.id {
						Divider().overlay(Theme.divider)
					}
				}
			}
			.padding(.horizontal, 14)
			.background(Theme.card)
			.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
			.overlay {
				RoundedRectangle(cornerRadius: 18, style: .continuous)
					.stroke(Theme.divider, lineWidth: 1)
			}
		}
	}

	private var note: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("口感 / Notes")
				.font(.headline)

			Text(product.tastingNote)
				.font(.body)
				.foregroundStyle(Theme.muted)
				.frame(maxWidth: .infinity, alignment: .leading)
				.padding(16)
				.background(Theme.card)
				.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
				.overlay {
					RoundedRectangle(cornerRadius: 18, style: .continuous)
						.stroke(Theme.divider, lineWidth: 1)
				}
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
	.preferredColorScheme(.dark)
}

