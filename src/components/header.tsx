import { MOBILE_NUMBER } from "../lib/definitions";
import logo from "../assets/logo.svg";
import { Sidebar } from "./sidebar";
import { motion, useScroll, useTransform } from "framer-motion";

export function Header() {
  const scroll = useScroll();
  const h = useTransform(scroll.scrollY, [0, 100], [100, 40]);
  const p = useTransform(scroll.scrollY, [0, 100], [24, 12]);

  return (
    <header className="bg-white sticky top-0 left-0 w-full z-20 flex flex-row flex-nowrap justify-end md:justify-start items-center">
      <a
        href="/"
        aria-label="Zur Startseite"
        title="Zur Startseite"
        className="flex md:hidden mr-auto pl-8"
      >
        <motion.img
          src={logo}
          alt="MusicSchool CML Logo"
          className="h-8 will-change-auto"
        />
      </a>
      <motion.nav
        style={{ paddingTop: p, paddingBottom: p }}
        className="hidden md:flex container will-change-auto px-4 md:px-8 text-theme-text font-semibold max-w-5xl text-sm mx-auto flex-row flex-nowrap"
      >
        <a
          href="/"
          aria-label="Zur Startseite"
          title="Zur Startseite"
          className="mr-4"
        >
          <motion.img
            src={logo}
            style={{ height: h }}
            alt="MusicSchool CML Logo"
            className="will-change-auto"
            width={242}
            height={105}
          />
        </a>
        <ul className="flex flex-row flex-nowrap gap-6 w-full">
          <li className="flex justify-center items-center">
            <a
              className="hover:underline"
              href="/"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Startseite
            </a>
          </li>
          <li className="flex justify-center items-center">
            <a
              className="hover:underline"
              href="/courses"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Unsere Kurse
            </a>
          </li>
          <li className="flex justify-center items-center">
            <a
              className="hover:underline"
              href="/about"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Über uns
            </a>
          </li>
          <li className="flex justify-center items-center">
            <a
              className="hover:underline"
              href="/contact"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Kontakt
            </a>
          </li>
          <li className="flex justify-center items-center">
            <a
              className="hover:underline"
              href="/anmeldung"
              aria-label="Anmeldeformular"
              title="Anmeldeformular"
            >
              Anmeldung
            </a>
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <a
            className="hover:underline whitespace-nowrap"
            href={`tel:${MOBILE_NUMBER}`}
            aria-label="Ruf uns an"
            title="Ruf uns an"
          >
            Mobil.: {MOBILE_NUMBER.replace("+49", "0")}
          </a>
        </div>
      </motion.nav>
      <Sidebar />
    </header>
  );
}
