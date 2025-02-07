declare global {
    namespace JSX {
        interface IntrinsicElements {
            'smart-camera-web': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'capture-id'?: boolean };
            'selfie-capture-screens': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export {};