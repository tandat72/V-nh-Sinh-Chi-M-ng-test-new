
import React, { useRef, useEffect } from 'react';
import type { GameEvent } from '../types';
import { GameEventType } from '../types';

interface GameLogProps {
    log: GameEvent[];
}

const getEventColor = (type: GameEventType): string => {
    switch (type) {
        case GameEventType.SUCCESS: return 'text-green-400';
        case GameEventType.REWARD: return 'text-yellow-400';
        case GameEventType.DANGER: return 'text-red-400';
        case GameEventType.INFO: return 'text-blue-300';
        case GameEventType.SYSTEM: return 'text-purple-400';
        default: return 'text-gray-300';
    }
};

const GameLog: React.FC<GameLogProps> = ({ log }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [log]);

    return (
        <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300 border-b-2 border-yellow-400/30 pb-2">
                Nhật Ký Tu Luyện
            </h2>
            <div ref={logContainerRef} className="flex-grow h-96 lg:h-full overflow-y-auto pr-2 space-y-3 flex flex-col-reverse">
                {log.map(event => (
                    <div key={event.id} className={`p-2 rounded-md bg-black/20 text-sm animate-fade-in`}>
                        <p className={getEventColor(event.type)}>
                           {event.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameLog;
