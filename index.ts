import * as _ from "@ts-common/iterator"
import { MutableStringMap, StringMap } from "@ts-common/string-map"

export interface JsonObjectInterface extends StringMap<Json|undefined> {}

export type JsonObject = JsonObjectInterface & object

export interface JsonArrayInterface extends ReadonlyArray<Json> {}

export type JsonArray = JsonArrayInterface & object

export type JsonPrimitive = null|boolean|string|number

export type JsonRef = JsonObject|JsonArray

export type Json = JsonPrimitive|JsonRef

export type MutableJsonObject = MutableStringMap<Json|undefined> & object

export type MutableJsonArray = Json[]

export type MutableJsonRef = MutableJsonObject|MutableJsonArray

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
        _.isArray(value) ? visitor.asArray(value) :
        visitor.asObject(value)
}

export const parse: (str: string) => Json = JSON.parse

export const stringify: (json: Json) => string = JSON.stringify

export type NonUndefined<T> = T extends undefined ? never : T

export type Property<T, K extends keyof T> = NonUndefined<T[K]>
