import React, { useRef, useState, useCallback, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface CapturePhotoWithTipsProps {
    onCapture: (imageSrc: File) => void;
}

const CapturePhotoWithTips: React.FC<CapturePhotoWithTipsProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [step, setStep] = useState<'front' | 'side'>('front');
    const [progress, setProgress] = useState(0);
    const [hasInitialFaceDetection, setHasInitialFaceDetection] = useState(false);
    const [, setImageSrc] = useState<string | null>(null);
    const [captureTimeout, setCaptureTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "user",
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
        };
        startCamera();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const detectFace = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) return;

        // Ensure the video has valid dimensions
        if (video.videoWidth === 0 || video.videoHeight === 0) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const centerX = Math.floor(canvas.width / 4);
        const centerY = Math.floor(canvas.height / 4);
        const size = Math.floor(Math.min(canvas.width, canvas.height) / 2);

        const imageData = context.getImageData(centerX, centerY, size, size);
        const data = imageData.data;

        let skinTonePixels = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r > 95 && g > 40 && b > 20 &&
                Math.abs(r - g) > 15 && r > g && r > b) {
                skinTonePixels++;
            }
        }

        const faceDetected = skinTonePixels > (size * size * 0.1);
        setIsFaceDetected(faceDetected);

        if (faceDetected) {
            setProgress(prev => {
                const newProgress = prev >= 100 ? 0 : prev + 1;
                console.log(`Face detection progress: ${newProgress}%`);
                return newProgress;
            });

            if (!captureTimeout) {
                const timeout = setTimeout(() => {
                    capture();
                    setCaptureTimeout(null);
                }, 20000);
                setCaptureTimeout(timeout);
            }
        } else {
            if (captureTimeout) {
                clearTimeout(captureTimeout);
                setCaptureTimeout(null);
            }
            setProgress(0);
        }

        if (faceDetected && !hasInitialFaceDetection) {
            setHasInitialFaceDetection(true);
            setTimeout(() => {
                if (step === 'front') {
                    setStep('side');
                }
            }, 1000);
        }
    }, [step, hasInitialFaceDetection, captureTimeout]);

    const capture = useCallback(() => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageSrc = canvas.toDataURL('image/jpeg');
                const file = convertBase64ToFile(imageSrc, "captured-image.jpg");
                setImageSrc(imageSrc);
                onCapture(file);
            }
        }
    }, [videoRef, onCapture]);

    const convertBase64ToFile = (base64String: string, fileName: string): File => {
        const base64Parts = base64String.split(',');
        const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        const binaryString = atob(base64Parts[1]);
        const byteArray = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        return new File([byteArray], fileName, { type: mimeType });
    };

    useEffect(() => {
        const interval = setInterval(detectFace, 200);
        return () => clearInterval(interval);
    }, [detectFace]);

    useEffect(() => {
        if (isFaceDetected) {
            const interval = setInterval(() => {
                setProgress(prev => (prev >= 100 ? 0 : prev + 1));
            }, 200);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [isFaceDetected]);

    const frameClassName = isFaceDetected
        ? "absolute top-4 right-4 w-[270px] h-[270px] rounded-full overflow-hidden transition-all duration-500"
        : "absolute top-4 right-4 w-[270px] h-[270px] overflow-hidden transition-all duration-500";

    return (
        <main className="grid gap-5">
            <div className="grid place-items-center gap-5">
                <main className="relative w-[300px] h-[300px]">
                    {isFaceDetected && (
                        <svg viewBox="0 0 300 301" className="absolute top-0 left-0 w-full h-full transition-opacity duration-500">
                            <path
                                d="M300 150.5C300 233.343 232.843 300.5 150 300.5C67.1573 300.5 0 233.343 0 150.5C0 67.6573 67.1573 0.5 150 0.5C232.843 0.5 300 67.6573 300 150.5ZM10.4561 150.5C10.4561 227.568 72.932 290.044 150 290.044C227.068 290.044 289.544 227.568 289.544 150.5C289.544 73.432 227.068 10.9561 150 10.9561C72.932 10.9561 10.4561 73.432 10.4561 150.5Z"
                                className="fill-gray-100"
                            />
                            <circle
                                className="transition-all duration-300"
                                cx="150"
                                cy="150.5"
                                r="144"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="12"
                                strokeDasharray="904.32"
                                strokeDashoffset={`${904.32 * (1 - progress / 100)}`}
                            />
                        </svg>
                    )}
                    <div className={frameClassName}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </main>
                <p className="text-gray-700 text-sm">
                    {step === 'front'
                        ? "Position your face within the frame"
                        : "Turn your head to the side"}
                </p>
            </div>
            <section className="bg-gray-50 rounded p-5 space-y-3">
                <h1 className="text-gray-900 text-sm font-medium">Tips</h1>
                <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                        {isFaceDetected ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                            <X className="h-3 w-3 text-red-600" />
                        )}
                        <p className="text-gray-700 text-sm">
                            {step === 'front'
                                ? "Face detected"
                                : "Turn head sideways"}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <p className="text-gray-700 text-sm">Find a well lit environment</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <X className="h-3 w-3 text-red-600" />
                        <p className="text-gray-700 text-sm">Don&#39;t wear hats, glasses and masks</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CapturePhotoWithTips;

// import React, { useRef, useState, useCallback, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from 'face-api.js';
// import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
//
// interface CapturePhotoWithTipsProps {
//     onCapture: (imageSrc: File) => void;
// }
//
// const CapturePhotoWithTips: React.FC<CapturePhotoWithTipsProps> = ({ onCapture }) => {
//     const webcamRef = useRef<Webcam>(null);
//     const [isFaceDetected, setIsFaceDetected] = useState(false);
//     const [step, setStep] = useState<'front' | 'side'>('front');
//     const [progress, setProgress] = useState(0);
//
//     useEffect(() => {
//         // Load face-api models
//         const loadModels = async () => {
//             await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//             await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//         };
//         loadModels();
//     }, []);
//
//     const detectFace = useCallback(async () => {
//         if (webcamRef.current) {
//             const video = webcamRef.current.video;
//             if (video) {
//                 const detection = await faceapi.detectSingleFace(
//                     video,
//                     new faceapi.TinyFaceDetectorOptions()
//                 );
//
//                 if (detection) {
//                     setIsFaceDetected(true);
//                     if (step === 'front') {
//                         setTimeout(capture, 1000);
//                     }
//                 } else {
//                     setIsFaceDetected(false);
//                 }
//             }
//         }
//     }, [step]);
//
//     useEffect(() => {
//         const interval = setInterval(detectFace, 100);
//         return () => clearInterval(interval);
//     }, [detectFace]);
//
//     const capture = useCallback(() => {
//         if (webcamRef.current) {
//             const imageSrc = webcamRef.current.getScreenshot();
//             if (imageSrc) {
//                 const file = convertBase64ToFile(imageSrc, "captured-image.jpg");
//                 if (step === 'front') {
//                     setStep('side');
//                 } else {
//                     onCapture(file);
//                 }
//             }
//         }
//     }, [step, onCapture]);
//
//     const convertBase64ToFile = (base64String: string, fileName: string): File => {
//         const base64Parts = base64String.split(',');
//         const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
//         const binaryString = atob(base64Parts[1]);
//         const byteArray = new Uint8Array(binaryString.length);
//
//         for (let i = 0; i < binaryString.length; i++) {
//             byteArray[i] = binaryString.charCodeAt(i);
//         }
//
//         return new File([byteArray], fileName, { type: mimeType });
//     };
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
//         }, 2000);
//         return () => clearInterval(interval);
//     }, []);
//
//     return (
//         <main className="grid gap-5">
//             <div className="grid place-items-center gap-5">
//                 <main className="relative w-[300px] h-[300px]">
//                     <svg width="300" height="301" viewBox="0 0 300 301" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M300 150.5C300 233.343 232.843 300.5 150 300.5C67.1573 300.5 0 233.343 0 150.5C0 67.6573 67.1573 0.5 150 0.5C232.843 0.5 300 67.6573 300 150.5ZM10.4561 150.5C10.4561 227.568 72.932 290.044 150 290.044C227.068 290.044 289.544 227.568 289.544 150.5C289.544 73.432 227.068 10.9561 150 10.9561C72.932 10.9561 10.4561 73.432 10.4561 150.5Z"
//                             fill="#F0F2F4"
//                         />
//                         <circle
//                             className="progress-circle"
//                             cx="150"
//                             cy="150.5"
//                             r="144"
//                             fill="none"
//                             stroke={isFaceDetected ? "#00FF00" : "#142854"}
//                             strokeWidth="12"
//                             strokeDasharray="904.32"
//                             strokeDashoffset={`${904.32 * (1 - progress / 100)}`}
//                         />
//                     </svg>
//                     <div className="absolute top-4 right-4 w-[270px] h-[270px] rounded-full overflow-hidden">
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                 </main>
//                 <p className="text-black400 text-[14px] font-normal leading-[150%]">
//                     {step === 'front'
//                         ? "Position your face within the frame"
//                         : "Turn your head to the side"}
//                 </p>
//             </div>
//             <section className="bg-grey105 rounded grid p-[12px_20px] gap-3">
//                 <h1 className="text-[#212221] text-[14px] font-medium leading-[150%]">Tips</h1>
//                 <div className="grid gap-4">
//                     <div className="flex gap-2 items-center">
//                         {isFaceDetected ? (
//                             <MdCheckCircleOutline className="text-green750 h-3 w-3" />
//                         ) : (
//                             <MdOutlineCancel className="text-error1000 h-3 w-3" />
//                         )}
//                         <p className="text-black400 text-[14px] font-normal leading-[150%]">
//                             {step === 'front'
//                                 ? "Face detected"
//                                 : "Turn head sideways"}
//                         </p>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                         <MdCheckCircleOutline className="text-green750 h-3 w-3" />
//                         <p className="text-black400 text-[14px] font-normal leading-[150%]">Find a well lit environment</p>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                         <MdOutlineCancel className="text-error1000 h-3 w-3" />
//                         <p className="text-black400 text-[14px] font-normal leading-[150%]">Don't wear hats, glasses and masks</p>
//                     </div>
//                 </div>
//             </section>
//         </main>
//     );
// };
//
// export default CapturePhotoWithTips;