import { Hero } from "../components/hero";
import { Kursangebote } from "../components/kursangebote";
import { Preise } from "../components/preise";

export function Home() {
  return (
    <>
      <Hero />
      <main>
        <section className="container mx-auto max-w-5xl py-12 px-4 md:px-8">
          <h2 className="text-theme">Hallo lieber Musikfreund,</h2>
          <h2 className="text-theme">probier doch mal!</h2>
        </section>
        <Kursangebote />
        <Preise />
      </main>
    </>
  );
}
