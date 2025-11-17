"use client"

import Image from "next/image"

const brands = [
  { name: "Audi", logo: "/images/icons/brands/audi.svg" },
  { name: "Toyota", logo: "/images/icons/brands/toyota.svg" },
  { name: "Mercedes-Benz", logo: "/images/icons/brands/mercedes.svg" },
  { name: "BMW", logo: "/images/icons/brands/bmw.svg" },
  { name: "Hyundai", logo: "/images/icons/brands/hyundai.svg" },
  { name: "Land over", logo: "/images/icons/brands/land_over.svg" },
  { name: "KIA", logo: "/images/icons/brands/kia.svg" },
  { name: "MG", logo: "/images/icons/brands/mg.svg" },
]

const PopularBrands = () => {
  return (
    <section
      className="relative py-20 md:py-24 text-white overflow-hidden"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,%3Csvg%20width%3D%221920%22%20height%3D%22954%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23prefix__clip0_75_23031%29%22%20fill%3D%22rgba%2835%2C100%2C196%2C1%29%22%3E%3Cpath%20d%3D%22M1321.57%20538C1357.08%20287.516%201273.7%2089.91%201127-.418L1374.18-6c65.77%20100.68-15.89%20431.512-52.61%20544zM312%20955c432.242%200%20746.77-180.667%20850-271-90.34%20157.09-176.766%20246.121-208.688%20271H312z%22%20fill%3D%22rgba%2835%2C100%2C196%2C1%29%22%20fill-opacity%3D%22.25%22%2F%3E%3Cpath%20d%3D%22M1344.5%20427c0-252.4-212.67-390.833-319-428.5H1373c70%2082.4%2010.17%20320-28.5%20428.5z%22%20fill%3D%22rgba%2835%2C100%2C196%2C1%29%22%20fill-opacity%3D%22.1%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M839.644%20954C1138.37%20793.549%201337%20508.902%201337%20184.5c0-63.218-7.54-124.926-21.9-184.5H1920v954H839.644zm0%200C676.842%201041.44%20484.311%201092%20278%201092c-584.87%200-1059-406.302-1059-907.5S-306.87-723%20278-723c511.098%200%20937.63%20310.269%201037.1%20723H0v954h839.644z%22%20fill%3D%22rgba%2835%2C100%2C196%2C1%29%22%20fill-opacity%3D%22.5%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1011.55%20954C1221.42%20793.95%201353%20564.007%201353%20308.5c0-108.584-23.76-212.552-67.2-308.5H1920v954h-908.45zm0%200c-187.291%20142.83-436.933%20230-711.05%20230C-280.78%201184-752%20792.025-752%20308.5S-280.78-567%20300.5-567c450.743%200%20835.31%20235.692%20985.3%20567H0v954h1011.55z%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22prefix__clip0_75_23031%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h1920v954H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E\")",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#051130]/75" />
      <div className="relative z-10 content-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Explorez Les Marques Populaires
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75 px-2">
            Découvrez notre sélection de véhicules des marques les plus plébiscitées par nos clients
            pour leur fiabilité et leur innovation constante sur le marché.
          </p>
        </div>

        <div className="border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="relative border-white/10 border-b sm:border-b border-r sm:border-r last:border-r-0 sm:[&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-last-child(-n+4)]:border-b-0 flex flex-col items-center justify-center py-10 px-6 gap-4"
              >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={140}
                    height={60}
                    className="h-12 md:h-16 w-auto object-contain opacity-80"
                    id="react-select-2-live-region"
                  />

                <p className="text-base font-medium text-white/80 uppercase tracking-wide">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularBrands

