import { Outlet } from "react-router-dom";
import { Navbar } from "../../02-Components/01-NavBar/01-navBar";

export function AuthLayout() {
  return (
    <>
      <section className="min-h-screen bg-white">
        <Navbar />
        <main className="min-h-[80vh] ">
          <Outlet />
        </main>
      </section>
    </>
  );
}
