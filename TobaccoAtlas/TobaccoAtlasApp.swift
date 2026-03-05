import SwiftUI

@main
struct TobaccoAtlasApp: App {
	@StateObject private var favoritesStore = FavoritesStore()

	var body: some Scene {
		WindowGroup {
			RootTabView()
				.environmentObject(favoritesStore)
				.preferredColorScheme(.dark)
				.tint(Theme.accent)
		}
	}
}

