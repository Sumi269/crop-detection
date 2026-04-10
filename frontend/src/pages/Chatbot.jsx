import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import VoiceInput from "../components/VoiceInput";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Hello! I am your AI farming assistant. Ask me anything about crop diseases or weather effects!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages([...newMsgs, { role: "ai", text: data.reply || "Sorry, I couldn't process that." }]);
    } catch (err) {
      setMessages([...newMsgs, { role: "ai", text: "Connection error logging to AI Service." }]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col pt-24 pb-6 px-4">
      <Navbar />
      
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[80vh] bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-slate-800/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-4">
           <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-full flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              🤖
           </div>
           <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Gemini Agriculture AI</h1>
              <p className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
              </p>
           </div>
        </div>
        
        {/* Chat Window */}
        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 scroll-smooth pb-32">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}>
              <div className={`max-w-[75%] rounded-3xl p-5 shadow-lg ${
                  msg.role === "user" 
                  ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-sm" 
                  : "bg-slate-700/60 border border-white/5 text-slate-100 rounded-bl-sm"
               }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start animate-fade-in-up">
               <div className="bg-slate-700/60 border border-white/5 rounded-3xl p-5 rounded-bl-sm flex gap-2 items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent">
          <div className="flex items-center gap-3 bg-slate-800/90 backdrop-blur-md p-2 pl-6 rounded-full border border-white/10 shadow-2xl focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about crop diseases, fertilizers, or weather impacts..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-400 py-3"
            />
            {/* Voice Input Integration */}
            <VoiceInput onResult={(t) => sendMessage(t)} />
            
            <button 
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:hover:scale-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
