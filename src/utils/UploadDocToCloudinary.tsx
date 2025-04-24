const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;

if (!upload_preset || !cloud_name) {
  throw new Error("Missing Cloudinary environment variables");
}

export const uploadDocumentToCloudinary = async (file: File,setLoader: (error:boolean) => void,  folder?: string): Promise<string> => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const allowedTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOCX files
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF and DOCX documents are allowed');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  if (folder) {
    formData.append('folder', folder);
  }

  setLoader(true)
  const res = await fetch(api_url, {
    method: 'POST',
    body: formData
  })
      .catch((err) => console.error(err))
      .finally(() => setLoader(false));


  const result = res?.url ?? '';
  return result;
};