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
        <div className="bg-black min-h-screen text-gray-400 font-body selection:bg-amber-500/30">
            {/* Fixed Navigation */}
            <div className='fixed top-0 right-0 left-0 z-50'>
                <Nav />
            </div>

            {/* Spacer */}
            <div className="h-20 lg:h-32" />

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

            <section id="contact" className="py-32 bg-zinc-950">
                <Contact verset={{
                    verset: "Va dans les chemins et le long des haies, et ceux que tu trouveras, contrains-les d'entrer",
                    ref: 'Luc 14:23'
                }} />
            </section>

            <footer className="bg-black border-t border-white/4">
                <Footer />
            </footer>
        </div>
    );
};

export default Index;