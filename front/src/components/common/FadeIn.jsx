/**
 * FadeIn — scroll-triggered entrance animation component.
 *
 * Every element uses this wrapper with a stagger index so each child
 * enters 100ms after the previous. Direction controls the initial offset.
 *
 * Props:
 *  - delay      (number)  base delay in seconds (default 0)
 *  - stagger    (number)  stagger index, multiplied by 0.1s (default 0)
 *  - direction  ('up' | 'down' | 'left' | 'right' | 'none')
 *  - className  (string)  passthrough
 *  - children   (node)
 */
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, stagger = 0, direction = 'up', className = '' }) => {
    const offsets = {
        up:    { y: 32, x: 0 },
        down:  { y: -32, x: 0 },
        left:  { x: 32, y: 0 },
        right: { x: -32, y: 0 },
        none:  { x: 0, y: 0 },
    };

    const totalDelay = delay + stagger * 0.1;

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...offsets[direction],
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.7,
                delay: totalDelay,
                ease: [0.25, 0.46, 0.45, 0.94], // smooth ease-out-quad
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
