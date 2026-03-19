import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function exportToHtml(saveName: string, ...blobParts: BlobPart[]) {
  const blob = new Blob(blobParts, { type: 'text/html' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = saveName
  link.click()
  URL.revokeObjectURL(link.href)
}

function exportToExcel<T>(data: T[], saveName: string) {
  const sheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, 'Orders')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, saveName)
}

export { exportToExcel, exportToHtml }
