export class House {
  constructor(data) {
    this.id = data.id || ''
    this.price = data.price || 0
    this.bedrooms = data.bedrooms || 0
    this.bathrooms = data.bathrooms || 0
    this.levels = data.levels || 0
    this.imgUrl = data.imgUrl || ''
    this.year = data.year || 0
    this.description = data.description || ''
    this.createdAt = new Date(data.createdAt)
  }

  get ListTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
      <div class="card">
        <img src="${this.imgUrl}" class="card-img-top card-size" alt="$${this.price}">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-betwen mb-2">
            <div class="row"> 
              <h5>$${this.price}</h5>
              <h5>${this.year}</h5>
            </div>
            <div class="row">
              <div> ${this.bedrooms} bed / ${this.bathrooms} bath </div>
            </div>
          </h5>
          <div class="d-flex justify-content-between">
            <button onclick="app.housesController.setActiveHouse('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#houseModal">
              See Details
            </button>
            <button class="btn btn-info"  onclick="app.housesController.setActiveHouse('${this.id}')">
              <i class="mdi mdi-pencil"></i>
            </button>
            <button onclick="app.housesController.removeHouse('${this.id}')" title="Delete House!" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  get ActiveHouseTemplate() {
    return `
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">${this.bedrooms} ${this.bathrooms}</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <h5>
      ${this.createdAt.toLocaleDateString()}
      </h5>
      <img src="${this.imgUrl}" alt="car" class="img-fluid">
      <b>Price: $${this.price}</b>
      <p>${this.description}</p>
      <div>Color:${this.levels}</div>
      <div>Year: ${this.year}</div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `
  }

  static GetHouseFormTemplate(house) {
    if (!house) {
      house = new House({})
    }
    return `
  <form onsubmit="app.housesController.${house.id ? `editHouse('${house.id}')` : 'createHouse()'}">
    <div class="form-floating mb-3">
      <input required type="number" minlength="3" class="form-control" id="house-price" placeholder="House Price"
        name="price" value="${house.price}">
      <label for="house-price">Price</label>
    </div>
    <div class="form-floating mb-3">
      <input required type="number" class="form-control" id="house-bedrooms" placeholder="House Bedrooms" name="bedrooms" value="${house.bedrooms}">
      <label for="house-bedrooms">Bedrooms</label>
    </div>
    <div class="form-floating mb-3">
      <input required type="number" class="form-control" id="house-bathrooms" placeholder="House Bathrooms" name="bathrooms" value="${house.bathrooms}">
      <label for="house-bathrooms">Bathrooms</label>
    </div>
    <div class="form-floating mb-3">
      <input required type="number" class="form-control" id="house-levels" placeholder="House Levels" name="levels" value="${house.levels}">
      <label for="house-levels">Levels</label>
    </div>
    <div class="form-floating mb-3">
      <input required type="url" class="form-control" id="house-imgUrl" placeholder="House Image" name="imgUrl" value="${house.imgUrl}">
      <label for="house-imgUrl">Image</label>
    </div>
    <div class="form-floating mb-3">
      <input required type="number" class="form-control" id="house-year" placeholder="House Year" name="year" value="${house.year}">
      <label for="house-year">Year</label>
    </div>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Leave a description here" id="house-description"
        name="description" value="${house.description}"></textarea>
      <label for="house-description">Description</label>
    </div>
    <button type="submit" class="btn btn-success mt-3">Submit</button>
    <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
  </form>
    `
  }
}