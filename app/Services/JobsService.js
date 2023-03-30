import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";

class JobsService {
  async getJobs() {
    // @ts-ignore
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/jobs')
    console.log('[GOT JOBS]', res.data);
    appState.jobs = res.data.map(j => new Job(j))
  }

}


export const jobsService = new JobsService()