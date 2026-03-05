import SwiftUI

struct FavoritesView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	@State private var query: String = ""

	private let columns: [GridItem] = [
		GridItem(.flexible(), spacing: 12),
		GridItem(.flexible(), spacing: 12),
	]

	private var favorites: [Product] {
		let base = favoritesStore.favoritesList(from: MockCatalog.products)
		guard !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return base }
		let q = query.lowercased()
		return base.filter { $0.searchableText.lowercased().contains(q) }
	}

	var body: some View {
		NavigationStack {
			ScrollView {
				VStack(alignment: .leading, spacing: 12) {
					if favorites.isEmpty {
						emptyState
							.transition(.opacity.combined(with: .scale))
							.padding(.top, 12)
					} else {
						LazyVGrid(columns: columns, spacing: 12) {
							ForEach(favorites) { product in
								ZStack(alignment: .topTrailing) {
									NavigationLink(value: product) {
										ProductCardView(product: product)
											.environmentObject(favoritesStore)
									}
									.buttonStyle(.plain)

									FavoriteToggleButton(product: product)
										.environmentObject(favoritesStore)
										.padding(10)
								}
								.transition(.opacity.combined(with: .move(edge: .bottom)))
							}
						}
						.animation(.spring(response: 0.35, dampingFraction: 0.85), value: favorites)
					}
				}
				.padding(.horizontal, 16)
				.padding(.bottom, 24)
			}
			.background(Theme.background)
			.navigationTitle("收藏")
			.searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "在收藏中搜索")
			.navigationDestination(for: Product.self) { product in
				ProductDetailView(product: product)
					.environmentObject(favoritesStore)
			}
		}
	}

	private var emptyState: some View {
		VStack(spacing: 12) {
			Image(systemName: "heart.slash")
				.font(.system(size: 30, weight: .semibold))
				.foregroundStyle(Theme.muted)
			Text("还没有收藏")
				.font(.headline)
				.foregroundStyle(Theme.textPrimary)
			Text("在“品牌”里点一下 ♥ 把喜欢的产品收进来。")
				.font(.subheadline)
				.foregroundStyle(Theme.muted)
				.multilineTextAlignment(.center)
		}
		.frame(maxWidth: .infinity)
		.padding(.vertical, 26)
		.cardStyle()
	}
}

#Preview {
	FavoritesView()
		.environmentObject(FavoritesStore())
		.colorScheme(.light)
}
