const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(location.search);
const id = params.get("id");
console.log(id); //this can either an id or null

//if null => POST
//if not null => PUT

window.onload = async () => {
  try {
    if (id !== null) {
      //we are trying to edit something
      const postButton = document.querySelector(".btn-primary");
      postButton.remove();

      let res = await fetch(url + "/" + id, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQxMzY5MzIsImV4cCI6MTY3NTM0NjUzMn0.X73vu39Bzwy1NfEOUjeKdkslerRe-2eCM_UXbUMarnk",
        },
      });
      // "https://striveschool-api.herokuapp.com/api/agenda/63c9060fe73738001537433b"
      if (res.ok) {
        let { name, description, price, imageUrl, brand } = await res.json();
        document.querySelector("#eventPrice").value = price;
        document.querySelector("#eventName").value = name;
        document.querySelector("#imageURL").value = imageUrl;
        document.querySelector("#brandName").value = brand;
        document.querySelector("#eventDescription").value = description;

        //required format for input => yyyy-MM-ddThh:mm:ss
        //api format => yyyy-MM-ddThh:mm:ss.000Z => with replace we took the last part away
      } else {
        console.log(res);
        throw res.status + " " + res.statusText;
      }
    } else {
      //we are trying to post
      const putButton = document.querySelector(".btn-success");
      putButton.remove();
    }
  } catch (error) {
    handleError(error);
  }
};

const handleBackoffice = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const eventToSend = {
      name: document.querySelector("#eventName").value,
      description: document.querySelector("#eventDescription").value,
      brand: document.querySelector("#brandName").value,
      imageUrl: document.querySelector("#imageURL").value,
      price: document.querySelector("#eventPrice").value,
    };
    const options = {
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQxMzY5MzIsImV4cCI6MTY3NTM0NjUzMn0.X73vu39Bzwy1NfEOUjeKdkslerRe-2eCM_UXbUMarnk",
      }),
      body: JSON.stringify(eventToSend),
    };
    let finalURL = url;
    if (id === null) {
      //this is a post
      options.method = "POST";
    } else {
      //this is a put, because the id is in the URL
      finalURL += `/${id}`; //https://striveschool-api.herokuapp.com/api/agenda + /63c9060fe73738001537433b
      options.method = "PUT";
    }
    const res = await fetch(finalURL, options);
    if (res.ok) {
      successAlert();
    } else {
      throw res.status + " " + res.statusText;
    }
  } catch (error) {
    handleError(error);
  }
};

// const handleNewEvent = async (submitEvent) => {
//   try {
//     submitEvent.preventDefault()

//     const name = document.querySelector("#eventName").value
//     const description = document.querySelector("#eventDescription").value
//     const time = document.querySelector("#eventTime").value
//     const price = document.querySelector("#eventPrice").value
//     const newEvent = { name, description, time, price }
//     const options = {
//       method: "POST", //we want to create
//       body: JSON.stringify(newEvent), //what we are sending
//       headers: new Headers({
//         "Content-Type": "application/json", //this is the language we are speaking!
//       }),
//     }
//     let res = await fetch(url, options)
//     if(res.ok) {
//       successAlert()

//     } else {
//       console.log(res)

//       throw res.status + " " + res.statusText
//     }
//   } catch (error) {
//     handleError(error)
//   }
// }

// const handleEditEvent = async (submitEvent) => {
//   try {
//     submitEvent.preventDefault()
//     const editedEvent = {
//       name: document.querySelector("#eventName").value,
//       description: document.querySelector("#eventDescription").value,
//       time: document.querySelector("#eventTime").value,
//       price: document.querySelector("#eventPrice").value,
//     }
//     const res = await fetch(url + "/" + id, {
//       // "https://striveschool-api.herokuapp.com/api/agenda/63c9060fe73738001537433b"

//       method: "PUT", //edit
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//       body: JSON.stringify(editedEvent),
//     })
//     if(res.ok) {
//       successAlert()
//     } else {
//       throw res.status + " " + res.statusText
//     }
//   } catch (error) {
//     handleError(error)
//   }
// }

const handleError = (errorText) => {
  const alert = document.querySelector(".alert span.alert-text");
  alert.innerText = errorText;
  alert.parentElement.classList.replace("d-none", "d-block");
};

const successAlert = () => {
  const alert = document.querySelector(".alert-success");
  alert.classList.add("show");
  alert.classList.remove("d-none");
};
