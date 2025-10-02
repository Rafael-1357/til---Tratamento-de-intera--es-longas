export type interactions = {
  appraiser: string | null;
  id: string;
  analyst: string;
  time: number;
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

export type generalStore = {
  interactions: interactions[];
  appraiser_interactions: appraiserInteractions[];
  mockAppraiser: string;
  updateInteractionDescription: (id: string, description: string) => void;
  updateAppraiserInteraction: (id: string, appraiserName: string) => void;
}