"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import Select, {
  StylesConfig,
  ControlProps,
  OptionProps,
  CSSObjectWithLabel,
} from "react-select"
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
  { value: "neuf", label: "Neuf" },
  { value: "occasion", label: "Occasion" },
  { value: "immatricule", label: "Immatriculé" },
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
const createSelectStyles = <T, IsMulti extends boolean>(): StylesConfig<T, IsMulti> => ({
  control: (provided: CSSObjectWithLabel, state: ControlProps<T, IsMulti>) => ({
    ...provided,
    minHeight: "48px",
    borderColor: state.isFocused ? "#dc2626" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #dc2626" : "none",
    "&:hover": {
      borderColor: "#dc2626",
    },
  }),
  option: (provided: CSSObjectWithLabel, state: OptionProps<T, IsMulti>) => ({
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
})

const singleSelectStyles = createSelectStyles<OptionType, false>()
const multiSelectStyles = createSelectStyles<MultiOptionType, true>()

const StoreFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const countryCode = params?.countryCode as string || "fr"
  
  // Initialiser les états depuis les paramètres URL
  const getInitialValue = (key: string, defaultValue: OptionType) => {
    const param = searchParams.get(key)
    if (!param) return defaultValue
    const option = [...brands, ...vehicleTypes, ...fuelTypes, ...transmissionTypes, ...years].find(
      (opt) => opt.value === param
    )
    return option || defaultValue
  }

  const getInitialModels = (): MultiOptionType[] => {
    const modelsParam = searchParams.get("models")
    if (!modelsParam) return []
    const modelValues = modelsParam.split(",")
    // TODO: Récupérer les modèles depuis les données réelles
    return []
  }

  const [selectedBrand, setSelectedBrand] = useState<OptionType | null>(
    getInitialValue("brand", brands[0])
  )
  const [selectedModels, setSelectedModels] = useState<MultiOptionType[]>(getInitialModels())
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(
    getInitialValue("year", years[0])
  )
  const [selectedVehicleType, setSelectedVehicleType] = useState<OptionType | null>(
    getInitialValue("type", vehicleTypes[0])
  )
  const [selectedFuel, setSelectedFuel] = useState<OptionType | null>(
    getInitialValue("fuel", fuelTypes[0])
  )
  const [selectedTransmission, setSelectedTransmission] = useState<OptionType | null>(
    getInitialValue("transmission", transmissionTypes[0])
  )

  // IDs statiques pour éviter les erreurs d'hydratation
  const brandSelectId = "store-filter-brand"
  const modelSelectId = "store-filter-model"
  const yearSelectId = "store-filter-year"
  const vehicleTypeSelectId = "store-filter-type"
  const fuelSelectId = "store-filter-fuel"
  const transmissionSelectId = "store-filter-transmission"

  // Mettre à jour les modèles disponibles quand la marque change
  const availableModels = selectedBrand?.value
    ? getModelsByBrand(selectedBrand.value)
    : []

  // Fonction pour mettre à jour les paramètres URL
  const updateURLParams = (
    newBrand?: OptionType | null,
    newModels?: MultiOptionType[],
    newYear?: OptionType | null,
    newVehicleType?: OptionType | null,
    newFuel?: OptionType | null,
    newTransmission?: OptionType | null
  ) => {
    const params = new URLSearchParams(searchParams)
    
    const brand = newBrand !== undefined ? newBrand : selectedBrand
    const models = newModels !== undefined ? newModels : selectedModels
    const year = newYear !== undefined ? newYear : selectedYear
    const vehicleType = newVehicleType !== undefined ? newVehicleType : selectedVehicleType
    const fuel = newFuel !== undefined ? newFuel : selectedFuel
    const transmission = newTransmission !== undefined ? newTransmission : selectedTransmission
    
    if (brand?.value && brand.value !== "all") {
      params.set("brand", brand.value)
    } else {
      params.delete("brand")
    }
    
    if (models.length > 0) {
      params.set("models", models.map((m) => m.value).join(","))
    } else {
      params.delete("models")
    }
    
    if (year?.value && year.value !== "all") {
      params.set("year", year.value)
    } else {
      params.delete("year")
    }
    
    if (vehicleType?.value && vehicleType.value !== "all") {
      params.set("type", vehicleType.value)
    } else {
      params.delete("type")
    }
    
    if (fuel?.value && fuel.value !== "all") {
      params.set("fuel", fuel.value)
    } else {
      params.delete("fuel")
    }
    
    if (transmission?.value && transmission.value !== "all") {
      params.set("transmission", transmission.value)
    } else {
      params.delete("transmission")
    }

    // Réinitialiser la page à 1 lors d'un changement de filtre
    params.set("page", "1")

    router.push(`/${countryCode}/store?${params.toString()}`)
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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Filtres</h3>
      
      <div className="space-y-4">
        {/* Marque */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marque
          </label>
          <Select<OptionType>
            instanceId={brandSelectId}
            options={brands}
            value={selectedBrand}
            onChange={(newValue: OptionType | null) => {
              setSelectedBrand(newValue)
              setSelectedModels([])
              updateURLParams(newValue, [], undefined, undefined, undefined, undefined)
            }}
            formatOptionLabel={formatOptionLabel}
            styles={singleSelectStyles}
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
          <Select<MultiOptionType, true>
            instanceId={modelSelectId}
            options={availableModels}
            value={selectedModels}
            onChange={(newValue: readonly MultiOptionType[]) => {
              const models = [...newValue]
              setSelectedModels(models)
              updateURLParams(undefined, models, undefined, undefined, undefined, undefined)
            }}
            styles={multiSelectStyles}
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
            instanceId={yearSelectId}
            options={years}
            value={selectedYear}
            onChange={(newValue: OptionType | null) => {
              setSelectedYear(newValue)
              updateURLParams(undefined, undefined, newValue, undefined, undefined, undefined)
            }}
            styles={singleSelectStyles}
            isSearchable
            placeholder="Toutes les années"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Type de véhicule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de véhicule
          </label>
          <Select<OptionType>
            instanceId={vehicleTypeSelectId}
            options={vehicleTypes}
            value={selectedVehicleType}
            onChange={(newValue: OptionType | null) => {
              setSelectedVehicleType(newValue)
              updateURLParams(undefined, undefined, undefined, newValue, undefined, undefined)
            }}
            styles={singleSelectStyles}
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
            instanceId={fuelSelectId}
            options={fuelTypes}
            value={selectedFuel}
            onChange={(newValue: OptionType | null) => {
              setSelectedFuel(newValue)
              updateURLParams(undefined, undefined, undefined, undefined, newValue, undefined)
            }}
            styles={singleSelectStyles}
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
            instanceId={transmissionSelectId}
            options={transmissionTypes}
            value={selectedTransmission}
            onChange={(newValue: OptionType | null) => {
              setSelectedTransmission(newValue)
              updateURLParams(undefined, undefined, undefined, undefined, undefined, newValue)
            }}
            styles={singleSelectStyles}
            isSearchable
            placeholder="Toutes les transmissions"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    </div>
  )
}

export default StoreFilter

