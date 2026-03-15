'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Image, User, CheckCircle2 } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'provider';
    time: string;
}

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'สวัสดีค่ะ กำลังเดินทางไปนะคะ', sender: 'provider', time: '10:00' },
        { id: 2, text: 'รบกวนขอตำแหน่งที่แน่นอนอีกครั้งค่ะ', sender: 'provider', time: '10:01' },
        { id: 3, text: 'หน้าบ้านมีป้ายสีเขียวครับ', sender: 'user', time: '10:02' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
        setInputValue('');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col h-full bg-gray-50">
                {/* Chat Header */}
                <div className="p-6 pt-10 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-main">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-main">พยาบาลแอน</h3>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-text-muted font-bold">ออนไลน์</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </button>
                </div>

                {/* Messages List */}
                <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.9, x: msg.sender === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                                msg.sender === 'user' 
                                ? 'bg-primary text-white rounded-tr-none' 
                                : 'bg-white text-text-main rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-text-muted mt-1 px-2 font-bold">{msg.time}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100 pb-10">
                    <div className="flex items-center gap-3">
                        <button className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <Image size={24} />
                        </button>
                        <div className="flex-1 bg-gray-50 rounded-2xl px-4 flex items-center border border-gray-200 focus-within:border-primary transition-all">
                            <input 
                                type="text" 
                                placeholder="พิมพ์ข้อความ..." 
                                className="w-full h-12 bg-transparent text-sm font-medium border-none focus:ring-0 outline-none"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                        </div>
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all"
                        >
                            <Send size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
