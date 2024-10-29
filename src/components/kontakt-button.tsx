import { AnimatePresence, motion } from "framer-motion";
import kontakt from "../assets/kontakt.svg";
import { useState } from "react";
import { EMAIL_ADDRESS, MOBILE_NUMBER, PHONE_NUMBER } from "../lib/definitions";

export function KontaktButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="fixed top-[100px] md:top-[200px] right-0 z-10"
      >
        <img src={kontakt} alt="Kontakt" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-50"
            onClick={() => setShow(false)}
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "200%" }}
              animate={{ x: 0 }}
              exit={{ x: "200%" }}
              className="fixed right-0 top-12 z-50 bg-white p-4 shadow rounded-xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <p className="font-bold">MusicSchool CML GbR</p>
              <p>Jana Jeschek</p>
              <p>Ottostraße 31</p>
              <p>D-85521 Ottobrunn</p>
              <p className="mt-4">
                Tel.:{" "}
                <a href={`tel:${PHONE_NUMBER}`}>
                  {PHONE_NUMBER.toString().replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "($1) $2 $3",
                  )}
                </a>
              </p>
              <p>
                Mobil:{" "}
                <a className="hover:underline" href={`tel:${MOBILE_NUMBER}`}>
                  {MOBILE_NUMBER.toString().replace(
                    /(\d{2})(\d{3})(\d{4})/,
                    "($1) $2-$3",
                  )}
                </a>
              </p>
              <p className="mt-2">
                Mail:{" "}
                <a
                  className="hover:underline"
                  href={`mailto:${EMAIL_ADDRESS}`}
                >
                  {EMAIL_ADDRESS}
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
