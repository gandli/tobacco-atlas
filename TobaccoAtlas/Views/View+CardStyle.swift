import SwiftUI

extension View {
	@ViewBuilder
	func cardStyle(cornerRadius: CGFloat = 18) -> some View {
		self
			.background(Theme.card)
			.overlay {
				RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
					.stroke(Theme.divider, lineWidth: 1)
			}
			.clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
			.contentShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
			.shadow(color: Theme.shadow, radius: 10, x: 0, y: 4)
	}
}
