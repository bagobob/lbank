import { lbank_backend } from "../../declarations/lbank_backend";

window.addEventListener("load", async function() {
    update();
});

document.querySelector("form").addEventListener("submit", async (event)=>{
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
        await lbank_backend.topUp(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
        await lbank_backend.withdraw(outputAmount);
    }

    await lbank_backend.compound();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
});

async function update() {
    const currentAmount = await lbank_backend.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) /100;
}