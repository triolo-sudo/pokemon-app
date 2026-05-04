"use client"

import { useState } from "react"
import { Pokemon } from "@/types/pokemon"
import PokemonCard from "./PokemonCard"
import PokemonModal from "./PokemonModal"

type Props = {
    favorites: Pokemon[]
    removeFavorite: (name: string) => void
}

export default function FavoritesView({ favorites, removeFavorite }: Props) {
    // ✅ 先にHooks Pokemon Modal
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (favorites.length === 0) {
        return (
            <div className="p-4 text-center text-skyText/60">
                No favorite Pokémon yet
            </div>
        )
    }

    // returnは1つ。複数書きたいなら <> </> で包む
    return (
        <>
            <div className="max-w-md mx-auto pt-12 space-y-4">
                {favorites.map((p) => (
                    <PokemonCard
                        key={p.name}
                        pokemon={p}
                        isFavorite
                        removeFavorite={removeFavorite}
                        onClick={() => {
                            setSelectedPokemon(p)
                            setIsModalOpen(true)
                        }}
                    />
                ))}
            </div>

            {/* モーダル */}
            {isModalOpen && selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    )
}