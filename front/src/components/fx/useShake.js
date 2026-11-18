import { useAnimate } from 'framer-motion';

/**
 * useShake — returns [ref, shake]: call shake() to make the referenced element wobble
 * (animated validation error feedback). Respects reduced motion.
 */
export default function useShake() {
    const [scope, animate] = useAnimate();
    const shake = () => {
        if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        animate(scope.current, { x: [0, -14, 12, -9, 7, -4, 0] }, { duration: 0.55, ease: 'easeOut' });
    };
    return [scope, shake];
}
