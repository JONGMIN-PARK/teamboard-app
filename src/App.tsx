import Login from "./components/Login";
import Board from "./components/Board";
import CalendarView from "./components/CalendarView";

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🧭 TeamBoard</h1>
      <Login />
      <hr />
      <CalendarView />
      <hr />
      <Board />
    </div>
  );
}
