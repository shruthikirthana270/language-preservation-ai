"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Trash2, ImageIcon, Mic, FileText } from "lucide-react"
import Image from "next/image"

interface MediaFile {
  url: string
  pathname: string
  contentType: string
  size: number
  uploadedAt: string
}

interface MediaGalleryProps {
  languageCode?: string
  contentType?: "audio" | "image" | "document" | "all"
}

export function MediaGallery({ languageCode, contentType = "all" }: MediaGalleryProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState(contentType)
  const [selectedLanguage, setSelectedLanguage] = useState(languageCode || "all")

  useEffect(() => {
    fetchMediaFiles()
  }, [selectedType, selectedLanguage])

  const fetchMediaFiles = async () => {
    setLoading(true)
    try {
      let prefix = ""
      if (selectedType !== "all") {
        prefix = selectedType
        if (selectedLanguage !== "all") {
          prefix += `/${selectedLanguage}`
        }
      }

      const response = await fetch(`/api/media?prefix=${prefix}&limit=50`)
      const data = await response.json()

      setMediaFiles(data.blobs || [])
    } catch (error) {
      console.error("Error fetching media files:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (url: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const response = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        setMediaFiles((prev) => prev.filter((file) => file.url !== url))
      }
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const getFileIcon = (contentType: string) => {
    if (contentType.startsWith("image/")) return ImageIcon
    if (contentType.startsWith("audio/")) return Mic
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading media files...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Gallery</CardTitle>
        <div className="flex space-x-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="audio">Audio Files</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="bn">Bengali</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
              <SelectItem value="te">Telugu</SelectItem>
              <SelectItem value="mr">Marathi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {mediaFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No media files found for the selected criteria.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.contentType)
              const isImage = file.contentType.startsWith("image/")
              const isAudio = file.contentType.startsWith("audio/")

              return (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    {/* File Preview */}
                    <div className="mb-3">
                      {isImage ? (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden">
                          <Image
                            src={file.url || "/placeholder.svg"}
                            alt={file.pathname}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm truncate" title={file.pathname}>
                        {file.pathname.split("/").pop()}
                      </h4>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {file.contentType.split("/")[0]}
                        </Badge>
                        <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                      </div>
                    </div>

                    {/* Audio Player */}
                    {isAudio && (
                      <div className="mt-3">
                        <audio controls className="w-full">
                          <source src={file.url} type={file.contentType} />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </a>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteFile(file.url)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
