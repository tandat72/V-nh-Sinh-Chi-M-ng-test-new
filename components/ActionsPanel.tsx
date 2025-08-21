
import React from 'react';

interface ActionsPanelProps {
    onCultivate: () => void;
    onBreakthrough: () => void;
    canBreakthrough: boolean;
    onExplore: () => void;
    onOpenShop: () => void;
}

const ActionButton: React.FC<{ onClick: () => void; disabled?: boolean; children: React.ReactNode; className?: string }> = ({ onClick, disabled = false, children, className = 'bg-blue-600 hover:bg-blue-500' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
        ${disabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : `${className} shadow-lg hover:shadow-xl`}`}
    >
        {children}
    </button>
);


const ActionsPanel: React.FC<ActionsPanelProps> = ({ onCultivate, onBreakthrough, canBreakthrough, onExplore, onOpenShop }) => {
    return (
        <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 shadow-lg">
             <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300 border-b-2 border-yellow-400/30 pb-2">
                Hành Động
            </h2>
            <div className="space-y-4">
                <ActionButton onClick={onCultivate}>
                    Bế Quan Tu Luyện
                </ActionButton>
                 <ActionButton 
                    onClick={onBreakthrough} 
                    disabled={!canBreakthrough}
                    className={canBreakthrough ? 'bg-green-600 hover:bg-green-500 animate-pulse' : 'bg-gray-600'}
                >
                    Đột Phá Cảnh Giới
                </ActionButton>
                <ActionButton onClick={onExplore} className="bg-purple-600 hover:bg-purple-500">
                    Xuất Quan Lịch Luyện
                </ActionButton>
                <ActionButton onClick={onOpenShop} className="bg-yellow-600 hover:bg-yellow-500">
                    Kỳ Trân Các
                </ActionButton>
            </div>
        </div>
    );
};

export default ActionsPanel;
