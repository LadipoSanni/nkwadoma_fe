import Webcam from "react-webcam";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";

interface CapturePhotoWithTipsProps {
    onCapture: (imageSrc: File) => void;
}

const CapturePhotoWithTips: React.FC<CapturePhotoWithTipsProps> = ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [, setImageSrc] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                // Convert the base64 string to a File
                const file = base64ToFile(imageSrc, "captured-image.jpg");

                setImageSrc(imageSrc);
                onCapture(file);
            }
        }
    }, [webcamRef, onCapture]);

    const base64ToFile = (base64String: string, fileName: string): File => {
        // Extract base64 data without the prefix (e.g., "data:image/jpeg;base64,")
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 2000);

        const timeout = setTimeout(() => {
            capture();
        }, 20000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [capture]);

    return (
        <main className={'grid gap-5'}>
            <div className={'grid place-items-center gap-5'}>
                <main className={'relative w-[300px] h-[300px]'}>
                    <svg width="300" height="301" viewBox="0 0 300 301" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M300 150.5C300 233.343 232.843 300.5 150 300.5C67.1573 300.5 0 233.343 0 150.5C0 67.6573 67.1573 0.5 150 0.5C232.843 0.5 300 67.6573 300 150.5ZM10.4561 150.5C10.4561 227.568 72.932 290.044 150 290.044C227.068 290.044 289.544 227.568 289.544 150.5C289.544 73.432 227.068 10.9561 150 10.9561C72.932 10.9561 10.4561 73.432 10.4561 150.5Z"
                            fill="#F0F2F4"
                        />
                        <circle
                            className="progress-circle"
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
                    <div className="absolute top-4 right-4 w-[270px] h-[270px] rounded-full overflow-hidden">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </main>
                <p className={'text-black400 text-[14px] font-normal leading-[150%]'}>Position your face within the frame</p>
            </div>
            <section className={'bg-grey105 rounded grid p-[12px_20px] gap-3'}>
                <h1 className={'text-#212221 text-[14px] font-medium leading-[150%]'}>Tips</h1>
                <div className={'grid gap-4'}>
                    <div className={'flex gap-2 items-center'}>
                        <MdCheckCircleOutline className={'text-green750 h-3 w-3'} />
                        <p className={'text-black400 text-[14px] font-normal leading-[150%]'}>Ensure your face is within the frame</p>
                    </div>
                    <div className={'flex gap-2 items-center'}>
                        <MdCheckCircleOutline className={'text-green750 h-3 w-3'} />
                        <p className={'text-black400 text-[14px] font-normal leading-[150%]'}>Find a well lit environment</p>
                    </div>
                    <div className={'flex gap-2 items-center'}>
                        <MdOutlineCancel className={'text-error1000 h-3 w-3'} />
                        <p className={'text-black400 text-[14px] font-normal leading-[150%]'}>Don’t wear hats, glasses and masks</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CapturePhotoWithTips;