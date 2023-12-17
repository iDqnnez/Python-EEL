const utrakning_tal_inmattning_1 = document.getElementById(
    "utrakning-title-input-1"
);
const utrakning_tal_inmattning_2 = document.getElementById(
    "utrakning-title-input-2"
);
const utrakning_skapa_btn = document.getElementById("utrakning-add-btn");
const utrakning_table_body = document.getElementById("utrakning-table-body");

eel.expose;
function visaUtrakning(utrakning) {
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = utrakning["tal"];

    let td2 = document.createElement("td");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("data-id", utrakning["id"]);
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (event) => {
        event.target.setAttribute("disabled", "true");

        let id = event.target.getAttribute("data-id");
        eel.radera_utrakning(parseInt(id));

        // remove row from table and play animation
        let tr = event.target.parentElement.parentElement;
        $(tr).fadeTo("slow", 0.001, function () {
            $(this).remove();
        });
    });

    td2.appendChild(checkbox);
    tr.appendChild(td1);
    tr.appendChild(td2);
    utrakning_table_body.appendChild(tr);

    utrakning_tal_inmattning_1.value = "";
    utrakning_tal_inmattning_2.value = "";
}

eel.expose;
function visaAllaUtrakningar(utrakningar) {
    for (let utrakning of utrakningar["utrakningar"]) {
        visaUtrakning(utrakning);
    }
}

utrakning_skapa_btn.addEventListener("click", (event) => {
    let content =
        parseInt(utrakning_tal_inmattning_1.value) +
        parseInt(utrakning_tal_inmattning_2.value);
    if (content != "") {
        eel.skapa_utrakning(content)(visaUtrakning);
    }
});

eel.lista_utrakningar()(visaAllaUtrakningar);
