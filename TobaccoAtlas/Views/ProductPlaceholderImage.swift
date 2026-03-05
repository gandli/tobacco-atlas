import SwiftUI

struct ProductPlaceholderImage: View {
	let category: ProductCategory
	var size: CGFloat = 28
	var tint: Color = Theme.accent

	var body: some View {
		Image(category.placeholderAssetName)
			.renderingMode(.template)
			.resizable()
			.scaledToFit()
			.foregroundStyle(tint)
			.frame(width: size, height: size)
	}
}

#Preview {
	VStack(spacing: 12) {
		ProductPlaceholderImage(category: .cigarette)
		ProductPlaceholderImage(category: .cigar)
		ProductPlaceholderImage(category: .ecigarette)
	}
	.padding()
	.background(Theme.background)
	.colorScheme(.light)
}
