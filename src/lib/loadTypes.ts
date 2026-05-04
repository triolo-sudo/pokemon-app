export async function loadTypes() {
    const res = await fetch("https://pokeapi.co/api/v2/type")

    if (!res.ok) {
        throw new Error("Failed to load types")
    }

    const data = await res.json()

    return data.results
}