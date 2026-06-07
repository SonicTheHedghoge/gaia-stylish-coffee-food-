/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Highlights } from './components/Highlights';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { ThreeIntro } from './components/ThreeIntro';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introFinished && (
          <ThreeIntro onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Highlights />
        <Gallery />
        <Location />
        <Footer />
        <FloatingContact />
      </main>
    </>
  );
}

