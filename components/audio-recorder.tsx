"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, Square, Play, Pause, Upload, Trash2 } from "lucide-react"
import { uploadAudioRecording } from "@/lib/blob"

interface AudioRecorderProps {
  languageCode: string
  onRecordingComplete?: (audioUrl: string, duration: number) => void
  maxDuration?: number
}

export function AudioRecorder({
  languageCode,
  onRecordingComplete,
  maxDuration = 300, // 5 minutes default
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start(1000) // Collect data every second
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          if (newTime >= maxDuration) {
            stopRecording()
          }
          return newTime
        })
      }, 1000)
    } catch (error) {
      console.error("Error starting recording:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const uploadRecording = async () => {
    if (!audioUrl) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Convert audio URL back to blob
      const response = await fetch(audioUrl)
      const audioBlob = await response.blob()

      const filename = `recording-${Date.now()}.webm`

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadAudioRecording(audioBlob, filename, languageCode)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Call completion callback
      if (onRecordingComplete) {
        onRecordingComplete(result.url, recordingTime)
      }

      // Reset state
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        clearRecording()
      }, 1000)
    } catch (error) {
      console.error("Error uploading recording:", error)
      setIsUploading(false)
      setUploadProgress(0)
      alert("Failed to upload recording. Please try again.")
    }
  }

  const clearRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Audio Recorder</span>
          <Badge variant="outline">{languageCode.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!isRecording && !audioUrl && (
            <Button onClick={startRecording} size="lg" className="bg-red-600 hover:bg-red-700">
              <Mic className="h-5 w-5 mr-2" />
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button onClick={stopRecording} size="lg" variant="destructive">
              <Square className="h-5 w-5 mr-2" />
              Stop Recording
            </Button>
          )}

          {audioUrl && !isUploading && (
            <div className="flex space-x-2">
              <Button onClick={playRecording} variant="outline">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={uploadRecording} className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button onClick={clearRecording} variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Recording Time Display */}
        <div className="text-center">
          <div className="text-2xl font-mono font-bold">{formatTime(recordingTime)}</div>
          {maxDuration && <div className="text-sm text-gray-500">Max: {formatTime(maxDuration)}</div>}
        </div>

        {/* Recording Progress */}
        {isRecording && (
          <div className="space-y-2">
            <Progress value={(recordingTime / maxDuration) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Recording...</span>
              <span>{Math.round((recordingTime / maxDuration) * 100)}%</span>
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <div className="text-center text-sm text-gray-600">Uploading... {uploadProgress}%</div>
          </div>
        )}

        {/* Hidden audio element for playback */}
        {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />}
      </CardContent>
    </Card>
  )
}
