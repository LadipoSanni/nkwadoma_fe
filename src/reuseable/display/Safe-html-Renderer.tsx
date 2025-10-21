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
        <div 
            className={combinedClasses}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
    );
};

export default SafeHTMLRenderer;