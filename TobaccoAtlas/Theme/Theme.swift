import SwiftUI

enum Theme {
	static let primary = Color(hex: 0x1A1A2E)
	static let secondary = Color(hex: 0x16213E)
	static let accent = Color(hex: 0xE94560)
	static let background = Color(hex: 0x0F0F23)
	static let card = Color(hex: 0x121231)
	static let muted = Color.white.opacity(0.72)
	static let divider = Color.white.opacity(0.10)
}

extension Color {
	init(hex: UInt, alpha: Double = 1.0) {
		let red = Double((hex >> 16) & 0xFF) / 255.0
		let green = Double((hex >> 8) & 0xFF) / 255.0
		let blue = Double(hex & 0xFF) / 255.0
		self.init(.sRGB, red: red, green: green, blue: blue, opacity: alpha)
	}
}

