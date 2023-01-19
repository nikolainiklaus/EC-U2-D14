{
  /* <div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
}
const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(location.search);
const id = params.get("id");

window.onload = async () => {
  try {
    const res = await fetch(`${url}/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQxMzY5MzIsImV4cCI6MTY3NTM0NjUzMn0.X73vu39Bzwy1NfEOUjeKdkslerRe-2eCM_UXbUMarnk",
      },
    }); //GET
    const { name, description, price, imageUrl, brand, createdAt, updatedAt } =
      await res.json();
    const container = document.querySelector(".container");
    container.innerHTML += `<div class="card col-sm-12"style="border-radius: 10px; border-style: solid; border-color: black; border-width: 1pxx">
    <img class="card-img-top mt-2" style="border-radius: 10px" src="${imageUrl}" alt="Card image cap">
    <div class="card-body">
      <h3 class="card-title">${name}</h3>
      <h6 class="card-title">by ${brand}</h6>
      <p class="card-text">${description}</p>
      <h4 class="card-title text-left">${
        price !== null
          ? `<span class="badge badge-pill badge-warning">${price} $</span>`
          : ""
      }</h4>
      <div class="mt-5 mx-n3 card-footer text-muted">
      last update: ${createdAt}
  </div>
    </div>`;
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
