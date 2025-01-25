export function sortEnumByOrder<T extends { order: number }>(orderEnum: T[]): T[] {
    return [...orderEnum].sort((a, b) => a.order - b.order);
}

export function convertEnumByKeyAndValue<T extends {
    key: string,
    value: string
}>(objectEnum: T[]): { [key in T["key"]]: string } {
    return Object.fromEntries(
        objectEnum.map((object: T) => [object.key, object.value])
    ) as { [key in T["key"]]: string };
}