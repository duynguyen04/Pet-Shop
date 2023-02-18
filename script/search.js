"use strict";

const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");

var petArr;
if (localStorage.getItem("pet")) {
  petArr = JSON.parse(getFromStorage("pet"));
} else petArr = [];

var breedArr;
if (localStorage.getItem("breed")) {
  breedArr = JSON.parse(getFromStorage("breed"));
} else breedArr = [];

findBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(data.id);
  const petSearch = petArr
    .filter(function (p) {
      if (p.id == data.id || !data.id) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (p.name == data.name || !data.name) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (p.type == data.type || data.type == "Select Type") {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (p.breed == data.breed || data.breed == "Select Breed") {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (
        (p.vaccinated == data.vaccinated && data.vaccinated == true) ||
        data.vaccinated == false
      ) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (
        (p.dewormed == data.dewormed && data.dewormed == true) ||
        data.dewormed == false
      ) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    })
    .filter(function (p) {
      if (
        (p.sterilized == data.sterilized && data.sterilized == true) ||
        data.sterilized == false
      ) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    });
  renderTable(petSearch);
  console.log(petSearch);
});

function renderTable(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet);
    tableBodyEl.appendChild(row);
  });
}
function genRow(row) {
  return `
      <th>${row.id}</th>
      <td>${row.name}</td>
      <td>${row.age}</td>
      <td>${row.type}</td>
      <td>${row.weight}</td>
      <td>${row.length}</td>
      <td>${row.breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${row.color}"></i></td>
      <td><i class="bi ${
        row.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        row.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        row.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${row.date}</td>
      `;
}

typeInput.onchange = function () {
    breedInput.innerHTML = "<option>Select Breed</option>";
    breedArr.forEach((br) => {
      console.log("hihihi");
      const option = document.createElement("option");
      option.innerHTML = br.breed;
      breedInput.appendChild(option);
    });
  };

  sidebar.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });