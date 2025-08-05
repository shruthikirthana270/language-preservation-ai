"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Mic, FileText, ImageIcon, Award, Users } from "lucide-react"
import Link from "next/link"
import { AudioRecorder } from "@/components/audio-recorder"
import { ImageUpload } from "@/components/image-upload"

const languages = [
  { code: "hi", name: "Hindi", native: "हिन्दी", progress: 85 },
  { code: "bn", name: "Bengali", native: "বাংলা", progress: 72 },
  { code: "te", name: "Telugu", native: "తెలుగు", progress: 68 },
  { code: "ta", name: "Tamil", native: "தமிழ்", progress: 75 },
  { code: "mr", name: "Marathi", native: "मराठी", progress: 60 },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", progress: 55 },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", progress: 50 },
  { code: "ml", name: "Malayalam", native: "മലയാളം", progress: 45 },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", progress: 40 },
  { code: "mai", name: "Maithili", native: "मैथिली", progress: 15 },
]

const contributionTypes = [
  { id: "text", name: "Text Samples", icon: FileText, description: "Contribute written text in regional languages" },
  { id: "audio", name: "Audio Recordings", icon: Mic, description: "Record speech samples and pronunciations" },
  {
    id: "cultural",
    name: "Cultural Content",
    icon: ImageIcon,
    description: "Share stories, proverbs, and cultural knowledge",
  },
]

export default function DataCollectionPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi")
  const [contributionType, setContributionType] = useState("text")
  const [textContent, setTextContent] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [userContributions, setUserContributions] = useState(47)

  const handleSubmitContribution = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contribution submission
    setUserContributions((prev) => prev + 1)
    setTextContent("")
    alert("Thank you for your contribution!")
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Recording logic would go here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
                <Upload className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold">Language Data Collection</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Award className="h-3 w-3 mr-1" />
                {userContributions} Contributions
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Language Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Language Progress</CardTitle>
                <CardDescription>Data collection status for each language</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.code} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{lang.native}</span>
                      <span className="text-xs text-gray-500">{lang.progress}%</span>
                    </div>
                    <Progress value={lang.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Active Contributors</span>
                  </div>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Text Samples</span>
                  </div>
                  <span className="font-semibold">45,892</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Audio Recordings</span>
                  </div>
                  <span className="font-semibold">12,456</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contribution Interface */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Contribute Language Data</CardTitle>
                <CardDescription>
                  Help preserve and promote regional languages by contributing data samples
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Language Selection */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
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

                  {/* Contribution Type */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Contribution Type</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {contributionTypes.map((type) => (
                        <Card
                          key={type.id}
                          className={`cursor-pointer transition-colors ${
                            contributionType === type.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setContributionType(type.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <type.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <h3 className="font-medium text-sm">{type.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Contribution Form */}
                  <Tabs value={contributionType} onValueChange={setContributionType}>
                    <TabsContent value="text">
                      <form onSubmit={handleSubmitContribution} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Text Content in {languages.find((l) => l.code === selectedLanguage)?.native}
                          </label>
                          <Textarea
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            placeholder="Enter text in the selected language..."
                            className="min-h-32"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Category (Optional)</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="news">News</SelectItem>
                              <SelectItem value="literature">Literature</SelectItem>
                              <SelectItem value="conversation">Conversation</SelectItem>
                              <SelectItem value="technical">Technical</SelectItem>
                              <SelectItem value="cultural">Cultural</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">
                          Submit Text Contribution
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="audio">
                      <div className="space-y-4">
                        <AudioRecorder
                          languageCode={selectedLanguage}
                          onRecordingComplete={(audioUrl, duration) => {
                            console.log("Recording uploaded:", audioUrl, "Duration:", duration)
                            alert(`Recording uploaded successfully! Duration: ${Math.round(duration)}s`)
                            setUserContributions((prev) => prev + 1)
                          }}
                          maxDuration={300}
                        />
                        <div>
                          <label className="text-sm font-medium mb-2 block">Prompt Text (Optional)</label>
                          <Input placeholder="Text that was read aloud..." />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cultural">
                      <form onSubmit={handleSubmitContribution} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Cultural Content Type</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="story">Folk Story</SelectItem>
                              <SelectItem value="proverb">Proverb</SelectItem>
                              <SelectItem value="song">Traditional Song</SelectItem>
                              <SelectItem value="recipe">Traditional Recipe</SelectItem>
                              <SelectItem value="festival">Festival Description</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input placeholder="Title of the cultural content..." />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Content</label>
                          <Textarea placeholder="Share your cultural knowledge..." className="min-h-32" required />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Region/Community</label>
                          <Input placeholder="Specify the region or community..." />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Add Image (Optional)</label>
                          <ImageUpload
                            contentId={`cultural-${Date.now()}`}
                            languageCode={selectedLanguage}
                            onImageUploaded={(imageUrl) => {
                              console.log("Image uploaded:", imageUrl)
                            }}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Submit Cultural Content
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
