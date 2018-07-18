// StringMap<Json|undefined>
export interface ObjectProperties {
    readonly [name: string]: Json|undefined
}

export type Object = object & ObjectProperties

// ReadonlyArray<Json>
export type ArrayObject = Array<any>

export type Json = null|boolean|string|number|ArrayObject|Object

export interface Visitor<T> {
    asNull(): T
    asBoolean(value: boolean): T
    asString(value: string): T
    asNumber(value: number): T
    asArray(value: ReadonlyArray<Json>): T
    asObject(value: ObjectProperties): T
}

export function visit<T>(value: Json, visitor: Visitor<T>) {
    return value === null ? visitor.asNull() :
        typeof value === "boolean" ? visitor.asBoolean(value) :
        typeof value === "string" ? visitor.asString(value) :
        typeof value === "number" ? visitor.asNumber(value) :
        value instanceof Array ? visitor.asArray(value):
        visitor.asObject(value)
}

export const parse: (str: string) => Json = JSON.parse

export const stringify: (json: Json) => string = JSON.stringify
