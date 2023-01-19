const url = "https://striveschool-api.herokuapp.com/api/product/";
const options = {
  headers: new Headers({
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQxMzY5MzIsImV4cCI6MTY3NTM0NjUzMn0.X73vu39Bzwy1NfEOUjeKdkslerRe-2eCM_UXbUMarnk",
  }),
};

window.onload = async () => {
  let loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "flex";
  await getEvents();
};

const getEvents = async () => {
  try {
    const res = await fetch(url, options);
    const events = await res.json(); //array of events
    renderEvents(events);
  } catch (error) {
    handleError(error);
  }
};

const renderEvents = (arrayOfEvents) => {
  const ul = document.querySelector("div.card-deck");
  ul.innerHTML = "";
  arrayOfEvents.forEach((singleEvent) => {
    const { name, description, brand, imageUrl, price, _id } = singleEvent;
    ul.innerHTML += `
    <div class="card col-sm-4"style="border-radius: 10px; border-style: solid; border-color: black; border-width: 1pxx">
    <img class="card-img-top mt-2" style="border-radius: 10px" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-title">${brand}</h6>
      <p class="card-text">${description}</p>
      <h4 class="card-title text-left">${
        price !== null
          ? `<span class="badge badge-pill badge-warning">${price} $</span>`
          : ""
      }</h4>
    </div>
    <div class="px-3 mb-2">
      <a href='./backoffice.html?id=${_id}' class='btn btn-outline-info m-1'> <i class="bi bi-pencil-square"></i> </a>
            <button class='btn btn-outline-danger m-1' onclick='deleteEvent("${_id}")'> <i class="bi bi-trash-fill"></i> </button>
            <a href='./details.html?id=${_id}' class='btn btn-outline-dark rounded-pill m-1'> <i class="bi bi-arrow-up-right-square-fill"></i> Details </a>
      </div> 
  </div>
    `;
  });
  let loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.style.display = "none";
};

const deleteEvent = async (idToDelete) => {
  //add confirmation
  try {
    let res = await fetch(url + "/" + idToDelete, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQxMzY5MzIsImV4cCI6MTY3NTM0NjUzMn0.X73vu39Bzwy1NfEOUjeKdkslerRe-2eCM_UXbUMarnk",
      },
    });
    // "https://striveschool-api.herokuapp.com/api/agenda/63c9060fe73738001537433b"
    console.log(res);
    if (res.ok) {
      await getEvents();
    }
  } catch (error) {
    handleError(error);
  }
};

const handleError = (errorText) => {
  const alert = document.querySelector(".alert span.alert-text");
  console.log(alert);
  alert.innerText = errorText;
  alert.parentElement.classList.replace("d-none", "d-block");
};
