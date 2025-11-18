"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type LanguageSelectProps = {
  regions: HttpTypes.StoreRegion[]
}

const LanguageSelect = ({ regions }: LanguageSelectProps) => {
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  // Initialize current with null to ensure controlled component
  const [current, setCurrent] = useState<CountryOption | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (options && options.length > 0) {
      if (countryCode) {
        const option = options.find((o) => o?.country === countryCode)
        if (option) {
          setCurrent(option)
        } else {
          setCurrent(options[0])
        }
      } else {
        setCurrent(options[0])
      }
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Listbox
        as="span"
        onChange={handleChange}
        value={current}
        id="language-select-listbox"
      >
        <ListboxButton
          className="flex items-center gap-x-2 hover:text-ui-fg-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          {current && (
            <>
              {/* @ts-ignore */}
              <ReactCountryFlag
                svg
                style={{
                  width: "20px",
                  height: "20px",
                }}
                countryCode={current.country ?? ""}
              />
            </>
          )}
        </ListboxButton>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <ListboxOptions
            className="absolute right-0 top-full mt-2 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar rounded-rounded w-48"
            static
          >
            {options?.map((o, index) => {
              return (
                <ListboxOption
                  key={index}
                  value={o}
                  className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                  onClick={() => handleChange(o)}
                >
                  {/* @ts-ignore */}
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    countryCode={o?.country ?? ""}
                  />{" "}
                  {o?.label}
                </ListboxOption>
              )
            })}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  )
}

export default LanguageSelect

