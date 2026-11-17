/**
 * SuccessBurst — animated validation feedback: a gold circle draws itself, the check
 * mark strokes in, two shock-wave rings expand and 8 sparks fly out.
 * Pure CSS animation (see .sb-* in index.css), so it replays every time it mounts.
 */
const SuccessBurst = ({ size = 72, className = '' }) => (
    <span className={`sb ${className}`} style={{ '--sb': `${size}px` }} aria-hidden="true">
        <span className="sb-ring" />
        <span className="sb-ring sb-ring--late" />
        {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className="sb-spark" style={{ '--a': `${i * 45}deg` }} />
        ))}
        <svg viewBox="0 0 52 52">
            <circle className="sb-circle" cx="26" cy="26" r="24" />
            <path className="sb-check" d="M15 27.5l7.5 7.5 15-16" />
        </svg>
    </span>
);

export default SuccessBurst;
