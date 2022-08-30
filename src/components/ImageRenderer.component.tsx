import React, {useCallback, useEffect, useRef, useState} from "react";


interface ImageRendererProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholderImg?: string;
    errorImg?: string;
}

export function ImageRenderer({ placeholderImg, errorImg, src, ...props }: ImageRendererProps) {
    const [imgSrc, setImgSrc] = useState(placeholderImg);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let observer
        let didCancel = false

        if (imageRef && imgSrc === placeholderImg) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            // when image is visible in the viewport + rootMargin
                            if (
                                !didCancel &&
                                (entry.intersectionRatio > 0 || entry.isIntersecting)
                            ) {
                                setImgSrc(src)
                            }
                        })
                    },
                    {
                        threshold: 0.01,
                        rootMargin: '75%',
                    }
                )
                if(imageRef && imageRef.current) observer.observe(imageRef.current)
            } else {
                // Old browsers fallback
                setImgSrc(src)
            }
        }
    }, [])

    return <div ref={imageRef}><img {...props} src={imgSrc} /></div>;
}