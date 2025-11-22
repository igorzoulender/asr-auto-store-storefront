"use client"

import { useState } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import StoreFilter from "../store-filter"
import Modal from "@modules/common/components/modal"

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const countryCode = params?.countryCode as string || "fr"

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const resetFilters = () => {
    router.push(`/${countryCode}/store`)
    // Optional: Close modal after reset if desired, but keeping it open allows user to see it's cleared
  }

  return (
    <>
      <button
        onClick={open}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors justify-center lg:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        <span>Filtrer</span>
      </button>

      <Modal isOpen={isOpen} close={close} size="large">
        <Modal.Title>
          <div className="flex justify-between items-center w-full pr-8">
            <span className="text-xl font-bold">Filtres</span>
            <button 
                onClick={resetFilters}
                className="text-primary-red hover:text-red-700 text-sm font-medium"
            >
                Effacer tout
            </button>
          </div>
        </Modal.Title>
        <Modal.Body>
          <div className="w-full py-4 pb-20 overflow-y-auto max-h-[60vh]">
            <StoreFilter className="space-y-4" hideTitle key={searchParams.toString()} />
          </div>
        </Modal.Body>
        <Modal.Footer>
            <button
                onClick={close}
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors w-full"
            >
                Voir les résultats
            </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MobileFilter
