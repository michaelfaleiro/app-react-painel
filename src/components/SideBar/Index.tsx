import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <header>Menu</header>
      <section>
        <ul>
          <li>
            <Link to="/app-react-painel">Home</Link>
          </li>
          <li>
            <Link to="/app-react-painel/login">Login</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
