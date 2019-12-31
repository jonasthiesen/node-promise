import { curry } from 'ramda'

/********************
 * Type definitions *
 ********************/

export const Types = {
  STRING: 'string',
  NUMBER: 'number',
  PROMISE: 'promise',
  ARRAY: 'array',
}

/***********
 * Helpers *
 ***********/

/**
 * Check if X is of type T.
 *
 * @param {string} T The type to check against.
 * @param {any} X The item to check the type against.
 * @returns {boolean} Whether the type check passes.
 *
 * @example
 * checkTypeOf(Types.STRING, 'hello world') // true
 * checkTypeOf(Types.PROMISE, {})           // false
 */
const checkTypeOf = (T, X) => {
  switch (T) {
    case Types.STRING:
      return typeof X === 'string'
    case Types.NUMBER:
      return typeof X === 'number'
    case Types.PROMISE:
      return X instanceof Promise
    case Types.ARRAY:
      return Array.isArray(X)
  }
}

/**
 * Check if one in the array of types, T, matches the item, X.
 *
 * @param {Array<string>} T An array of types to check against.
 * @param {any} X The item to check the type against.
 * @returns {boolean} True if just one of the types matches, otherwise false.
 *
 * @example
 * checkTypeOf([Types.STRING, Types.NUMBER], 'hello world') // true
 * checkTypeOf([Types.PROMISE, Types.ARRAY], {})            // false
 */
const checkTypeOfMultiple = (T, X) => {
  let isOfType = false

  T.forEach((t) => {
    if (checkTypeOf(t, X)) {
      isOfType = true
    }
  })

  return isOfType
}

/***************
 * Type Checks *
 ***************/

/**
 * Check if `X` matches either `T` or one of `T[]`.
 *
 * @type {{(T: string, X: any): boolean}}
 * @param T The type(s) to check against.
 * @param X The item to type check.
 * @returns Whether `X` matches the type, `T`, or an array of types, `T[]`.
 *
 * @example
 * isTypeOf(Types.STRING, 'hello world')      // true
 * isTypeOf([Types.PROMISE, TYPES.ARRAY], {}) // false
 *
 * const isArrayOrPromise = isTypeOf([Types.PROMISE, TYPES.ARRAY])
 * isArrayOrPromise({}) // false
 */
export const isTypeOf = curry((T, X) => {
  if (checkTypeOf(Types.ARRAY, X)) {
    return checkTypeOfMultiple(T, X)
  }

  return checkTypeOf(T, X)
})

/**
 * Check if item, `X`, is a string.
 *
 * @type {{(X: any): boolean}}
 * @param X The item to check against.
 * @returns Whether `X` is a string.
 */
export const isTypeOfString = isTypeOf(Types.STRING)

/**
 * Check if item, `X`, is a number.
 *
 * @type {{(X: any): boolean}}
 * @param X The item to check against.
 * @returns Whether `X` is a number.
 */
export const isTypeOfNumber = isTypeOf(Types.NUMBER)

/**
 * Check if item, `X`, is a promise.
 *
 * @type {{(X: any): boolean}}
 * @param X The item to check against.
 * @returns Whether `X` is a promise.
 */
export const isTypeOfPromise = isTypeOf(Types.PROMISE)

/**
 * Check if item, `X`, is an array.
 *
 * @type {{(X: any): boolean}}
 * @param X The item to check against.
 * @returns Whether `X` is an array.
 */
export const isTypeOfArray = isTypeOf(Types.ARRAY)
