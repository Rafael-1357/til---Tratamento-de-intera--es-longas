// backend/server.js
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
    const interactionToMove = interactions.find((i) => i.id === interactionId);
    
    if (interactionToMove) {
      const isAlreadyAppraised = appraiser_interactions.some(
        (appraiserInteraction) => appraiserInteraction.interaction.id === interactionId
      );

      if (!isAlreadyAppraised) {
        interactions = interactions.filter((i) => i.id !== interactionId);
        const newAppraiserInteraction = {
          interaction: { ...interactionToMove, appraiser: appraiserName },
          description: "",
          flagged_supervisor: false,
          supervisor_name_flagged: "",
        };
        appraiser_interactions.push(newAppraiserInteraction);
        io.emit("state_updated", getCurrentState());
      }
    }
  });

  socket.on("update_description", ({ interactionId, newDescription }) => {
    appraiser_interactions = appraiser_interactions.map((appraiserInteraction) =>
      appraiserInteraction.interaction.id === interactionId
        ? { ...appraiserInteraction, description: newDescription }
        : appraiserInteraction
    );
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