const database = firebase.database();
const truckers = database.ref("truckers");

const truckersTableBody = document.getElementById("truckers-table-body");

truckers.on("value", snapshot => {
  const theTruckers = snapshot.val();
  clearTable();
  Object.keys(theTruckers).map(id => {
    addTruckerToTable(Object.assign({}, { id }, theTruckers[id]));
  });
});

function clearTable() {
  while (truckersTableBody.firstChild) {
    truckersTableBody.removeChild(truckersTableBody.firstChild);
  }
}

function addTruckerToTable(trucker) {
  const row = document.createElement("tr");
  const truckerId = document.createElement("td");
  const truckerName = document.createElement("td");
  const truckerStatus = document.createElement("td");

  truckerId.textContent = trucker.id;
  truckerName.textContent = trucker.name;
  truckerStatus.textContent = trucker.is_approved ? "Aprovado" : "Reprovado";

  row.appendChild(truckerId);
  row.appendChild(truckerName);
  row.appendChild(truckerStatus);

  const actions = document.createElement("td");
  const button = document.createElement("button");
  button.className = "button is-danger";
  button.textContent = "Remover";
  button.onclick = () => {
    database.ref("truckers/" + trucker.id).remove();
  };
  actions.appendChild(button);
  row.appendChild(actions);

  truckersTableBody.appendChild(row);
}

function handleSubmit(event, form) {
  event.preventDefault();

  const data = new FormData(form);
  const trucker = {
    name: data.get("name"),
    is_approved: !!Number(data.get("is_approved"))
  };
  truckers.push(trucker);
  form.reset();
}
