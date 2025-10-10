export type interactions = {
  appraiser: string | null;
  id: string;
  analyst: string;
  time: number;
  status: 'pending' | 'finished';
}

export type appraiserInteractions = {
  interaction: interactions;
  description: string | null;
  flagged_supervisor: boolean;
  supervisor_name_flagged: string;
}

export type supervisors = {
  name: string;
}

export type appraiser = {
  name: string;
}

export type SocketStateData = {
  interactions: interactions[];
  appraiser_interactions: appraiserInteractions[];
};

export type generalStore = {
  interactions: interactions[];
  appraiser_interactions: appraiserInteractions[];
  currentAppraiser: string | null;
  setCurrentAppraiser: (name: string) => void;
  updateInteractionDescription: (id: string, description: string) => void;
  updateAppraiserInteraction: (id: string, appraiserName: string) => void;
  updateFlaggedSupervisor: (id: string, flagged: boolean) => void;
  updateSupervisorName: (id: string, supervisorName: string) => void;
  updateInteractionStatus: (id: string, status: 'pending' | 'finished') => void;
  setInitialState: (data: SocketStateData) => void;
  updateState: (data: SocketStateData) => void;
}

export type columnID = 'analisador' | 'analista' | 'tempo' | 'status';

export type sorting = {
  column: columnID;
  direction: 'asc' | 'desc';
};

export type appraiserColumnID = 'analisador' | 'analista' | 'tempo' | 'descricao' | 'supervisor_acionado' | 'nome_supervisor' | 'status';

export type appraiserSorting = {
  column: appraiserColumnID;
  direction: 'asc' | 'desc';
};