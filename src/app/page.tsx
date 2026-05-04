"use client";

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import BottomNav from "@/components/BottomNav"
import SearchView from "@/components/SearchView"
import FavoritesView from "@/components/FavoritesView"
import TypeView from "@/components/TypeView"
import { Pokemon } from "@/types/pokemon"

export default function Page() {
  const [view, setView] = useState("search")
  const [searchKey, setSearchKey] = useState(0)
  const [favorites, setFavorites] = useState<Pokemon[]>([])

  const handleChangeView = (nextView: string) => {
    if (nextView === "search") {
      setSearchKey(prev => prev + 1)
    }
    setView(nextView)
  }

  // favoriteへ保存
  useEffect(() => {
    // ログ出力
    console.log("保存:", favorites)

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // LocalStorage読み込み
  useEffect(() => {
    const stored = localStorage.getItem("favorites")

    if (stored) {
      const parsed = JSON.parse(stored)
      // ログ出力
      console.log("読み込み:", parsed)

      setFavorites(parsed)
    }
  }, [])

  // favoriteに追加
  function addFavorite(pokemon: Pokemon) {
    const exists = favorites.some(p => p.name === pokemon.name)
    if (exists) return
    setFavorites([...favorites, pokemon])
  }

  // Favotiteから削除
  function removeFavorite(name: string) {
    setFavorites(favorites.filter(p => p.name !== name))
  }

  return (
    <div className="pb-16">

      <Navbar />

      {view === "search" && (
        <SearchView
          key={searchKey}
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}

      {view === "favorites" && (
        <FavoritesView
          favorites={favorites}
          removeFavorite={removeFavorite}
        />
      )}

      {view === "types" && (
        <TypeView
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}

      <BottomNav current={view} setView={handleChangeView} />

    </div>
  )

}