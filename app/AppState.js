import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {

  // Import for cars
  /** @type {import('./Models/Car').Car[]} */
  cars = []

  /** @type {import('./Models/Car').Car|null} */
  activeCar = null

  // Import for houses
  /** @type {import('./Models/House').House[]} */
  houses = []

  /** @type {import('./Models/House').House|null} */
  activeHouse = null

  // Import for jobs
  /** @type {import('./Models/Job').Job[]} */
  jobs = []
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
