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

    // 🔹 全ポケモン名（← ここがコア：全部持つ）
    const [pokemonNames, setPokemonNames] = useState<string[]>([])

    // 🔹 表示用ポケモン
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    const [loading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    // 🔹 追加：ページ管理（10件単位）
    const [page, setPage] = useState(1)

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

        // 🔹 修正：sliceしない（全部保持）
        const names: string[] = data.pokemon.map(
            (p: any) => p.pokemon.name
        )

        // 🔹 全部保存
        setPokemonNames(names)

        // 🔹 ページリセット
        setPage(1)

        setLoading(false) // 🌿 終了
    }

    // 🔹 追加：page or pokemonNamesが変わったら表示更新
    useEffect(() => {
        async function loadMore() {
            if (pokemonNames.length === 0) return

            setLoading(true)

            // 🔹 表示範囲（10件ずつ増える）
            const slice = pokemonNames.slice(0, page * 10)

            // 🔹 詳細取得（Promise.all）
            const results = await Promise.all(
                slice.map(name => fetchPokemon(name))
            )

            setPokemons(results)
            setLoading(false)
        }

        loadMore()
    }, [page, pokemonNames])

    // 🔹 コンテナ内スクロール検知（← ここが重要）
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 50
            ) {
                if (page * 10 < pokemonNames.length) {
                    setPage(prev => prev + 1)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [page, pokemonNames])

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

                {/* 🔹 一覧だけスクロールするエリア */}
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
                        />
                    ))}

                    {/* 🔹 下にローディング出すと自然 */}
                    {loading && <PokeLoading />}
                </div>

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