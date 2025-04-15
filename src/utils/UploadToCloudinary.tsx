
const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

if (!upload_preset || !cloud_name) {
    throw new Error("Environment variables NEXT_PUBLIC_UPLOAD_PRESET or NEXT_PUBLIC_CLOUD_NAME are missing.");
  }
export const uploadImageToCloudinary = async (file: File,folder?: string) => { 
    const formData = new FormData(); formData.append('file', file); 
    formData.append('upload_preset', upload_preset); 

    if (folder) {
        formData.append('folder', folder);
    }
    
    const res = await fetch(api_url, { 
        method: 'POST', 
        body: formData 
    }); 
    if (!res.ok) { 
        throw new Error('Failed to upload image'); 
    } 
    
    const fileData = await res.json(); 
    // console.log("The files___", fileData); 
    return fileData.secure_url; 
 };
