import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * SplitReveal — masked text reveal (each word or letter slides up out of a mask).
 * Screen readers get the plain text once; the animated pieces are aria-hidden.
 *
 * Props:
 *  - text            string to animate
 *  - by              'word' | 'char'
 *  - delay, stagger  seconds
 *  - innerClassName  applied to each animated piece (e.g. 'shimmer-gold')
 */
const SplitReveal = ({ text, by = 'word', delay = 0, stagger = 0.05, className = '', innerClassName = '', style }) => {
    const reduce = useReducedMotion();
    if (reduce) return <span className={className} style={style}>{text}</span>;

    const words = text.split(' ');
    let index = 0;

    return (
        <motion.span
            className={`split-reveal ${className}`}
            style={style}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
        >
            <span className="sr-only">{text}</span>
            {words.map((word, w) => (
                <span key={w} aria-hidden="true">
                    <span className="split-word">
                        {(by === 'char' ? [...word] : [word]).map((part, c) => {
                            const i = index++;
                            return (
                                <span key={c} className="split-mask">
                                    <motion.span
                                        className={`split-inner ${innerClassName}`}
                                        variants={{
                                            hidden: { y: '115%', rotate: 5 },
                                            show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE, delay: delay + i * stagger } },
                                        }}
                                    >
                                        {part}
                                    </motion.span>
                                </span>
                            );
                        })}
                    </span>
                    {w < words.length - 1 && ' '}
                </span>
            ))}
        </motion.span>
    );
};

export default SplitReveal;
