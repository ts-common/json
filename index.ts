import * as _ from "@ts-common/iterator"
import { StringMap } from "@ts-common/string-map"

export interface JsonObject extends StringMap<Json|undefined> {}

export interface JsonArray extends ReadonlyArray<Json> {}

export type Json = null|boolean|string|number|JsonArray|JsonObject

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
