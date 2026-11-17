import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const formatFr = (n) => Math.round(n).toLocaleString('fr-FR');

/**
 * AnimatedNumber — the displayed number springs (rolls) toward `value` whenever it changes.
 */
const AnimatedNumber = ({ value, format = formatFr, className = '' }) => {
    const target = useMotionValue(0);
    const spring = useSpring(target, { stiffness: 70, damping: 18 });
    const text = useTransform(spring, (v) => format(v));

    useEffect(() => {
        target.set(Number.isFinite(value) ? value : 0);
    }, [value, target]);

    return <motion.span className={className}>{text}</motion.span>;
};

export default AnimatedNumber;
