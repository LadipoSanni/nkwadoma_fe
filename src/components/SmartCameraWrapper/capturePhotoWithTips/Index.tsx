import React, { useRef, useState, useEffect } from "react";
import { inter, inter500 } from '@/app/fonts';
import * as faceapi from 'face-api.js';
import Isloading from "@/reuseable/display/Isloading";
import { MdThumbUpOffAlt, MdCheckCircle } from "react-icons/md";

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
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isPreview, setIsPreview] = useState(false);

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
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
                setModelLoadingError("Could not access camera");
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const captureImage = (video: HTMLVideoElement) => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageSrc = canvas.toDataURL('image/png');
            setCapturedImage(imageSrc);
        }
    };

    useEffect(() => {
        const detectFaceOrientation = async () => {
            if (!videoRef.current || !isModelLoaded) return;
        
            const video = videoRef.current;
            const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ 
                inputSize: 320, 
                scoreThreshold: 0.2 
            })).withFaceLandmarks();
        
            if (detection) {
                setIsFaceDetected(true);
                if (!hasFaceBeenDetected) {
                    const landmarks = detection.landmarks;
                    const mouth = landmarks.getMouth();
                    const nose = landmarks.getNose();
                    const leftEye = landmarks.getLeftEye();
                    const rightEye = landmarks.getRightEye();
                    if (mouth && nose && leftEye && rightEye) {
                        setHasFaceBeenDetected(true);
                    }
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
        
                
                if (step !== "center") {
                    if (noseX > rightEyeX) {
                        newOrientation = "left";
                    } else if (noseX < leftEyeX) {
                        newOrientation = "right";
                    } else if (noseY < leftEyeY && noseY < rightEyeY) {
                        newOrientation = "up";
                    } else if (noseY > leftEyeY && noseY > rightEyeY) {
                        newOrientation = "down";
                    }
                }
        
                if (newOrientation !== orientation) {
                    setOrientation(newOrientation);
                    if (newOrientation === step) {
                        if (step === "right") {
                            setStep("left");
                        } else if (step === "left") {
                            setStep("up");
                        } else if (step === "up") {
                            setStep("down");
                        } else if (step === "down") {
                            setStep("center");
                        } else if (step === "center") {
                            setTimeout(() => {
                                if (videoRef.current) { 
                                    captureImage(video);
                                    setStep("preview");
                                    setIsPreview(true);
                                }
                            }, 1000); 
                        }
                    }
                }
            } else {
                if (!hasFaceBeenDetected) {
                    setIsFaceDetected(false);
                }
            }
        };

        // const detectFaceOrientation = async () => {
        //     if (!videoRef.current || !isModelLoaded) return;

        //     const video = videoRef.current;
        //     const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.2 })).withFaceLandmarks();

        //     if (detection) {
        //         setIsFaceDetected(true);
        //         if (!hasFaceBeenDetected) {
        //             const landmarks = detection.landmarks;
        //             const mouth = landmarks.getMouth()
        //             const nose = landmarks.getNose();
        //             const leftEye = landmarks.getLeftEye();
        //             const rightEye = landmarks.getRightEye();
        //             if (mouth && nose && leftEye && rightEye) {
        //                 setHasFaceBeenDetected(true);
        //             }
        //         }
        //         const landmarks = detection.landmarks;
        //         const nose = landmarks.getNose();
        //         const leftEye = landmarks.getLeftEye();
        //         // const mouth = landmarks.getMouth()
        //         const rightEye = landmarks.getRightEye();

        //         const noseX = nose[3].x;
        //         const noseY = nose[3].y;
        //         const leftEyeX = leftEye[0].x;
        //         const leftEyeY = leftEye[0].y;
        //         const rightEyeX = rightEye[3].x;
        //         const rightEyeY = rightEye[3].y;

        //         let newOrientation: string | null = "center";
        //         if (noseX > rightEyeX) {
        //             newOrientation = "left";
        //         } else if (noseX < leftEyeX) {
        //             newOrientation = "right";
        //         } else if (noseY < leftEyeY && noseY < rightEyeY) {
        //             newOrientation = "up";
        //         } else if (noseY > leftEyeY && noseY > rightEyeY) {
        //             newOrientation = "down";
        //         } else if (detection) {
        //             newOrientation = "center";
        //         }

        //         if (newOrientation !== orientation) {
        //             setOrientation(newOrientation);
        //             if (newOrientation === step) {
        //                 if (step === "right") {
        //                     setStep("left");
        //                 } else if (step === "left") {
        //                     setStep("up");
        //                 } else if (step === "up") {
        //                     setStep("down");
        //                 } else if (step === "down") {
        //                     setStep("center");
        //                 } else if (step === "center") {
        //                     captureImage(video);
        //                     setStep("preview");
        //                     setIsPreview(true);
        //                 }
        //             }
        //         }
        //     } else {
        //         if (!hasFaceBeenDetected) {
        //             setIsFaceDetected(false);
        //         }
        //     }
        // };


        let intervalId: NodeJS.Timeout | null = null;
        if (isModelLoaded && !isPreview) {
            intervalId = setInterval(detectFaceOrientation, 200);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isModelLoaded, orientation, hasFaceBeenDetected, step, isPreview]);

    const handleProceed = () => {
        setStep("complete");
        if (capturedImage) {
            // Convert base64 to file
            fetch(capturedImage)
                .then(res => res.blob())
                .then(blob => {
                    onCapture(new File([blob], "capture.png", { type: "image/png" }));
                });
        }
    };

    const handleRetake = () => {
        setIsPreview(false);
        setCapturedImage(null);
        setStep("right");

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error restarting camera:", error);
                setModelLoadingError("Could not restart camera");
            }
        };

        startCamera();
    };

    const frameClassName = isFaceDetected
        ? "absolute top-4 right-4 w-[270px] h-[270px] rounded-full overflow-hidden"
        : "absolute w-[419px] h-[279px] overflow-hidden ";

    const getStrokeDashoffset = () => {
        const totalLength = 904.32;
        return step === 'center' ? totalLength * 12 : totalLength * 0.75;
    };

    const getRotationAngle = (step: string) => {
        switch (step) {
            case 'right':
                return -40;
            case 'left':
                return 140;
            case 'up':
                return -140;
            case 'down':
                return 40;
            case 'center':
                return 90;
            default:
                return null;
        }
    };

    return (
        <div className={`grid gap-5 ${inter.className}`}>
            <div className="grid place-items-center gap-5">
                <div
                    className={` ${isFaceDetected || hasFaceBeenDetected ? 'relative w-[300px] h-[300px]' : ' w-[419px] h-[279px] '}`}>
                    {(isFaceDetected || hasFaceBeenDetected) && step !== "preview" &&  step !== "complete" &&(
                        <svg viewBox="0 0 300 301"
                             className="absolute top-0 left-0 w-full h-full transition-opacity duration-500">
                            <path
                                d="M300 150.5C300 233.343 232.843 300.5 150 300.5C67.1573 300.5 0 233.343 0 150.5C0 67.6573 67.1573 0.5 150 0.5C232.843 0.5 300 67.6573 300 150.5ZM10.4561 150.5C10.4561 227.568 72.932 290.044 150 290.044C227.068 290.044 289.544 227.568 289.544 150.5C289.544 73.432 227.068 10.9561 150 10.9561C72.932 10.9561 10.4561 73.432 10.4561 150.5Z"
                                className="fill-greyBase200"
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
                                strokeDashoffset={getStrokeDashoffset()}
                                style={{ transform: `rotate(${getRotationAngle(step)}deg)`, transformOrigin: 'center' }}
                            />
                        </svg>
                    )}

                    {isPreview && capturedImage ? (
                        <div className="absolute top-0 right-[-60px] rounded-md w-[419px] h-[279px] overflow-hidden">
                            <img
                                src={capturedImage}
                                alt="Captured selfie"
                                className="w-full h-full object-cover"
                                style={{transform: 'scaleX(-1)'}}
                            />
                        </div>
                    ) : (
                        <div className={frameClassName} style={{transform: 'scaleX(-1)'}}>
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
                                className={`object-cover ${(isFaceDetected || hasFaceBeenDetected) ? 'w-full h-full' : 'w-[419px] h-[279px]'}`}
                            />
                        </div>
                    )}
                </div>

                <div className={`${inter500.className} text-black400 text-[16px] leading-[150%] `}>
                    {modelLoadingError ? (
                        <span className="text-red-500">Error loading face detection: {modelLoadingError}</span>
                    ) : !isModelLoaded ? (
                        "Loading face detection models..."
                    ) : !hasFaceBeenDetected ? (
                        "Position your face within the frame"
                    ) : step === 'right' ? (
                        <p>Slowly turn your face to the <span className={`font-semibold italic text-meedlBlue`}>right</span></p>
                    ) : step === 'left' ? (
                        <p>Slowly turn your face to the <span className={`font-semibold italic text-meedlBlue`}>left</span></p>
                    ) : step === 'up' ? (
                        <p>Slowly turn your face <span className={`font-semibold italic text-meedlBlue`}>up</span></p>
                    ) : step === 'down' ? (
                        <p>Slowly turn your face <span className={`font-semibold italic text-meedlBlue`}>down</span></p>
                    ) : step === 'center' ? (
                        "Capturing selfie, please smile"
                    ) : step === 'preview' ? (
                        <span className={'flex gap-2'}><MdCheckCircle className={'h-6 w-6 text-green500'}/> Selfie captured successfully</span>
                    ) : (
                        <span>Face capture complete <Isloading /></span>
                    )}
                </div>
            </div>

            <>
                {step === 'preview' ? (
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={handleRetake}
                            className="py-5 px-4 bg-white border border-meedlBlue  rounded-md text-meedlBlue text-sm"
                        >
                            Retake selfie
                        </button>
                        <button
                            onClick={handleProceed}
                            className="py-2 px-4 bg-meedlBlue rounded-md text-white text-sm"
                        >
                            Proceed with this selfie
                        </button>
                    </div>
                ) : (
                    <section className=" bg-yellow150 border-[0.5px] border-yellow850 rounded py-3 px-5 grid gap-4">
                        <h1 className="text-black500 text-[14px] leading-[21px] font-medium">Tips</h1>
                        <div className="grid gap-4">
                            <div className="flex gap-2 items-center">
                                <MdThumbUpOffAlt className="h-4 w-4 text-yellow850"/>
                                <p className="text-black500 text-sm">
                                    Ensure your face is within the frame
                                </p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MdThumbUpOffAlt className="h-4 w-4 text-yellow850"/>
                                <p className="text-black500 text-sm">Find a well lit environment</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <MdThumbUpOffAlt className="h-4 w-4 text-yellow850"/>
                                <p className="text-black500 text-sm">Don&#39;t wear hats, glasses and masks</p>
                            </div>
                        </div>
                    </section>
                )}
            </>
        </div>
    );
};

export default CapturePhotoWithTips;