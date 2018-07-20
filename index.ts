import * as array from "@ts-common/array"

// StringMap<Json|undefined>
export interface JsonObject {
    readonly [name: string]: Json|undefined
}

export type JsonArray = ReadonlyArray<Json>

export interface JsonArrayImplementation extends array.ImmutableArray<Json> {}

export type Json = null|boolean|string|number|JsonArrayImplementation|JsonObject

export interface Visitor<T> {
    asNull(): T
    asBoolean(value: boolean): T
    asString(value: string): T
    asNumber(value: number): T
    asArray(value: JsonArray): T
    asObject(value: JsonObject): T
}

export function visit<T>(value: Json, visitor: Visitor<T>) {
    return value === null ? visitor.asNull() :
        typeof value === "boolean" ? visitor.asBoolean(value) :
        typeof value === "string" ? visitor.asString(value) :
        typeof value === "number" ? visitor.asNumber(value) :
        value instanceof Array ? visitor.asArray(value) :
        visitor.asObject(value)
}

export const parse: (str: string) => Json = JSON.parse

export const stringify: (json: Json) => string = JSON.stringify
