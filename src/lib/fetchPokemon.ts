export async function fetchPokemon(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    if (!res.ok) {
        throw new Error("Pokemon not found")
    }

    const data = await res.json()

    return {
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        height: data.height / 10,
        weight: data.weight / 10
    }
}