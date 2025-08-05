"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Globe, ArrowLeft, Mic, Volume2 } from "lucide-react"
import Link from "next/link"

const languages = [
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "en", name: "English", native: "English" },
]

const culturalPrompts = [
  { text: "Tell me a folk story from my region", category: "Stories" },
  { text: "What are traditional festivals celebrated here?", category: "Festivals" },
  { text: "Explain traditional cooking methods", category: "Cuisine" },
  { text: "Share information about local art forms", category: "Arts" },
  { text: "What are common proverbs in this language?", category: "Wisdom" },
]

export default function ChatbotPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [isListening, setIsListening] = useState(false)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      language: selectedLanguage,
    },
  })

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input implementation would go here
  }

  const handleTextToSpeech = (text: string) => {
    // Text-to-speech implementation would go here
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === "en" ? "en-US" : `${selectedLanguage}-IN`
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold">Multilingual AI Assistant</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.native} ({lang.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Cultural Prompts Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cultural Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {culturalPrompts.map((prompt, index) => (
                  <div key={index}>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {prompt.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-wrap"
                      onClick={() => handleInputChange({ target: { value: prompt.text } } as any)}
                    >
                      {prompt.text}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Chat in {languages.find((l) => l.code === selectedLanguage)?.native}</CardTitle>
                  <Badge variant="secondary">{messages.length} messages</Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Start a conversation in your preferred language!</p>
                        <p className="text-sm mt-2">
                          I can help you explore cultural heritage, stories, and traditions.
                        </p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm">{message.content}</p>
                            {message.role === "assistant" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 p-1 h-auto"
                                onClick={() => handleTextToSpeech(message.content)}
                              >
                                <Volume2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder={`Type your message in ${languages.find((l) => l.code === selectedLanguage)?.native}...`}
                      disabled={isLoading}
                      className="pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={handleVoiceInput}
                    >
                      <Mic className={`h-4 w-4 ${isListening ? "text-red-500" : "text-gray-400"}`} />
                    </Button>
                  </div>
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
