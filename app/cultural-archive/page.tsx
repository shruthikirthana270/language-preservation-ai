"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, BookOpen, Music, Utensils, Calendar, MapPin, Heart, ImageIcon } from "lucide-react"
import Link from "next/link"
import { MediaGallery } from "@/components/media-gallery"

const culturalContent = [
  {
    id: 1,
    type: "story",
    title: "The Clever Birbal",
    language: "Hindi",
    region: "North India",
    content: "Once upon a time, in the court of Emperor Akbar, there lived a wise minister named Birbal...",
    tags: ["wisdom", "humor", "historical"],
    likes: 234,
    category: "Folk Tales",
  },
  {
    id: 2,
    type: "proverb",
    title: "Unity in Diversity",
    language: "Bengali",
    region: "West Bengal",
    content: "যেখানে দেখিবে ছাই, উড়াইয়া দেখ তাই, পাইলেও পাইতে পার অমূল্য রতন",
    tags: ["wisdom", "unity"],
    likes: 156,
    category: "Proverbs",
  },
  {
    id: 3,
    type: "recipe",
    title: "Traditional Sambar",
    language: "Tamil",
    region: "Tamil Nadu",
    content: "A traditional South Indian lentil curry made with tamarind, vegetables, and aromatic spices...",
    tags: ["food", "traditional", "vegetarian"],
    likes: 189,
    category: "Cuisine",
  },
  {
    id: 4,
    type: "festival",
    title: "Gudi Padwa Celebration",
    language: "Marathi",
    region: "Maharashtra",
    content: "Gudi Padwa marks the traditional new year for Marathi people...",
    tags: ["festival", "new year", "tradition"],
    likes: 267,
    category: "Festivals",
  },
  {
    id: 5,
    type: "song",
    title: "Rabindra Sangeet",
    language: "Bengali",
    region: "West Bengal",
    content: "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি...",
    tags: ["music", "poetry", "rabindranath"],
    likes: 312,
    category: "Music",
  },
]

const categories = [
  { id: "all", name: "All Content", icon: BookOpen },
  { id: "stories", name: "Folk Tales", icon: BookOpen },
  { id: "proverbs", name: "Proverbs", icon: BookOpen },
  { id: "recipes", name: "Cuisine", icon: Utensils },
  { id: "festivals", name: "Festivals", icon: Calendar },
  { id: "music", name: "Music", icon: Music },
  { id: "media", name: "Media Gallery", icon: ImageIcon },
]

const languages = ["All Languages", "Hindi", "Bengali", "Tamil", "Marathi", "Telugu", "Gujarati"]
const regions = ["All Regions", "North India", "South India", "East India", "West India", "Central India"]

export default function CulturalArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const filteredContent = culturalContent.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase().includes(selectedCategory)

    const matchesLanguage = selectedLanguage === "All Languages" || item.language === selectedLanguage

    const matchesRegion = selectedRegion === "All Regions" || item.region === selectedRegion

    return matchesSearch && matchesCategory && matchesLanguage && matchesRegion
  })

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case "story":
        return BookOpen
      case "recipe":
        return Utensils
      case "festival":
        return Calendar
      case "song":
        return Music
      default:
        return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
                <BookOpen className="h-6 w-6 text-purple-600" />
                <h1 className="text-xl font-bold">Cultural Archive</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {filteredContent.length} items found
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search cultural content, stories, recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredContent.map((item) => {
                const ContentIcon = getContentIcon(item.type)
                const isLiked = likedItems.includes(item.id)

                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <ContentIcon className="h-5 w-5 text-purple-600" />
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toggleLike(item.id)} className="p-1">
                          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.region}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.language}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{item.content}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes + (isLiked ? 1 : 0)} likes</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or contribute new content to the archive.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/data-collection">Contribute Content</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Media Gallery */}
          {selectedCategory === "media" && (
            <div className="lg:col-span-3">
              <MediaGallery />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
