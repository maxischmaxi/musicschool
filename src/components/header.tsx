import { MOBILE_NUMBER } from "../lib/definitions";
import logo from "../assets/logo.svg";
import { MenuButton } from "./menu-button";

export function Header() {
  return (
    <header className="bg-white sticky top-0 left-0 w-full z-20 flex flex-row flex-nowrap justify-end md:justify-start items-center">
      <nav className="hidden md:flex container px-4 md:px-8 text-theme-text font-semibold max-w-5xl text-sm mx-auto flex-row flex-nowrap py-12">
        <a
          href="/"
          aria-label="Zur Startseite"
          title="Zur Startseite"
          className="mr-4"
        >
          <img src={logo} alt="MusicSchool CML Logo" width={242} height={105} />
        </a>
        <ul className="flex flex-row flex-nowrap gap-6 w-full">
          <li>
            <a
              className="hover:underline"
              href="/"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Startseite
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="/courses"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Unsere Kurse
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="/about"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Über uns
            </a>
          </li>
          <li>
            <a
              className="hover:underline"
              href="/contact"
              aria-label="Zur Startseite"
              title="Zur Startseite"
            >
              Kontakt
            </a>
          </li>
        </ul>
        <a
          className="hover:underline whitespace-nowrap"
          href={`tel:${MOBILE_NUMBER}`}
          aria-label="Ruf uns an"
          title="Ruf uns an"
        >
          Mobil.: {MOBILE_NUMBER}
        </a>
      </nav>
      <MenuButton />
    </header>
  );
}
