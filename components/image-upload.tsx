"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, X, ImageIcon } from "lucide-react"
import { uploadCulturalImage } from "@/lib/blob"
import Image from "next/image"

interface ImageUploadProps {
  onImageUploaded?: (imageUrl: string) => void
  contentId: string
  languageCode: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function ImageUpload({
  onImageUploaded,
  contentId,
  languageCode,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      alert(`Please select a valid image file (${acceptedTypes.join(", ")})`)
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setSelectedImage(file)

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleUpload = async () => {
    if (!selectedImage) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadCulturalImage(selectedImage, contentId, languageCode)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Call completion callback
      if (onImageUploaded) {
        onImageUploaded(result.url)
      }

      // Reset state
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        clearImage()
      }, 1000)
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsUploading(false)
      setUploadProgress(0)
      alert("Failed to upload image. Please try again.")
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardContent className="p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        {!selectedImage ? (
          <div
            onClick={triggerFileSelect}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">Click to upload an image</p>
            <p className="text-sm text-gray-500">Supports JPEG, PNG, WebP up to {maxSize}MB</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="relative">
              {previewUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  <Button onClick={clearImage} size="sm" variant="destructive" className="absolute top-2 right-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="text-sm text-gray-600">
              <p>
                <strong>File:</strong> {selectedImage.name}
              </p>
              <p>
                <strong>Size:</strong> {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p>
                <strong>Type:</strong> {selectedImage.type}
              </p>
            </div>

            {/* Upload Controls */}
            {!isUploading ? (
              <div className="flex space-x-2">
                <Button onClick={handleUpload} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button onClick={clearImage} variant="outline">
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <div className="text-center text-sm text-gray-600">Uploading... {uploadProgress}%</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
