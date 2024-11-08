import jana from "../assets/jana.png";
import martin from "../assets/martin.png";
import benjamin from "../assets/benjamin.png";

type Props = {
  image: string;
  name: string;
  spitzname: string;
  items: string[];
};

function Lehrer(props: Props) {
  return (
    <div className="col-span-1 border border-solid border-gray-200 flex flex-col gap-4 rounded-xl p-4">
      <div className="flex flex-row items-center justify-center px-12">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-[300px] md:h-[200px] object-contain"
        />
      </div>
      <p className="w-full text-center text-theme font-bold">
        {props.name}
        <br />„{props.spitzname}“
      </p>
      <ul className="text-center w-full text-theme-text font-bold mt-auto pb-8">
        {props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <main className="container px-4 md:px-8 pt-12 md:pt-0 mx-auto max-w-5xl">
      <h4 className="uppercase italic w-full text-left text-gray-800 text-6xl font-semibold">
        Das sind wir
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <p className="col-span-1 text-theme-text font-semibold">
          MusicSchool CML – die etwas andere musikalische Bildung zwischen 4 -
          80 Jahren. Seit fast 40 Jahren unterrichten wir Anfänger und
          Fortgeschrittene im bayerischen Ottobrunn.
        </p>
        <p className="col-span-1 text-theme-text font-semibold">
          Unser Musikunterricht findet Montag bis Samstag nach Terminabsprache
          statt. Ob Einzel- oder Gruppenunterricht – wähle das für dich passende
          Unterrichtsmodell.
          <br />
          Sprich uns an – wir beraten dich gern.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <Lehrer
          name="Jana"
          image={jana}
          spitzname="Die Tastenfee"
          items={["Keyboard", "Klavier", "Piano"]}
        />
        <Lehrer
          name="Martin"
          image={martin}
          spitzname="Zupfmeister"
          items={["Gitarre", "Ukulele", "Gesang"]}
        />
        <Lehrer
          name="Lukas"
          image={jana}
          spitzname="Mozart"
          items={["Keyboard", "Klavier", "Piano"]}
        />
        <Lehrer
          name="Christopher"
          image={benjamin}
          spitzname="Boogie-Man"
          items={[
            "Saxophon",
            "E-Gitarre",
            "Klavier",
            "Schlagzeug",
            "Blockflöte",
          ]}
        />
      </div>
      <h4 className="mt-12 w-full text-theme text-center font-semibold mb-24 text-3xl">
        Unser Musikunterricht ist ein sozialer
        <br />
        Kommunikationsprozess zwischen menschlich
        <br />
        gleichberechtigten Partnern.
      </h4>
    </main>
  );
}
