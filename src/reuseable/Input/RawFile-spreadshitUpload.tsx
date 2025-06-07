// "use client";
// import React, { useRef, useState, useEffect } from 'react';
// import { FiUploadCloud } from 'react-icons/fi';
// import { Label } from '@/components/ui/label';
// import { MdOutlineDelete, MdOutlineEdit, MdCheck, MdErrorOutline } from 'react-icons/md';

// interface FileUploadProps {
//   handleDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
//   handleDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
//   setUploadedFile: (file: File | null) => void; 
//   labelName?: string;
//   initialFileName?: string | null; 
//   className?: string;
// }

// const MAX_FILE_SIZE = 3 * 1024 * 1024;

// const truncateFileName = (name: string, length: number) => {
//   return name.length > length ? name.substring(0, length) + '...' : name;
// };

// const SpreadsheetFileUpload: React.FC<FileUploadProps> = ({
//   handleDrop,
//   handleDragOver,
//   setUploadedFile,
//   labelName,
//   initialFileName,
//   className = '',
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [fileName, setFileName] = useState(initialFileName || '');

//   useEffect(() => {
//     const handleResize = () => {
//       if (file) {
//         setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
//       } else if (initialFileName) {
//         setFileName(truncateFileName(initialFileName, window.innerWidth >= 768 ? 40 : 13));
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [file, initialFileName]);

//   const isFileValid = (file: File): boolean => {
//     const supportedTypes = [
//       'text/csv',
//       'application/vnd.ms-excel', // .xls
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
//     ];

//     const validExtensions = ['.csv', '.xls', '.xlsx'];
//     const fileExtension = file.name.split('.').pop()?.toLowerCase();

//     if (!supportedTypes.includes(file.type)) {
//       setError('Only CSV, XLS, and XLSX files are supported');
//       return false;
//     }

//     if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
//       setError('Invalid file extension. Please upload CSV, XLS, or XLSX files');
//       return false;
//     }

//     if (file.size > MAX_FILE_SIZE) {
//       setError('File size exceeds 3MB limit');
//       return false;
//     }

//     return true;
//   };

//   const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (!selectedFile) return;

//     setLoading(true);
//     setError(null);

//     if (isFileValid(selectedFile)) {
//       setFile(selectedFile);
//       setFileName(truncateFileName(selectedFile.name, 13));
//       setUploadedFile(selectedFile); // Send the file directly to parent
//     } else {
//       setFile(null);
//       setUploadedFile(null);
//     }
//     setLoading(false);
//   };

//   const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (!droppedFile) return;

//     setLoading(true);
//     setError(null);

//     if (isFileValid(droppedFile)) {
//       setFile(droppedFile);
//       setFileName(truncateFileName(droppedFile.name, 13));
//       setUploadedFile(droppedFile); // Send the file directly to parent
//       handleDrop?.(event);
//     } else {
//       setFile(null);
//       setUploadedFile(null);
//     }
//     setLoading(false);
//   };

//   const onClick = () => {
//     if (!loading) {
//       fileInputRef.current?.click();
//     }
//   };

//   const onDelete = () => {
//     if (!loading) {
//       setFile(null);
//       setFileName('');
//       setUploadedFile(null);
//       setError(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   return (
//     <div id="dragAndDropContainer" className={`grid gap-2 w-full ${className}`}>
//       {labelName && (
//         <Label htmlFor="fileInput" className="block text-sm font-medium text-black500">
//           {labelName}
//         </Label>
//       )}

//       <div
//         id="dragAndDrop"
//         className={`${
//           file
//             ? 'p-3 bg-meedlWhite h-[4.25rem] border-[0.5px] border-solid border-neutral650 rounded-sm flex items-center justify-between'
//             : 'grid gap-4 place-items-center border-dashed border border-neutral650 px-2 py-5 rounded-md bg-neutral100 cursor-pointer h-fit'
//         }`}
//         onDrop={file ? undefined : onDrop}
//         onDragOver={file ? undefined : handleDragOver}
//         onClick={file ? undefined : onClick}
//       >
//         <input
//           id="fileInput"
//           type="file"
//           accept=".csv,.xls,.xlsx"
//           style={{ display: 'none' }}
//           ref={fileInputRef}
//           onChange={onFileChange}
//           disabled={loading}
//         />

