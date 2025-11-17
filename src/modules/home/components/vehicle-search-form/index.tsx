"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Select, { StylesConfig, ControlProps, OptionProps } from "react-select"
import { Button } from "@medusajs/ui"
import Search from "@modules/common/icons/search"
import Image from "next/image"

// Types pour les options
type OptionType = {
  value: string
  label: string
  logo?: string
}

type MultiOptionType = {
  value: string
  label: string
  isSelected?: boolean
}

// Données de test (à remplacer par des données réelles depuis l'API)
const brands: OptionType[] = [
  { value: "all", label: "Toutes les marques", logo: undefined },
  { value: "audi", label: "Audi", logo: "/images/icons/brands/audi.svg" },
  { value: "bmw", label: "BMW", logo: "/images/icons/brands/bmw.svg" },
  { value: "mercedes", label: "Mercedes-Benz", logo: "/images/icons/brands/mercedes.svg" },
  { value: "toyota", label: "Toyota", logo: "/images/icons/brands/toyota.svg" },
  { value: "mg", label: "MG", logo: "/images/icons/brands/mg.svg" },
]

const vehicleTypes: OptionType[] = [
  { value: "all", label: "Tous les types" },
  { value: "immatricule", label: "Immatriculé" },
  { value: "occasion", label: "Occasion" },
  { value: "neuf", label: "Neuf" },
]

const fuelTypes: OptionType[] = [
  { value: "all", label: "Tous les carburants" },
  { value: "electrique", label: "Électrique" },
  { value: "essence", label: "Essence" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
]

const transmissionTypes: OptionType[] = [
  { value: "all", label: "Toutes les transmissions" },
  { value: "manuelle", label: "Manuelle" },
  { value: "automatique", label: "Automatique" },
]

// Générer les années (de 2024 à 1990)
const years: OptionType[] = [
  { value: "all", label: "Toutes les années" },
  ...Array.from({ length: 35 }, (_, i) => ({
    value: String(2024 - i),
    label: String(2024 - i),
  })),
]

// Modèles par marque (à remplacer par des données réelles)
const getModelsByBrand = (brandId: string): MultiOptionType[] => {
  if (brandId === "all" || !brandId) {
    return []
  }
  // Exemple de modèles pour chaque marque
  const modelsMap: Record<string, MultiOptionType[]> = {
    audi: [
      { value: "a3", label: "A3" },
      { value: "a4", label: "A4" },
      { value: "a5", label: "A5" },
      { value: "q5", label: "Q5" },
      { value: "q7", label: "Q7" },
    ],
    bmw: [
      { value: "serie1", label: "Série 1" },
      { value: "serie3", label: "Série 3" },
      { value: "serie5", label: "Série 5" },
      { value: "x3", label: "X3" },
      { value: "x5", label: "X5" },
    ],
    mercedes: [
      { value: "classe-a", label: "Classe A" },
      { value: "classe-c", label: "Classe C" },
      { value: "classe-e", label: "Classe E" },
      { value: "glc", label: "GLC" },
    ],
  }
  return modelsMap[brandId] || []
}

// Styles personnalisés pour react-select
const customStyles: StylesConfig<any, false> = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "48px",
    borderColor: state.isFocused ? "#dc2626" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #dc2626" : "none",
    "&:hover": {
      borderColor: "#dc2626",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#dc2626"
      : state.isFocused
      ? "#fee2e2"
      : "white",
    color: state.isSelected ? "white" : "#1f2937",
    "&:active": {
      backgroundColor: "#dc2626",
      color: "white",
    },
  }),
}

