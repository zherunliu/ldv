export default function exportToHtml(...blobParts: BlobPart[]) {
  const blob = new Blob(blobParts, { type: 'text/html' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'document.html'
  link.click()
  URL.revokeObjectURL(link.href)
}
