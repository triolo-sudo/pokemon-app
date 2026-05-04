import { Pokemon } from "@/types/pokemon"
import { Star } from "lucide-react"

type Props = {
    pokemon: Pokemon
    addFavorite?: (pokemon: Pokemon) => void
    isFavorite?: boolean
    removeFavorite?: (name: string) => void
    onClick?: () => void
}

export default function PokemonCard({
    pokemon,
    addFavorite,
    isFavorite,
    removeFavorite,
    onClick
}: Props) {
    return (
        <div
            onClick={onClick}
            className="
                bg-white/5
                backdrop-blur-md
                border border-skyBlue/20
                rounded-2xl
                p-5
                space-y-4
                shadow-lg

                transition-all
                duration-300

                hover:scale-[1.015]
                hover:-translate-y-1
                hover:shadow-xl

                active:scale-[0.98]
            "
        >

            {/* 画像 */}
            <div className="flex justify-center">
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="
                        w-32 h-32
                        object-contain
                        drop-shadow-xl

                        transition-transform
                        duration-300

                        hover:scale-110
                    "
                />
            </div>

            {/* 名前 */}
            <h2 className="text-xl font-semibold text-center text-skyText tracking-wide">
                {pokemon.name}
            </h2>

            {/* タイプ */}
            <div className="flex justify-center gap-2">
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className="
                            text-xs
                            px-2 py-1
                            rounded-full
                            bg-skyBlue/20
                            text-skyText
                            border border-skyBlue/30

                            transition
                            hover:bg-skyBlue/30
                        "
                    >
                        {type}
                    </span>
                ))}
            </div>

            {/* 補足情報 */}
            <div className="text-sm text-skyText/70 space-y-1 text-center">
                <p>HP: {pokemon.hp}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Height: {pokemon.height.toFixed(1)} m</p>
                <p>Weight: {pokemon.weight.toFixed(1)} kg</p>
            </div>

            {/* ボタン */}
            {!isFavorite ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation() // 👉 「親にクリックイベントが伝わるのを止める魔法(ボタンだけ動かしたい時に使うやつ)」
                        addFavorite?.(pokemon)
                    }}
                    className="
                        w-full
                        bg-skyBlue
                        text-white
                        py-2
                        rounded-xl
                        transition-all
                        duration-300

                        hover:bg-skyPurple
                        hover:scale-[1.01]

                        active:scale-[0.98]

                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <Star size={16} />
                    Add Favorite
                </button>
            ) : (
                <button
                    onClick={(e) => {
                        e.stopPropagation() // 👉 「親にクリックイベントが伝わるのを止める魔法(ボタンだけ動かしたい時に使うやつ)」
                        removeFavorite?.(pokemon.name)
                    }}
                    className="
                        w-full
                        bg-red-400/80
                        text-white
                        py-2
                        rounded-xl
                        transition-all
                        duration-300

                        hover:bg-red-500
                        hover:scale-[1.01]

                        active:scale-[0.98]

                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <Star size={16} />
                    Remove Favorite
                </button>)}

        </div>
    )
}