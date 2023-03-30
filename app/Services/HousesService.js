import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { Pop } from "../Utils/Pop.js";

class HousesService {
  async getHouses() {
    // @ts-ignore
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/houses')
    console.log('[GOT HOUSES]', res.data);
    appState.houses = res.data.map(h => new House(h))
  }

  async createHouse(houseData) {
    // @ts-ignore
    const res = await axios.post('https://bcw-sandbox.herokuapp.com/api/houses', houseData)
    console.log('[POST HOUSE]', res.data);
    appState.houses = [...appState.houses, new House(res.data)]
  }

  async removeHouse(id) {
    // @ts-ignore
    const res = await axios.delete('https://bcw-sandbox.herokuapp.com/api/houses/' + id)
    console.log('[DELETE HOUSE]', res.data);
    Pop.toast(res.data, 'success')
    appState.houses = appState.houses.filter(h => h.id != id)
  }

  async editHouse(houseData, id) {
    const res = await axios.put('https://bcw-sandbox.herokuapp.com/api/houses/' + id, houseData)
    console.log('[EDIT HOUSE]', res.data);
    let index = appState.houses.findIndex(h => h.id == id)
    appState.houses.splice(index, 1, new House(res.data))
    appState.emit('houses')
  }
  setActiveHouse(id) {
    let house = appState.houses.find(h => h.id == id)
    appState.activeHouse = house
    console.log(appState.activeHouse)
  }
}


export const housesService = new HousesService()