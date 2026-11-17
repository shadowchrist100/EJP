import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollMarquee — giant outlined word that slides horizontally with page scroll
 * (decorative watermark behind a section's content).
 */
const ScrollMarquee = ({ text, from = '10%', to = '-25%', className = '', style }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const x = useTransform(scrollYProgress, [0, 1], [from, to]);

    return (
        <div ref={ref} className={`scroll-marquee ${className}`} style={style} aria-hidden="true">
            <motion.span className="outline-text" style={{ x }}>{text}</motion.span>
        </div>
    );
};

export default ScrollMarquee;
