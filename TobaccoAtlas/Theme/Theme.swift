import SwiftUI
import UIKit

enum Theme {
	static let accent = Color(hex: 0x4CAF50) // warm green

	static let background = Color.white
	static let card = Color.white

	static let textPrimary = Color(hex: 0x111111)
	static let textSecondary = Color(hex: 0x3A3A3A)
	static let muted = Color(hex: 0x6B6B6B)

	static let divider = Color.black.opacity(0.08)
	static let chipBackground = Color.black.opacity(0.06)
	static let imageBackground = Color.black.opacity(0.04)

	static let tabInactive = Color(hex: 0x9E9E9E)
	static let shadow = Color.black.opacity(0.10)

	static func configureAppearance() {
		let navAppearance = UINavigationBarAppearance()
		navAppearance.configureWithOpaqueBackground()
		navAppearance.backgroundColor = UIColor(background)
		navAppearance.titleTextAttributes = [.foregroundColor: UIColor(textPrimary)]
		navAppearance.largeTitleTextAttributes = [.foregroundColor: UIColor(textPrimary)]

		UINavigationBar.appearance().standardAppearance = navAppearance
		UINavigationBar.appearance().scrollEdgeAppearance = navAppearance
		UINavigationBar.appearance().compactAppearance = navAppearance
		UINavigationBar.appearance().tintColor = UIColor(accent)

		let tabAppearance = UITabBarAppearance()
		tabAppearance.configureWithOpaqueBackground()
		tabAppearance.backgroundColor = UIColor(background)

		let normalItemAppearance = tabAppearance.stackedLayoutAppearance.normal
		normalItemAppearance.iconColor = UIColor(tabInactive)
		normalItemAppearance.titleTextAttributes = [.foregroundColor: UIColor(tabInactive)]

		let selectedItemAppearance = tabAppearance.stackedLayoutAppearance.selected
		selectedItemAppearance.iconColor = UIColor(accent)
		selectedItemAppearance.titleTextAttributes = [.foregroundColor: UIColor(accent)]

		UITabBar.appearance().standardAppearance = tabAppearance
		UITabBar.appearance().scrollEdgeAppearance = tabAppearance
		UITabBar.appearance().tintColor = UIColor(accent)
		UITabBar.appearance().unselectedItemTintColor = UIColor(tabInactive)
	}
}

extension Color {
	init(hex: UInt, alpha: Double = 1.0) {
		let red = Double((hex >> 16) & 0xFF) / 255.0
		let green = Double((hex >> 8) & 0xFF) / 255.0
		let blue = Double(hex & 0xFF) / 255.0
		self.init(.sRGB, red: red, green: green, blue: blue, opacity: alpha)
	}
}
