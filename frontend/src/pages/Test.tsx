import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Player = {
  userId: number;
  score: number;
};

type Leaderboard = Player[];

export default function Test() {
  const socketRef = useRef<Socket | null>(null);

  const [connected, setConnected] = useState(false);
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState<number>(() => Math.floor(Math.random() * 1000));
  const [miniGames, setMiniGames] = useState("quiz,pong");
  const [leaderboard, setLeaderboard] = useState<Leaderboard>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => {
    setLogs((prev) => [msg, ...prev]);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      log("Connected");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      log("Disconnected");
    });

    socket.on("playerJoined", (data) => {
      log(`Player joined: ${data.userId}`);
    });

    socket.on("gameStarted", (data) => {
      log(`Game started: ${data.miniGame}`);
    });

    socket.on("leaderboardUpdate", (data: Leaderboard) => {
      setLeaderboard(data);
      log("Leaderboard updated");
    });

    socket.on("nextMiniGame", (data) => {
      log(`Next mini game: ${data}`);
    });

    socket.on("gameEnded", (data: Leaderboard) => {
      setLeaderboard(data);
      log("Game ended");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createGame = () => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("createGame", {
      userId,
      miniGames: miniGames.split(","),
    }, (response: { code: string }) => {
      setCode(response.code);
      log(`Game created: ${response.code}`);
    });
  };

  const joinGame = () => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("joinGame", { userId, code });
  };

  const startGame = () => {
    socketRef.current?.emit("startGame", { userId, code });
  };

  const sendScore = () => {
    socketRef.current?.emit("submitScore", {
      userId,
      code,
      points: Math.floor(Math.random() * 100),
    });
  };

  const nextMiniGame = () => {
    socketRef.current?.emit("nextMiniGame", { code });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Game WebSocket Tester</h1>

      <div className="flex gap-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Game Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <input
        className="border p-2 rounded w-full"
        placeholder="Mini games (comma separated)"
        value={miniGames}
        onChange={(e) => setMiniGames(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={createGame}>
          Create Game
        </button>

        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={joinGame}>
          Join Game
        </button>

        <button className="px-4 py-2 bg-purple-500 text-white rounded" onClick={startGame}>
          Start Game
        </button>

        <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={sendScore}>
          Send Score
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={nextMiniGame}>
          Next Mini Game
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
        <ul className="space-y-1">
          {leaderboard.map((p, i) => (
            <li key={p.userId} className="border p-2 rounded">
              #{i + 1} - User {p.userId} : {p.score}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Logs</h2>
        <div className="h-40 overflow-y-auto border p-2 rounded bg-gray-100 text-sm">
          {logs.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Status: {connected ? "Connected" : "Disconnected"}
      </div>
    </div>
  );
}
