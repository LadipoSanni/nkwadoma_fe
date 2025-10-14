// import React, { useState,useEffect  } from 'react';
// import { inter } from '@/app/fonts';
// import { FileText} from "lucide-react";

// interface objProps {
//     label: string;
//     value: string;
// }

// interface Props {
//     listOfDocument: objProps[];
// }

// const useIsMobile = (breakpoint = 960) => {
//     const [isMobile, setIsMobile] = useState(false);
  
//     useEffect(() => {
//       const checkScreenSize = () => {
//         setIsMobile(window.innerWidth < breakpoint);
//       };
  
//       checkScreenSize();
//       window.addEventListener('resize', checkScreenSize);
  
//       return () => window.removeEventListener('resize', checkScreenSize);
//     }, [breakpoint]);
  
//     return isMobile;
//   };

// export  const getGoogleDocsViewerUrl = (docUrl: string): string => {
//     return `https://docs.google.com/gview?url=${encodeURIComponent(docUrl)}&embedded=true`;
// };

// function ViewDocument({ listOfDocument }: Props) {
//     const [docError, setDocError] = useState<string | null>(null);
//     const [currentDocUrl, setCurrentDocUrl] = useState<string>('');

//     const getFilenameFromUrl = (url: string): string => {
//         try {
//             const urlObj = new URL(url);
//             return urlObj.pathname.split('/').pop() || 'No file available';
//         } catch {
//             return url?.split('/').pop() || 'No file available';
//         }
//     };

//     const verifyDocumentExists = async (url: string): Promise<boolean> => {
//         if (url.includes('cloudinary.com')) {
//             return url.toLowerCase().endsWith('.pdf') || 
//                    url.toLowerCase().endsWith('.docx');
//         }

//         try {
//             const response = await fetch(url, { method: 'HEAD' });
//             const contentType = response.headers.get('content-type') || '';
//             return response.ok && (
//                 contentType.includes('application/pdf') || 
//                 contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
//             );
//         } catch {
//             return false;
//         }
//     };

//     const handleViewDocument = async (docUrl: string, event: React.MouseEvent) => {
//         event.preventDefault(); 
        
//         if (!docUrl) return;
//         setDocError(null);
//         setCurrentDocUrl(docUrl);
        
//         const docFilename = getFilenameFromUrl(docUrl);
//         const isCloudinaryUrl = docUrl.includes('cloudinary.com');
//         const fileExtension = docFilename?.split('.').pop()?.toLowerCase() || '';

//         try {
//             if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
//                 setDocError('Invalid document format');
//                 return;
//             }

//             if (!isCloudinaryUrl) {
//                 const docExists = await verifyDocumentExists(docUrl);
//                 if (!docExists) {
//                     setDocError('Document not found');
//                     return;
//                 }
//             }

//             window.open(docUrl, '_blank', 'noopener,noreferrer');
//         } catch (error) {
//             setDocError('Error opening document');
//             console.error('Document open error:', error);
//         } 

//     };

//     const truncateFilename = (filename: string, maxLength: number = 25): string => {
//         if (filename.length <= maxLength) return filename;
        
//         const extensionIndex = filename.lastIndexOf('.');
//         if (extensionIndex === -1) {
//             return filename.substring(0, maxLength - 3) + '...';
//         }
        
//         const name = filename.substring(0, extensionIndex);
//         const extension = filename.substring(extensionIndex);
        
//         if (name.length <= 3) {
//             return filename; 
//         }
        
//         const maxNameLength = maxLength - extension.length - 3;
//         if (maxNameLength <= 3) {
//             return filename.substring(0, maxLength - 3) + '...' + extension;
//         }
        
//         return name.substring(0, maxNameLength) + '...' + extension;
//     };

//     const isMobile = useIsMobile();

//     return (
//         <div>
//             <div className={`${inter.className}`}>
//                 {listOfDocument?.map((data, index) => {
//                     const docUrl = data.value;
//                     const docFilename = getFilenameFromUrl(docUrl);
//                     const isCurrentDoc = currentDocUrl === docUrl;

//                     return (
//                         <div
//                             id={`data-item-${index}`} 
//                             data-testid={`data-item-${index}`}
//                             key={index}
//                             className='border-[#D7D7D7] border-solid border-[1px] rounded-md  mb-5 pb-8'
//                         >
                           
//                             <p className='bg-[#F9F9F9]   text-[14px] font-semibold text-[#212221] py-3 px-3 rounded-t-sm mb-3'>
//                                 {data.label}
//                             </p>
                            
//                             <div className='flex items-start text-[14px] relative top-3 '>
//                                 <FileText className="w-10 h-5 text-[#667085] flex-shrink-0" />
//                                 <div className='flex-1 min-w-0 '>
    
//                                 <a
//                                         href={docUrl}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         onClick={(e) => handleViewDocument(docUrl, e)}
//                                         className={`text-[#4D4E4D] text-[14px] font-medium leading-[150%] break-words ${
//                                             docFilename === "No file available" ? "" : "underline underline-offset-4 hover:text-meedlBlue"
//                                         }`}
//                                         aria-label={`View ${docFilename}`}
//                                         title={!isMobile? docFilename : undefined}
//                                         style={{ wordBreak: 'break-word' }}
//                                     >
//                                       {!isMobile ? truncateFilename(docFilename, 37) : docFilename}
//                                     </a>
//                                 </div>
//                             </div>

