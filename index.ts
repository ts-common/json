export namespace Json {

export interface ObjectProperties {
    readonly [name: string]: Unknown
}

export type Object = object & ObjectProperties

export interface ArrayProperties {
    readonly [index: number]: Unknown
}

// ReadonlyArray<Unknown>
export type ArrayObject = any[] & ArrayProperties

export type Unknown = null|boolean|string|number|Object|ArrayObject

export interface Visitor<T> {
    asNull(): T
    asBoolean(value: boolean): T
    asString(value: string): T
    asNumber(value: number): T
    asObject(value: Object): T
    asArray(value: ReadonlyArray<Unknown>): T
}

export function visit<T>(value: Unknown, visitor: Visitor<T>) {
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

}