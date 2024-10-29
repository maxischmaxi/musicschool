import {
  EMAIL_ADDRESS,
  MOBILE_NUMBER,
  PHONE_NUMBER,
  VISIBLE_PHONE_NUMBER,
} from "../lib/definitions";

export function Imprint() {
  return (
    <main className="container mx-auto max-w-5xl px-4 md:px-0 pb-12 md:pb-24 text-theme-text">
      <h1 className="w-full text-5xl font-semibold text-center">Impressum</h1>
      <p className="font-bold text-lg mt-12">MusicSchool CML GbR</p>
      <p className="font-semibold mt-8">Jana Jeschek</p>
      <p className="font-semibold">Ottostraße 31</p>
      <p className="font-semibold">D-85521 Ottobrunn</p>
      <ul className="mt-8 space-y-1 max-w-[500px]">
        <li className="flex flex-row flex-nowrap items-center justify-between">
          <p>Telefon</p>
          <a className="font-semibold" href={`tel:${PHONE_NUMBER}`}>
            {VISIBLE_PHONE_NUMBER}
          </a>
        </li>
        <li className="flex flex-row flex-nowrap items-center justify-between">
          <p>Mobil</p>
          <a className="font-semibold" href={`tel:${MOBILE_NUMBER}`}>
            {MOBILE_NUMBER}
          </a>
        </li>
        <li className="flex flex-row flex-nowrap items-center justify-between">
          <p>E-Mail</p>
          <a className="font-semibold" href={`mailto:${EMAIL_ADDRESS}`}>
            {EMAIL_ADDRESS}
          </a>
        </li>
      </ul>
      <p className="font-bold text-lg mt-12">Haftung für Inhalte</p>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen.
      </p>
      <p className="mt-4">
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei bekannt werden
        von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <p className="font-bold text-lg mt-12">Haftung für as</p>
      <p>
        Unser Angebot enthält as zu externen Webseiten Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei bekannt werden
        von Rechtsverletzungen werden wir derartige as umgehend entfernen.
      </p>
      <p className="font-bold text-lg mt-12">Urheberrecht</p>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
        sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
      <p className="mt-4">
        Die Betreiber der Seiten sind bemüht, stets die Urheberrechte anderer zu
        beachten bzw. auf selbst erstellte sowie lizenzfreie Werke
        zurückzugreifen. Sollte es dennoch zu einer Verletzung führen, bitten
        wir um kurze Information. Wir werden das Material dann umgehend
        entfernen.
      </p>
    </main>
  );
}
