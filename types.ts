
export interface Realm {
  name: string;
  tuViRequired: number;
  strengthBonus: number;
}

export interface Technique {
  id: number;
  name:string;
  description: string;
  tuViPerClick: number;
  cost: number;
}

export interface PlayerState {
  name: string;
  realmIndex: number;
  tuVi: number;
  linhThach: number;
  techniqueId: number;
  strength: number;
}

export enum GameEventType {
  INFO = 'info',
  SUCCESS = 'success',
  DANGER = 'danger',
  REWARD = 'reward',
  SYSTEM = 'system',
}


export interface GameEvent {
  id: number;
  type: GameEventType;
  message: string;
}

export interface Monster {
  name: string;
  strength: number;
  tuViReward: number;
  linhThachReward: number;
}
