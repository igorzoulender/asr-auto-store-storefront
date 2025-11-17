import { Search, CreditCard, ClipboardCheck, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choisissez votre véhicule",
    description: "Parcourez notre catalogue en ligne et trouvez la voiture qui correspond à vos besoins et votre budget.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Réservez avec acompte",
    description: "Sécurisez votre choix avec un acompte. Votre véhicule est maintenant réservé pour vous.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Inspection rigoureuse",
    description: "Notre équipe effectue une inspection complète de 150 points pour garantir la qualité du véhicule.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Livraison & Garantie",
    description: "Recevez votre voiture avec tous les documents, la garantie écrite et un suivi complet.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#fbfbfc] pt-0 mb-20 ">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Comment ça <span className="text-red-600">marche</span> ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-500">
            Un processus simple et transparent en 4 étapes pour vous garantir une expérience
            d'achat sereine et sécurisée.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative mt-14">
          {/* Connection Line - Desktop */}
          <div
            className="hidden lg:block absolute inset-x-16 top-1/2 h-[3px] bg-gradient-to-r from-red-500 via-rose-400 to-orange-300"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_25px_50px_rgba(15,23,42,0.08)] border border-[#f0f0f3] transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Step Number */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-[18px] bg-red-600 text-white font-bold text-2xl flex items-center justify-center shadow-[0_12px_24px_rgba(220,38,38,0.35)]">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#f3f4f6] flex items-center justify-center border border-white shadow-inner">
                    <step.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;