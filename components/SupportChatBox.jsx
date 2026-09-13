'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  PhoneCall,
  Minimize2,
  RotateCcw,
  Headphones,
  MessageCircle,
  CheckCircle2,
  Phone,
} from 'lucide-react';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const PRIMARY_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const FALLBACK_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `You are a friendly, knowledgeable, and concise customer support agent for Hans Travels, a leading luxury bus booking platform in India.
Your role:
- Assist passengers with bus bookings, ticket PNR status, seat reservations, cancellations, and refunds.
- Answer questions about routes (especially popular routes like Indore to Pune, Indore to Mumbai, Bhopal to Ahmedabad), departure times, boarding & dropping points.
- Explain coach amenities (Volvo 9600 Multi-Axle, Mercedes-Benz Sleeper, BharatBenz, AC sleeper berths, charging ports, blankets, water bottles).
- Provide luggage guidelines (up to 15-20kg per passenger included) and travel policies.
- Keep responses polite, concise (2-4 sentences where possible), professional, and easy to read with bullet points when helpful.
- If a passenger expresses that they want to talk with an official, human agent, or manager, immediately provide the Hans Travels 24x7 Helpline 0731-4004000 and assure them an official will assist them.`;

const WELCOME_GREETING = 'Hello! Welcome to Hans Travels Support. How can I help you with your bus journey, booking, or schedule today?';

const QUICK_PROMPTS = [
  'Talk with Official 👤',
  'Indore to Pune bus timing?',
  'How do I cancel my ticket?',
  'What amenities are provided?',
  'Luggage allowance details',
];

