import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Statement from './components/Statement.jsx';
import Dishes from './components/Dishes.jsx';
import FullMenu from './components/FullMenu.jsx';
import Space from './components/Space.jsx';
import Reviews from './components/Reviews.jsx';
import Visit from './components/Visit.jsx';
import Faq from './components/Faq.jsx';
import CtaBand from './components/CtaBand.jsx';
import Footer from './components/Footer.jsx';
import StickyActionBar from './components/StickyActionBar.jsx';
import { useReveal } from './lib/useReveal.js';

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Dishes />
        <FullMenu />
        <Space />
        <Reviews />
        <Visit />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <StickyActionBar />
    </>
  );
}
