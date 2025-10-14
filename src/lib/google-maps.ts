export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== "undefined") {
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          existingScript.addEventListener("error", () => reject(new Error("Google Maps script failed to load.")));
          return;
        }

        if (typeof window === "undefined") return;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Google Maps script failed to load."));
        if (typeof window === "undefined") return;
        document.head.appendChild(script);
      }

    });
  };