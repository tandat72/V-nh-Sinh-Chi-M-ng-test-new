
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { PlayerState, GameEvent, Technique } from './types';
import { GameEventType } from './types';
import { INITIAL_PLAYER_STATE, REALMS, TECHNIQUES, MONSTERS } from './constants';
import PlayerStats from './components/PlayerStats';
import GameLog from './components/GameLog';
import ActionsPanel from './components/ActionsPanel';
import ShopModal from './components/ShopModal';

const App: React.FC = () => {
    const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER_STATE);
    const [gameLog, setGameLog] = useState<GameEvent[]>([{id: Date.now(), type: GameEventType.SYSTEM, message: "Con đường tu tiên bắt đầu. Ngươi chỉ là một phàm nhân nhỏ bé."}]);
    const [isShopOpen, setIsShopOpen] = useState(false);

    const addLog = useCallback((type: GameEventType, message: string) => {
        setGameLog(prevLog => [{ id: Date.now(), type, message }, ...prevLog.slice(0, 99)]);
    }, []);
    
    const currentRealm = useMemo(() => REALMS[player.realmIndex], [player.realmIndex]);
    const nextRealm = useMemo(() => REALMS[player.realmIndex + 1], [player.realmIndex]);
    const currentTechnique = useMemo(() => TECHNIQUES.find(t => t.id === player.techniqueId) as Technique, [player.techniqueId]);

    const canBreakthrough = useMemo(() => nextRealm && player.tuVi >= nextRealm.tuViRequired, [player.tuVi, nextRealm]);

    const handleCultivate = useCallback(() => {
        const tuViGained = currentTechnique.tuViPerClick;
        setPlayer(p => ({ ...p, tuVi: p.tuVi + tuViGained }));
        if (Math.random() < 0.2) {
            addLog(GameEventType.INFO, `Ngươi chăm chỉ tu luyện, thu được ${tuViGained} điểm tu vi.`);
        }
    }, [currentTechnique, addLog]);

    const handleBreakthrough = useCallback(() => {
        if (!canBreakthrough || !nextRealm) return;
        
        const newRealmIndex = player.realmIndex + 1;
        const newRealm = REALMS[newRealmIndex];

        setPlayer(p => ({
            ...p,
            realmIndex: newRealmIndex,
            strength: p.strength - currentRealm.strengthBonus + newRealm.strengthBonus,
        }));
        addLog(GameEventType.SUCCESS, `Chúc mừng! Ngươi đã đột phá thành công tới ${newRealm.name}! Lực lượng tăng mạnh.`);
    }, [player.realmIndex, canBreakthrough, nextRealm, addLog, currentRealm]);

    const handleExplore = useCallback(() => {
        addLog(GameEventType.INFO, "Ngươi xuất quan lịch luyện, tiến vào vùng đất chưa biết...");
        const eventChance = Math.random();

        setTimeout(() => {
            if (eventChance < 0.4) { // Gặp yêu thú
                const monsterPool = MONSTERS.filter(m => m.strength < player.strength * 5);
                const monster = monsterPool[Math.floor(Math.random() * monsterPool.length)] || MONSTERS[0];
                addLog(GameEventType.DANGER, `Nguy hiểm! Ngươi đã gặp phải ${monster.name} (Sức mạnh: ${monster.strength})!`);

                setTimeout(() => {
                    if (player.strength >= monster.strength) {
                        setPlayer(p => ({
                            ...p,
                            tuVi: p.tuVi + monster.tuViReward,
                            linhThach: p.linhThach + monster.linhThachReward
                        }));
                        addLog(GameEventType.REWARD, `Sau một trận kịch chiến, ngươi đã diệt sát ${monster.name}, nhận được ${monster.tuViReward} tu vi và ${monster.linhThachReward} linh thạch.`);
                    } else {
                        const linhThachLost = Math.floor(player.linhThach * 0.1);
                        setPlayer(p => ({ ...p, linhThach: p.linhThach - linhThachLost }));
                        addLog(GameEventType.DANGER, `Sức mạnh không địch lại ${monster.name}, ngươi trọng thương bỏ chạy, mất ${linhThachLost} linh thạch.`);
                    }
                }, 1000);

            } else if (eventChance < 0.7) { // Nhặt được linh thạch
                const foundStones = Math.floor(Math.random() * (10 + player.realmIndex * 10)) + 5;
                setPlayer(p => ({ ...p, linhThach: p.linhThach + foundStones }));
                addLog(GameEventType.REWARD, `Cơ duyên đến! Ngươi tìm thấy một túi linh thạch, nhận được ${foundStones} viên.`);
            } else { // Không có gì
                addLog(GameEventType.INFO, "Chuyến đi không có gì đặc biệt, ngươi bình an trở về.");
            }
        }, 1000);
    }, [player.strength, player.realmIndex, player.linhThach, addLog]);
    
    const handleBuyTechnique = useCallback((technique: Technique) => {
        if (player.linhThach < technique.cost) {
            addLog(GameEventType.DANGER, "Linh thạch không đủ, không thể mua công pháp này.");
            return;
        }
        if (player.techniqueId === technique.id) {
            addLog(GameEventType.INFO, "Ngươi đã học công pháp này rồi.");
            return;
        }

        setPlayer(p => ({
            ...p,
            linhThach: p.linhThach - technique.cost,
            techniqueId: technique.id
        }));
        addLog(GameEventType.SUCCESS, `Mua thành công [${technique.name}], tiêu tốn ${technique.cost} linh thạch.`);
        setIsShopOpen(false);
    }, [player.linhThach, player.techniqueId, addLog]);

    return (
        <div 
            className="bg-gray-900 text-gray-200 min-h-screen p-4 md:p-8 font-serif bg-cover bg-center"
            style={{backgroundImage: `url('https://picsum.photos/seed/tu-tien/1920/1080')`}}
        >
            <div className="bg-black bg-opacity-60 backdrop-blur-sm min-h-[calc(100vh-4rem)] p-4 sm:p-6 rounded-xl border border-gray-700">
                <header className="text-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 tracking-wider" style={{textShadow: '0 0 10px #facc15'}}>
                        Hành Trình Tu Tiên
                    </h1>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <aside className="lg:col-span-1 space-y-6">
                        <PlayerStats 
                            player={player} 
                            currentRealm={currentRealm} 
                            nextRealm={nextRealm}
                            currentTechnique={currentTechnique}
                        />
                    </aside>

                    <div className="lg:col-span-2">
                        <GameLog log={gameLog} />
                    </div>

                    <aside className="lg:col-span-1 space-y-6">
                       <ActionsPanel 
                           onCultivate={handleCultivate}
                           onBreakthrough={handleBreakthrough}
                           canBreakthrough={canBreakthrough}
                           onExplore={handleExplore}
                           onOpenShop={() => setIsShopOpen(true)}
                       />
                    </aside>
                </main>
            </div>
            
            <ShopModal
                isOpen={isShopOpen}
                onClose={() => setIsShopOpen(false)}
                techniques={TECHNIQUES}
                onBuy={handleBuyTechnique}
                playerLinhThach={player.linhThach}
                currentTechniqueId={player.techniqueId}
            />
        </div>
    );
};

export default App;
