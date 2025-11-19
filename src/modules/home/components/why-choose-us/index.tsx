import {Lightbulb, SearchCheck, CheckCircle2, Scale  } from "lucide-react"
const BACKGROUND_IMAGE =
  'url("data:image/svg+xml;utf8,%3Csvg%20width%3D%221920%22%20height%3D%22954%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23prefix__clip0_75_23031%29%22%20fill%3D%22rgba%2835%2C100%2C196%2C1%29%22%3E%3Cpath%20d%3D%22M1321.57%20538C1357.08%20287.516%201273.7%2089.91%201127-.418L1374.18-6c65.77%20100.68-15.89%20431.512-52.61%20544zM312%20955c432.242%200%20746.77-180.667%20850-271-90.34%20157.09-176.766%20246.121-208.688%20271H312z%22%20fill%3D%22rgba%28255%2C255%2C255%2C1%29%22%20fill-opacity%3D%22.25%22%2F%3E%3Cpath%20d%3D%22M1344.5%20427c0-252.4-212.67-390.833-319-428.5H1373c70%2082.4%2010.17%20320-28.5%20428.5z%22%20fill%3D%22rgba%28255%2C255%2C255%2C1%29%22%20fill-opacity%3D%22.1%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M839.644%20954C1138.37%20793.549%201337%20508.902%201337%20184.5c0-63.218-7.54-124.926-21.9-184.5H1920v954H839.644zm0%200C676.842%201041.44%20484.311%201092%20278%201092c-584.87%200-1059-406.302-1059-907.5S-306.87-723%20278-723c511.098%200%20937.63%20310.269%201037.1%20723H0v954h839.644z%22%20fill%3D%22rgba%28255%2C255%2C255%2C1%29%22%20fill-opacity%3D%22.5%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1011.55%20954C1221.42%20793.95%201353%20564.007%201353%20308.5c0-108.584-23.76-212.552-67.2-308.5H1920v954h-908.45zm0%200c-187.291%20142.83-436.933%20230-711.05%20230C-280.78%201184-752%20792.025-752%20308.5S-280.78-567%20300.5-567c450.743%200%20835.31%20235.692%20985.3%20567H0v954h1011.55z%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22prefix__clip0_75_23031%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h1920v954H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E")'

const highlights = [
  {
    icon: Lightbulb,
    title: "Notre Vision Nouvelle Génération",
    description:
      "Nous apportons un souffle nouveau dans le secteur avec des méthodes innovantes et une passion intacte pour répondre aux besoins actuels des automobilistes.",
  },
  {
    icon: SearchCheck,
    title: "Personnalisé et trouver votre véhicule idéal",
    description:
      "Notre équipe de passionnés s’engage dans une recherche active et ciblée pour identifier le véhicule qui épousera parfaitement vos besoins spécifiques.",
  },
  {
    icon: CheckCircle2,
    title: "Qualité Rigoureusement Contrôlée",
    description:
      "Chaque voiture subit 150 points de contrôle minimum. Batterie, freins, mécanique – rien n’est laissé au hasard pour votre sécurité et tranquillité d’esprit.",
  },
  {
    icon: Scale,
    title: "Transparence & Meilleur Rapport Qualité-Prix",
    description:
      "Pas de frais cachés, pas de commissions excessives. Nous croyons en des relations commerciales transparentes et durables avec nos clients.",
  },
]

const WhyChooseUs = () => {
  return (
    <section className="relative isolate bg-[#051838] px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-16">
      <div
        className="absolute inset-0 opacity-70"
        style={{ backgroundImage: BACKGROUND_IMAGE, backgroundSize: "cover" }}
      />

      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Pourquoi nous choisir ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75 px-2">
            Découvrez les raisons qui font de nous un partenaire de confiance
            pour l’achat de votre prochain véhicule en toute sérénité.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex gap-6 items-start"
            >
              {/* Icon with white background inside red circle */}
              <div className="flex-shrink-0">
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary-red shadow-lg shadow-primary-red/30">
                  {/* White circle inside */}
                  <div className="absolute inset-2 rounded-full"></div>
                  {/* Icon on top of white circle - white with stroke for visibility */}
                  <div className="relative z-10">
                    <item.icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                </div>
              </div>
              {/* Text content */}
              <div className="flex-1 pt-1">
                <h3 className="text-2xl sm:text-2xl font-display font-bold text-white leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
