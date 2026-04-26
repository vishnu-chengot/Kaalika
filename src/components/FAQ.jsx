import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship our exclusive black sarees worldwide. Shipping times vary by location, typically ranging from 7-15 business days for international orders."
    },
    {
        question: "What fabrics are used in Kaalika sarees?",
        answer: "We use only premium materials: Pure Mulberry Silk, Organza, high-grade Georgette, and authentic Kerala Handloom Cotton. All borders feature genuine silver-plated zari."
    },
    {
        question: "How do I care for my Kaalika saree?",
        answer: "We recommend dry clean only for all our sarees to preserve the depth of the black color and the brilliance of the silver zari work. Store in a cool, dry place wrapped in muslin cloth."
    },
    {
        question: "Are the sarees pre-draped?",
        answer: "Our standard collection comes as unstitched sarees (6.5 meters including blouse piece). However, we do offer pre-draped stitching services upon special request."
    },
    {
        question: "Can I customize the silver work?",
        answer: "For our 'Bespoke' clients, we offer customization of motifs and border thickness. Please contact our creative team via WhatsApp for personalized consultations."
    }
];

const FAQItem = ({ faq, isOpen, toggle }) => {
    return (
        <div className="border-b border-white/5 last:border-0 overflow-hidden">
            <button
                className="w-full py-8 flex justify-between items-center text-left hover:text-accent-gold transition-colors duration-300"
                onClick={toggle}
            >
                <span className="text-sm md:text-lg font-serif tracking-wide text-white/90">{faq.question}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent-gold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <p className="pb-8 text-white/50 font-light leading-relaxed text-sm max-w-3xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-32 px-8 md:px-24 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Curiosity & <span className="italic text-accent-gold">Care</span></h2>
                    <p className="text-white/40 font-light uppercase tracking-widest text-[10px]">Frequently Asked Questions</p>
                </div>

                <div className="mt-8 border-t border-white/10">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .text-accent-gold {
          color: #d4a853;
        }
      `}} />
        </section>
    );
};

export default FAQ;
