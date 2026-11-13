import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const Word = ({ progress, range, className, children }) => {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return <motion.span className={className} style={{ opacity }}>{children}</motion.span>;
};

const PUNCTUATION_ONLY = /^[\s"'»”.,!?;:]+$/;

/**
 * ScrollWords — words light up one by one as the block scrolls through the viewport.
 *
 * Props:
 *  - segments  [{ text, gold? }] — gold segments get the shimmer-gold treatment
 *  - as        heading/paragraph tag
 */
const ScrollWords = ({ segments, as: Tag = 'p', className = '', style }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });

    const words = segments.flatMap(({ text, gold }) =>
        text.split(' ').filter(Boolean).map((w) => ({ w, gold }))
    );
    const n = words.length;

    return (
        <Tag ref={ref} className={className} style={style}>
            {words.map(({ w, gold }, i) => {
                const cls = gold ? 'shimmer-gold gold-word' : undefined;
                const space = i > 0 && !PUNCTUATION_ONLY.test(w) ? ' ' : '';
                return (
                    <Fragment key={i}>
                        {space}
                        {reduce
                            ? <span className={cls}>{w}</span>
                            : <Word progress={scrollYProgress} range={[i / n, (i + 1) / n]} className={cls}>{w}</Word>}
                    </Fragment>
                );
            })}
        </Tag>
    );
};

export default ScrollWords;
