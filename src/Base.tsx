import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { KontaktButton } from "./components/kontakt-button";
import { Footer } from "./components/footer";

export function Base() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <KontaktButton />
    </>
  )
}