const VehicleSearchForm = () => {
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState<OptionType | null>(brands[0])
  const [selectedModels, setSelectedModels] = useState<MultiOptionType[]>([])
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(years[0])
  const [selectedVehicleType, setSelectedVehicleType] = useState<OptionType | null>(vehicleTypes[0])
  const [selectedFuel, setSelectedFuel] = useState<OptionType | null>(fuelTypes[0])
  const [selectedTransmission, setSelectedTransmission] = useState<OptionType | null>(
    transmissionTypes[0]
  )

  // Mettre à jour les modèles disponibles quand la marque change
  const availableModels = selectedBrand?.value
    ? getModelsByBrand(selectedBrand.value)
    : []

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Construire les paramètres de recherche
    const params = new URLSearchParams()
    
    if (selectedBrand?.value && selectedBrand.value !== "all") {
      params.append("brand", selectedBrand.value)
    }
    
    if (selectedModels.length > 0) {
      params.append("models", selectedModels.map((m) => m.value).join(","))
    }
    
    if (selectedYear?.value && selectedYear.value !== "all") {
      params.append("year", selectedYear.value)
    }
    
    if (selectedVehicleType?.value && selectedVehicleType.value !== "all") {
      params.append("type", selectedVehicleType.value)
    }
    
    if (selectedFuel?.value && selectedFuel.value !== "all") {
      params.append("fuel", selectedFuel.value)
    }
    
    if (selectedTransmission?.value && selectedTransmission.value !== "all") {
      params.append("transmission", selectedTransmission.value)
    }

    router.push(`/store?${params.toString()}`)
  }

  // Format option pour afficher le logo
  const formatOptionLabel = ({ label, logo }: OptionType) => (
    <div className="flex items-center gap-1">
      {logo && (
        <Image
          src={logo}
          alt={label}
          width={50}
          height={40}
          className="object-contain flex-shrink-0"
        />
      )}
      <span className="text-base">{label}</span>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
      {/* Title with icon */}
      <div className="flex items-center gap-3 mb-6">
        <Search size={28} color="#dc2626" />
        <h2 className="text-2xl font-bold text-gray-900">
          Trouvez La Voiture Qui Vous Correspond
        </h2>
      </div>

      {/* First row: Marque, Modèle, Année */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Marque */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marque
          </label>
          <Select<OptionType>
            options={brands}
            value={selectedBrand}
            onChange={(newValue: OptionType | null) => {
              setSelectedBrand(newValue)
              setSelectedModels([]) // Réinitialiser les modèles quand la marque change
            }}
            formatOptionLabel={formatOptionLabel}
            styles={customStyles}
            isSearchable
            placeholder="Toutes les marques"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Modèle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle
          </label>
          {/* @ts-expect-error - Type mismatch between single and multi select styles */}
          <Select<MultiOptionType, true>
            options={availableModels}
            value={selectedModels}
            onChange={(newValue: readonly MultiOptionType[]) => setSelectedModels([...newValue])}
            styles={customStyles}
            isSearchable
            isMulti
            placeholder="Tous les modèles"
            className="react-select-container"
            classNamePrefix="react-select"
            isDisabled={!selectedBrand || selectedBrand.value === "all" || availableModels.length === 0}
          />
        </div>

        {/* Année */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Année
          </label>
          <Select<OptionType>
            options={years}
            value={selectedYear}
            onChange={(newValue: OptionType | null) => setSelectedYear(newValue)}
            styles={customStyles}
            isSearchable
            placeholder="Toutes les années"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Second row: Type de véhicule, Carburant, Transmission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Type de véhicule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de véhicule
          </label>
          <Select<OptionType>
            options={vehicleTypes}
            value={selectedVehicleType}
            onChange={(newValue: OptionType | null) => setSelectedVehicleType(newValue)}
            styles={customStyles}
            isSearchable
            placeholder="Tous les types"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Carburant */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carburant
          </label>
          <Select<OptionType>
            options={fuelTypes}
            value={selectedFuel}
            onChange={(newValue: OptionType | null) => setSelectedFuel(newValue)}
            styles={customStyles}
            isSearchable
            placeholder="Tous les carburants"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transmission
          </label>
          <Select<OptionType>
            options={transmissionTypes}
            value={selectedTransmission}
            onChange={(newValue: OptionType | null) => setSelectedTransmission(newValue)}
            styles={customStyles}
            isSearchable
            placeholder="Toutes les transmissions"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      {/* Bouton de recherche aligné à droite */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold transition-all duration-300 flex items-center gap-2"
        >
          <Search size={20} color="white" />
          <span>RECHERCHER</span>
        </Button>
      </div>
    </form>
  )
}

export default VehicleSearchForm

