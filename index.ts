// StringMap<Json|undefined>
export interface ObjectProperties {
    readonly [name: string]: Json|undefined
}

export type Object = object & ObjectProperties

// ReadonlyArray<Json>
export type ArrayObject = Array<any>

export type Json = null|boolean|string|number|Object|ArrayObject

export interface Visitor<T> {
    asNull(): T
    asBoolean(value: boolean): T
    asString(value: string): T
    asNumber(value: number): T
    asObject(value: ObjectProperties): T
    asArray(value: ReadonlyArray<Json>): T
}

export function visit<T>(value: Json, visitor: Visitor<T>) {
    if (value === null) {
        return visitor.asNull()
    }
    if (typeof value === "boolean") {
        return visitor.asBoolean(value)
    }
    if (typeof value === "string") {
        return visitor.asString(value)
    }
    if (typeof value === "number") {
        return visitor.asNumber(value)
    }
    if (value instanceof Array) {
        return visitor.asArray(value)
    }
    return visitor.asObject(value)
}

export const parse: (str: string) => Json = JSON.parse

export const stringify: (json: Json) => string = JSON.stringify
