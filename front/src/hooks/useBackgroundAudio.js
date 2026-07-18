import { useRef, useEffect, useCallback } from 'react';

const useBackgroundAudio = (audioPath) => {
    const audioRef = useRef(null);
    const isUnlockedRef = useRef(false);

    useEffect(() => {
        if (!audioPath) return;
        const audio = new Audio(audioPath);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;
        return () => { audio.pause(); audio.src = ''; audioRef.current = null; };
    }, [audioPath]);

    useEffect(() => {
        if (isUnlockedRef.current) return;
        const unlock = async () => {
            if (isUnlockedRef.current) return;
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) { const ctx = new AudioCtx(); await ctx.resume(); ctx.close(); }
                if (audioRef.current) {
                    const saved = audioRef.current.volume;
                    audioRef.current.volume = 0;
                    await audioRef.current.play();
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    audioRef.current.volume = saved;
                }
                isUnlockedRef.current = true;
            } catch (err) {}
        };
        document.addEventListener('click', unlock);
        document.addEventListener('touchstart', unlock, { passive: true });
        document.addEventListener('keydown', unlock);
        return () => {
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
        };
    }, []);

    const play = useCallback(() => {
        if (!audioRef.current || !isUnlockedRef.current) return;
        audioRef.current.play().catch(() => {});
    }, []);

    const stop = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }, []);

    return { play, stop, isUnlockedRef };
};

export default useBackgroundAudio;
