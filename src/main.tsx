import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Base } from "./Base.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Imprint } from "./pages/Imprint.tsx";
import { Privacy } from "./pages/Privacy.tsx";
import { Contact } from "./pages/Contact.tsx";
import { About } from "./pages/About.tsx";
import { Courses } from "./pages/Courses.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Home />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
