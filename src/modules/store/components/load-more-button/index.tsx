"use client"

import { ChevronDown, Loader2 } from "lucide-react"

type LoadMoreButtonProps = {
  hasMore: boolean
  isLoading?: boolean
  onLoadMore: () => void
}

const LoadMoreButton = ({ hasMore, isLoading, onLoadMore }: LoadMoreButtonProps) => {
  // En mode développement, afficher toujours le bouton pour debug
  const shouldShow = hasMore || process.env.NODE_ENV === 'development'

  if (!shouldShow) {
    return null
  }

  return (
    <div className="flex justify-center mt-12 mb-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading || !hasMore}
        className="
          bg-primary-blue 
          hover:bg-primary-red 
          text-white 
          px-10 
          py-4 
          text-lg 
          font-semibold 
          transition-all 
          duration-300 
          shadow-lg
          hover:shadow-xl
          rounded-lg
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex items-center gap-3
          transform hover:scale-105
          active:scale-95
        "
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Chargement...</span>
          </>
        ) : (
          <>
            <span>Charger plus d'articles</span>
            <ChevronDown className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  )
}

export default LoadMoreButton

