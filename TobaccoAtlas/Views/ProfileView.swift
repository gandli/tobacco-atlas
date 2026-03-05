import SwiftUI

struct ProfileView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore
	@EnvironmentObject private var settingsStore: AppSettingsStore

	private var favoritesCount: Int { favoritesStore.favorites.count }
	private var totalCount: Int { MockCatalog.products.count }

	var body: some View {
		NavigationStack {
			List {
				Section {
					statsRow(title: "收藏", value: "\(favoritesCount)", systemImage: "heart.fill", tint: Theme.accent)
					statsRow(title: "总产品", value: "\(totalCount)", systemImage: "square.grid.2x2.fill", tint: Theme.muted)
				} header: {
					Text("概览 / Overview")
						.foregroundStyle(Theme.muted)
				}

				Section {
					Text("Tobacco Atlas 是一个中国卷烟、雪茄与电子烟的产品图鉴示例应用。数据为 Mock，用于演示分类、搜索、详情与收藏体验。")
						.font(.subheadline)
						.foregroundStyle(Theme.textSecondary)
						.padding(.vertical, 6)
				} header: {
					Text("关于 / About")
						.foregroundStyle(Theme.muted)
				}

				Section {
					Picker("语言 / Language", selection: $settingsStore.language) {
						ForEach(AppLanguage.allCases) { lang in
							Text(lang.title).tag(lang)
						}
					}
					.tint(Theme.accent)
				} header: {
					Text("设置 / Settings")
						.foregroundStyle(Theme.muted)
				}
			}
			.scrollContentBackground(.hidden)
			.background(Theme.background)
			.navigationTitle("我的")
		}
	}

	private func statsRow(title: String, value: String, systemImage: String, tint: Color) -> some View {
		HStack(spacing: 12) {
			Image(systemName: systemImage)
				.symbolVariant(.fill)
				.foregroundStyle(tint)
				.frame(width: 26, height: 26)
				.background(Theme.imageBackground)
				.clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))

			Text(title)
				.foregroundStyle(Theme.textPrimary)

			Spacer(minLength: 0)

			Text(value)
				.font(.subheadline.weight(.semibold))
				.foregroundStyle(Theme.muted)
		}
	}
}

#Preview {
	ProfileView()
		.environmentObject(FavoritesStore())
		.environmentObject(AppSettingsStore())
		.colorScheme(.light)
}
