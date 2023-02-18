"use strict";
// khai báo cáo biến input
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const editcontainer = document.getElementById("container-form");
var petArr;
if (localStorage.getItem("pet")) {
  petArr = JSON.parse(getFromStorage("pet"));
} else petArr = [];
var breedArr;
if (localStorage.getItem("breed")) {
  breedArr = JSON.parse(getFromStorage("breed"));
} else breedArr = [];
const tableBodyEl = document.getElementById("tbody");
const sidebar = document.getElementById("sidebar");

// hàm xóa input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// nút edit
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-edit") return;
  const petId = e.target.getAttribute("data-id");
  if (!petId) return;
  console.log(`edit pet with id = ${petId}`);
  editcontainer.classList.remove("hide");
  // remove
  for (let i = 0; i < petArr.length; i++) {
    console.log(i);
    console.log(petArr[i].breed);
    if (petArr[i].id === petId) {
      idInput.value = petArr[i].id;
      nameInput.value = petArr[i].name;
      ageInput.value = petArr[i].age;
      typeInput.value = petArr[i].type;
      weightInput.value = petArr[i].weight;
      lengthInput.value = petArr[i].length;
      colorInput.value = petArr[i].color;
      breedInput.innerHTML = `<option>${petArr[i].breed}</option>`;
      // breedInput.value = petArr[i].breed;
      vaccinatedInput.checked = petArr[i].vaccinated;
      dewormedInput.checked = petArr[i].dewormed;
      sterilizedInput.checked = petArr[i].sterilized;
      console.log(i);
      console.log(petArr[i].id);
      petArr.splice(i, 1);
    }
    saveToStorage("pet", JSON.stringify(petArr));
    // tải lại mảng thú cưng
    renderTable(petArr);
  }
});

typeInput.onchange = function () {
  let breedval = [];
  if (typeInput.value == "Dog") {
    console.log("dog");
    breedval = breedArr.filter(function (a) {
      if (a.type == "Dog") {
        return true;
      }
      return false;
    });
    console.log(breedval);
  } else {
    // option.innerHTML=""
    console.log("cat");
    breedval = breedArr.filter(function (a) {
      if (a.type == "Cat") {
        return true;
      }
      return false;
    });
  }
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedval.forEach((br) => {
    console.log("hihihi");
    const option = document.createElement("option");
    option.innerHTML = br.breed;
    breedInput.appendChild(option);
  });
};

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
    <td><button type="button" class="btn btn-warning" id="btn-edit" data-id="${
      row.id
    }">Edit</button></td>
    `;
}
// nút submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
  };
  editcontainer.classList.add("hide");
  // hàm check
  function validateData(data) {
    let validate = true;
    console.log(petArr);
    if (data.age < 1 || data.age > 15 || isNaN(data.age)) {
      alert("Age must be between 1 and 15!");
      validate = false;
    }
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      validate = false;
    }
    if (data.length < 1 || data.length > 100) {
      alert("Length must be between 1 and 100!");
      validate = false;
    }
    if (data.type == "Select Type") {
      alert("Please select Type!");
      validate = false;
    }
    if (data.breed == "Select Breed") {
      alert("Please select Breed!");
      validate = false;
    }
    return validate;
  }
  const validate = validateData(data);
  // console.log(validate);

  if (validate) {
    petArr.push(data);
    saveToStorage("pet", JSON.stringify(petArr));
    clearInput();
    renderTable(petArr);
  }
  // console.log(petArr);
});
renderTable(petArr);

sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});