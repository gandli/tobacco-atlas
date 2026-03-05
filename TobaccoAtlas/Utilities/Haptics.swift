import UIKit

enum Haptics {
	static func favoriteToggled(isOn: Bool) {
		let generator = UINotificationFeedbackGenerator()
		generator.prepare()
		generator.notificationOccurred(isOn ? .success : .warning)
	}

	static func selection() {
		let generator = UISelectionFeedbackGenerator()
		generator.prepare()
		generator.selectionChanged()
	}
}

