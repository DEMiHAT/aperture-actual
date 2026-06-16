'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    position: 'CTO',
    company: 'Nexus Financial',
    rating: 5,
    text: 'Aperture transformed our legacy systems into a modern, cloud-native architecture. Their engineering precision and strategic approach are unmatched in the industry.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    position: 'VP of Product',
    company: 'HealthTech Innovations',
    rating: 5,
    text: 'The AI diagnostic platform they built for us exceeded all expectations. Their deep understanding of both machine learning and enterprise scalability is truly impressive.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 3,
    name: 'Emily Watson',
    position: 'Director of Operations',
    company: 'Global Logistics Corp',
    rating: 5,
    text: 'Working with Aperture felt like having an elite in-house engineering team. They delivered our enterprise resource platform ahead of schedule with flawless execution.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 relative overflow-hidden bg-[#f5f5f7]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[400px] bg-blue-50/50 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-[#0066cc] uppercase mb-4 justify-center flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#0066cc]" />
              Client Success
              <span className="w-8 h-[1px] bg-[#0066cc]" />
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#1d1d1f]">Trusted by Enterprise Leaders.</h3>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center text-[#6e6e73] hover:text-[#0066cc] hover:border-[#0066cc]/30 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20">
            <button onClick={next} className="w-12 h-12 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center text-[#6e6e73] hover:text-[#0066cc] hover:border-[#0066cc]/30 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-16 rounded-[3rem] border border-black/5 shadow-sm relative overflow-hidden">
            <Quote className="absolute top-8 right-8 w-32 h-32 text-black/5 rotate-180 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#ff9500] fill-[#ff9500]" />
                  ))}
                </div>
                
                <p className="text-2xl md:text-3xl leading-relaxed text-[#1d1d1f] mb-12 font-medium">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0066cc]/20"
                  />
                  <div className="text-left">
                    <h5 className="font-bold text-lg text-[#1d1d1f]">{testimonials[currentIndex].name}</h5>
                    <p className="text-[#6e6e73] text-sm">{testimonials[currentIndex].position}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-12 relative z-10">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-[#0066cc]' : 'w-2 bg-black/15 hover:bg-black/30'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
