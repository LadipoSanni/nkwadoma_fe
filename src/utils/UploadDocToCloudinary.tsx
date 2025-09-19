import { useState, useCallback } from "react";
import { useConfig } from "@/app/config-context";

export const useUploadDocumentToCloudinary = () => {
  const { uploadPreset, cloudName } = useConfig();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(
    async (file: File, setLoader: (loading: boolean) => void, folder?: string) => {
      setLoading(true);
      setError(null);
      setLoader(true); 
      
      const MAX_FILE_SIZE = 10 * 1024 * 1024;

      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      ];

      if (!allowedTypes.includes(file.type)) {
        const error = new Error('Only PDF and DOCX documents are allowed');
        setError(error);
        setLoader(false);
        setLoading(false);
        throw error;
      }

      if (file.size > MAX_FILE_SIZE) {
        const error = new Error('File size exceeds 10MB limit');
        setError(error);
        setLoader(false);
        setLoading(false);
        throw error;
      }

      try {
        const cloud_name = cloudName || "";
        const upload_preset = uploadPreset || "";

        const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", upload_preset);

        if (folder) {
          formData.append("folder", folder);
        }

        const res = await fetch(api_url, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Document upload failed: ${errorText}`);
        }

        const data: { secure_url: string } = await res.json();
        return data.secure_url;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
        setLoader(false); 
      }
    },
    [cloudName, uploadPreset]
  );

  return { upload, loading, error };
};