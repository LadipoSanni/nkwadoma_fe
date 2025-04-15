const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;

if (!upload_preset || !cloud_name) {
  throw new Error("Missing Cloudinary environment variables");
}

export const uploadDocumentToCloudinary = async (file: File, folder?: string): Promise<string> => {
  // Validate file type
  const allowedTypes = [
    'application/pdf', // PDF files
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX files
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF and DOCX documents are allowed');
  }

  // Prepare upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  // Add folder if specified
  if (folder) {
    formData.append('folder', folder);
  }

  // Execute upload
  const res = await fetch(api_url, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Document upload failed: ${error}`);
  }

  // Return secure URL
  const result = await res.json();
  return result.secure_url;
};