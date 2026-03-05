import SwiftUI

struct BrandGroupingView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	@EnvironmentObject private var compareStore: CompareStore

	@State private var query: String = ""
	@State private var lastRefreshedAt: Date? = nil
	@State private var showComparison: Bool = false

	private var brands: [String] {
		let all = Array(Set(MockCatalog.products.map(\.brand))).sorted()
		guard !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return all }
		let q = query.lowercased()
		return all.filter { $0.lowercased().contains(q) }
	}

	private var columns: [GridItem] {
		[
			GridItem(.adaptive(minimum: 140), spacing: 12),
		]
	}

	var body: some View {
		NavigationStack {
			ScrollView {
				VStack(alignment: .leading, spacing: 12) {
					header

					LazyVGrid(columns: columns, spacing: 12) {
						ForEach(brands, id: \.self) { brand in
							NavigationLink(value: brand) {
								brandCard(brand)
							}
							.buttonStyle(.plain)
						}
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
			.navigationTitle("品牌")
			.navigationBarTitleDisplayMode(.inline)
			.searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always), prompt: "搜索品牌")
			.navigationDestination(for: String.self) { brand in
				BrandProductsView(brand: brand)
					.environmentObject(favoritesStore)
					.environmentObject(compareStore)
			}
			.toolbar {
				ToolbarItem(placement: .topBarTrailing) {
					Button {
						showComparison = true
					} label: {
						Label("对比", systemImage: "rectangle.2.swap")
							.symbolVariant(.fill)
					}
					.disabled(!compareStore.canCompare)
				}
			}
			.sheet(isPresented: $showComparison) {
				ProductComparisonSheet()
					.environmentObject(compareStore)
			}
		}
	}

	private var header: some View {
		VStack(alignment: .leading, spacing: 8) {
			Text("按品牌浏览所有产品")
				.font(.title3.weight(.semibold))
				.foregroundStyle(Theme.textPrimary)

			HStack(spacing: 10) {
				Label("\(brands.count) 品牌", systemImage: "tag.fill")
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.muted)

				if let lastRefreshedAt {
					Text("更新于 \(lastRefreshedAt.formatted(date: .omitted, time: .shortened))")
						.font(.caption)
						.foregroundStyle(Theme.muted)
				}

				Spacer(minLength: 0)
			}
		}
	}

	private func brandCard(_ brand: String) -> some View {
		let count = MockCatalog.products.filter { $0.brand == brand }.count

		return VStack(alignment: .leading, spacing: 10) {
			HStack(alignment: .firstTextBaseline, spacing: 10) {
				Text(brand)
					.font(.headline.weight(.semibold))
					.foregroundStyle(Theme.textPrimary)
					.lineLimit(2)

				Spacer(minLength: 0)

				Text("\(count)")
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.textSecondary)
					.padding(.horizontal, 10)
					.padding(.vertical, 6)
					.background(Theme.chipBackground)
					.clipShape(Capsule())
			}

			Text("点击查看该品牌全部产品")
				.font(.caption)
				.foregroundStyle(Theme.muted)
		}
		.padding(14)
		.cardStyle()
	}
}

#Preview {
	BrandGroupingView()
		.environmentObject(FavoritesStore())
		.environmentObject(CompareStore())
		.colorScheme(.light)
}
