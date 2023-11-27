import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/Index";

function App() {
  return (
    <>
      <div className="grid grid-cols-layout h-screen">
        <aside className="w-32 bg-gray-500 p-1">
          <SideBar />
        </aside>
        <div className="bg-zinc-400 p-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
