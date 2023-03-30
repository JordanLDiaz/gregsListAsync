import { appState } from "../AppState.js";
import { jobsService } from "../Services/JobsService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";


function _drawJobs() {
  const jobs = appState.jobs
  let template = ''
  jobs.forEach(j => template += j.ListTemplate)
  setHTML('listings', template)
}
export class JobsController {
  constructor() {
    appState.on('jobs', _drawJobs)
    this.getJobs()
  }
  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      Pop.error(error.message)
      console.log(error);
    }
  }

  showJobs() {
    _drawJobs()
  }
}