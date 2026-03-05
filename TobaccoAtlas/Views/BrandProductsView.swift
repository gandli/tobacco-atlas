import SwiftUI

struct BrandProductsView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	@EnvironmentObject private var compareStore: CompareStore

	let brand: String

	@State private var query: String = ""
	@State private var category: ProductCategory? = nil
	@State private var lastRefreshedAt: Date? = nil
	@State private var showComparison: Bool = false

	private let columns: [GridItem] = [
		GridItem(.flexible(), spacing: 12),
		GridItem(.flexible(), spacing: 12),
	]

	private var products: [Product] {
		var base = MockCatalog.products.filter { $0.brand == brand }
		if let category {
			base = base.filter { $0.category == category }
		}
		guard !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return base }
		let q = query.lowercased()
		return base.filter { $0.searchableText.lowercased().contains(q) }
	}

	var body: some View {
		ScrollView {
			VStack(alignment: .leading, spacing: 12) {
				header

				LazyVGrid(columns: columns, spacing: 12) {
					ForEach(products) { product in
						ZStack(alignment: .topTrailing) {
							NavigationLink(value: product) {
								ProductCardView(product: product)
									.environmentObject(favoritesStore)
									.environmentObject(compareStore)
							}
							.buttonStyle(.plain)

							HStack(spacing: 8) {
								CompareToggleButton(product: product)
									.environmentObject(compareStore)

								FavoriteToggleButton(product: product)
									.environmentObject(favoritesStore)
							}
							.padding(10)
						}
					}
				}

				if products.isEmpty {
					emptyState
						.padding(.top, 12)
				}
			}
			.padding(.horizontal, 16)
			.padding(.top, 12)
			.padding(.bottom, 24)
		}
		.refreshable {
			try? await Task.sleep(nanoseconds: 350_000_000)
			lastRefreshedAt = Date()
		}
		.background(Theme.background)
		.navigationTitle(brand)
		.navigationBarTitleDisplayMode(.inline)
		.searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "在品牌内搜索")
		.navigationDestination(for: Product.self) { product in
			ProductDetailView(product: product)
				.environmentObject(favoritesStore)
				.environmentObject(compareStore)
		}
		.toolbar {
			ToolbarItem(placement: .topBarTrailing) {
				Button {
					showComparison = true
				} label: {
					Text("对比 \(compareStore.selectedIDs.count)/\(CompareStore.maxItems)")
						.font(.caption.weight(.semibold))
						.foregroundStyle(Theme.textSecondary)
						.padding(.horizontal, 10)
						.padding(.vertical, 6)
						.background(Theme.chipBackground)
						.clipShape(Capsule())
				}
				.disabled(!compareStore.canCompare)
			}
		}
		.sheet(isPresented: $showComparison) {
			ProductComparisonSheet()
				.environmentObject(compareStore)
		}
	}

	private var header: some View {
		VStack(alignment: .leading, spacing: 10) {
			Picker("分类", selection: $category) {
				Text("全部").tag(ProductCategory?.none)
				ForEach(ProductCategory.allCases) { category in
					Text(category.shortTitle).tag(ProductCategory?.some(category))
				}
			}
			.pickerStyle(.segmented)

			if let lastRefreshedAt {
				Text("更新于 \(lastRefreshedAt.formatted(date: .omitted, time: .shortened))")
					.font(.caption)
					.foregroundStyle(Theme.muted)
			}
		}
	}

	private var emptyState: some View {
		VStack(spacing: 10) {
			Image(systemName: "tray")
				.font(.system(size: 28, weight: .semibold))
				.foregroundStyle(Theme.muted)
			Text("没有匹配的产品")
				.font(.headline)
				.foregroundStyle(Theme.textPrimary)
			Text("换个分类或搜索关键词试试。")
				.font(.subheadline)
				.foregroundStyle(Theme.muted)
		}
		.frame(maxWidth: .infinity)
		.padding(.vertical, 26)
		.cardStyle()
	}
}

#Preview {
	NavigationStack {
		BrandProductsView(brand: MockCatalog.products[0].brand)
			.environmentObject(FavoritesStore())
			.environmentObject(CompareStore())
	}
	.colorScheme(.light)
}
