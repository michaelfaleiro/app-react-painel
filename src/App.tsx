import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/Index";

function App() {
  return (
    <>
      <div className="grid grid-cols-layout h-screen bg-[#26282B] text-gray-300 ">
        <aside className="w-40">
          <SideBar />
        </aside>
        <div className=" p-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
