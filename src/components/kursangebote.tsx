import klavierGelbBackground from "../assets/klavier-gelb-background.svg";
import gitarre from "../assets/gitarre.png";
import floete from "../assets/floete.png";
import schlagzeug from "../assets/schlagzeug.png";
import bass from "../assets/bass.png";
import klavier from "../assets/klavier.png";
import klavierGelb from "../assets/klavier-gelb-min_2x.png";

type KursangebotProps = {
  background: string;
  angebot: string;
  image?: string;
};

function Kursangebot(props: KursangebotProps) {
  const className =
    props.image === undefined
      ? "h-[200px] md:h-[300px]"
      : "h-[500px] md:h-[600px]";

  const contentClassName = props.image === undefined ? "mt-0" : "mt-72 md:mt-0";
  return (
    <div
      style={{ backgroundColor: props.background }}
      className="text-theme-text py-12 md:py-24"
    >
      <div
        className={`flex mt-8 md:mt-0 flex-row container mx-auto max-w-5xl items-center flex-nowrap w-full relative justify-end ${className}`}
      >
        {props.image !== undefined && (
          <>
            <img
              className="absolute inset-0 w-full md:w-1/2"
              src={klavierGelbBackground}
              alt="Klavier"
            />
            <img
              src={klavierGelb}
              alt="Klavier"
              className="w-[70%] md:w-[40%] absolute top-20 md:top-32 left-12 md:left-20"
            />
            <img
              src={props.image}
              alt="Klavier"
              className="w-[80%] md:w-[40%] absolute top-12 md:top-32 left-12 md:left-20"
            />
          </>
        )}
        <div
          className={`flex gap-4 z-10 flex-col w-full md:w-auto ${contentClassName}`}
        >
          <p className="text-3xl font-bold text-center md:text-left">
            {props.angebot}
          </p>
          <div className="gap-4 flex flex-row flex-nowrap px-8 md:px-0">
            <a
              className="bg-dark-red w-full text-center text-white py-2 px-4 rounded-md hover:underline"
              href="/#preise"
            >
              Jetzt anmelden
            </a>
            <a
              className="bg-theme w-full text-center text-white py-2 px-3 rounded-md hover:underline"
              href="/about"
            >
              Deine Lehrer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Kursangebote() {
  return (
    <section
      className="flex flex-col flex-nowrap pt-12"
      style={{ backgroundColor: "rgb(252, 243, 226)" }}
    >
      <h2 className="text-4xl px-8 md:px-8 whitespace-pre-wrap md:whitespace-nowrap md:text-6xl text-center w-full font-bold">
        Unsere Kursangebote
      </h2>
      <Kursangebot
        background="rgb(252, 243, 226)"
        angebot="Klavier, Piano, Keyboard"
        image={klavier}
      />
      <Kursangebot background="#FBEBCE" angebot="Gitarre" image={gitarre} />
      <Kursangebot
        background="rgb(252, 243, 226)"
        angebot="Bass"
        image={bass}
      />
      <Kursangebot
        background="#FBEBCE"
        angebot="Schlagzeug"
        image={schlagzeug}
      />
      <Kursangebot
        background="rgb(252, 243, 226)"
        angebot="Blockflöte"
        image={floete}
      />
      <Kursangebot background="#FBEBCE" angebot="Ukulele" />
      <Kursangebot background="rgb(252, 243, 226)" angebot="Gesang" />
    </section>
  );
}
