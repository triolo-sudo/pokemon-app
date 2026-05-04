"use client"

import { useState } from "react"
import { fetchPokemon } from "@/lib/fetchPokemon"
import PokemonCard from "./PokemonCard"
import Popup from "./Popup"
import { Pokemon } from "@/types/pokemon"
import PokeLoading from "./PokeLoading"

type Props = {
    favorites: Pokemon[]
    addFavorite: (pokemon: Pokemon) => void
    removeFavorite: (name: string) => void
}

export default function SearchView({
    favorites,
    addFavorite,
    removeFavorite
}: Props) {
    // APIから取得した表示データ
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    // ユーザーが入力する文字
    const [pokemonName, setPokemonName] = useState("")

    // Popup用message
    const [popupMessage, setPopupMessage] = useState<string | null>(null)

    // Popup表示関数
    const showPopup = (message: string) => {
        setPopupMessage(message)

        setTimeout(() => {
            setPopupMessage(null)
        }, 2000)
    }

    // スピナー
    const [loading, setLoading] = useState(false)

    // 検索関数
    async function handleSearch() {
        // 入力チェック
        if (!pokemonName.trim()) {
            showPopup("Enter a Pokémon name")
            return
        }

        setLoading(true)

        // 検索
        try {
            const data = await fetchPokemon(pokemonName)
            setPokemon(data)
            // ↑の後にstateが更新されて、Reactが画面を自動更新
        } catch (error) {
            showPopup("No Pokémon found")
            setPokemon(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-md mx-auto pt-12 space-y-4">

                {popupMessage && <Popup message={popupMessage} />}

                <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full bg-skyCard border border-skyBlue/30 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-skyBlue text-skyText"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch()
                    }}
                />

                <button
                    onClick={handleSearch}
                    className="w-full bg-skyBlue text-white px-4 py-2 rounded-xl hover:bg-skyPurple transition"
                >
                    Search
                </button>

                {/* 🌙 ローディング(入力 → loading → 結果 👉 だから「結果の前」に置く) */}
                {loading && <PokeLoading />}

                {/* 結果 */}
                {pokemon && (
                    <PokemonCard
                        pokemon={pokemon}
                        addFavorite={addFavorite}
                        isFavorite={favorites.some(p => p.name === pokemon.name)}
                        removeFavorite={removeFavorite}
                    />
                )}
            </div>
        </div>
    )

}