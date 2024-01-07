import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="bg-gray-900 h-screen flex flex-col gap-3 text-slate-400">
      <header className=" border-b border-gray-700 text-center p-2">
        Menu
      </header>
      <section>
        <ul className="text-left">
          <li className="p-2 m-1 hover:bg-gray-700 rounded-sm duration-300 ease-in ">
            <Link
              className="block w-full h-full duration-500 hover:text-lg hover:text-gray-300"
              to="/app-react-painel"
            >
              <i className="bi bi-car-front text-2xl mr-2"></i>
              Orçamentos
            </Link>
          </li>

          <li className="p-2 m-1 hover:bg-gray-700 rounded-sm duration-300 ease-in">
            <Link
              className="block w-full h-full duration-500 hover:text-lg hover:text-gray-300"
              to="#"
            >
              <i className="bi bi-clipboard-check-fill text-2xl mr-2"></i>
              Em Breve
            </Link>
          </li>

          <li className="p-2 m-1 hover:bg-gray-700 rounded-sm duration-300 ease-in">
            <Link
              className="block w-full h-full duration-500 hover:text-lg hover:text-gray-300"
              to="/app-react-painel/login"
            >
              <i className="bi bi-person-fill text-2xl mr-2 "></i>
              Login
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
