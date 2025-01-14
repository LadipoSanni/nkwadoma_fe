import React, { useRef, useState, useCallback, useEffect } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import { inter } from '@/app/fonts';
import * as faceapi from 'face-api.js';

interface CapturePhotoWithTipsProps {
    onCapture: (imageSrc: File) => void;
}

const CapturePhotoWithTips: React.FC<CapturePhotoWithTipsProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [orientation, setOrientation] = useState<string | null>(null);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [hasFaceBeenDetected, setHasFaceBeenDetected] = useState(false);
    const [modelLoadingError, setModelLoadingError] = useState<string | null>(null);
    const [step, setStep] = useState<string>('right');
    const [progress] = useState<number>(0);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                setIsModelLoaded(true);
            } catch (error) {
                if (error instanceof Error) {
                    setModelLoadingError(error.message);
                } else {
                    setModelLoadingError("An unknown error occurred");
                }
            }
        };
        loadModels();
    }, []);

    useEffect(() => {
        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        };
        startCamera();
    }, []);

    const detectFaceOrientation = useCallback(async () => {
        if (!videoRef.current || !isModelLoaded) return;

        const video = videoRef.current;
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.3 })).withFaceLandmarks();

        if (detection) {
            setIsFaceDetected(true);
            if (!hasFaceBeenDetected) {
                setHasFaceBeenDetected(true);
            }
            const landmarks = detection.landmarks;
            const nose = landmarks.getNose();
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            const noseX = nose[3].x;
            const noseY = nose[3].y;
            const leftEyeX = leftEye[0].x;
            const leftEyeY = leftEye[0].y;
            const rightEyeX = rightEye[3].x;
            const rightEyeY = rightEye[3].y;

            let newOrientation: string | null = "center";
            if (noseX > rightEyeX) {
                newOrientation = "left";
            } else if (noseX < leftEyeX) {
                newOrientation = "right";
            } else if (noseY < leftEyeY && noseY < rightEyeY) {
                newOrientation = "up";
            } else if (noseY > leftEyeY && noseY > rightEyeY) {
                newOrientation = "down";
            }

            if (newOrientation !== orientation) {
                setOrientation(newOrientation);
                if (newOrientation === "center") {
                    if (step === "right") {
                        setStep("left");
                    } else if (step === "left") {
                        setStep("up");
                    } else if (step === "up") {
                        setStep("down");
                    }
                }
            }

            if (newOrientation === "center") {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob((blob) => {
                        if (blob) {
                            onCapture(new File([blob], "capture.png", { type: "image/png" }));
                        }
                    });
                }
            }
        } else {
            if (!hasFaceBeenDetected) {
                setIsFaceDetected(false);
            }
        }
    }, [isModelLoaded, orientation, onCapture, hasFaceBeenDetected, step]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (isModelLoaded) {
            intervalId = setInterval(detectFaceOrientation, 200);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [detectFaceOrientation, isModelLoaded]);

    const frameClassName = isFaceDetected
        ? "absolute top-4 right-4 w-[270px] h-[270px] rounded-full overflow-hidden"
        : "absolute w-[419px] h-[279px] overflow-hidden ";

    return (
        <main className={`grid gap-5 ${inter.className}`}>
            <div className="grid place-items-center gap-5">
                <main
                    className={` ${isFaceDetected || hasFaceBeenDetected ? 'relative w-[300px] h-[300px]' : ' w-[419px] h-[279px] '}`}>
                    {(isFaceDetected || hasFaceBeenDetected) && (
                        <svg viewBox="0 0 300 301"
                             className="absolute top-0 left-0 w-full h-full transition-opacity duration-500">
                            <path
                                d="M300 150.5C300 233.343 232.843 300.5 150 300.5C67.1573 300.5 0 233.343 0 150.5C0 67.6573 67.1573 0.5 150 0.5C232.843 0.5 300 67.6573 300 150.5ZM10.4561 150.5C10.4561 227.568 72.932 290.044 150 290.044C227.068 290.044 289.544 227.568 289.544 150.5C289.544 73.432 227.068 10.9561 150 10.9561C72.932 10.9561 10.4561 73.432 10.4561 150.5Z"
                                className="fill-greyBase200 "
                            />
                            <circle
                                className="transition-all duration-300"
                                cx="150"
                                cy="150.5"
                                r="144"
                                fill="none"
                                stroke="#142854"
                                strokeWidth="12"
                                strokeDasharray="904.32"
                                strokeDashoffset={`${904.32 * (1 - progress / 100)}`}
                            />
                        </svg>
                    )}
                    <div className={frameClassName} style={{ transform: 'scaleX(-1)' }}>
                        {!hasFaceBeenDetected && (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="relative w-[323px] h-[180px]">
                                    <div
                                        className="absolute top-0 left-0 w-[46px] h-[45px] rounded-[4px] border-t-[5px] border-l-[5px] border-meedlWhite flex-shrink-0"></div>
                                    <div
                                        className="absolute top-0 right-0 w-[46px] h-[45px] rounded-[4px] border-t-[5px] border-r-[5px] border-meedlWhite flex-shrink-0"></div>
                                    <div
                                        className="absolute bottom-0 left-0 w-[46px] h-[45px] rounded-[4px] border-b-[5px] border-l-[5px] border-meedlWhite flex-shrink-0"></div>
                                    <div
                                        className="absolute bottom-0 right-0 w-[46px] h-[45px] rounded-[4px] border-b-[5px] border-r-[5px] border-meedlWhite flex-shrink-0"></div>
                                </div>
                            </div>
                        )}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className={`object-cover ${isFaceDetected ? 'w-full h-full' : 'w-[419px] h-[279px]'}`}
                        />
                    </div>
                </main>
                <p className="text-black400 text-sm">
                    {modelLoadingError ? (
                        <span className="text-red-500">Error loading face detection: {modelLoadingError}</span>
                    ) : !isModelLoaded ? (
                        "Loading face detection models..."
                    ) : !hasFaceBeenDetected ? (
                        "Position your face within the frame"
                    ) : step === 'right' ? (
                        "Slowly turn your face to the right"
                    ) : step === 'left' ? (
                        "Slowly turn your face to the left"
                    ) : step === 'up' ? (
                        "Slowly turn your face up"
                    ) : (
                        "Slowly turn your face down"
                    )}
                </p>
            </div>
            <section className="bg-gray-50 rounded p-5 space-y-3">
                <h1 className="text-black500 text-[14px] leading-[21px] font-medium">Tips</h1>
                <div className="space-y-4">
                    <div className="flex gap-2 items-center">
                        <MdCheckCircleOutline className="h-3 w-3 text-green-600"/>
                        <p className="text-black400 text-sm">
                            Ensure your face is within the frame
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdCheckCircleOutline className="h-3 w-3 text-green-600"/>
                        <p className="text-black400 text-sm">Find a well lit environment</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MdOutlineCancel className="h-3 w-3 text-red-600"/>
                        <p className="text-black400 text-sm">Don&#39;t wear hats, glasses and masks</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CapturePhotoWithTips;