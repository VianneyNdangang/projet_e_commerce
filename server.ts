import jsonServer from "json-server";
import auth from "json-server-auth";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// ⚙️ Active les middlewares standards (logs, CORS, etc.)
server.use(middlewares);

// 🧠 Connecte la base de données à json-server-auth
server.db = router.db;

// 🔐 Active json-server-auth avant le router
server.use(auth);
server.use(router);

// 🚀 Lancement du serveur
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server Auth en cours sur http://localhost:${PORT}`);
});
