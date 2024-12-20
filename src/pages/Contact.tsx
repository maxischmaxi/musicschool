import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodString } from "zod";
import { apiGateway } from "../lib/definitions";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const kontaktSchema = z.object({
  token: z
    .string({
      message: "Bitte füllen Sie das Captcha aus",
      required_error: "Bitte füllen Sie das Captcha aus",
    })
    .min(1, {
      message: "Bitte füllen Sie das Captcha aus",
    }),
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
  token: ZodString;
}>;

export function Contact() {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const { setValue, reset, handleSubmit, formState, register } = useForm<
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
    fetch(`${apiGateway}/contact`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setSuccessModal(true);
        reset();
      })
      .catch(() => {
        setErrorModal(true);
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
          <GoogleReCaptcha
            onVerify={(token) => {
              setValue("token", token);
            }}
          />
          {Boolean(errors.token?.message) && (
            <p className="text-red-500">{errors.token?.message}</p>
          )}
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
