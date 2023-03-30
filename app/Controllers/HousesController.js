import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawHouses() {
  const houses = appState.houses
  let template = ''
  houses.forEach(h => template += h.ListTemplate)
  setHTML('listings', template)
}

function _drawHouseForm() {
  let house = appState.activeHouse
  setHTML('listing-form', House.GetHouseFormTemplate(house))
}

export class HousesController {
  constructor() {
    appState.on('houses', _drawHouses)
    appState.on('activeHouse', _drawHouseForm)
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.error(error.message)
      console.log(error);
    }
  }

  async createHouse() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let houseData = getFormData(form)
      Pop.toast('Created', 'success')
      form.reset()
      console.log(houseData);
      await housesService.createHouse(houseData)
    } catch (error) {
      Pop.error(error.message)
      console.log(error);
    }
  }

  showHouses() {
    _drawHouses()
    this.getHouses()
    _drawHouseForm()
  }

  async editHouse(id) {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      const houseData = getFormData(form)
      console.log('edited', form);
      await housesService.editHouse(houseData, id)
      Pop.toast('edited', 'info')
      form.reset()
    } catch (error) {
      Pop.error(error.message)
      console.log(error);
    }
  }

  async removeHouse(id) {
    // debugger
    try {
      console.log('deleting', id);
      if (await Pop.confirm('Are you sure?', 'You cannot reverse this delete', 'Yes, get it outta here', 'warning')) {
        await housesService.removeHouse(id)
      }
    } catch (error) {
      Pop.error(error.message)
      console.log(error);
    }
  }

  setActiveHouse(id) {
    housesService.setActiveHouse(id)
  }
}


