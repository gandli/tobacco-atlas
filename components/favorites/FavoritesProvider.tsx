"use client"

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

type FavoritesContextValue = {
  hydrated: boolean
  favorites: Set<string>
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

const STORAGE_KEY = "tobacco-atlas:favorites:v1"

function readFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x) => typeof x === "string")
  } catch {
    return []
  }
}

function writeToStorage(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // ignore
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const ids = readFromStorage()
    setFavorites(new Set(ids))
    setHydrated(true)
  }, [])

  const persist = useCallback((next: Set<string>) => {
    setFavorites(next)
    writeToStorage(Array.from(next))
  }, [])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = new Set(favorites)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      persist(next)
    },
    [favorites, persist],
  )

  const clearFavorites = useCallback(() => {
    persist(new Set())
  }, [persist])

  const value = useMemo<FavoritesContextValue>(
    () => ({ hydrated, favorites, isFavorite, toggleFavorite, clearFavorites }),
    [hydrated, favorites, isFavorite, toggleFavorite, clearFavorites],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = React.useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider")
  return ctx
}
