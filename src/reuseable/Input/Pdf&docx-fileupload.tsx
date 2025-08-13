"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { MdOutlineDelete, MdOutlineEdit, MdCheck, MdErrorOutline } from 'react-icons/md';
import { uploadDocumentToCloudinary } from '@/utils/UploadDocToCloudinary';

interface FileUploadProps {
  handleDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  setUploadedDocUrl: (url: string | null) => void;
  labelName?: string;
  initialDocUrl?: string | null;
  className?: string;
  cloudinaryFolderName?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; 

const truncateFileName = (name: string, length: number) => {
  return name.length > length ? name.substring(0, length) + '...' : name;
};

const PdfAndDocFileUpload: React.FC<FileUploadProps> = ({
  setUploadedDocUrl,
  labelName,
  initialDocUrl,
  className = '',
  cloudinaryFolderName
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState(
    initialDocUrl ? truncateFileName(extractFileName(initialDocUrl), 13) : ''
  );
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(initialDocUrl || null);
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  function extractFileName(url: string): string {
    try {
      const parsed = new URL(url);
      return parsed.pathname.split('/').pop() || 'Uploaded document';
    } catch {
      return url.split('/').pop() || 'Uploaded document';
    }
  }

  const setLoader = (loadingState: boolean) => {
    setFileUploadLoading(loadingState);
  }

  useEffect(() => {
    if (initialDocUrl && !file) {
      setUploadedFileUrl(initialDocUrl);
      setFileName(truncateFileName(extractFileName(initialDocUrl), 13));
    }

    const handleResize = () => {
      if (file) {
        setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
      } else if (initialDocUrl) {
        setFileName(truncateFileName(extractFileName(initialDocUrl), window.innerWidth >= 768 ? 40 : 13));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [file, initialDocUrl]);

  const isFileValid = (file: File): boolean => {
    const supportedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!supportedTypes.includes(file.type)) {
      setError('Only PDF and DOCX files are supported');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10MB limit');
      return false;
    }

    setError(null);
    return true;
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    if (isFileValid(selectedFile)) {
      setFile(selectedFile);
      setFileName(truncateFileName(selectedFile.name, 13));

      try {
        const uploadedFileUrl = await uploadDocumentToCloudinary(selectedFile, setLoader, cloudinaryFolderName);
        setUploadedFileUrl(uploadedFileUrl);
        setUploadedDocUrl(uploadedFileUrl);
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : 'Failed to upload document');
        console.error(uploadError);
      } finally {
        setLoading(false);
      }
    } else {
      setFile(null);
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    
    setLoading(true);
    setError(null);

    if (isFileValid(droppedFile)) {
      setFile(droppedFile);
      setFileName(truncateFileName(droppedFile.name, 13));
      
      try {
        const uploadedFileUrl = await uploadDocumentToCloudinary(
          droppedFile, 
          setLoader, 
          cloudinaryFolderName || 'investment-vehicle-documents'
        );
        setUploadedFileUrl(uploadedFileUrl);
        setUploadedDocUrl(uploadedFileUrl);
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : 'Failed to upload document');
        console.error(uploadError);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const onClick = () => {
    if (!loading) {
      fileInputRef.current?.click();
    }
  };

  const onDelete = () => {
    if (!loading) {
      setFile(null);
      setUploadedFileUrl(null);
      setUploadedDocUrl(null);
      setFileName('');
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div id="dragAndDropContainer" className={`grid gap-2 w-full ${className}`}>
      {labelName && (
        <Label htmlFor="fileInput" className="block text-sm font-medium text-black500">
          {labelName}
        </Label>
      )}

      <div
        id="dragAndDrop"
        className={`${
          uploadedFileUrl
            ? 'p-3 bg-meedlWhite h-[4.25rem] border-[0.5px] border-solid border-neutral650 rounded-sm flex items-center justify-between'
            : `grid gap-4 place-items-center border-dashed border ${isDragActive ? 'border-meedlBlue bg-neutral200' : 'border-neutral650'} px-2 py-5 rounded-md bg-neutral100 cursor-pointer h-fit`
        }`}
        onDrop={uploadedFileUrl ? undefined : onDrop}
        onDragEnter={uploadedFileUrl ? undefined : handleDragIn}
        onDragLeave={uploadedFileUrl ? undefined : handleDragOut}
        onDragOver={uploadedFileUrl ? undefined : handleDrag}
        onClick={uploadedFileUrl ? undefined : onClick}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.docx"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileChange}
          disabled={loading}
        />

        {uploadedFileUrl ? (
          <>
            <div className="flex gap-3 items-center">
              {loading ? (
                <div className="w-5 h-5 border-2 border-l-[2px] border-l-meedlBlue border-lightBlue550 rounded-full animate-spin" />
              ) : error ? (
                <div className="flex justify-center items-center h-5 w-5 rounded-full bg-error450">
                  <MdErrorOutline className="text-meedlWhite w-3 h-3" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-5 w-5 rounded-full bg-green500">
                  <MdCheck className="text-meedlWhite w-3 h-3" />
                </div>
              )}
              <div className="flex flex-col items-start">
                <p className="text-black500 font-normal text-sm truncate md:whitespace-normal">
                  {fileName}
                </p>
                {loading ? (
                  <p className="text-black300 font-normal text-[12px] leading-[150%]">
                    loading...
                  </p>
                ) : error ? (
                  <p className="text-red-500 font-normal text-[12px] leading-[150%]">
                    {error}
                  </p>
                ) : (
                  <p className="text-[#06792D] font-normal text-[12px] leading-[150%]">
                    Uploaded successfully
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={onDelete}
                disabled={loading}
              >
                <MdOutlineDelete className="h-5 w-5 text-primary200" />
              </button>
              <button
                type="button"
                className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={onClick}
                disabled={loading}
              >
                <MdOutlineEdit className="h-5 w-5 text-primary200" />
              </button>
            </div>
          </>
        ) : (
          <div className={`w-full`}>
            {error && <p className={`text-xs mr-auto ml-auto mb-2 w-fit text-red-500`}>{error}. Please choose another file</p>}
            {fileUploadLoading ? (
              <div className="flex justify-between w-full">
                <div className="flex gap-2 w-fit items-start">
                  <div id={'loadingState'} className="w-5 h-5 border-2 border-l-[2px] mr-auto ml-auto mt-auto mb-auto border-l-meedlBlue border-lightBlue550 rounded-full animate-spin" />
                  <span id={'fileName'} className="text-black500 grid font-normal text-sm truncate md:whitespace-normal">
                    {fileName}
                    <p id={'uploadingText'}>uploading ...</p>
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
                      fileUploadLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={onDelete}
                    disabled={fileUploadLoading}
                    id={'changeFileButton'}
                  >
                    <MdOutlineDelete id={'editIcon'} className="h-5 w-5 text-primary200" />
                  </button>
                  <button
                    type="button"
                    className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
                      fileUploadLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={onClick}
                    disabled={fileUploadLoading}
                    id={'changeFileButton'}
                  >
                    <MdOutlineEdit className="h-5 w-5 text-primary200" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-11 w-11 bg-meedlWhite mr-auto ml-auto flex justify-center items-center rounded-md">
                  <FiUploadCloud className="w-6 h-[22px]" />
                </div>
                <div className="grid gap-1 place-items-center">
                  <p className="font-normal text-black300 text-[14px] leading-[150%]">
                    <span className="underline text-meedlBlue">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-black300 leading-[150%] text-[14px] font-normal">
                    PDF or DOCX (max. 10MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfAndDocFileUpload;