function BotAvatar({ className = 'w-11 h-11', size, svgClassName = '' }) {
  return (
    <div className={`relative ${className} rounded-full bg-[#0066FF] flex items-center justify-center shadow-md flex-shrink-0`}>
      <svg
        width={size || undefined}
        height={size || undefined}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-white ${svgClassName || (!size ? 'w-3/5 h-3/5' : '')}`}
      >
        {/* Antenna */}
        <circle cx="20" cy="7" r="2.2" fill="white" />
        <rect x="18.8" y="8.5" width="2.4" height="4.5" rx="1.2" fill="white" />

        {/* Head outer shell */}
        <rect x="6.5" y="12" width="27" height="20" rx="10" fill="white" />

        {/* Ears */}
        <rect x="3.5" y="17.5" width="3" height="7" rx="1.5" fill="white" />
        <rect x="33.5" y="17.5" width="3" height="7" rx="1.5" fill="white" />

        {/* Inner blue visor */}
        <rect x="10" y="15.5" width="20" height="11" rx="5.5" fill="#0066FF" />

        {/* Happy eyes */}
        <circle cx="15.5" cy="20.5" r="1.8" fill="white" />
        <circle cx="24.5" cy="20.5" r="1.8" fill="white" />

        {/* Smile */}
        <path
          d="M17.5 22.8C18.2 23.8 21.8 23.8 22.5 22.8"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Online indicator dot */}
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-xs" />
    </div>
  );
}

export default function SupportChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasWelcomedRef = useRef(false);

  // Trigger robot greeting ONLY when user clicks/opens the chat bot
  const triggerWelcomeMessage = () => {
    if (hasWelcomedRef.current) return;
    hasWelcomedRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: `msg-welcome-${Date.now()}`,
          role: 'model',
          text: WELCOME_GREETING,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsLoading(false);
    }, 350);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    triggerWelcomeMessage();
  };

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      // Auto-focus input when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Stop background scrolling when chat bot is open on mobile screens
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncScrollLock = () => {
      const isMobile = window.innerWidth < 768;
      if (isOpen && isMobile) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };

    syncScrollLock();
    window.addEventListener('resize', syncScrollLock);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('resize', syncScrollLock);
    };
  }, [isOpen]);

  // Handle connecting user directly with an official representative
  const handleConnectOfficial = (customText) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: typeof customText === 'string' && customText.length > 0
        ? customText
        : 'I want to talk with an official representative.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const officialCardMessage = {
      id: `official-${Date.now() + 1}`,
      role: 'model',
      isOfficialCard: true,
      text: 'Connecting you to Hans Travels Official Support Desk...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage, officialCardMessage]);
    setInputMessage('');
  };

  // Global click listener to open chat on any element with ID/class "Contact Support", and close on booking action
  useEffect(() => {
    const handleGlobalClick = (event) => {
      const target = event.target;
      if (!target) return;

      // Close chat window if user clicks on booking actions or search
      if (
        target.closest('button[type="submit"]') ||
        target.closest('#routes') ||
        target.textContent?.includes('SEARCH BUSES') ||
        target.textContent?.includes('Proceed to Book') ||
        target.textContent?.includes('Select Berths')
      ) {
        setIsOpen(false);
      }

      // Check ID, class, data attributes or text content for "Contact Support"
      const matchIdOrClass = target.closest(
        '#contact-support, #ContactSupport, .contact-support, .ContactSupport, [data-contact-support], [id*="contact-support" i], [class*="contact-support" i]'
      );

      const textContent = target.textContent || '';
      const matchesText = textContent.trim().toLowerCase().includes('contact support');

      if (matchIdOrClass || (matchesText && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')))) {
        event.preventDefault();
        setIsOpen(true);
        setUnreadCount(0);
        triggerWelcomeMessage();
      }
    };

    const handleCustomEvent = () => {
      setIsOpen(true);
      setUnreadCount(0);
      triggerWelcomeMessage();
    };

    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('open-bus-chat', handleCustomEvent);
    window.addEventListener('open-contact-support', handleCustomEvent);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('open-bus-chat', handleCustomEvent);
      window.removeEventListener('open-contact-support', handleCustomEvent);
    };
  }, []);

  // Send message to Gemini API
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    // Check if passenger explicitly asks to talk to an official/human agent
    if (
      query.includes('Talk with Official') ||
      /(official|human|agent|representative|executive|manager|speak to someone|talk to someone|call me)/i.test(query)
    ) {
      handleConnectOfficial(query);
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for API payload
      const contents = updatedMessages
        .filter((msg) => !msg.id.startsWith('msg-welcome'))
        .map((msg) => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        }));

      // Ensure at least the current query is present
      if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: query }] });
      }

      const payload = {
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      };

      // Call primary endpoint (gemini-1.5-flash), with automatic fallback if deprecated/unavailable
      let response = await fetch(PRIMARY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // If primary 1.5-flash endpoint returns 404/error, use updated fallback endpoint
      if (!response.ok && (response.status === 404 || response.status === 400)) {
        response = await fetch(FALLBACK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiReplyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't retrieve the details right now. Please call our 24x7 support desk at 0731-4004000.";

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: aiReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error calling Gemini support API:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'model',
          text: 'We are experiencing high support traffic. For immediate help, please contact our 24x7 Help Desk at 0731-4004000 or email support@hanstravels.com.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: `msg-welcome-${Date.now()}`,
          role: 'model',
          text: WELCOME_GREETING,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      {/* Mobile Backdrop to prevent background touches/scrolling when chat is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 sm:hidden transition-opacity duration-300"
        />
      )}

      {/* Floating Bottom-Right Launcher (When closed) */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 font-sans pointer-events-auto">
          <button
            type="button"
            id="Contact Support"
            onClick={handleOpenChat}
            className="Contact Support contact-support group relative w-[60px] h-[60px] sm:w-[52px] sm:h-[52px] rounded-full bg-white p-1.5 sm:p-1 shadow-[0_10px_28px_rgba(0,102,255,0.28),0_4px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_36px_rgba(0,102,255,0.38),0_6px_16px_rgba(0,0,0,0.18)] border-2 border-white/90 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200 select-none flex items-center justify-center"
            aria-label="Support Bot - Contact Support"
            title="Support Bot (Online)"
          >
            <BotAvatar className="w-full h-full" svgClassName="w-8 h-8 sm:w-6 sm:h-6" />

            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Box Window: Center of the screen on mobile, bottom-right on desktop */}
      {isOpen && (
        <aside
          aria-label="Hans Travels Support Chat"
          className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 flex items-center justify-center sm:block p-3.5 sm:p-0 pointer-events-none font-sans"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Bus Support Chat Window"
            className="w-full max-w-[390px] sm:w-[380px] h-[550px] max-h-[88vh] sm:max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-fade-in transform-gpu pointer-events-auto"
            style={{
              boxShadow: '0 20px 50px -12px rgba(0, 102, 255, 0.25), 0 8px 24px -4px rgba(0, 0, 0, 0.15)',
            }}
          >
          {/* Header */}
          <header className="bg-white text-slate-900 px-5 py-3.5 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <BotAvatar className="w-10 h-10" size={22} />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold tracking-tight text-slate-900 leading-tight">Support Bot</h3>
                  <span className="bg-blue-50 text-blue-600 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border border-blue-100 tracking-wide">
                    Hans AI
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-tight mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Online • 24/7 Helpline Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                title="Minimize Chat"
                aria-label="Minimize Chat"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer ml-0.5"
                title="Close Support"
                aria-label="Close Support"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Quick Help Strip with prominent Talk with Official button */}
          <div className="bg-brand-light-blue/60 border-b border-blue-100/80 px-3.5 py-2 flex items-center justify-between text-[11px] text-slate-600 flex-shrink-0">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Sparkles className="w-3 h-3 text-blue-600" /> Instant AI Assistant
            </span>
            <button
              type="button"
              onClick={() => handleConnectOfficial('I want to talk with an official representative.')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full font-bold text-[10px] transition-all shadow-xs hover:shadow-sm cursor-pointer"
              title="Connect with official representative"
            >
              <Headphones className="w-3 h-3" />
              <span>Talk with Official</span>
            </button>
          </div>

          {/* Scrollable Message List */}
          <div className="flex-1 p-4 overflow-y-auto overscroll-contain space-y-3.5 bg-slate-50/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {messages.map((msg) => {
              const isAi = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <BotAvatar className="w-7 h-7 mt-0.5" size={15} />
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isAi ? 'items-start' : 'items-end'}`}>
                    {msg.isOfficialCard ? (
                      /* Interactive Official Connection Card */
                      <div className="bg-white border border-blue-200/90 rounded-2xl rounded-tl-xs p-4 shadow-md space-y-3">
                        <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-red-100 text-brand-red flex items-center justify-center font-bold text-xs flex-shrink-0">
                            <Headphones className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 leading-tight">
                              Hans Travels Official Desk
                            </h4>
                            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Duty Officer on standby • Indore HQ
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          You can speak directly with our senior transport official right now:
                        </p>

                        <div className="space-y-2">
                          <a
                            href="tel:+917314004000"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Call Official: 0731-4004000</span>
                          </a>

                          <a
                            href="https://wa.me/917314004000?text=Hello%20Hans%20Travels%20Official,%20I%20would%20like%20to%20speak%20with%20a%20support%20representative%20regarding%20my%20journey."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Chat on WhatsApp Official</span>
                          </a>
                        </div>

                        {/* Instant Callback Form */}
                        <div className="pt-2 border-t border-slate-100">
                          {callbackRequested ? (
                            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span>Callback registered! Our official will call you within 3 minutes.</span>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                Or Request Instant Callback
                              </span>
                              <div className="flex gap-1.5">
                                <input
                                  type="tel"
                                  placeholder="Enter 10-digit number"
                                  value={callbackPhone}
                                  onChange={(e) => setCallbackPhone(e.target.value)}
                                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-red"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (callbackPhone.trim().length >= 8) {
                                      setCallbackRequested(true);
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                >
                                  Call Me
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words shadow-xs ${
                          isAi
                            ? msg.isError
                              ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-xs'
                              : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                            : 'bg-brand-red text-white font-medium rounded-tr-xs shadow-red-700/20'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}
                    <span className="text-[10px] text-slate-400 block px-1">
                      {msg.time}
                    </span>
                  </div>

                  {!isAi && (
                    <div className="w-7 h-7 rounded-full bg-brand-charcoal text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 justify-start">
                <BotAvatar className="w-7 h-7 mt-0.5" size={15} />
                <div className="bg-white border border-slate-200/80 px-4 py-2.5 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips (When not loading) */}
          {messages.length > 0 && messages.length <= 3 && !isLoading && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-shrink-0">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 text-[10px] font-medium bg-slate-100 hover:bg-brand-light-blue hover:text-blue-800 text-slate-700 rounded-full border border-slate-200 transition-colors cursor-pointer flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input Area */}
          <footer className="p-3 bg-white border-t border-slate-100 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about buses, schedules, PNR..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover active:bg-brand-red-active text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs flex-shrink-0"
                aria-label="Send Message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-400 mt-1.5 font-medium">
              Powered by Gemini AI • Hans Travels Bus Support
            </p>
          </footer>
          </div>
        </aside>
      )}
    </>
  );
}
