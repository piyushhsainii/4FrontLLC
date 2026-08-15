'use client'
import React from 'react'
import { motion, Variants } from "motion/react"
import Image from 'next/image';
const Team = () => {

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };


    return (
        <section className="py-12 md:py-16 bg-white border-y border-edge ">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-8 md:mb-12 flex items-center pl-4 border-l-2 border-green-main relative"
                >

                    <h2 className="text-2xl md:text-3xl font-medium text-main tracking-tight">Our Executive Team</h2>
                </motion.div>

                <div className="space-y-12 md:space-y-16">
                    {/* Team Member 1: Christopher Michael */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-4 relative group">
                            <div className="aspect-[4/5] max-h-72 relative rounded-2xl overflow-hidden shadow-premium bg-surface">
                                <Image
                                    src="/chris-avatar.png"
                                    alt="Christopher Michael - Co-CEO & COO"
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="lg:col-span-8 flex flex-col justify-center">
                            <div className="mb-2 text-xs font-semibold tracking-widest uppercase text-green-main">
                                Co-Chief Executive Officer & Chief Operating Officer
                            </div>
                            <h3 className="text-xl md:text-2xl font-medium text-navy mb-3 tracking-tight">
                                Christopher Michael
                            </h3>

                            <div className="prose prose-sm prose-p:text-muted prose-p:leading-snug max-w-none mb-4">
                                <p className="mb-2">
                                    Christopher serves as Co-Chief Executive Officer and Chief Operating Officer of 4Front, bringing 12 years of hands-on experience in residential real estate remodeling and renovation. He is responsible for ensuring each project is completed to a high standard, with a strong focus on quality, safety, and code compliance.
                                </p>
                                <p className="mb-2">
                                    His background in real estate investing gives him a practical understanding of how smart renovations can improve both property value and long-term functionality.
                                </p>
                                <p className="mb-2">
                                    Christopher specializes in managing residential remodels, renovations, and construction projects from planning through completion. At 4Front, he helps make sure every job is executed professionally, efficiently, and with attention to detail.
                                </p>
                                <p>
                                    In his free time, Christopher enjoys fishing, real estate investing, and spending time with his family.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-edge">
                                <h4 className="text-[11px] font-semibold tracking-widest uppercase text-main mb-3">Areas of Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Construction Operations', 'Renovation Management', 'Real Estate Investing', 'Project Oversight', 'Quality Control'].map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 bg-surface text-navy-light text-xs font-medium rounded-md border border-edge/60 transition-colors hover:border-edge shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Team Member 2: Jake Winans */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center "
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-4 lg:order-2 relative group">
                            <div className="aspect-[4/5] max-h-72 ml-36 relative rounded-2xl overflow-hidden shadow-premium bg-surface">
                                <Image
                                    src="/jake-avatar.png"
                                    alt="Jake Winans - Co-CEO & CFO"
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="lg:col-span-8 lg:order-1 flex flex-col justify-center">
                            <div className="mb-2 text-xs font-semibold tracking-widest uppercase text-green-main">
                                Co-Chief Executive Officer & Chief Financial Officer
                            </div>
                            <h3 className="text-xl md:text-2xl font-medium text-navy mb-3 tracking-tight">
                                Jake Winans
                            </h3>

                            <div className="prose prose-sm prose-p:text-muted prose-p:leading-snug max-w-none mb-4">
                                <p className="mb-2">
                                    Jake Winans serves as Co-Chief Executive Officer and Chief Financial Officer of 4Front, bringing a strong background in finance, strategy, operations, and business development.
                                </p>
                                <p className="mb-2">
                                    He previously worked as an Investment Banker at Royal Bank of Canada, a Strategy Consultant at Deloitte Consulting, and in M&A and Strategy at The Walt Disney Company.
                                </p>
                                <p className="mb-2">
                                    Jake graduated with the highest distinction and double honors from the Indiana University Kelley School of Business with a degree in finance and holds an MBA from Rice University with a concentration in small business operations. Jake is also the founder of Aventira Admissions Consulting, where he has helped over 200+ students gain admission into highly selective colleges across the United States and Europe.
                                </p>
                                <p className="mb-2">
                                    At 4Front, he focuses on financial oversight, strategic planning, client relationships, operational discipline, and long-term value creation. His background allows him to bring a business-owner mindset to construction and renovation projects, helping clients make decisions that support both immediate project goals and long-term property value.
                                </p>
                                <p>
                                    In his spare time, Jake enjoys traveling, investing, and working on his comic book series, <em>The Essential Ultra Guy</em>.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-edge">
                                <h4 className="text-[11px] font-semibold tracking-widest uppercase text-main mb-3">Areas of Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Financial Strategy', 'Operations', 'M&A', 'Business Development', 'Client Relations'].map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 bg-surface text-navy-light text-xs font-medium rounded-md border border-edge/60 transition-colors hover:border-edge shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Team