import React from 'react';

const Divider = () => (
    <div className="w-full py-4">
        <div className="container mx-auto flex items-center gap-4 px-6">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-amber-600/30" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="w-1 h-1 bg-amber-600/40 rotate-45" />
            <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-amber-600/30" />
        </div>
    </div>
);

export default Divider;
