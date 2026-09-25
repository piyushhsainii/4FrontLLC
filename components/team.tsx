'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const members = [
  {
    name: 'Christopher Michael',
    position: 'Co-Chief Executive Officer & Chief Operating Officer',
    image: '/chris-avatar.png',
    bio: [
      'Christopher serves as Co-Chief Executive Officer and Chief Operating Officer of 4Front, bringing 12 years of hands-on experience in residential real estate remodeling and renovation. He is responsible for ensuring each project is completed to a high standard, with a strong focus on quality, safety, and code compliance.',
      'His background in real estate investing gives him a practical understanding of how smart renovations can improve both property value and long-term functionality.',
      'Christopher specializes in managing residential remodels, renovations, and construction projects from planning through completion. At 4Front, he helps make sure every job is executed professionally, efficiently, and with attention to detail.',
      'In his free time, Christopher enjoys fishing, real estate investing, and spending time with his family.',
    ],
    expertise: ['Construction Operations', 'Renovation Management', 'Real Estate Investing', 'Project Oversight', 'Quality Control'],
  },
  {
    name: 'Jake Winans',
    position: 'Co-Chief Executive Officer & Chief Financial Officer',
    image: '/jake-avatar.png',
    bio: [
      'Jake Winans serves as Co-Chief Executive Officer and Chief Financial Officer of 4Front, bringing a strong background in finance, strategy, operations, and business development.',
      'He previously worked as an Investment Banker at Royal Bank of Canada, a Strategy Consultant at Deloitte Consulting, and in M&A and Strategy at The Walt Disney Company.',
      'Jake graduated with the highest distinction and double honors from the Indiana University Kelley School of Business with a degree in finance and holds an MBA from Rice University with a concentration in small business operations. Jake is also the founder of Aventira Admissions Consulting, where he has helped over 200+ students gain admission into highly selective colleges across the United States and Europe.',
      'At 4Front, he focuses on financial oversight, strategic planning, client relationships, operational discipline, and long-term value creation. His background allows him to bring a business-owner mindset to construction and renovation projects, helping clients make decisions that support both immediate project goals and long-term property value.',
      'In his spare time, Jake enjoys traveling, investing, and working on his comic book series, The Essential Ultra Guy.',
    ],
    expertise: ['Financial Strategy', 'Operations', 'M&A', 'Business Development', 'Client Relations'],
  },
];

function ProfileCard({ member, index }: { member: (typeof members)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailId = `team-details-${index}`;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0 rounded-[2rem] border border-border bg-white p-4 shadow-[0_16px_48px_rgba(15,28,63,0.08)] sm:p-5"
    >
      <div className="grid gap-5 md:grid-cols-[minmax(220px,32%)_minmax(0,1fr)] md:gap-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-secondary md:aspect-[4/5]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 32vw, 100vw"
            className="object-cover object-[center_30%] grayscale"
          />
        </div>

        <div className="min-w-0 px-2 pb-2 md:flex md:flex-col md:justify-center md:px-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{member.name}</h3>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{member.position}</p>
            </div>
            <button
              type="button"
              aria-label={`${expanded ? 'Hide' : 'Read'} details about ${member.name}`}
              aria-expanded={expanded}
              aria-controls={detailId}
              onClick={() => setExpanded((value) => !value)}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-[background,transform] duration-300 ease-out hover:bg-secondary active:scale-95"
            >
              <svg className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className={`mt-5 max-w-prose text-sm leading-relaxed text-muted-foreground ${expanded ? '' : 'line-clamp-3'}`}>
            {member.bio[0]}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={detailId}
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
                  {member.bio.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <div className="pt-4">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((item) => <span key={item} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-primary">{item}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <section className={`${fullPage ? 'py-24 md:py-32' : 'py-16 md:py-24'} border-y border-border bg-background`}>
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-3xl font-medium tracking-tight text-foreground md:mb-14 md:text-4xl">Our Executive Team</h2>
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
          {members.map((member, index) => <ProfileCard key={member.name} member={member} index={index} />)}
        </div>
      </div>
    </section>
  );
}
