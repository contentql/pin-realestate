import { Media } from '@/payload-types'

async function uploadMedia(files: FileList | null): Promise<Media | undefined> {
  const formData = new FormData()
  if (!files) {
    alert('Please select a file first.')
    return undefined
  }

  formData.append('file', files[0])

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + '/api/media',
      {
        method: 'POST',
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const { doc }: { doc: Media } = await response.json()

    // Handle success, e.g., showing redirecting

    return doc
  } catch (error) {
    if (error instanceof Error) {
      console.error('Upload failed', error.message)
      // Handle error, e.g., showing an error message
    }
  }
}

export default uploadMedia
