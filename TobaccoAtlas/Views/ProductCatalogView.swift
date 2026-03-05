import SwiftUI

struct ProductCatalogView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore

	@State private var query: String = ""
	@State private var category: ProductCategory = .cigarette
	@State private var brandFilter: String? = nil

	private let columns: [GridItem] = [
		GridItem(.flexible(), spacing: 12),
		GridItem(.flexible(), spacing: 12),
	]

	private var brandsInCategory: [String] {
		Array(Set(MockCatalog.products.filter { $0.category == category }.map(\.brand)))
			.sorted()
	}

	private var filtered: [Product] {
		var base = MockCatalog.products.filter { $0.category == category }
		if let brandFilter {
			base = base.filter { $0.brand == brandFilter }
		}
		guard !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return base }
		let q = query.lowercased()
		return base.filter { $0.searchableText.lowercased().contains(q) }
	}

	private var heroProducts: [Product] {
		Array(MockCatalog.products.filter { $0.category == category }.prefix(10))
	}

	var body: some View {
		NavigationStack {
			ScrollView {
				VStack(alignment: .leading, spacing: 12) {
					header

					LazyVGrid(columns: columns, spacing: 12) {
						ForEach(filtered) { product in
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
							.transition(.opacity.combined(with: .scale))
						}
					}
					.animation(.easeInOut(duration: 0.25), value: filtered)

					if filtered.isEmpty {
						emptyState
							.transition(.opacity)
					}
				}
				.padding(.horizontal, 16)
				.padding(.top, 12)
				.padding(.bottom, 24)
			}
			.background(Theme.background)
			.navigationTitle("Tobacco Atlas")
			.navigationBarTitleDisplayMode(.inline)
			.searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "搜索品牌/系列/口味")
			.navigationDestination(for: Product.self) { product in
				ProductDetailView(product: product)
					.environmentObject(favoritesStore)
			}
		}
	}

	private var header: some View {
		VStack(alignment: .leading, spacing: 10) {
			VStack(alignment: .leading, spacing: 10) {
				Text("中国烟草图鉴")
					.font(.title2.weight(.semibold))
					.foregroundStyle(Theme.textPrimary)

				ScrollView(.horizontal, showsIndicators: false) {
					HStack(spacing: 12) {
						ForEach(heroProducts) { product in
							NavigationLink(value: product) {
								VStack(alignment: .leading, spacing: 10) {
									ZStack {
										RoundedRectangle(cornerRadius: 16, style: .continuous)
											.fill(Theme.imageBackground)
										ProductPlaceholderImage(category: product.category, size: 44, tint: Theme.accent)
									}
									.frame(width: 140, height: 92)

									Text(product.brand)
										.font(.subheadline.weight(.semibold))
										.foregroundStyle(Theme.textPrimary)
										.lineLimit(1)
								}
								.padding(12)
								.frame(width: 164, alignment: .leading)
								.cardStyle(cornerRadius: 20)
							}
							.buttonStyle(.plain)
						}
					}
					.padding(.horizontal, 2)
				}
			}

			Picker("分类", selection: $category) {
				ForEach(ProductCategory.allCases) { category in
					Label(category.shortTitle, systemImage: category.systemImage)
						.tag(category)
				}
			}
			.pickerStyle(.segmented)

			ScrollView(.horizontal, showsIndicators: false) {
				HStack(spacing: 10) {
					Button {
						withAnimation(.easeInOut(duration: 0.2)) {
							brandFilter = nil
						}
					} label: {
						Text("全部")
							.font(.caption.weight(.semibold))
							.foregroundStyle(brandFilter == nil ? .white : Theme.textSecondary)
							.padding(.horizontal, 12)
							.padding(.vertical, 8)
							.background(brandFilter == nil ? Theme.accent : Theme.chipBackground)
							.clipShape(Capsule())
					}
					.buttonStyle(.plain)

					ForEach(brandsInCategory, id: \.self) { brand in
						Button {
							withAnimation(.spring(response: 0.35, dampingFraction: 0.85)) {
								brandFilter = brand
							}
						} label: {
							Text(brand)
								.font(.caption.weight(.semibold))
								.foregroundStyle(brandFilter == brand ? .white : Theme.textSecondary)
								.padding(.horizontal, 12)
								.padding(.vertical, 8)
								.background(brandFilter == brand ? Theme.accent : Theme.chipBackground)
								.clipShape(Capsule())
								.lineLimit(1)
						}
						.buttonStyle(.plain)
					}
				}
			}
		}
		.onChange(of: category) { _, _ in
			withAnimation(.easeInOut(duration: 0.2)) {
				brandFilter = nil
			}
		}
	}

	private var emptyState: some View {
		VStack(spacing: 10) {
			Image(systemName: "magnifyingglass")
				.font(.system(size: 28, weight: .semibold))
				.foregroundStyle(Theme.muted)
			Text("没有找到相关产品")
				.font(.headline)
				.foregroundStyle(Theme.textPrimary)
			Text("试试更短的关键词，例如 “中华” 或 “薄荷”。")
				.font(.subheadline)
				.foregroundStyle(Theme.muted)
				.multilineTextAlignment(.center)
		}
		.frame(maxWidth: .infinity)
		.padding(.vertical, 26)
		.cardStyle()
		.padding(.top, 12)
	}
}

#Preview {
	ProductCatalogView()
		.environmentObject(FavoritesStore())
		.colorScheme(.light)
}
