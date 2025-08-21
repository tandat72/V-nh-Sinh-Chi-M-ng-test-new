
import React from 'react';
import type { Technique } from '../types';

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void;
    techniques: Technique[];
    onBuy: (technique: Technique) => void;
    playerLinhThach: number;
    currentTechniqueId: number;
}

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, techniques, onBuy, playerLinhThach, currentTechniqueId }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-lg border border-yellow-400/50 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-yellow-300">Kỳ Trân Các</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </header>
                
                <div className="p-6 overflow-y-auto flex-grow">
                    <p className="text-right mb-4 text-yellow-400">Linh thạch của bạn: {playerLinhThach.toLocaleString()}</p>
                    <div className="space-y-4">
                        {techniques.map(tech => (
                            <div key={tech.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex justify-between items-center flex-wrap">
                                <div className="flex-grow mb-2 sm:mb-0">
                                    <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                                    <p className="text-sm text-gray-400">{tech.description}</p>
                                    <p className="text-sm text-blue-300">Tu Vi/Click: +{tech.tuViPerClick}</p>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    {tech.id === currentTechniqueId ? (
                                        <button disabled className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">Đã Học</button>
                                    ) : (
                                        <button 
                                            onClick={() => onBuy(tech)}
                                            disabled={playerLinhThach < tech.cost}
                                            className="bg-green-600 hover:bg-green-500 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Mua ({tech.cost.toLocaleString()} LT)
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <footer className="p-4 border-t border-gray-700 text-center">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg"
                    >
                        Rời Đi
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ShopModal;
