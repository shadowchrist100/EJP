import { useLayoutEffect, useRef } from 'react';
import { Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../../fx/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const MONTHS = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DÉC'];

/**
 * EventCard — frosted-glass event card.
 * Tilts in 3D toward the cursor, a golden halo follows the pointer (TiltCard --mx/--my),
 * and the poster + date are revealed by a GSAP ScrollTrigger choreography.
 */
const EventCard = ({ event, index = 0 }) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const root = ref.current;
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const tl = gsap.timeline({
                    delay: (index % 3) * 0.14,
                    defaults: { ease: 'expo.out' },
                    scrollTrigger: { trigger: root, start: 'top 88%', once: true },
                });
                tl.fromTo(root, { y: 140, rotateX: -28, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 1.4, clearProps: 'transform,opacity' }, 0)
                    .fromTo('.evc-poster', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.05)
                    .fromTo('.evc-poster img', { scale: 1.6 }, { scale: 1, duration: 2, clearProps: 'transform' }, 0.05)
                    .fromTo('.evc-date-num, .evc-date-month', { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.7)
                    .fromTo('.evc-body > *', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.09, clearProps: 'transform,opacity' }, 0.75);
            });
        }, root);
        return () => { mm.revert(); ctx.revert(); };
    }, [index]);

    return (
        <div ref={ref} className="evc">
            <TiltCard max={10} className="evc-card glass-gold gold-border">
                <span className="evc-halo" aria-hidden="true" />

                <div className="evc-poster">
                    <div className="evc-poster-zoom">
                        <img src={event.image} alt={event.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="evc-poster-fade" aria-hidden="true" />
                    <div className="evc-date">
                        <span className="evc-date-mask"><span className="evc-date-num">{event.day}</span></span>
                        <span className="evc-date-mask"><span className="evc-date-month">{MONTHS[event.month]}</span></span>
                    </div>
                </div>

                <div className="evc-body">
                    <div className="evc-meta">
                        <span><Clock size={12} /> {event.time}</span>
                        <span><MapPin size={12} /> {event.location}</span>
                    </div>
                    <h3 className="evc-title">{event.title}</h3>
                    <p className="evc-desc">{event.description}</p>
                </div>
            </TiltCard>
        </div>
    );
};

export default EventCard;
