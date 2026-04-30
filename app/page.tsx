import React from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InteractiveGridBg } from '@/components/interactive-grid-bg';
import { Services } from '@/components/services';
import { WhyChoose } from '@/components/why-choose';
import { Projects } from '@/components/projects';
import { Testimonials } from '@/components/testimonials';
import { InsuranceStepper } from '@/components/insurance-stepper';
import { Process } from '@/components/process';
import { CallToAction } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <InteractiveGridBg />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        {/* <Projects /> */}
        {/* <Testimonials /> */}
        {/* <Process /> */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
