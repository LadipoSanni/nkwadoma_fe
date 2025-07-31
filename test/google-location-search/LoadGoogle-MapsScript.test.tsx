import '@testing-library/jest-dom';
import { loadGoogleMapsScript } from "@/lib/google-maps";


describe('loadGoogleMapsScript', () => {
    const apiKey = 'mock-api-key';

    beforeEach(() => {
        document.head.innerHTML = '';
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockReturnValue();
        jest.spyOn(console, 'warn').mockReturnValue();
        jest.spyOn(console, 'error').mockReturnValue();
      });

      it('adds the Google Maps script to the document if not present', async () => {
        const promise = loadGoogleMapsScript(apiKey);
      
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('load'));
      
        await expect(promise).resolves.toBeUndefined();
        expect(script).toBeInstanceOf(HTMLScriptElement);
        expect(script.src).toContain(apiKey);
      });

      it('appends Google Maps script if not already present', async () => {
        const promise = loadGoogleMapsScript(apiKey);
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('load'));
      
        await expect(promise).resolves.toBeUndefined();
        expect(script).toBeTruthy();
      });

      it('sets correct attributes on appended script', async () => {
        const promise = loadGoogleMapsScript(apiKey);
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('load'));
        await promise;
      
        expect(script.async).toBe(true);
        expect(script.defer).toBe(true);
      });

      it('injects API key into the script URL', async () => {
        const promise = loadGoogleMapsScript(apiKey);
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('load'));
        await promise;
      
        expect(script.src).toContain(apiKey);
      });

      it('resolves immediately if script already exists', async () => {
        const existingScript = document.createElement('script');
        existingScript.src = 'https://maps.googleapis.com/maps/api/js?key=abc&libraries=places';
        document.head.appendChild(existingScript);
      
        setTimeout(() => existingScript.dispatchEvent(new Event('load')), 0);
      
        await expect(loadGoogleMapsScript(apiKey)).resolves.toBeUndefined();
      });

      it('rejects if existing script fails to load', async () => {
        const existingScript = document.createElement('script');
        existingScript.src = 'https://maps.googleapis.com/maps/api/js?key=abc&libraries=places';
        document.head.appendChild(existingScript);
      
        setTimeout(() => existingScript.dispatchEvent(new Event('error')), 0);
      
        await expect(loadGoogleMapsScript(apiKey)).rejects.toThrow('Google Maps script failed to load.');
      });

      it('rejects on new script load failure', async () => {
        const promise = loadGoogleMapsScript(apiKey);
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('error'));
      
        await expect(promise).rejects.toThrow('Google Maps script failed to load.');
      });

      it('resolves all calls if multiple requests are made quickly', async () => {
        const promise1 = loadGoogleMapsScript('abc');
        const promise2 = loadGoogleMapsScript('abc');
      
        const script = document.querySelector('script[src*="maps.googleapis.com"]') as HTMLScriptElement;
        script.dispatchEvent(new Event('load'));
      
        await expect(promise1).resolves.toBeUndefined();
        await expect(promise2).resolves.toBeUndefined();
      });

      it('inserts the script into document.head', async () => {
        const promise = loadGoogleMapsScript('zzz');
        const script = document.querySelector('script[src*="maps.googleapis.com"]')!;
        script.dispatchEvent(new Event('load'));
      
        await promise;
        expect([...document.head.children]).toContain(script);
      });
      
     
      

      
})