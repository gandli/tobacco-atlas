import SwiftUI

struct RootTabView: View {
	var body: some View {
		TabView {
			FavoritesView()
				.tabItem {
					Label("收藏", systemImage: "heart.fill")
				}

			ProductCatalogView()
				.tabItem {
					Label("品牌", systemImage: "list.bullet")
				}

			CommunityView()
				.tabItem {
					Label("社区", systemImage: "bubble.left.and.bubble.right.fill")
				}

			ProfileView()
				.tabItem {
					Label("我的", systemImage: "person.fill")
				}
		}
		.toolbarBackground(Theme.primary, for: .tabBar)
		.toolbarBackground(.visible, for: .tabBar)
		.background(Theme.background)
	}
}

#Preview {
	RootTabView()
		.environmentObject(FavoritesStore())
		.preferredColorScheme(.dark)
}

