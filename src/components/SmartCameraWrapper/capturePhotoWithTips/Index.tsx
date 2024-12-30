import React, { useRef, useState, useCallback, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import * as faceapi from 'face-api.js';

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
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [modelLoadingError, setModelLoadingError] = useState<string | null>(null);
    const [, setImageSrc] = useState<string | null>(null);
    const [detectionTimeout, setDetectionTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
                ]);

                console.log('All models loaded successfully');
                setIsModelLoaded(true);
                setModelLoadingError(null);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error loading models';
                console.error("Error loading face-api models:", errorMessage);
                setModelLoadingError(errorMessage);
            }
        };

        loadModels();
    }, []);

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

    const detectFace = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !isModelLoaded) return;

        try {
            const video = videoRef.current;

            if (video.paused || video.ended || !video.videoWidth) return;

            const detection = await faceapi.detectSingleFace(
                video,
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 224,
                    scoreThreshold: 0.3
                })
            );

            const faceDetected = !!detection;
            setIsFaceDetected(faceDetected);

            if (faceDetected) {
                setProgress(prev => {
                    const newProgress = Math.min(100, prev + 2);
                    return newProgress;
                });

                if (!hasInitialFaceDetection && step === 'front') {
                    setHasInitialFaceDetection(true);
                    setTimeout(() => {
                        setStep('side');
                        setProgress(0);
                    }, 1000);
                }

                if (!detectionTimeout) {
                    const timeout = setTimeout(() => {
                        if (isFaceDetected) {
                            capture();
                        } else {
                            setIsFaceDetected(false);
                            setProgress(0);
                        }
                        setDetectionTimeout(null);
                    }, 10000);
                    setDetectionTimeout(timeout);
                }
            } else {
                if (detectionTimeout) {
                    clearTimeout(detectionTimeout);
                    setDetectionTimeout(null);
                }
                setProgress(prev => Math.max(0, prev - 5));
            }
        } catch (err) {
            console.error('Face detection error:', err);
            setIsFaceDetected(false);
        }
    }, [step, hasInitialFaceDetection, detectionTimeout, isModelLoaded, progress]);

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
    }, [onCapture]);

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
        let intervalId: NodeJS.Timeout | null = null;

        if (isModelLoaded && videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                intervalId = setInterval(detectFace, 200);
            };
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [detectFace, isModelLoaded]);

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
                    {modelLoadingError ? (
                        <span className="text-red-500">Error loading face detection: {modelLoadingError}</span>
                    ) : !isModelLoaded ? (
                        "Loading face detection models..."
                    ) : step === 'front' ? (
                        "Position your face within the frame"
                    ) : (
                        "Turn your head to the side"
                    )}
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