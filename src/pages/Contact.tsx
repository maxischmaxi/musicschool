import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodString } from "zod";

const kontaktSchema = z.object({
  email: z
    .string({
      required_error: "Bitte gib deine E-Mail-Adresse an.",
    })
    .email({
      message: "Bitte gib eine gültige E-Mail-Adresse an.",
    }),
  name: z.string({
    required_error: "Bitte gib deinen Namen an.",
  }),
  message: z
    .string({
      required_error: "Bitte gib eine Nachricht an.",
    })
    .min(10, {
      message: "Deine Nachricht sollte mindestens 10 Zeichen lang sein.",
    }),
});

type KontaktSchema = ZodObject<{
  email: ZodString;
  name: ZodString;
  message: ZodString;
}>;

export function Contact() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const { reset, handleSubmit, formState, register } = useForm<
    z.infer<KontaktSchema>
  >({
    resolver: zodResolver(kontaktSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
  });

  const submit = (data: z.infer<KontaktSchema>): void => {
    if (!captchaRef.current) {
      return;
    }

    const token = captchaRef.current.getValue();

    if (!token || !token.length) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_GATEWAY}/contact`, {
      method: "POST",
      body: JSON.stringify({ ...data, token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setSuccessModal(true);
      })
      .catch(() => {
        setErrorModal(true);
      })
      .finally(() => {
        reset();
      });
  };

  const { isSubmitting, errors } = formState;

  return (
    <main className="container mx-auto max-w-5xl px-4 md:px-8">
      <form className="w-full" onSubmit={handleSubmit(submit)}>
        <div className="space-y-4 pt-12 md:pt-8 pb-12 md:pb-24">
          <h1 className="text-theme-text font-bold text-4xl">Kontakt</h1>
          <h4 className="text-theme-text font-semibold">
            Falls Sie Fragen haben, können Sie uns gerne kontaktieren.
          </h4>
          <div className="space-y-1">
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              autoComplete="email"
              autoCapitalize="off"
              autoCorrect="off"
              {...register("email")}
              type="email"
              placeholder="E-Mail"
              className="rounded-md border border-solid border-gray-200 p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              autoComplete="name"
              autoCapitalize="off"
              autoCorrect="off"
              {...register("name")}
              type="text"
              placeholder="Name"
              className="rounded-md border border-solid border-gray-200 p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="message">Nachricht</label>
            <textarea
              autoComplete="off"
              autoCorrect="off"
              id="message"
              {...register("message")}
              placeholder="Nachricht"
              className="rounded-md border border-solid border-gray-200 p-2 w-full"
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            ref={captchaRef}
          />
          <div className="flex">
            <button
              className="bg-theme disabled:opacity-50 text-white rounded-md py-2 px-4"
              type="submit"
              disabled={isSubmitting}
            >
              Absenden
            </button>
          </div>
        </div>
      </form>
      {successModal && (
        <div
          onClick={() => setSuccessModal(false)}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 space-y-4 w-[80%] md:w-[40%]"
          >
            <p className="text-theme-text font-bold">
              Vielen Dank für Ihre Nachricht!
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-theme text-white rounded-md py-2 px-4"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
      {errorModal && (
        <div
          onClick={() => setSuccessModal(false)}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4"
          >
            <p className="text-theme-text font-bold">
              Es ist ein Fehler aufgetreten.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="bg-theme text-white rounded-md py-2 px-4"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
