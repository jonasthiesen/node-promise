import fs from 'fs'
import { isTypeOfString } from './utils.js'
import { isNil } from 'ramda'

export const readFile = (filePath, options) => {
  if (!isTypeOfString(filePath)) {
    throw new TypeError('`filePath` must be of type `string`')
  }

  const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (!isNil(err)) {
        return reject(err)
      }

      return resolve(data)
    })
  })

  return promise
}
