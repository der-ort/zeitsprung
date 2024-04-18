import React, { FC } from 'react';
import { DateTime } from "luxon";

interface BlogContainerProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const BlogContainer: FC<BlogContainerProps> = () => {
  return (
    <>
      <div className="blog-container">
        <h2>discoveries</h2>
          <p className="blog-entry">
            Eigentlich sollte dies eine über 1000 Kilometer lange Alpenüberquerung werden, von München bis zum Rande der Poebene.
            Da ich unterwegs wegen einer Knieverletzung eine über 7 wöchige Zwangspause machen musste, habe ich leider nur knapp 500 Kilometer geschafft, also weniger wie die Hälfte meiner ursprünglich geplanten Route.
            Trotzdem ist es eine schöne Tour geworden und ich habe mich jetzt nicht so wahnsinnig über das geärgert was ich nicht mehr machen konnte, sondern mich gefreut über die Strecke die ich gewandert bin. Nächstes Jahr ist schließlich auch noch ein jahr……

            Wenn Corona nicht wäre, wäre ich dieses Jahr wohl nach Peru geflogen. Es wäre deutlich schlimmer wenn es mit meinem Knie dort passiert wäre. Etliche Wochen in einem fremden Land zum Auskurieren im Hotel zu verbringen wäre der Horror. Von den Alpen konnte ich wenigstens zum Auskurieren schnell nach Hause fahren.

            Diese Tour habe ich wie immer als autarke Zelttour durchgeführt und Proviant für jeweils 4 bis 8 Tage mitgeschleppt, jenachdem wie weit es bis zum nächsten Talabstieg und Einkaufsmöglichkeit war.
            Ausserdem hatte ich noch Steigeisen und Pickel mit, die leider nicht mehr zum Einsatz kamen, da ich es bis zu den Gletscherregionen der Zentralalpen nicht mehr geschafft habe. Also umsonst mitgeschleppt.
            Mein Gepäck war auf dieser Tour zwar genauso schwer wie auf den meisten anderen Touren auch, also für Alpenverhältnisse relativ schwer, da hier nur wenige Leute Zelttouren machen. Somit bin ich wohl auch auf einen geringeren Kilometerschnitt gekommen, wie die meisten Leute, die mit nur wenig Gepäck von Hütte zu Hütte wandern.

            Diese Tour splittet sich auf in zwei Teilen. Im ersten Teil geht es um die Strecke vor dem Tourabbruch und im zweiten Teil um die danach.
            &copy; berniehh @ https://www.outdoorseiten.net/vb5/forum/tourenberichte/tourenberichte-d-a-ch/113387-ostalpentour-2020    
          </p> 
        <h2>notes</h2>
        <p className="blog-entry">BLOG CONTAINER</p> 
      </div>   
      </>
  );
};

export default BlogContainer;