import * as XLSX from 'xlsx';

export async function convertSpreadsheetToCsv(file: File): Promise<File> {
  if (file.name.endsWith('.csv')) {
    return file;
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer);

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const csvString = XLSX.utils.sheet_to_csv(worksheet);

  return new File([csvString], `${file.name.replace(/\.[^/.]+$/, '')}.csv`, {
    type: 'text/csv',
  });
}