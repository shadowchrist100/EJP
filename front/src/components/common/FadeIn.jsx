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
 *  - as         (string)  HTML tag to render ('div' by default)
 *  - className  (string)  passthrough
 *  - children   (node)
 */
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, stagger = 0, direction = 'up', as = 'div', className = '', style = {}, ...rest }) => {
    const offsets = {
        up:    { y: 32, x: 0 },
        down:  { y: -32, x: 0 },
        left:  { x: 32, y: 0 },
        right: { x: -32, y: 0 },
        none:  { x: 0, y: 0 },
    };

    const totalDelay = delay + stagger * 0.1;

    // A5: `as` prop allows rendering as any HTML element (span, section, etc.)
    // This prevents wrapping inline elements like <h1>, <p> in a block-level <div>
    const MotionComponent = motion[as] || motion.div;

    return (
        <MotionComponent
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
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </MotionComponent>
    );
};

export default FadeIn;
