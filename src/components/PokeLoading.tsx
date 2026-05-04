export default function PokeLoading() {
    return (
        <div className="
            flex flex-col items-center justify-center
            py-10
            space-y-3
            text-skyText/70
        ">
            {/* Pokéball */}
            <div className="relative w-12 h-12 animate-spin-slow">

                {/* 上半分 */}
                <div className="
                    absolute top-0 left-0
                    w-12 h-6
                    bg-red-500
                    rounded-t-full
                " />

                {/* 下半分 */}
                <div className="
                    absolute bottom-0 left-0
                    w-12 h-6
                    bg-white
                    border border-gray-300
                    rounded-b-full
                " />

                {/* 中央ライン */}
                <div className="
                    absolute top-1/2 left-0
                    w-12 h-[2px]
                    bg-gray-800
                    -translate-y-1/2
                " />

                {/* 中央ボタン */}
                <div className="
                    absolute top-1/2 left-1/2
                    w-3 h-3
                    bg-white
                    border-2 border-gray-800
                    rounded-full
                    -translate-x-1/2
                    -translate-y-1/2
                " />
            </div>

            <p className="text-sm">Finding Pokémon...</p>
        </div>
    )
}