
import React from 'react';
import type { PlayerState, Realm, Technique } from '../types';
import ProgressBar from './ProgressBar';

interface PlayerStatsProps {
    player: PlayerState;
    currentRealm: Realm;
    nextRealm?: Realm;
    currentTechnique: Technique;
}

const StatItem: React.FC<{ label: string; value: React.ReactNode; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-center justify-between text-lg py-2 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
            <span className="text-yellow-400">{icon}</span>
            <span className="text-gray-300">{label}</span>
        </div>
        <span className="font-bold text-white">{value}</span>
    </div>
);

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, currentRealm, nextRealm, currentTechnique }) => {
    return (
        <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300 border-b-2 border-yellow-400/30 pb-2">
                Thông Tin Đạo Hữu
            </h2>
            <div className="space-y-2">
                <StatItem label="Danh Hiệu" value={player.name} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>} />
                <StatItem label="Cảnh Giới" value={currentRealm.name} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>} />
                <StatItem label="Linh Thạch" value={player.linhThach.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.168-.217c-.32.006-.63.058-.926.158.205.63.278 1.282.278 1.942v.026c0 .414-.04.814-.12 1.201.298.1.61.152.932.158.436 0 .845-.09 1.213-.255v1.725a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1.725c.368.165.777.255 1.213.255.322.006.634-.05.932-.158a4.996 4.996 0 00-.12-1.201v-.026c0-.66.073-1.312.278-1.942-.296-.1-.606-.152-.926-.158a2.5 2.5 0 00-1.168.217V7.15c.22.07.408.164.567.268A5.002 5.002 0 0013 3.045V3a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v.045a5.002 5.002 0 00-4.067 4.373zM10 16a6 6 0 100-12 6 6 0 000 12z" /></svg>}/>
                <StatItem label="Sức Mạnh" value={player.strength.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>} />
                <StatItem label="Công Pháp" value={currentTechnique.name} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4z" /></svg>} />
            </div>

            <div className="mt-4">
                <label className="text-sm text-gray-400">Tu Vi Hiện Tại</label>
                 <ProgressBar
                    current={player.tuVi}
                    max={nextRealm ? nextRealm.tuViRequired : player.tuVi}
                    label={nextRealm ? `${player.tuVi.toLocaleString()} / ${nextRealm.tuViRequired.toLocaleString()}` : 'Đã viên mãn'}
                />
            </div>
        </div>
    );
};

export default PlayerStats;
