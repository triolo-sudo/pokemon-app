"use client"

import { useState, useEffect } from "react"
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
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    // 🔹 全検索結果（名前だけ保持）
    const [allResults, setAllResults] = useState<string[]>([])

    // 🔹 ページ（10件単位）
    const [page, setPage] = useState(1)

    // ユーザーが入力する文字
    const [pokemonName, setPokemonName] = useState("")

    // Popup用message
    const [popupMessage, setPopupMessage] = useState<string | null>(null)

    // スピナー
    const [loading, setLoading] = useState(false)

    // 抽出結果数
    const [totalCount, setTotalCount] = useState(0)

    // Popup表示関数
    const showPopup = (message: string) => {
        setPopupMessage(message)

        setTimeout(() => {
            setPopupMessage(null)
        }, 2000)
    }

    // 🔍 検索
    async function handleSearch() {
        // 入力チェック
        if (!pokemonName.trim()) {
            showPopup("Enter a Pokémon name")
            return
        }

        setLoading(true)

        // 検索
        try {
            // ① 全件取得
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
            const list = await res.json()

            // ② 前方一致フィルタ
            const filtered = list.results.filter((p: any) =>
                p.name.toLowerCase().startsWith(pokemonName.toLowerCase())
            )

            if (filtered.length === 0) {
                showPopup("No Pokémon found")
                setPokemons([])
                setAllResults([])
                return
            }

            // 🔹 全体件数
            setTotalCount(filtered.length)

            // 🔹 全結果（名前だけ保存）
            setAllResults(filtered.map((p: any) => p.name))

            // 🔹 ページリセット
            setPage(1)
        } catch (error) {
            showPopup("Error occurred")
            setPokemons([])
        } finally {
            setLoading(false)
        }
    }

    // 🔹 page or allResults が変わったら表示更新
    useEffect(() => {
        async function loadMore() {
            if (allResults.length === 0) return

            setLoading(true)

            // 🔹 表示する範囲（10件ずつ）
            const slice = allResults.slice(0, page * 10)

            // 🔹 詳細取得
            const results = await Promise.all(
                slice.map(name => fetchPokemon(name))
            )

            setPokemons(results)
            setLoading(false)
        }

        loadMore()
    }, [page, allResults])

    // 🔹 スクロールで次ページ
    useEffect(() => {
        function handleScroll() {
            // 画面下に近づいたら発火
            if (
                // 👉 今見えてる画面の下 >= 👉 ページ全体の高さ - 👉 少し手前で発火（UX向上）
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                // 🔹 まだ続きがあるときだけ増やす
                if (page * 10 < allResults.length) {
                    setPage(prev => prev + 1)
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [page, allResults])

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

                {/* 抽出ポケモン数表示 */}
                {pokemonName && totalCount > 0 && (
                    <div className="
                        text-center
                        text-sm
                        text-skyText/60
                        tracking-wide
                    ">
                        {totalCount} Pokémon found
                    </div>
                )}

                {/* 🔹 複数表示 */}
                {pokemons.map((p) => (
                    <PokemonCard
                        key={p.name}
                        pokemon={p}
                        addFavorite={addFavorite}
                        isFavorite={favorites.some(f => f.name === p.name)}
                        removeFavorite={removeFavorite}
                    />
                ))}

                {/* 🌙 ローディング */}
                {loading && <PokeLoading />}
            </div>
        </div>
    )

}