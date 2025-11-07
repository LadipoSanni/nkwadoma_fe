import React from 'react';

interface SafeHTMLRendererProps {
    html: string;
    className?: string;
    maxHeight?: string;
    showScrollbar?: boolean;
    openLinksInNewTab?: boolean;
    underlineLinks?: boolean;
    linkClassName?: string;
}

const SafeHTMLRenderer: React.FC<SafeHTMLRendererProps> = ({ 
    html, 
    className = '',
    maxHeight = '',
    showScrollbar = false,
    openLinksInNewTab = true,
    underlineLinks = true,
    linkClassName = "text-blue-600 underline hover:text-blue-800"
}) => {
    const processedHtml = React.useMemo(() => {
        if (!html) return '';
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const links = doc.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href) {
                let processedHref = href;
                
                if (!href.startsWith('http://') && 
                    !href.startsWith('https://') && 
                    !href.startsWith('/') &&
                    !href.startsWith('mailto:') &&
                    !href.startsWith('tel:')) {
                    
                    if (href.includes('.') && !href.startsWith('www.')) {
                        processedHref = `https://${href}`;
                    } else if (href.startsWith('www.')) {
                        processedHref = `https://${href}`;
                    }
                }
                
                link.setAttribute('href', processedHref);
                
                if (openLinksInNewTab && processedHref.startsWith('http')) {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
                
                const existingStyle = link.getAttribute('style');
                const hasExistingUnderline = existingStyle?.includes('text-decoration') || 
                                           existingStyle?.includes('underline') ||
                                           link.classList.toString().includes('underline');
                
                if (underlineLinks && !hasExistingUnderline) {
                    link.classList.add('underline', 'decoration-solid', 'decoration-1', 'underline-offset-2');
                    
                    if (linkClassName) {
                        linkClassName.split(' ').forEach(cls => {
                            if (cls) link.classList.add(cls);
                        });
                    } else {
                        const hasExistingColor = existingStyle?.includes('color') || 
                                               link.classList.toString().match(/text-(?!gray|grey|black|white)/);
                        if (!hasExistingColor) {
                            link.classList.add('text-blue-600', 'hover:text-blue-800');
                        }
                    }
                }
            }
        });
        
        return doc.body.innerHTML;
    }, [html, openLinksInNewTab, underlineLinks, linkClassName]);

    const defaultClasses = 'text-sm font-normal text-grey400 break-words';
    const scrollbarClass = showScrollbar ? '' : 'scrollbar-width-none';
    const combinedClasses = `${defaultClasses} ${maxHeight} ${scrollbarClass} ${className}`.trim();

    return (
        <div className={combinedClasses}>
            <style>
            {`
                    /* Quill ordered list styles */
                    ol {
                        list-style-type: decimal !important;
                        padding-left: 1.5em !important;
                        margin: 0.5em 0 !important;
                    }
                    
                    li {
                        margin: 0.25em 0 !important;
                    }
                    
                    /* Quill checklist styles */
                    ul[data-checked=true],
                    ul[data-checked=false] {
                        list-style-type: none !important;
                        padding-left: 0 !important;
                    }
                    
                    li[data-checked=true]::before,
                    li[data-checked=false]::before {
                        content: "☐";
                        margin-right: 8px;
                        display: inline-block;
                    }
                    
                    li[data-checked=true]::before {
                        content: "☑";
                    }

                    /* Ensure proper spacing and styling for all Quill content */
                    .ql-editor ol, 
                    .ql-editor ul {
                        padding-left: 1.5em;
                    }
                    
                    .ql-editor ol {
                        list-style-type: decimal;
                    }
                    
                    .ql-editor ul {
                        list-style-type: disc;
                    }
                `}
            </style>
        <div 
            dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
        </div>
    );
};

export default SafeHTMLRenderer;