//         {file ? (
//           <>
//             <div className="flex gap-3 items-center">
//               {loading ? (
//                 <div className="w-5 h-5 border-2 border-l-[2px] border-l-meedlBlue border-lightBlue550 rounded-full animate-spin" />
//               ) : error ? (
//                 <div className="flex justify-center items-center h-5 w-5 rounded-full bg-error450">
//                   <MdErrorOutline className="text-meedlWhite w-3 h-3" />
//                 </div>
//               ) : (
//                 <div className="flex justify-center items-center h-5 w-5 rounded-full bg-green500">
//                   <MdCheck className="text-meedlWhite w-3 h-3" />
//                 </div>
//               )}
//               <div className="flex flex-col items-start">
//                 <p className="text-black500 font-normal text-sm truncate md:whitespace-normal">
//                   {fileName}
//                 </p>
//                 {loading ? (
//                   <p className="text-black300 font-normal text-[12px] leading-[150%]">
//                     loading...
//                   </p>
//                 ) : error ? (
//                   <p className="text-red-500 font-normal text-[12px] leading-[150%]">
//                     {error}
//                   </p>
//                 ) : (
//                   <p className="text-green-500 font-normal text-[12px] leading-[150%]">
//                     File selected successfully
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 onClick={onDelete}
//                 disabled={loading}
//               >
//                 <MdOutlineDelete className="h-5 w-5 text-primary200" />
//               </button>
//               <button
//                 type="button"
//                 className={`h-[1.875rem] w-[1.875rem] bg-grey350 rounded-[50%] flex justify-center items-center ${
//                   loading ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//                 onClick={onClick}
//                 disabled={loading}
//               >
//                 <MdOutlineEdit className="h-5 w-5 text-primary200" />
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="h-11 w-11 bg-meedlWhite  mr-auto ml-auto flex justify-center items-center rounded-md">
//               <FiUploadCloud className="w-6 h-[22px]" />
//             </div>
//             <div className="grid gap-1 place-items-center">
//               <p className="font-normal text-black300 text-[14px] leading-[150%]">
//                 <span className="underline text-meedlBlue">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-black300 leading-[150%] text-[14px] font-normal">
//                 CSV, XLS or XLSX (max. 3MB)
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpreadsheetFileUpload;
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { Label } from '@/components/ui/label';
import { MdOutlineDelete, MdOutlineEdit, MdCheck, MdErrorOutline } from 'react-icons/md';

interface FileUploadProps {
  handleDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  setUploadedFile: (file: File | null) => void;
  labelName?: string;
  initialFile?: File | null;
  className?: string;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const truncateFileName = (name: string | undefined, length: number) => {
  if (!name) return '';
  return name.length > length ? name.substring(0, length) + '...' : name;
};

const SpreadsheetFileUpload: React.FC<FileUploadProps> = ({
  handleDrop,
  handleDragOver,
  setUploadedFile,
  labelName,
  initialFile,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(initialFile || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState(
    initialFile?.name ? truncateFileName(initialFile.name, 13) : ''
  );

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      setFileName(truncateFileName(initialFile.name, window.innerWidth >= 768 ? 40 : 13));
    } else {
      setFile(null);
      setFileName('');
    }
  }, [initialFile]);

  useEffect(() => {
    const handleResize = () => {
      if (file?.name) {
        setFileName(truncateFileName(file.name, window.innerWidth >= 768 ? 40 : 13));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [file]);

  const isFileValid = (file: File): boolean => {
    const supportedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const validExtensions = ['.csv', '.xls', '.xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!supportedTypes.includes(file.type)) {
      setError('Only CSV, XLS, and XLSX files are supported');
      return false;
    }

    if (!fileExtension || !validExtensions.includes(`.${fileExtension}`)) {
      setError('Invalid file extension. Please upload CSV, XLS, or XLSX files');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 3MB limit');
      return false;
    }

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
      setUploadedFile(selectedFile);
    } else {
      setFile(null);
      setUploadedFile(null);
    }
    setLoading(false);
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) return;

    setLoading(true);
    setError(null);

    if (isFileValid(droppedFile)) {
      setFile(droppedFile);
      setFileName(truncateFileName(droppedFile.name, 13));
      setUploadedFile(droppedFile);
      handleDrop?.(event);
    } else {
      setFile(null);
      setUploadedFile(null);
    }
    setLoading(false);
  };

  const onClick = () => {
    if (!loading) {
      fileInputRef.current?.click();
    }
  };

  const onDelete = () => {
    if (!loading) {
      setFile(null);
      setFileName('');
      setUploadedFile(null);
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
          file
            ? 'p-3 bg-meedlWhite h-[4.25rem] border-[0.5px] border-solid border-neutral650 rounded-sm flex items-center justify-between'
            : 'grid gap-4 place-items-center border-dashed border border-neutral650 px-2 py-5 rounded-md bg-neutral100 cursor-pointer h-fit'
        }`}
        onDrop={file ? undefined : onDrop}
        onDragOver={file ? undefined : handleDragOver}
        onClick={file ? undefined : onClick}
      >
        <input
          id="fileInput"
          type="file"
          accept=".csv,.xls,.xlsx"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileChange}
          disabled={loading}
        />

        {file ? (
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
                  <p className="text-green-500 font-normal text-[12px] leading-[150%]">
                    File selected successfully
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
          <>
            <div className="h-11 w-11 bg-meedlWhite  mr-auto ml-auto flex justify-center items-center rounded-md">
              <FiUploadCloud className="w-6 h-[22px]" />
            </div>
            <div className="grid gap-1 place-items-center">
              <p className="font-normal text-black300 text-[14px] leading-[150%]">
                <span className="underline text-meedlBlue">Click to upload</span> or drag and drop
              </p>
              <p className="text-black300 leading-[150%] text-[14px] font-normal">
                CSV, XLS or XLSX (max. 3MB)
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpreadsheetFileUpload;