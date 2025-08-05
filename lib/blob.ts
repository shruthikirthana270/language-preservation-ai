import { put, list, del } from "@vercel/blob"

export interface UploadResult {
  url: string
  pathname: string
  contentType: string
  size: number
}

export async function uploadFile(
  file: File,
  pathname: string,
  options?: {
    addRandomSuffix?: boolean
    contentType?: string
  },
): Promise<UploadResult> {
  try {
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: options?.addRandomSuffix ?? true,
      contentType: options?.contentType || file.type,
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: file.size,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}

export async function uploadAudioRecording(
  audioBlob: Blob,
  filename: string,
  languageCode: string,
): Promise<UploadResult> {
  const pathname = `audio/${languageCode}/${filename}`

  const file = new File([audioBlob], filename, { type: "audio/webm" })

  return uploadFile(file, pathname, {
    addRandomSuffix: true,
    contentType: "audio/webm",
  })
}

export async function uploadCulturalImage(
  imageFile: File,
  contentId: string,
  languageCode: string,
): Promise<UploadResult> {
  const pathname = `cultural/${languageCode}/${contentId}/${imageFile.name}`

  return uploadFile(imageFile, pathname, {
    addRandomSuffix: true,
  })
}

export async function listFiles(prefix?: string) {
  try {
    const { blobs } = await list({
      prefix,
      limit: 100,
    })
    return blobs
  } catch (error) {
    console.error("Error listing files:", error)
    return []
  }
}

export async function deleteFile(url: string) {
  try {
    await del(url)
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    return false
  }
}
