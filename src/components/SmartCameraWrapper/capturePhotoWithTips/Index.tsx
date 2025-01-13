import React, { useRef, useState, useCallback, useEffect } from "react";
import * as faceapi from 'face-api.js';

interface CapturePhotoWithTipsProps {
    onCapture: (imageSrc: File) => void;
}

const CapturePhotoWithTips: React.FC<CapturePhotoWithTipsProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [orientation, setOrientation] = useState<string | null>(null);
    const [movement, setMovement] = useState<string | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            setIsModelLoaded(true);
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
        // const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.3 })).withFaceLandmarks();

        if (detection) {
            const landmarks = detection.landmarks;
            const nose = landmarks.getNose();
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();

            const noseX = nose[3].x;
            const leftEyeX = leftEye[0].x;
            const rightEyeX = rightEye[3].x;

            console.log(`Nose X: ${noseX}, Left Eye X: ${leftEyeX}, Right Eye X: ${rightEyeX}`);

            let newOrientation: string | null = "center";
            if (noseX > rightEyeX) {
                newOrientation = "left";
            } else if (noseX < leftEyeX) {
                newOrientation = "right";
            }

            if (newOrientation !== orientation) {
                setOrientation(newOrientation);
                setMovement(`Moved from ${orientation} to ${newOrientation}`);
            }
        }
    }, [isModelLoaded, orientation]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        if (isModelLoaded) {
            intervalId = setInterval(detectFaceOrientation, 200);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [detectFaceOrientation, isModelLoaded]);

    return (
        <div>
            <video ref={videoRef} autoPlay muted width="720" height="560" style={{ transform: 'scaleX(-1)' }} />
            <p>Face Orientation: {orientation}</p>
            <p>Face Movement: {movement}</p>
        </div>
    );
};

export default CapturePhotoWithTips;