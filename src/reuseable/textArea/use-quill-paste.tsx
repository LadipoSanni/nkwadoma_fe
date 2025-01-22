import { useEffect } from 'react';
import ReactQuill from 'react-quill-new';

export const UseQuillPaste = (quillRef: React.RefObject<ReactQuill>, onPaste: (e: ClipboardEvent) => void) => {
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const handlePaste = (e: ClipboardEvent) => {
        onPaste(e);
      };
      editor.root.addEventListener('paste', handlePaste);

      return () => {
        editor.root.removeEventListener('paste', handlePaste);
      };
    }
  }, [quillRef, onPaste]);
};
