import { Search, Star, Flame } from "lucide-react"

type Props = {
    current: string
    setView: (view: string) => void
}

export default function BottomNav({ current, setView }: Props) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-skyCard border-t border-skyBlue/20 flex justify-around py-3 text-skyText">

            <button
                onClick={() => setView("search")}
                className={`flex flex-col items-center gap-1 transition ${current === "search"
                    ? "text-skyBlue"
                    : "text-skyText/40"
                    }`}
            >
                <Search size={20} />
                <span className="text-xs">Search</span>
            </button>

            <button
                onClick={() => setView("favorites")}
                className={`flex flex-col items-center gap-1 transition ${current === "favorites"
                    ? "text-skyBlue"
                    : "text-skyText/40"
                    }`}
            >
                <Star size={20} />
                <span className="text-xs">Favorites</span>
            </button>

            <button
                onClick={() => setView("types")}
                className={`flex flex-col items-center gap-1 transition ${current === "types"
                    ? "text-skyBlue"
                    : "text-skyText/40"
                    }`}
            >
                <Flame size={20} />
                <span className="text-xs">Types</span>
            </button>

        </div>
    )
}