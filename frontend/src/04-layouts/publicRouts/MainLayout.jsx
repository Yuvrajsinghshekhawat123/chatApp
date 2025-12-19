import { Outlet } from "react-router-dom";
import { Navbar } from "../../02-Components/01-NavBar/01-navBar";
import { Footer } from "../../02-Components/02-Footer/01-footer";

export function MainLayout() {
  return (
    <>
      <section className="min-h-screen bg-white">
        <Navbar />
        <main className="min-h-[80vh] ">
          <Outlet />
        </main>

        <Footer />
      </section>
    </>
  );
}
