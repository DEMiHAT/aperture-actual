'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const options = {
  type: [
    { label: 'Web Application', value: 1.2 },
    { label: 'Mobile App', value: 1.5 },
    { label: 'Enterprise Software', value: 2.0 },
    { label: 'AI Integration', value: 1.8 }
  ],
  platform: [
    { label: 'Single Platform', value: 1.0 },
    { label: 'Cross-Platform', value: 1.5 },
    { label: 'Cloud Infrastructure', value: 1.3 }
  ],
  timeline: [
    { label: 'Standard (3-6 Months)', value: 1.0 },
    { label: 'Accelerated (1-3 Months)', value: 1.5 },
    { label: 'Long-term (6+ Months)', value: 0.9 }
  ],
  teamSize: [
    { label: 'Small (2-3 Engineers)', value: 1.0 },
    { label: 'Medium (4-6 Engineers)', value: 1.8 },
    { label: 'Dedicated Squad (7+)', value: 2.5 }
  ]
};

const baseBudget = 25000;

export function Estimator() {
  const [selections, setSelections] = useState({
    type: options.type[0],
    platform: options.platform[0],
    timeline: options.timeline[0],
    teamSize: options.teamSize[0]
  });

  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const multiplier = 
      selections.type.value * 
      selections.platform.value * 
      selections.timeline.value * 
      selections.teamSize.value;
    
    const min = Math.round((baseBudget * multiplier) / 5000) * 5000;
    const max = Math.round((baseBudget * multiplier * 1.4) / 5000) * 5000;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBudgetRange({ min, max });
  }, [selections]);

  const handleSelect = (category, option) => {
    setSelections(prev => ({ ...prev, [category]: option }));
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-24 relative bg-white">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0066cc]/10 flex items-center justify-center mb-8 border border-[#0066cc]/20">
                <Calculator className="w-8 h-8 text-[#0066cc]" />
              </div>
              <h2 className="text-sm font-bold tracking-widest text-[#6e6e73] uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#6e6e73]" />
                Investment Planning
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#1d1d1f]">
                Project Budget Estimator.
              </h3>
              <p className="text-lg text-[#6e6e73] mb-8">
                Use our interactive enterprise calculator to get an estimated investment range for your next digital transformation project.
              </p>
              
              <div className="bg-[#f5f5f7] border border-black/5 p-6 rounded-2xl mt-8">
                <p className="text-sm text-[#6e6e73] italic">
                  * Note: This is a preliminary estimate based on standard industry metrics. Final quotes require a detailed discovery phase.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Calculator Interface */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#f5f5f7] border border-black/5 p-8 md:p-10 rounded-[3rem] shadow-sm"
            >
              <div className="space-y-8">
                
                {Object.entries(options).map(([category, opts]) => (
                  <div key={category}>
                    <h4 className="text-sm font-bold text-[#3a3a3c] uppercase tracking-wider mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {opts.map((opt) => {
                        const isSelected = selections[category].label === opt.label;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleSelect(category, opt)}
                            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                              isSelected
                                ? 'bg-[#0066cc] border-[#0066cc] text-white shadow-md'
                                : 'bg-white border-black/5 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/15 hover:shadow-sm'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4" />}
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

              </div>

              {/* Output Display */}
              <div className="mt-12 pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-[#86868b] block mb-2">Estimated Investment Range</span>
                  <div className="text-3xl md:text-4xl font-bold text-[#0066cc]">
                    {formatCurrency(budgetRange.min)} – {formatCurrency(budgetRange.max)}
                  </div>
                </div>
                
                <Button className="shrink-0 group">
                  Request Formal Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
