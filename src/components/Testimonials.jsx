import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Anjali Menon",
        role: "Fashion Designer",
        text: "The quality of the silk and the depth of the black color is something I've never seen before. Truly premium.",
        stars: 5
    },
    {
        name: "Revathi Nair",
        role: "Traditional Dancer",
        text: "It drapes like a dream. Perfectly captures the essence of Kerala tradition with a modern bold twist.",
        stars: 5
    },
    {
        name: "Priya Lakshmi",
        role: "Creative Director",
        text: "Kaalika has redefined what a black saree stands for. It's my go-to for every high-profile event.",
        stars: 5
    },
    {
        name: "Sonia Joseph",
        role: "Stylist",
        text: "Minimalist, powerful, and absolutely stunning. The silver border is the perfect touch of luxury.",
        stars: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-black overflow-hidden border-t border-white/5">
            <div className="px-8 md:px-24 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Voices of <span className="italic text-accent-gold">Elegance</span></h2>
                <p className="text-white/40 font-light uppercase tracking-widest text-[10px]">What our clients say</p>
            </div>

            <div className="flex relative items-center">
                {/* Infinite Scroll Container */}
                <div className="flex animate-infinite-scroll whitespace-nowrap">
                    {[...testimonials, ...testimonials].map((t, index) => (
                        <div
                            key={index}
                            className="inline-block w-[350px] md:w-[450px] mx-4 md:mx-8 bg-[#111] p-10 border border-white/5 hover:border-accent-gold/30 transition-colors duration-500 group"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.stars)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#d4a853" className="opacity-80"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                ))}
                            </div>
                            <p className="text-white/80 font-light italic mb-8 leading-relaxed whitespace-normal text-sm md:text-base">
                                "{t.text}"
                            </p>
                            <div>
                                <h4 className="text-white font-serif tracking-widest uppercase text-xs">{t.name}</h4>
                                <p className="text-[10px] text-accent-gold uppercase tracking-[0.3em] font-light mt-1">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
        .text-accent-gold {
          color: #d4a853;
        }
      `}} />
        </section>
    );
};

export default Testimonials;
