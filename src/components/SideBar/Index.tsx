import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <header>Menu</header>
      <section>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
