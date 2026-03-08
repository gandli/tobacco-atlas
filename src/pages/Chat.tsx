import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  avatar?: string;
  message: string;
  date: string;
}

const mockMessages: ChatMessage[] = [
  { id: "1", username: "sylvie56", message: "hello", date: "Mar 6" },
  { id: "2", username: "sylvie56", message: "does anyone know where to get any of these cigs in the states i have been looking for months and this website came to me like a gift from god", date: "Mar 6" },
  { id: "3", username: "elegy", avatar: "https://i.pravatar.cc/96?img=3", message: "Was in Longquan for spring festival to see the in-laws, stocked back up", date: "Mar 6" },
  { id: "4", username: "elegy", avatar: "https://i.pravatar.cc/96?img=3", message: "Bouta enjoy the Liqun softpack sunshine for this break", date: "Mar 6" },
  { id: "5", username: "sylvie56", message: "i yearn to have enough money to travel and get some", date: "Mar 6" },
  { id: "6", username: "jeremysahara", avatar: "https://i.pravatar.cc/96?img=5", message: "I am also curious about getting them in the states. Im thinking we'd have to get them shipped", date: "Mar 6" },
  { id: "7", username: "hadj", avatar: "https://i.pravatar.cc/96?img=7", message: "Nihao-salaam-alaikum, does anyone know where to get Chinese cigarettes locally in Vegas?", date: "Mar 6" },
  { id: "8", username: "cig", avatar: "https://i.pravatar.cc/96?img=8", message: ":p", date: "Mar 6" },
  { id: "9", username: "cig", avatar: "https://i.pravatar.cc/96?img=8", message: "are we able to set ratings for cigs, or are they set?", date: "Mar 6" },
  { id: "10", username: "balt_ones", message: "Hello my goats", date: "Mar 6" },
  { id: "11", username: "jack", message: "Cig is a goated username", date: "Mar 6" },
  { id: "12", username: "alhajid", avatar: "https://i.pravatar.cc/96?img=12", message: "hello fellow intellectuals", date: "Mar 6" },
  { id: "13", username: "hung_he_low", message: "Anyone in the US, where is the best place to get Chinese cigarettes outside if duty free stores", date: "Mar 6" },
  { id: "14", username: "alhajid", avatar: "https://i.pravatar.cc/96?img=12", message: "if you live in california by any chance", date: "Mar 6" },
  { id: "15", username: "alhajid", avatar: "https://i.pravatar.cc/96?img=12", message: "then i have a shop in chinatown in sf", date: "Mar 6" },
  { id: "16", username: "alhajid", avatar: "https://i.pravatar.cc/96?img=12", message: "otherwise find the closest chinatown near you and ask around", date: "Mar 6" },
  { id: "17", username: "hung_he_low", message: "Unfortunately not in Cali, I am in Chicago. I tried asking around in Chinatown and everyone is gatekeeping lmao. Might have to give it another go", date: "Mar 6" },
  { id: "18", username: "hung_he_low", message: "Whats your shop called? Might have to stop by whenever I go to SF", date: "Mar 6" },
  { id: "19", username: "smokeman88", avatar: "https://i.pravatar.cc/96?img=15", message: "just got back from shenzhen, brought back 5 cartons of zhonghua 🔥", date: "Mar 7" },
  { id: "20", username: "yunnan_lover", message: "anyone tried the new yuxi slim edition?", date: "Mar 7" },
];

const onlineCount = 59;

const getInitialColor = (username: string) => {
  const colors = [
    "bg-orange-500", "bg-blue-500", "bg-green-500", "bg-purple-500",
    "bg-pink-500", "bg-teal-500", "bg-red-500", "bg-indigo-500",
  ];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Chat = () => {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-border/50">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-foreground">Ciggie Chat</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">{onlineCount} online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 space-y-1">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2.5 py-1.5 hover:bg-secondary/30 rounded-lg px-1 -mx-1 transition-colors">
                {msg.avatar ? (
                  <img
                    src={msg.avatar}
                    alt={msg.username}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                  />
                ) : (
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 mt-0.5 ${getInitialColor(msg.username)}`}>
                    {msg.username[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-foreground hover:underline cursor-pointer">
                      {msg.username}
                    </span>
                    <span className="text-[10px] md:text-xs text-muted-foreground">{msg.date}</span>
                  </div>
                  <p className="text-sm text-foreground/90 break-words">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/50 bg-background/80 backdrop-blur-md">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Sign in to chat..."
                className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                disabled
              />
              <button
                className="w-9 h-9 rounded-full bg-foreground text-primary-foreground flex items-center justify-center flex-shrink-0 opacity-50 cursor-not-allowed"
                disabled
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Chat;
