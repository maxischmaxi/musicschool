import logoWhite from "../assets/logo-white.svg";
import bg from "../assets/struktur-blau.jpeg";

export function Footer() {
  return (
    <footer className="relative py-12">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="absolute -z-10 top-0 left-0 right-0 bottom-0 bg-repeat bg-center bg-fixed"
      />
      <div className="flex flex-col gap-8 md:gap-8 md:flex-row flex-nowrap justify-between items-center container mx-auto max-w-5xl">
        <a href="/" aria-label="Zur Startseite" title="Zur Startseite">
          <img
            src={logoWhite}
            width={242}
            height={105}
            alt="MusicSchool CML Logo"
          />
        </a>
        <p className="text-white text-center font-bold text-lg">
          Wir freuen uns darauf
          <br />
          mit dir Musik zu machen!
        </p>
        <div className="font-bold flex flex-row flex-nowrap gap-4 text-white">
          <a
            className="hover:underline"
            href="/imprint"
            aria-label="Impressum"
            title="Impressum"
          >
            Impressum
          </a>
          <a
            className="hover:underline"
            href="/privacy"
            aria-label="Datenschutz"
            title="Datenschutz"
          >
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}
