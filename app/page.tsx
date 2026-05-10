import React from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { WhyChoose } from '@/components/why-choose';
import Testimonials from '@/components/testimonials';
import { Process } from '@/components/process';
import { CallToAction } from '@/components/cta-section';
import { MapFooter } from '@/components/map-footer';
import ProjectShowcase from '@/components/project-showcase';
import Team from '@/components/team';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
        <section id="services"><Services /></section>
        <section id="our-team"><Team /></section>
        <WhyChoose />
        <section id="projects"><ProjectShowcase /></section>
        <section id="process"><Process /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><CallToAction /></section>
      </main>
      <MapFooter />
    </div>
  );
}