
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AssistantDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "I'm your Ark Forge Assistant. I've indexed your company's knowledge across 100+ apps. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gemini = new GeminiService();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsThinking(true);

    // Artificial delay to show "Thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = await gemini.getAssistantResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsThinking(false);
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[550px] transition-all">
      <div className="bg-white px-6 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#343CED] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-[#D8FD49] rounded-sm"></div>
          </div>
          <span className="font-bold text-gray-900">Ark Forge Assistant</span>
        </div>
        <div className="text-xs text-gray-400 font-medium">Synced with Slack, Drive, Jira</div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-[#343CED] text-white' 
                : 'bg-gray-50 text-gray-800 border border-gray-100'
            }`}>
              <p className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="30 60"></circle></svg>
              Thinking • 12 sources
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-2 animate-pulse">
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-[10px]">✓</div>
                Checking latest Slack threads in #sales-ops
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-[10px]">✓</div>
                Scanning G-Drive for 'Q4 Projections.pdf'
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[#343CED] animate-[progress_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-50/50 border-t">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything... (e.g. 'What is the status of the Acme Corp deal?')"
            className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-6 pr-14 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#343CED] transition-all text-[14px]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#343CED] rounded-lg flex items-center justify-center text-white disabled:opacity-50 hover:bg-[#282ec4] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssistantDemo;
