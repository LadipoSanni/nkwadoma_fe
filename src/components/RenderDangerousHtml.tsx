"use client";

import DOMPurify from "dompurify";

export default function QuillRenderer({ html }: { html: string }) {
    // Clean + allow only safe tags
    const cleanHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["p", "ol", "ul", "li", "strong", "em", "u", "br", "span"],
        ALLOWED_ATTR: ["class"], // keep classes like Quill’s
    });

    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
