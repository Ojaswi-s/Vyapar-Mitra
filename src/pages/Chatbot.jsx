import { Card } from '../components/ui/Card'
import { MessageSquare, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { api } from '../lib/api'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am your AI assistant. Do you have any questions about the Micro Finance Scheme or how to improve your dairy business plan?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    
    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setInput('')
    setIsTyping(true)
    
    try {
      const response = await api.sendChatMessage(userMessage)
      setMessages(prev => [...prev, { role: 'ai', text: response.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="text-brand-navy dark:text-brand-gold" /> AI Chatbot
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Ask me anything about your business.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden p-0 border-0 shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-page)]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-navy text-white rounded-br-sm' 
                  : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] rounded-bl-sm flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border)]">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..." 
              className="flex-1 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-page)] focus:outline-none focus:ring-2 focus:ring-brand-navy"
            />
            <button type="submit" disabled={isTyping} className="p-3 bg-brand-navy text-white rounded-xl hover:bg-opacity-90 transition disabled:opacity-50">
              <Send size={20} />
            </button>
          </form>
        </div>
      </Card>
    </div>
  )
}
