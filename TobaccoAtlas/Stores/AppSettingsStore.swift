import Foundation
import SwiftUI

@MainActor
final class AppSettingsStore: ObservableObject {
	@AppStorage("settings_language_v1") private var languageRawValue: String = AppLanguage.zhHans.rawValue

	@Published var language: AppLanguage {
		didSet { languageRawValue = language.rawValue }
	}

	init() {
		self.language = AppLanguage(rawValue: languageRawValue) ?? .zhHans
	}
}

enum AppLanguage: String, CaseIterable, Identifiable {
	case zhHans = "zh-Hans"
	case en = "en"

	var id: String { rawValue }

	var title: String {
		switch self {
		case .zhHans: return "简体中文"
		case .en: return "English"
		}
	}
}
