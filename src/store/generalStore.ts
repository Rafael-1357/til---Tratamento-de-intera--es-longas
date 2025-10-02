import { create } from "zustand";
import type { generalStore } from "../types/general.types";
import { mockInteractions } from "../data/mockInteractions";


export const useGeneralStore = create<generalStore>((set) => ({
  // Armazena as interações após a requisição do genesys (Não necessariamente armazena em DB)
  interactions: mockInteractions,
  // Armazenas as interações do analisador (Salvo em DB)
  appraiser_interactions: [],
  mockAppraiser: "Rafael da Lapa Silveira",
  updateInteractionDescription: (interactionId, newDescription) => {
    set((state) => ({
      appraiser_interactions: state.appraiser_interactions.map((appraiserInteraction) => 
        appraiserInteraction.interaction.id === interactionId
          ? {
              ...appraiserInteraction,
              description: newDescription,
              interaction: {
                ...appraiserInteraction.interaction,
              },
            }
          : appraiserInteraction
      ),
    }));
  },
  updateAppraiserInteraction: (interactionId, appraiserName) => {
    set((state) => {
      const isAlreadyAppraised = state.appraiser_interactions.some(
        (appraiserInteraction) => appraiserInteraction.interaction.id === interactionId
      );

      if (isAlreadyAppraised) {
        return state;
      }

      const interactionToMove = state.interactions.find(
        (interaction) => interaction.id === interactionId
      );

      if (!interactionToMove) {
        return state;
      }

      const newAppraiserInteraction = {
        interaction: { ...interactionToMove, appraiser: appraiserName },
        description: "",
        flagged_supervisor: false,
        supervisor_name_flagged: "",
      };

      return {
        interactions: state.interactions.filter(
          (interaction) => interaction.id !== interactionId
        ),
        appraiser_interactions: [
          ...state.appraiser_interactions,
          newAppraiserInteraction,
        ],
      };
    });
  },
}));
