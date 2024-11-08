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
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Home } from "./pages/Home.tsx";
import { Imprint } from "./pages/Imprint.tsx";
import { Privacy } from "./pages/Privacy.tsx";
import { Contact } from "./pages/Contact.tsx";
import { About } from "./pages/About.tsx";
import { Courses } from "./pages/Courses.tsx";
import { Anmeldung } from "./pages/Anmeldung.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Home />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/anmeldung" element={<Anmeldung />} />
      <Route path="*" element={<h1>404</h1>} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        language="de"
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <RouterProvider router={router} />
      </GoogleReCaptchaProvider>
    </QueryClientProvider>
  </StrictMode>,
);
