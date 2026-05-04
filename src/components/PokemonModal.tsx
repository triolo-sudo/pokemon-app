import { Pokemon } from "@/types/pokemon"

type Props = {
    pokemon: Pokemon
    onClose: () => void
}

export default function PokemonModal({ pokemon, onClose }: Props) {
    return (
        <div
            className="
                fixed inset-0
                bg-black/40
                backdrop-blur-sm
                flex items-center justify-center
                z-50
            "
            onClick={onClose}
        >
            <div
                className="
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    p-6
                    w-[320px]
                    shadow-2xl
                    space-y-3

                    transition-all
                    duration-300
                    hover:scale-[1.02]
                "
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={pokemon.image}
                    className="mx-auto w-32 h-32"
                />

                <h2 className="text-xl font-bold text-center">
                    {pokemon.name}
                </h2>

                <p className="text-center text-sm">
                    {pokemon.types.join(" / ")}
                </p>

                <p className="text-sm">HP: {pokemon.hp}</p>
                <p className="text-sm">Attack: {pokemon.attack}</p>
                <p className="text-sm">Height: {pokemon.height.toFixed(1)} m</p>
                <p className="text-sm">Weight: {pokemon.weight.toFixed(1)} kg</p>

                <button
                    onClick={onClose}
                    className="
                        w-full mt-3
                        bg-skyBlue
                        text-white
                        py-2
                        rounded-xl
                        hover:bg-skyPurple
                        transition
                    "
                >
                    Close
                </button>
            </div>
        </div>
    )
}