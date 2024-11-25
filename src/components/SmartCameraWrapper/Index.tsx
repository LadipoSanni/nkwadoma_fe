import React, { useEffect } from 'react';
import '@smile_identity/smart-camera-web';

interface SmartCameraWrapperProps {
    onPublish: (data: { partner_params: { libraryVersion: string; permissionGranted: boolean }; images: { file: string; image_type_id: number; image: string }[] }) => void;
    onClose: () => void;
}

const SmartCameraWrapper: React.FC<SmartCameraWrapperProps> = ({ onPublish, onClose }) => {
    useEffect(() => {
        const handlePublish = (e: Event) => {
            const customEvent = e as CustomEvent;
            onPublish(customEvent.detail);
        };

        const smartCamera = document.querySelector('smart-camera-web');
        smartCamera?.addEventListener('imagesComputed', handlePublish);

        return () => {
            smartCamera?.removeEventListener('imagesComputed', handlePublish);
        };
    }, [onPublish]);

    return (
        <div>
            <smart-camera-web capture-id></smart-camera-web>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default SmartCameraWrapper;