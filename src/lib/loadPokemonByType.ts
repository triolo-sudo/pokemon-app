export async function loadPokemonByType(type: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)

    if (!res.ok) {
        throw new Error("Failed to load pokemon by type")
    }

    const data = await res.json()

    return data.pokemon
}