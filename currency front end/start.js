const currencies = ["USD","EUR","GBP","INR","CAD","JPY","AUD","CHF","CNY","SEK"];
let baseCurrency = "";
let targetCurrency = "";

const baseContainer = document.getElementById("baseContainer");
const targetContainer = document.getElementById("targetContainer");
const resultDiv = document.getElementById("result");

function createCurrencyButtons(container, type) {
    currencies.forEach(curr => {
        const btn = document.createElement("button");
        btn.innerText = curr;
        btn.classList.add("currency-button");
        btn.addEventListener("click", () => {
            if(type === "base") baseCurrency = curr;
            else targetCurrency = curr;

            Array.from(container.children).forEach(b => b.style.backgroundColor = "#330033");
            btn.style.backgroundColor = "#ff3366";
        });
        container.appendChild(btn);
    });
}

createCurrencyButtons(baseContainer, "base");
createCurrencyButtons(targetContainer, "target");

document.getElementById("convertBtn").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;
    if(!amount || !baseCurrency || !targetCurrency) {
        alert("Please enter amount and select both currencies!");
        return;
    }

    resultDiv.innerText = `Converting ${amount} ${baseCurrency} → ${targetCurrency} ...`;

    try {
        // Call your Spring Boot backend
        const response = await fetch(`http://localhost:8080/country?base=${baseCurrency}&target=${targetCurrency}&amount=${amount}`);
        if (!response.ok) {
            throw new Error("Failed to fetch conversion");
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.convertedAmount && data.convertedAmount > 0) {
            resultDiv.innerText = `${amount} ${baseCurrency} = ${data.convertedAmount} ${targetCurrency}`;
        } else {
            resultDiv.innerText = "Conversion failed. Try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerText = "Error fetching conversion.";
    }
});
