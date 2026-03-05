import SwiftUI

@main
struct TobaccoAtlasApp: App {
	@StateObject private var favoritesStore = FavoritesStore()
	@StateObject private var compareStore = CompareStore()
	@StateObject private var settingsStore = AppSettingsStore()

	init() {
		Theme.configureAppearance()
	}

	var body: some Scene {
		WindowGroup {
			RootTabView()
				.environmentObject(favoritesStore)
				.environmentObject(compareStore)
				.environmentObject(settingsStore)
				.colorScheme(.light)
				.tint(Theme.accent)
		}
	}
}
