import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const frameCount = 200;

    const currentFrame = index => (
        `/images/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`
    );

    useEffect(() => {
        // Preload images
        const loadedImages = [];
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(0);
        };

        const renderFrame = (index) => {
            if (images[index]) {
                const img = images[index];
                context.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image keeping aspect ratio (cover)
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        // GSAP Scroll Animation for frames
        const obj = { frame: 0 };
        gsap.to(obj, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    renderFrame(Math.round(obj.frame));
                }
            }
        });

        // Hero Text Animation
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.5
            }
        );

        // Zoom/parallax effect on scroll
        gsap.to(canvas, {
            scale: 1.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: true,
            }
        });

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [isLoaded, images]);

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden bg-black h-screen">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

            {/* Hero Content */}
            <div className="relative z-20 h-full flex items-center px-8 md:px-24">
                <div ref={textRef} className="max-w-2xl">
                    <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-6 text-white">
                        Elegance in <br />
                        <span className="italic text-accent-gold">Every Flow</span>
                    </h1>
                    <p className="text-lg md:text-xl font-light tracking-widest uppercase text-white/70 mb-12">
                        Kāalika — Redefining Black Sarees
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <button className="px-10 py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-accent-gold hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(212,168,83,0.3)]">
                            Explore Collection
                        </button>
                        <button className="px-10 py-4 border border-white/30 text-white text-xs uppercase tracking-widest font-semibold hover:border-white transition-all duration-500">
                            Watch Story
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-50">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>

            {/* Lodaing Overlay */}
            {!isLoaded && (
                <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-serif text-white mb-2 animate-pulse">Kāalika</h2>
                        <div className="w-48 h-[1px] bg-white/20 mx-auto overflow-hidden">
                            <div className="h-full bg-accent-gold animate-loading-shimmer" />
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes loading-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-shimmer {
          animation: loading-shimmer 2s infinite linear;
        }
        .text-accent-gold {
          color: #d4a853;
        }
      `}} />
        </div>
    );
};

export default Hero;
