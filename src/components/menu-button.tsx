import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.svg";

export function MenuButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="md:hidden p-4" onClick={() => setShow(true)}>
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
              <nav className="w-full flex flex-col h-full">
                <a href="/">
                  <img src={logo} alt="MusicSchool CML Logo" />
                </a>
                <ul className="w-full flex flex-col h-full gap-2 mt-8">
                  <li className="py-2">
                    <a onClick={() => setShow(false)} href="/">
                      Startseite
                    </a>
                  </li>
                  <li className="py-2">
                    <a onClick={() => setShow(false)} href="/courses">
                      Unsere Kurse
                    </a>
                  </li>
                  <li className="py-2">
                    <a onClick={() => setShow(false)} href="/about">
                      Über uns
                    </a>
                  </li>
                  <li className="py-2">
                    <a onClick={() => setShow(false)} href="/contact">
                      Kontakt
                    </a>
                  </li>
                </ul>
                <ul className="mt-auto flex flex-col gap-4">
                  <li>
                    <a onClick={() => setShow(false)} href="/imprint">
                      Impressum
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setShow(false)} href="/privacy">
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
