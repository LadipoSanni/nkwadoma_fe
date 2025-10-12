"use client";
import styles from './index.module.css'
import DOMPurify from "dompurify";

export default function QuillRenderer({ html,sx }: { html: string, sx?:string }) {
    // Clean + allow only safe tags
    const cleanHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["p", "ol", "ul", "li", "strong", "em", "u", "br", "span"],
        ALLOWED_ATTR: ["class"],
    });

    return <div className={`${styles.quillContent} ${sx}`} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
