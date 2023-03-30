
export class Job {
  constructor(data) {
    this.id = data.id || ''
    this.company = data.company || ''
    this.jobTitle = data.jobTitle || ''
    this.hours = data.hours || 0
    this.rate = data.rate || 0
    this.description = data.description || ''
    this.createdAt = new Date(data.createdAt)
  }

  get ListTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-betwen mb-2">
          <div class="row">
            <h5>${this.company}</h5>
            <h5>${this.jobTitle}</h5>
          </div>
          <div class="row">
            <div> $${this.rate} / hr </div>
            <div> ${this.hours} hours </div>
          </div>
        </h5>
        <button class="btn btn-primary">
          See Details
        </button>
        <button onclick="app.jobsController.removeJobs('${this.id})" title="Delete Job!" class="btn btn-danger">
          <i class="mdi mdi-delete"></i>
        </button>
      </div>
    </div>
  </div>
    `
  }
}