//                             {docError && isCurrentDoc && (
//                                 <p className='text-red-500 text-xs mt-2 px-4'>
//                                     {docError}
//                                 </p>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }

// export default ViewDocument;

import React, { useState, useEffect } from 'react';
import { inter } from '@/app/fonts';
import { FileText} from "lucide-react";

interface objProps {
    label: string;
    value: string;
}

interface Props {
    listOfDocument: objProps[];
}

const useIsMobile = (breakpoint = 960) => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };
  
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
  
      return () => window.removeEventListener('resize', checkScreenSize);
    }, [breakpoint]);
  
    return isMobile;
};

function ViewDocument({ listOfDocument }: Props) {
    const [docError, setDocError] = useState<string | null>(null);
    const [currentDocUrl, setCurrentDocUrl] = useState<string>('');

    const getFilenameFromUrl = (url: string): string => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.split('/').pop() || 'No file available';
        } catch {
            return url?.split('/').pop() || 'No file available';
        }
    };

    const getFileExtension = (url: string): string => {
        const filename = getFilenameFromUrl(url);
        return filename?.split('.').pop()?.toLowerCase() || '';
    };

    const getGoogleDocsViewerUrl = (docUrl: string): string => {
        return `https://docs.google.com/gview?url=${encodeURIComponent(docUrl)}&embedded=true`;
    };

    const handleViewDocument = async (docUrl: string, event: React.MouseEvent) => {
        event.preventDefault(); 
        
        if (!docUrl) return;
        setDocError(null);
        setCurrentDocUrl(docUrl);
        
        const fileExtension = getFileExtension(docUrl);

        try {
            if (fileExtension === 'pdf') {
                window.open(docUrl, '_blank', 'noopener,noreferrer');
            } else if (fileExtension === 'docx' || fileExtension === 'doc') {
                const viewerUrl = getGoogleDocsViewerUrl(docUrl);
                window.open(viewerUrl, '_blank', 'noopener,noreferrer,width=800,height=600');
            } else {
                setDocError('Unsupported document format');
            }
        } catch (error) {
            setDocError('Error opening document');
            console.error('Document open error:', error);
        }
    };

    // const handleDownloadDocument = (docUrl: string, event: React.MouseEvent) => {
    //     event.preventDefault();
    //     event.stopPropagation();
        
    //     const filename = getFilenameFromUrl(docUrl);
    //     const link = document.createElement('a');
    //     link.href = docUrl;
    //     link.download = filename;
    //     link.target = '_blank';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const truncateFilename = (filename: string, maxLength: number = 25): string => {
        if (filename.length <= maxLength) return filename;
        
        const extensionIndex = filename.lastIndexOf('.');
        if (extensionIndex === -1) {
            return filename.substring(0, maxLength - 3) + '...';
        }
        
        const name = filename.substring(0, extensionIndex);
        const extension = filename.substring(extensionIndex);
        
        if (name.length <= 3) {
            return filename; 
        }
        
        const maxNameLength = maxLength - extension.length - 3;
        if (maxNameLength <= 3) {
            return filename.substring(0, maxLength - 3) + '...' + extension;
        }
        
        return name.substring(0, maxNameLength) + '...' + extension;
    };

    const isMobile = useIsMobile();

    return (
        <div>
            <div className={`${inter.className}`}>
                {listOfDocument?.map((data, index) => {
                    const docUrl = data.value;
                    const docFilename = getFilenameFromUrl(docUrl);
                    // const fileExtension = getFileExtension(docUrl);
                    const isCurrentDoc = currentDocUrl === docUrl;

                    return (
                        <div
                            id={`data-item-${index}`} 
                            data-testid={`data-item-${index}`}
                            key={index}
                            className='border-[#D7D7D7] border-solid border-[1px] rounded-md  mb-5 pb-8'
                        >
                           
                            <p className='bg-[#F9F9F9] text-[14px] font-semibold text-[#212221] py-3 px-3 rounded-t-sm mb-3'>
                                {data.label}
                            </p>
                            
                            <div className='flex items-start text-[14px] relative top-3 px-3'>
                                <FileText className="w-10 h-5 text-[#667085] flex-shrink-0" />
                                <div className='flex-1 min-w-0 flex justify-between items-center'>
                                    <a
                                        href={docUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleViewDocument(docUrl, e)}
                                        className={`text-[#4D4E4D] text-[14px] font-medium leading-[150%] break-words ${
                                            docFilename === "No file available" ? "" : "underline underline-offset-4 hover:text-meedlBlue"
                                        }`}
                                        aria-label={`View ${docFilename}`}
                                        title={!isMobile ? docFilename : undefined}
                                        style={{ wordBreak: 'break-word' }}
                                    >
                                        {!isMobile ? truncateFilename(docFilename, 37) : docFilename}
                                    </a>
                                    
                                   
                                    {/* {(fileExtension === 'docx' || fileExtension === 'doc') && (
                                        <button
                                            onClick={(e) => handleDownloadDocument(docUrl, e)}
                                            className="ml-2 p-1 text-[#667085] hover:text-meedlBlue transition-colors"
                                            title="Download document"
                                            aria-label="Download document"
                                        >
                                            <Download size={16} />
                                        </button>
                                    )} */}
                                </div>
                            </div>

                            {docError && isCurrentDoc && (
                                <p className='text-red-500 text-xs mt-2 px-4'>
                                    {docError}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ViewDocument;