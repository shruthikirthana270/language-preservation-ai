"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, MessageCircle, Database, BarChart3, Users, Heart } from "lucide-react"
import Link from "next/link"

const supportedLanguages = [
  { code: "hi", name: "Hindi", speakers: "600M+", status: "Active" },
  { code: "bn", name: "Bengali", speakers: "300M+", status: "Active" },
  { code: "te", name: "Telugu", speakers: "95M+", status: "Active" },
  { code: "mr", name: "Marathi", speakers: "83M+", status: "Active" },
  { code: "ta", name: "Tamil", speakers: "78M+", status: "Active" },
  { code: "gu", name: "Gujarati", speakers: "56M+", status: "Active" },
  { code: "kn", name: "Kannada", speakers: "44M+", status: "Active" },
  { code: "ml", name: "Malayalam", speakers: "35M+", status: "Active" },
  { code: "pa", name: "Punjabi", speakers: "33M+", status: "Active" },
  { code: "or", name: "Odia", speakers: "38M+", status: "Developing" },
  { code: "as", name: "Assamese", speakers: "15M+", status: "Developing" },
  { code: "mai", name: "Maithili", speakers: "13M+", status: "Endangered" },
]

const features = [
  {
    icon: MessageCircle,
    title: "Multilingual Chatbots",
    description: "AI-powered chatbots that understand and respond in regional languages",
    link: "/chatbot",
  },
  {
    icon: Database,
    title: "Language Data Collection",
    description: "Crowdsourced platform for collecting and labeling regional language data",
    link: "/data-collection",
  },
  {
    icon: Globe,
    title: "Cultural Digitization",
    description: "Preserve folklore, stories, and cultural knowledge through AI analysis",
    link: "/cultural-archive",
  },
  {
    icon: BarChart3,
    title: "Language Analytics",
    description: "Track language usage patterns and preservation efforts",
    link: "/analytics",
  },
]

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">भाषा AI</h1>
              <Badge variant="secondary">Language Preservation Platform</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Community
              </Button>
              <Button size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Contribute
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Preserving Cultural Heritage Through AI</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Building inclusive AI solutions that celebrate and preserve regional languages, cultural identity, and
            traditional knowledge for future generations.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/chatbot">Start Chatting</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/data-collection">Contribute Data</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Platform Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={feature.link}>
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-orange-600 mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Supported Languages</h3>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active (9)</TabsTrigger>
              <TabsTrigger value="developing">Developing (2)</TabsTrigger>
              <TabsTrigger value="endangered">Endangered (1)</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {supportedLanguages
                  .filter((lang) => lang.status === "Active")
                  .map((language) => (
                    <Card key={language.code} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{language.name}</h4>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {language.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{language.speakers} speakers</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="developing" className="mt-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {supportedLanguages
                  .filter((lang) => lang.status === "Developing")
                  .map((language) => (
                    <Card key={language.code} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{language.name}</h4>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {language.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{language.speakers} speakers</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="endangered" className="mt-8">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {supportedLanguages
                  .filter((lang) => lang.status === "Endangered")
                  .map((language) => (
                    <Card key={language.code} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{language.name}</h4>
                          <Badge variant="destructive" className="bg-red-100 text-red-800">
                            {language.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{language.speakers} speakers</p>
                        <p className="text-xs text-red-600 mt-1">Needs urgent preservation</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Our Impact</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-orange-100">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-orange-100">Data Samples Collected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1.2M+</div>
              <div className="text-orange-100">Conversations Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-100">Community Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6" />
                <span className="text-xl font-bold">भाषा AI</span>
              </div>
              <p className="text-gray-400">Preserving cultural heritage through inclusive AI solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/chatbot" className="hover:text-white">
                    Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="/data-collection" className="hover:text-white">
                    Data Collection
                  </Link>
                </li>
                <li>
                  <Link href="/cultural-archive" className="hover:text-white">
                    Cultural Archive
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-white">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contributors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Research Papers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 भाषा AI. Building inclusive AI for cultural preservation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
