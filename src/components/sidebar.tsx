import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.svg";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Paths } from "../lib/definitions";

export function Sidebar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <button
        type="button"
        title="Sidebar"
        className="md:hidden p-4"
        aria-label="Sidebar"
        onClick={() => setShow(true)}
      >
        <Menu className="w-8 h-8" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setShow(false)}
            className="fixed top-0 left-0 w-full h-full z-50"
          >
            <motion.div
              className="bg-white rounded-tl-xl rounded-bl-xl bottom-0 h-screen fixed top-0 right-0 w-[80%] p-4"
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              exit={{ x: "200%" }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <nav className="w-full flex flex-col">
                <a href="/">
                  <img src={logo} alt="MusicSchool CML Logo" />
                </a>
                <ul className="w-full flex flex-col h-full gap-2 mt-8">
                  {Object.values(Paths)
                    .filter(
                      (path) => path !== "/imprint" && path !== "/privacy",
                    )
                    .map((path) => (
                      <li key={path}>
                        <a
                          className={classNames(
                            "py-2 rounded-md bg-theme/10 border border-theme text-theme-text flex px-4",
                            pathname === path && "font-bold",
                          )}
                          onClick={() => setShow(false)}
                          href={path}
                        >
                          {path === "/" && "Startseite"}
                          {path === "/courses" && "Unsere Kurse"}
                          {path === "/about" && "Über uns"}
                          {path === "/contact" && "Kontakt"}
                          {path === "/anmeldung" && "Anmeldung"}
                        </a>
                      </li>
                    ))}
                </ul>
                <ul className="mt-8 flex flex-col gap-2">
                  <li>
                    <a
                      className={classNames(
                        "py-2 rounded-md bg-theme/10 border border-theme text-theme-text flex px-4",
                        pathname === "/imprint" && "font-bold",
                      )}
                      onClick={() => setShow(false)}
                      title="Impressum"
                      href="/imprint"
                    >
                      Impressum
                    </a>
                  </li>
                  <li>
                    <a
                      className={classNames(
                        "py-2 rounded-md bg-theme/10 border border-theme text-theme-text flex px-4",
                        pathname === "/privacy" && "underline font-bold",
                      )}
                      title="Datenschutz"
                      onClick={() => setShow(false)}
                      href="/privacy"
                    >
                      Datenschutz
                    </a>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
