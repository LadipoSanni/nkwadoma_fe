import React, { useEffect } from 'react';
import '@smile_identity/smart-camera-web';

interface SmartCameraWrapperProps {
    onPublish: (data: { partner_params: { libraryVersion: string; permissionGranted: boolean }; images: { file: string; image_type_id: number; image: string }[] }) => void;
}

const SmartCameraWrapper: React.FC<SmartCameraWrapperProps> = ({ onPublish }) => {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const handlePublish = (e: Event) => {
                const customEvent = e as CustomEvent;
                onPublish(customEvent.detail);
            };

            const smartCamera = document.querySelector('smart-camera-web');
            smartCamera?.addEventListener('imagesComputed', handlePublish);

            return () => {
                smartCamera?.removeEventListener('imagesComputed', handlePublish);
            };
        }
    }, [onPublish]);

    return (
            <smart-camera-web capture-id></smart-camera-web>
    );
};

export default SmartCameraWrapper;