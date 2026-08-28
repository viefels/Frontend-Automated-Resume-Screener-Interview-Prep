import { useState, useEffect, memo } from "react";

function SmoothImage({ src, alt, placeholderSrc, className = "", wrapperClassName = "", ...props }) {

    const [activeSrc, setActiveSrc] = useState(placeholderSrc || null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        setIsLoaded(false);

        // Kick off the download right after paint
        const frameId = requestAnimationFrame(() => {
            const img = new Image();
            img.src = src;
            img.decoding = "async";

            
            img.decode()
                .catch((err) => {
                    console.warn("Image decode fallback triggered:", err);
                })

                .finally(() => {

                    if (!isCancelled) {
                        setActiveSrc(src);
                        setIsLoaded(true);
                    }
                });
        });

        return () => {
            isCancelled = true;
            cancelAnimationFrame(frameId);
        };
    }, [src]);

    return (
        <div className={`relative overflow-hidden bg-slate-200 dark:bg-slate-800 ${wrapperClassName}`}>

            {/* skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-700" />
            )}

            {activeSrc && (
                <img
                    src={activeSrc}
                    alt={alt}
                    fetchPriority="low"
                    decoding="async"
                    className={`w-full h-full transition-all duration-500 ease-out ${
                        isLoaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-105"
                    } ${className}`}
                    {...props}
                />
            )}
        </div>
    );
}

export default memo(SmoothImage);