import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const SPRING = { stiffness: 160, damping: 18, mass: 0.6 };

/**
 * TiltCard — 3D tilt toward the cursor with a moving golden glare.
 * Mouse only (touch keeps a flat card); disabled under prefers-reduced-motion.
 */
const TiltCard = ({ children, max = 8, glare = true, className = '', style, ...rest }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const rotateX = useSpring(0, SPRING);
    const rotateY = useSpring(0, SPRING);
    const gx = useMotionValue(50);
    const gy = useMotionValue(50);
    const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(254,243,199,0.22), rgba(245,158,11,0.06) 35%, transparent 60%)`;

    const onPointerMove = (e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        rotateY.set((px - 0.5) * max * 2);
        rotateX.set(-(py - 0.5) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
    };

    const onPointerLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`tilt-card ${className}`}
            style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            {...rest}
        >
            {children}
            {glare && !reduce && <motion.div className="tilt-glare" style={{ background: glareBg }} aria-hidden="true" />}
        </motion.div>
    );
};

export default TiltCard;
