import SwiftUI

struct CommunityPost: Identifiable, Hashable {
	let id: String
	let author: String
	let title: String
	let content: String
	let tags: [String]
	let likes: Int
	let replies: Int
	let time: String
}

struct CommunityView: View {
	private let posts: [CommunityPost] = [
		.init(id: "p1", author: "小李", title: "煊赫门真的那么甜吗？", content: "最近想换口粮，有没有更“甜净”的推荐？", tags: ["卷烟", "口感"], likes: 128, replies: 34, time: "今天"),
		.init(id: "p2", author: "阿哲", title: "国茄入门怎么选", content: "长城 132、王冠 经典、黄鹤楼雪茄经典三款你们怎么排？", tags: ["雪茄", "入门"], likes: 89, replies: 21, time: "昨天"),
		.init(id: "p3", author: "MOMO", title: "换弹式更适合我", content: "悦刻幻影的吸阻最像真烟，柚子NEO冷感也不错。你们最常用哪款？", tags: ["电子烟", "设备"], likes: 162, replies: 52, time: "本周"),
	]

	var body: some View {
		NavigationStack {
			ScrollView {
				VStack(spacing: 12) {
					ForEach(posts) { post in
						postCard(post)
							.transition(.opacity.combined(with: .move(edge: .bottom)))
					}
				}
				.padding(.horizontal, 16)
				.padding(.top, 12)
				.padding(.bottom, 24)
			}
			.background(Theme.background)
			.navigationTitle("社区")
			.toolbarBackground(Theme.primary, for: .navigationBar)
			.toolbarBackground(.visible, for: .navigationBar)
		}
	}

	private func postCard(_ post: CommunityPost) -> some View {
		VStack(alignment: .leading, spacing: 10) {
			HStack {
				Text(post.title)
					.font(.headline.weight(.semibold))
					.foregroundStyle(.white)
				Spacer(minLength: 0)
				Text(post.time)
					.font(.caption)
					.foregroundStyle(Theme.muted)
			}

			Text(post.content)
				.font(.subheadline)
				.foregroundStyle(Theme.muted)

			HStack(spacing: 8) {
				ForEach(post.tags, id: \.self) { tag in
					Text("#\(tag)")
						.font(.caption2.weight(.semibold))
						.foregroundStyle(.white.opacity(0.92))
						.padding(.horizontal, 10)
						.padding(.vertical, 6)
						.background(Theme.secondary.opacity(0.65))
						.clipShape(Capsule())
				}

				Spacer(minLength: 0)

				Label("\(post.replies)", systemImage: "bubble.right")
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.muted)

				Label("\(post.likes)", systemImage: "hand.thumbsup")
					.font(.caption.weight(.semibold))
					.foregroundStyle(Theme.muted)
			}
		}
		.padding(16)
		.background(Theme.card)
		.overlay {
			RoundedRectangle(cornerRadius: 18, style: .continuous)
				.stroke(Theme.divider, lineWidth: 1)
		}
		.clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
		.animation(.easeInOut(duration: 0.25), value: post)
	}
}

#Preview {
	CommunityView()
		.preferredColorScheme(.dark)
}

