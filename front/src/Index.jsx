import React, { useRef, useEffect } from 'react';
import { Nav, Footer, Contact, VisionSection } from './components';
import song from "./assets/song.mpeg";
import './index.css';

// Import extracted sections
import Banner from './components/page/Index/Banner';
import CountdownSection from './components/page/Index/CountdownSection';
import ApostleSection from './components/page/Index/ApostleSection';
import TestimonialSection from './components/page/Index/TestimonialSection';
import FirstStepsSection from './components/page/Index/FirstStepsSection';
import DonationSection from './components/page/Index/DonationSection';
import Divider from './components/page/Index/Divider';
import useBackgroundAudio from './hooks/useBackgroundAudio';

const Index = () => {
    const apostleRef = useRef(null);
    const testimonialRef = useRef(null);
    const isPlayingRef = useRef(false);
    const { play, stop } = useBackgroundAudio(song);

    useEffect(() => {
        const apostleEl = apostleRef.current;
        const testimonialEl = testimonialRef.current;
        if (!apostleEl || !testimonialEl) return;

        const handleScroll = () => {
            const apostleRect = apostleEl.getBoundingClientRect();
            const testimonialRect = testimonialEl.getBoundingClientRect();
            const viewH = window.innerHeight;

            const pastApostleStart = apostleRect.top < viewH * 0.3;
            const beforeTestimonialStart = testimonialRect.top > viewH * 0.3;
            const shouldPlay = pastApostleStart && beforeTestimonialStart;

            if (shouldPlay && !isPlayingRef.current) {
                isPlayingRef.current = true;
                play();
            } else if (!shouldPlay && isPlayingRef.current) {
                isPlayingRef.current = false;
                stop();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [play, stop]);

    return (
        <div style={{ background: 'var(--color-primary)', minHeight: '100vh', color: 'var(--color-graphite)' }}>
            {/* Fixed Navigation */}
            <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50 }}>
                <Nav />
            </div>

            <Banner />
            
            <CountdownSection />

            <Divider />

            <div ref={apostleRef}>
                <ApostleSection />
            </div>

            <VisionSection />

            <Divider />

            <div ref={testimonialRef}>
                <TestimonialSection />
            </div>

            <Divider />

            <FirstStepsSection />

            <Divider />

            <DonationSection />

            <Divider />

            <section id="contact" style={{ padding: 'var(--space-section-lg) 0', background: 'var(--color-primary)' }}>
                <Contact verset={{
                    verset: "Va dans les chemins et le long des haies, et ceux que tu trouveras, contrains-les d'entrer",
                    ref: 'Luc 14:23'
                }} />
            </section>

            <Footer />
        </div>
    );
};

export default Index;