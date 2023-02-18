"use strict";

const exportdata = document.getElementById("export-btn");
const importdata = document.getElementById("import-btn");

var petArr;
if (localStorage.getItem("pet")) {
  // petArr = JSON.parse(getFromStorage("pet"));
  petArr = getFromStorage("pet");
} else petArr = [];

// console.log(petArr);
// console.log(JSON.stringify(petArr));
exportdata.addEventListener("click", function () {
  var blob = new Blob([petArr], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "static.txt");
});

importdata.addEventListener("click", function (e) {
  var file = document.getElementById("input-file").files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      // document.getElementById("fileContents").innerHTML = evt.target.result;
      console.log(evt.target.result);
      saveToStorage("pet", evt.target.result);
    };
    // reader.onerror = function (evt) {
    //   // document.getElementById("fileContents").innerHTML = "error reading file";
    // };
  }
});

sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});