
// components/RichTextEditor.tsx
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from  "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import Code from "@tiptap/extension-code"
import ImageRezise from "tiptap-extension-resize-image";
import ToolBar from '../display/ToolBar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading","paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes:{
          class: "list-decimal ml-3",
        },
      }),
       BulletList.configure({
        HTMLAttributes:{
          class: "list-decimal ml-3",
        },
      }),
      Highlight,
      Image,
      ImageRezise
    ],
    content: value,
    onUpdate: ({ editor }) => {
      console.log("the editor: ",editor.getHTML())
      const html = editor.getHTML();
      onChange(html);
    },

    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3"
      }
    }

  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="editor">
      <ToolBar />
      <EditorContent editor={editor} className="border p-4 rounded" />
    </div>
  );
};

export default RichTextEditor;
