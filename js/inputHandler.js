'use strict';

function addEListners() {
  // let state = document.querySelector("#state");
  // state.addEventListener("click", () => { sortTable("state") });

  let total = document.querySelector("#total");
  total.addEventListener("click", () => { sortTable("totalTestResults") });

  let pos = document.querySelector("#pos");
  pos.addEventListener("click", () => { sortTable("positive") });

  let neg = document.querySelector("#neg");
  neg.addEventListener("click", () => { sortTable("negative") });

  let death = document.querySelector("#death");
  death.addEventListener("click", () => { sortTable("death") });

  let rec = document.querySelector("#rec");
  rec.addEventListener("click", () => { sortTable("recovered") });
}

// // for table sorting 

// // let positive = document.querySelector("#pos");
// // positive.addEventListener("click", tblBtnListener);
// console.log("sorted by pos");



function tblBtnListener() {
  console.log(e);
  if (e.target.id === "pos") sortTable("positive"); console.log("clicked");
}


