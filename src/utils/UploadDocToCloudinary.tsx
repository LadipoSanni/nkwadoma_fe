
import { useState, useCallback } from "react";
import {useConfig} from "@/app/config-context";

export const useUploadDocumentToCloudinary =  () => {
  const { uploadPreset, cloudName } = useConfig();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const upload = useCallback(
      async (file: File, setLoader: (error:boolean) => void, folder?: string) => {
        setLoading(true);
        setError(null);
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
        try {
          const cloud_name = cloudName || "";
          const upload_preset = uploadPreset || "";

          const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;


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
            throw new Error("Failed to upload image");
          }

          const data: { secure_url: string } = await res.json();
          setUrl(data.secure_url);
          return data.secure_url;
        } catch (err) {
          setError(err as Error);
          throw err;
        } finally {
          setLoading(false);
        }
      },
      [cloudName, uploadPreset]
  );

  return { upload, loading, error, url };

};