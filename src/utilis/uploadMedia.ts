async function uploadMedia(files: FileList | null): Promise<void> {
  const formData = new FormData()

  console.log(files)
  if (!files) {
    alert('Please select a file first.')
    return
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

    const result = await response.json()
    console.log('Upload successful', result)
    return result
    // Handle success, e.g., showing redirecting
  } catch (error) {
    if (error instanceof Error) {
      console.error('Upload failed', error.message)
      // Handle error, e.g., showing an error message
    }
  }
}
export default uploadMedia
