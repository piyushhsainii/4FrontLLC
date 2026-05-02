import React from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { InteractiveGridBg } from '@/components/interactive-grid-bg';
import { Services } from '@/components/services';
import { WhyChoose } from '@/components/why-choose';
import { Projects } from '@/components/projects';
import Testimonials from '@/components/testimonials';
import { InsuranceStepper } from '@/components/insurance-stepper';
import { Process } from '@/components/process';
import { CallToAction } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { MapFooter } from '@/components/map-footer';
import ProjectShowcase from '@/components/project-showcase';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <div className="relative overflow-hidden">
          <InteractiveGridBg />
          <div className="relative z-10">
            <Hero />
          </div>
        </div>

        <Services />
        <WhyChoose />
        <ProjectShowcase />
        <Process />
        <Testimonials />
        <CallToAction />
      </main>
      <MapFooter />
    </div>
  );
}