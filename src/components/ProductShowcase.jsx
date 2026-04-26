import React, { useState } from 'react';
import { motion } from 'framer-motion';

const products = [
    {
        id: 1,
        name: "Classic Silk",
        subtitle: "Silver Zari Border",
        price: "₹18,500",
        image: "/images/products/saree-1.png"
    },
    {
        id: 2,
        name: "Embroidered Chiffon",
        subtitle: "Artisan Hand-work",
        price: "₹24,900",
        image: "/images/products/saree-2.png"
    },
    {
        id: 3,
        name: "Handloom Cotton",
        subtitle: "Temple Border Design",
        price: "₹12,200",
        image: "/images/products/saree-3.png"
    },
    {
        id: 4,
        name: "Glimmer Georgette",
        subtitle: "Sequined Brilliance",
        price: "₹21,000",
        image: "/images/products/saree-4.png"
    }
];

const ProductCard = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 2 : 0 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Quick View Overlay */}
                <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ backdropFilter: isHovered ? "blur(4px)" : "blur(0px)" }}
                >
                    <button className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-accent-gold hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        View Details
                    </button>
                </motion.div>
            </div>

            <div className="mt-8 text-center">
                <h3 className="text-xl font-serif text-white mb-2">{product.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">{product.subtitle}</p>
                <p className="text-accent-gold font-light tracking-widest">{product.price}</p>
            </div>

            <motion.button
                className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white border-b border-white/10 hover:border-white transition-all duration-300 pb-1"
                animate={{ opacity: isHovered ? 1 : 0 }}
            >
                Shop Now
            </motion.button>

            <style dangerouslySetInnerHTML={{
                __html: `
        .text-accent-gold {
          color: #d4a853;
        }
      `}} />
        </motion.div>
    );
};

const ProductShowcase = () => {
    return (
        <section id="collection" className="py-32 px-8 md:px-24 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Curated Black <span className="italic text-accent-gold">Excellence</span></h2>
                        <p className="text-white/50 font-light leading-relaxed">
                            Explore our exclusive collection of sarees where every thread tells a story of power and grace. Re-designed for the modern minimalist who values tradition.
                        </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[.8em] text-white/30 hidden md:block">Spring / Summer 2026</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-24">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <button className="px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.5em] font-light hover:bg-white hover:text-black hover:border-white transition-all duration-700">
                        View All Collection
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
