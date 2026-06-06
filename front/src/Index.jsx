import React from 'react';
import { Nav, Footer, Contact, VisionSection } from './components';
import song from "./assets/song.mp3";
import './index.css';

// Import extracted sections
import Banner from './components/page/Index/Banner';
import CountdownSection from './components/page/Index/CountdownSection';
import ApostleSection from './components/page/Index/ApostleSection';
import TestimonialSection from './components/page/Index/TestimonialSection';
import FirstStepsSection from './components/page/Index/FirstStepsSection';
import DonationSection from './components/page/Index/DonationSection';
import Divider from './components/page/Index/Divider';

const Index = () => {
    return (
        <div style={{ background: 'var(--color-primary)', minHeight: '100vh', color: 'var(--color-graphite)' }}>
            {/* Fixed Navigation */}
            <div style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50 }}>
                <Nav />
            </div>

            <Banner />
            
            <CountdownSection />

            <Divider />

            <ApostleSection />

            <VisionSection audioPath={song} />

            <Divider />

            <TestimonialSection />

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