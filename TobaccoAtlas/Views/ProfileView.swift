import SwiftUI

struct ProfileView: View {
	@EnvironmentObject private var favoritesStore: FavoritesStore

	private var favoritesCount: Int { favoritesStore.favorites.count }
	private var totalCount: Int { MockCatalog.products.count }

	var body: some View {
		NavigationStack {
			ScrollView {
				VStack(spacing: 12) {
					stats
						.padding(.top, 12)

					about

					settingsHint
				}
				.padding(.horizontal, 16)
				.padding(.bottom, 24)
			}
			.background(Theme.background)
			.navigationTitle("我的")
			.toolbarBackground(Theme.primary, for: .navigationBar)
			.toolbarBackground(.visible, for: .navigationBar)
		}
	}

	private var stats: some View {
		VStack(alignment: .leading, spacing: 12) {
			Text("概览 / Overview")
				.font(.headline)

			HStack(spacing: 12) {
				statChip(title: "收藏", value: "\(favoritesCount)", systemImage: "heart.fill", tint: Theme.accent)
				statChip(title: "总产品", value: "\(totalCount)", systemImage: "square.grid.2x2.fill", tint: Theme.muted)
			}
		}
		.frame(maxWidth: .infinity, alignment: .leading)
	}

	private func statChip(title: String, value: String, systemImage: String, tint: Color) -> some View {
		VStack(alignment: .leading, spacing: 10) {
			HStack {
				Image(systemName: systemImage)
					.foregroundStyle(tint)
				Text(title)
					.font(.subheadline.weight(.semibold))
					.foregroundStyle(Theme.muted)
				Spacer(minLength: 0)
			}

			Text(value)
				.font(.title2.weight(.semibold))
				.foregroundStyle(.white)
		}
		.padding(16)
		.frame(maxWidth: .infinity, alignment: .leading)
		.background(Theme.card)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
	}

	private var about: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("关于 / About")
				.font(.headline)

			Text("Tobacco Atlas 是一个中国卷烟、雪茄与电子烟的产品图鉴示例应用。数据为 Mock，用于演示分类、搜索、详情与收藏体验。")
				.font(.subheadline)
				.foregroundStyle(Theme.muted)
		}
		.frame(maxWidth: .infinity, alignment: .leading)
		.padding(16)
		.background(Theme.card)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
	}

	private var settingsHint: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text("主题 / Theme")
				.font(.headline)

			HStack(spacing: 12) {
				colorSwatch(Theme.primary, name: "#1a1a2e")
				colorSwatch(Theme.accent, name: "#e94560")
				Spacer(minLength: 0)
			}

			Text("应用默认深色主题（iOS 17+），并使用自定义色板。")
				.font(.subheadline)
				.foregroundStyle(Theme.muted)
		}
		.frame(maxWidth: .infinity, alignment: .leading)
		.padding(16)
		.background(Theme.card)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
	}

	private func colorSwatch(_ color: Color, name: String) -> some View {
		HStack(spacing: 8) {
			Circle()
				.fill(color)
				.frame(width: 14, height: 14)
				overlayCircleBorder()
			Text(name)
				.font(.caption.weight(.semibold))
				.foregroundStyle(Theme.muted)
		}
		.padding(.horizontal, 10)
		.padding(.vertical, 8)
		.background(Theme.secondary.opacity(0.65))
		.clipShape(Capsule())
	}
}

private extension View {
	@ViewBuilder
	func overlayCircleBorder() -> some View {
		self.overlay {
			Circle().stroke(Theme.divider, lineWidth: 1)
		}
	}
}

#Preview {
	ProfileView()
		.environmentObject(FavoritesStore())
		.preferredColorScheme(.dark)
}

