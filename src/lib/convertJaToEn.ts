export function convertJaToEn(typeJa: string): string {
    const map: Record<string, string> = {
        ノーマル: "normal",
        ほのお: "fire",
        みず: "water",
        でんき: "electric",
        くさ: "grass",
        こおり: "ice",
        かくとう: "fighting",
        どく: "poison",
        じめん: "ground",
        ひこう: "flying",
        エスパー: "psychic",
        むし: "bug",
        いわ: "rock",
        ゴースト: "ghost",
        ドラゴン: "dragon",
        あく: "dark",
        はがね: "steel",
        フェアリー: "fairy",
    }

    return map[typeJa] ?? typeJa
}