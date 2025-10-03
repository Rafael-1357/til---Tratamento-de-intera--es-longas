// src/store/generalStore.ts
import { create } from "zustand";
import type { generalStore, interactions, appraiserInteractions } from "../types/general.types";
import { socket } from "../lib/socket";
import { mockSnipers } from "../data/mockAppraiser";

type SocketStateData = {
  interactions: interactions[];
  appraiser_interactions: appraiserInteractions[];
};

export const useGeneralStore = create<generalStore>((set) => ({
  interactions: [],
  appraiser_interactions: [],
  currentAppraiser: mockSnipers[0]?.name || null,

  setCurrentAppraiser: (appraiserName: string) => {
    set({ currentAppraiser: appraiserName });
  },

  setInitialState: (data: SocketStateData) => {
    set({
      interactions: data.interactions,
      appraiser_interactions: data.appraiser_interactions,
    });
  },

  updateState: (data: SocketStateData) => {
    set({
      interactions: data.interactions,
      appraiser_interactions: data.appraiser_interactions,
    });
  },

  updateInteractionDescription: (interactionId, newDescription) => {
    socket.emit("update_description", { interactionId, newDescription });
  },
  
  updateAppraiserInteraction: (interactionId, appraiserName) => {
    socket.emit("assign_interaction", { interactionId, appraiserName });
  },
}));

socket.on("initial_state", (data: SocketStateData) => {
  useGeneralStore.getState().setInitialState(data);
});

socket.on("state_updated", (data: SocketStateData) => {
  useGeneralStore.getState().updateState(data);
});