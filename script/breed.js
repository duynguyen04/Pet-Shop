"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
var breedArr;
if (localStorage.getItem("breed")) {
  breedArr = JSON.parse(getFromStorage("breed"));
} else breedArr = [];
const tableBodyEl = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");

//clear input
function clearInput() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}
submitBtn.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  function validateData(data) {
    let validate = true;
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
  if (validate) {
    breedArr.push(data);
    saveToStorage("breed", JSON.stringify(breedArr));
    clearInput();
    renderTable(breedArr);
  }
});

function renderTable(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((pet, i) => {
    const row = document.createElement("tr");
    row.innerHTML = genRow(pet, i);
    tableBodyEl.appendChild(row);
  });
}
function genRow(row, index) {
  return `
  <td>${index + 1}</td>
  <td>${row.breed}</td>
      <td>${row.type}</td>
<td><button type="button" class="btn btn-danger btn-delete" id="btn-delete" data-id="${
    index + 1
  }">Delete</button></td>
      `;
}

// nút delete
tableBodyEl.addEventListener("click", function (e) {
  if (e.target.id != "btn-delete") return;
  const id = e.target.getAttribute("data-id");
  if (!id) return;
  const isConfirm = confirm("Are you sure?");
  console.log(isConfirm);
  if (!isConfirm) return;
  console.log(`Delete pet with # = ${id}`);
  // console.log(petArr);
  // remove
  for (let i = 0; i < breedArr.length; i++) {
    if (i + 1 == id) {
      console.log(breedArr);
      breedArr.splice(i, 1);
      console.log(breedArr);
    }
    //   console.log(petArr);
    //   saveToStorage("pet", JSON.stringify(petArr));
    saveToStorage("breed", JSON.stringify(breedArr));
    // tải lại mảng thú cưng
    renderTable(breedArr);
  }
});
renderTable(breedArr);

sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
