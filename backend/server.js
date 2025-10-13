const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { mockInteractions } = require("./data");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let interactions = [...mockInteractions];
let appraiser_interactions = [];

const getCurrentState = () => ({ interactions, appraiser_interactions });

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.emit("initial_state", getCurrentState());

  socket.on("assign_interaction", ({ interactionId, appraiserName }) => {
    const ids = Array.isArray(interactionId) ? interactionId : [interactionId];
    ids.forEach(id => {
      const appraisedInteractionIndex = appraiser_interactions.findIndex(
        (appraiserInteraction) => appraiserInteraction.interaction.id === id
      );
  
      if (appraisedInteractionIndex !== -1) {
        appraiser_interactions[appraisedInteractionIndex].interaction.appraiser = appraiserName;
      } else {
        const interactionToMove = interactions.find((i) => i.id === id);
        
        if (interactionToMove) {
          interactions = interactions.filter((i) => i.id !== id);
          const newAppraiserInteraction = {
            interaction: { ...interactionToMove, appraiser: appraiserName },
            description: "",
            flagged_supervisor: false,
            supervisor_name_flagged: "",
          };
          appraiser_interactions.push(newAppraiserInteraction);
        }
      }
    });
    io.emit("state_updated", getCurrentState());
  });

  socket.on("update_description", ({ interactionId, newDescription }) => {
    appraiser_interactions = appraiser_interactions.map((appraiserInteraction) =>
      appraiserInteraction.interaction.id === interactionId
        ? { ...appraiserInteraction, description: newDescription }
        : appraiserInteraction
    );
    io.emit("state_updated", getCurrentState());
  });

  socket.on("update_flagged_supervisor", ({ interactionId, flagged }) => {
    appraiser_interactions = appraiser_interactions.map((appraiserInteraction) =>
      appraiserInteraction.interaction.id === interactionId
        ? { ...appraiserInteraction, flagged_supervisor: flagged }
        : appraiserInteraction
    );
    io.emit("state_updated", getCurrentState());
  });

  socket.on("update_supervisor_name", ({ interactionId, supervisorName }) => {
    appraiser_interactions = appraiser_interactions.map((appraiserInteraction) =>
      appraiserInteraction.interaction.id === interactionId
        ? { ...appraiserInteraction, supervisor_name_flagged: supervisorName }
        : appraiserInteraction
    );
    io.emit("state_updated", getCurrentState());
  });

  socket.on("update_status", ({ interactionId, status }) => {
    const ids = Array.isArray(interactionId) ? interactionId : [interactionId];
    ids.forEach(id => {
      const interactionIndex = interactions.findIndex(i => i.id === id);
      if (interactionIndex !== -1) {
        interactions[interactionIndex].status = status;
      } else {
        const appraiserInteractionIndex = appraiser_interactions.findIndex(
          i => i.interaction.id === id
        );
        if (appraiserInteractionIndex !== -1) {
          appraiser_interactions[appraiserInteractionIndex].interaction.status = status;
        }
      }
    });
    io.emit("state_updated", getCurrentState());
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);