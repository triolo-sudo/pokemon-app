"use client"

import { useEffect, useState } from "react"
import { Pokemon } from "@/types/pokemon"
import { fetchPokemon } from "@/lib/fetchPokemon"
import PokemonCard from "@/components/PokemonCard"
import PokemonModal from "@/components/PokemonModal"
import PokeLoading from "./PokeLoading"

type Props = {
    favorites: Pokemon[]
    addFavorite: (pokemon: Pokemon) => void
    removeFavorite: (name: string) => void
}

export default function TypeView({
    favorites,
    addFavorite,
    removeFavorite
}: Props) {
    const [types, setTypes] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [pokemonNames, setPokemonNames] = useState<string[]>([])

    // Type Search Result
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    // Pokemon Modal
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/type")
            .then(res => res.json())
            .then(data => {
                const names = data.results.map((t: any) => t.name)
                setTypes(names)
            })
    }, [])

    async function handleSelect(type: string) {
        setSelectedType(type)
        setLoading(true) // 🌿 開始

        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        const data = await res.json()

        setTotalCount(data.pokemon.length) // ← 全体数

        const names: string[] = data.pokemon
            .map((p: any) => p.pokemon.name)
            .slice(0, 10) // 🌿 ここ重要

        // 🌿 これ追加
        setPokemonNames(names)

        // 👇 ここが今回のメイン 10個のAPIを同時に取る 👉 1個ずつ待つより速い
        const results = await Promise.all(
            names.map(name => fetchPokemon(name))
        )

        setPokemons(results)

        setLoading(false) // 🌿 終了
    }

    function formatTypeName(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <div className="bg-skyDark text-skyText min-h-screen">
            <div className="max-w-md mx-auto pt-12 space-y-6">

                <h2 className="text-lg text-center">
                    Select Type
                </h2>

                {/* タイプ一覧 */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => handleSelect(type)}
                            className={`
                                px-4 py-1.5
                                rounded-full
                                text-sm
                                border
                                transition

                                ${selectedType === type
                                    ? "bg-skyBlue text-white border-skyBlue"
                                    : "bg-skyCard border-skyBlue/30 text-skyText hover:bg-skyBlue/20"}
                            `}
                        >
                            {formatTypeName(type)}
                        </button>
                    ))}
                </div>

                {/* 抽出ポケモン数表示 */}
                {selectedType && (
                    <div className="
                            text-center
                            text-sm
                            text-skyText/60
                            tracking-wide
                        ">
                        {totalCount} {formatTypeName(selectedType)} Pokémon found
                    </div>
                )}

                {/* ローディング */}
                {loading && <PokeLoading />}

                {/* 一覧 */}
                {!loading && pokemons.length > 0 && (
                    <div className="space-y-4 pt-4">
                        {pokemons.map(pokemon => (
                            <PokemonCard
                                key={pokemon.name}
                                pokemon={pokemon}
                                onClick={() => {
                                    setSelectedPokemon(pokemon)
                                    setIsModalOpen(true)
                                }}
                                addFavorite={addFavorite}
                                removeFavorite={removeFavorite}
                                isFavorite={favorites.some(p => p.name === pokemon.name)}
                            />))}
                    </div>
                )}

                {/* モーダル */}
                {isModalOpen && selectedPokemon && (
                    <PokemonModal
                        pokemon={selectedPokemon}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    )
}