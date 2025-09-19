// // const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
// // const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
//
// import {useConfig} from "@/app/config-context";
//
// // const upload_preset = process.env.UPLOAD_PRESET;
// // const cloud_name = process.env.CLOUD_NAME;
// // const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
// //
// // if (!upload_preset || !cloud_name) {
// //     throw new Error("Environment variables UPLOAD_PRESET or CLOUD_NAME are missing.");
// // }
//
// const fetchFormData = async(formData: FormData, api_url: string) => {
//     const res = await fetch(api_url, {
//         method: 'POST',
//         body: formData
//     });
//     if (!res.ok) {
//         throw new Error('Failed to upload image');
//     }
//
//     return await res.json();
//
// }
// export const useUploadImageToCloudinary = (file: File, folder?: string) => {
//     const {uploadPreset, cloudName} = useConfig();
//
//     const cloud_name = cloudName || ""
//     const upload_preset = uploadPreset || ""
//
//     const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
//
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', upload_preset);
//
//     if (folder) {
//         formData.append('folder', folder);
//     }
//
//     // const res = await fetch(api_url, {
//     //     method: 'POST',
//     //     body: formData
//     // });
//     // if (!res.ok) {
//     //     throw new Error('Failed to upload image');
//     // }
//     //
//     // const fileData = await res.json();
//     // console.log("The files___", fileData);
//
//     const fileData = fetchFormData(formData, api_url)
//     return fileData.secure_url;
// };


import { useState, useCallback } from "react";
import {useConfig} from "@/app/config-context";

export const useUploadImageToCloudinary = () => {
    const { uploadPreset, cloudName } = useConfig();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    const upload = useCallback(
        async (file: File, folder?: string) => {
            setLoading(true);
            setError(null);

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
