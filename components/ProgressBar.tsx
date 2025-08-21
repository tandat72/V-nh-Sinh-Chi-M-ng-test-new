
import React from 'react';

interface ProgressBarProps {
    current: number;
    max: number;
    label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
    const percentage = max > 0 ? (current / max) * 100 : 100;

    return (
        <div className="w-full bg-gray-700 rounded-full h-6 relative overflow-hidden border border-gray-600">
            <div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-6 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white text-shadow">
                {label}
            </span>
        </div>
    );
};

export default ProgressBar;
