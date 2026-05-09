'use client'
import React from 'react'
import { motion, Variants } from "motion/react"
import Image from 'next/image';
import Link from 'next/link';


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


const page = () => {
    return (
        <section className="py-24 md:py-32 bg-white border-y border-edge ">

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="mb-20 md:mb-32 flex items-center pl-4 border-l-2 border-green-main relative"
                >

                    <div className='absolute left-[-130px]'>
                        <Link href="/" className="">
                            <img src="/LLC_LOGO.png" className="h-18 w-auto" alt="" />
                        </Link>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-medium text-main tracking-tight">Our Executive Team</h2>
                </motion.div>

                <div className="space-y-32 md:space-y-48">
                    {/* Team Member 1: Christopher Michael */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-5 relative group">
                            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-premium bg-surface">
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

                        <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col justify-center">
                            <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-green-main">
                                Co-Chief Executive Officer & Chief Operating Officer
                            </div>
                            <h3 className="text-3xl md:text-5xl font-medium text-navy mb-8 tracking-tight">
                                Christopher Michael
                            </h3>

                            <div className="prose prose-lg prose-p:text-muted prose-p:leading-relaxed max-w-none mb-12">
                                <p className="mb-6">
                                    Christopher serves as Co-Chief Executive Officer and Chief Operating Officer of 4Front, bringing 12 years of hands-on experience in residential real estate remodeling and renovation. He is responsible for ensuring each project is completed to a high standard, with a strong focus on quality, safety, and code compliance.
                                </p>
                                <p className="mb-6">
                                    His background in real estate investing gives him a practical understanding of how smart renovations can improve both property value and long-term functionality.
                                </p>
                                <p className="mb-6">
                                    Christopher specializes in managing residential remodels, renovations, and construction projects from planning through completion. At 4Front, he helps make sure every job is executed professionally, efficiently, and with attention to detail.
                                </p>
                                <p>
                                    In his free time, Christopher enjoys fishing, real estate investing, and spending time with his family.
                                </p>
                            </div>

                            <div className="pt-8 border-t border-edge">
                                <h4 className="text-xs font-semibold tracking-widest uppercase text-main mb-6">Areas of Expertise</h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Construction Operations', 'Renovation Management', 'Real Estate Investing', 'Project Oversight', 'Quality Control'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-surface text-navy-light text-sm font-medium rounded-md border border-edge/60 transition-colors hover:border-edge shadow-sm">
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
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-5 lg:order-2 relative group">
                            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-premium bg-surface">
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

                        <motion.div variants={fadeInUp} className="lg:col-span-7 lg:order-1 flex flex-col justify-center">
                            <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-green-main">
                                Co-Chief Executive Officer & Chief Financial Officer
                            </div>
                            <h3 className="text-3xl md:text-5xl font-medium text-navy mb-8 tracking-tight">
                                Jake Winans
                            </h3>

                            <div className="prose prose-lg prose-p:text-muted prose-p:leading-relaxed max-w-none mb-12">
                                <p className="mb-6">
                                    Jake Winans serves as Co-Chief Executive Officer and Chief Financial Officer of 4Front, bringing a strong background in finance, strategy, operations, and business development.
                                </p>
                                <p className="mb-6">
                                    He previously worked as an Investment Banker at Royal Bank of Canada, a Strategy Consultant at Deloitte Consulting, and in M&A and Strategy at The Walt Disney Company.
                                </p>
                                <p className="mb-6">
                                    Jake graduated with the highest distinction and double honors from the Indiana University Kelley School of Business with a degree in finance and holds an MBA from Rice University with a concentration in small business operations. Jake is also the founder of Aventira Admissions Consulting, where he has helped over 200+ students gain admission into highly selective colleges across the United States and Europe.
                                </p>
                                <p className="mb-6">
                                    At 4Front, he focuses on financial oversight, strategic planning, client relationships, operational discipline, and long-term value creation. His background allows him to bring a business-owner mindset to construction and renovation projects, helping clients make decisions that support both immediate project goals and long-term property value.
                                </p>
                                <p>
                                    In his spare time, Jake enjoys traveling, investing, and working on his comic book series, <em>The Essential Ultra Guy</em>.
                                </p>
                            </div>

                            <div className="pt-8 border-t border-edge">
                                <h4 className="text-xs font-semibold tracking-widest uppercase text-main mb-6">Areas of Expertise</h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Financial Strategy', 'Operations', 'M&A', 'Business Development', 'Client Relations'].map((tag) => (
                                        <span key={tag} className="px-4 py-2 bg-surface text-navy-light text-sm font-medium rounded-md border border-edge/60 transition-colors hover:border-edge shadow-sm">
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

export default page