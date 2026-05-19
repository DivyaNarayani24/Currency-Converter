// ============================================================
//  PocketXchange — script.js
//  Fixes applied:
//    1. Currency buttons show full name below code (e.g. "US Dollar")
//    2. No loading dots — Convert button stays as "Convert"
//    3. Swap button auto-converts after swapping
//    4. Port set to 4444
// ============================================================

const BACKEND_URL = "http://localhost:4444/convert";

const CURRENCIES = [
  { code: "USD", name: "US Dollar",       symbol: "$"  },
  { code: "EUR", name: "Euro",            symbol: "€"  },
  { code: "GBP", name: "British Pound",   symbol: "£"  },
  { code: "INR", name: "Indian Rupee",    symbol: "₹"  },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "JPY", name: "Japanese Yen",    symbol: "¥"  },
  { code: "AUD", name: "Australian Dollar",symbol: "A$"},
  { code: "CHF", name: "Swiss Franc",     symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan",    symbol: "¥"  },
  { code: "SEK", name: "Swedish Krona",   symbol: "kr" }
];

let baseCurrency   = "";
let targetCurrency = "";

// DOM refs
const baseContainer   = document.getElementById("baseContainer");
const targetContainer = document.getElementById("targetContainer");
const resultBox       = document.getElementById("resultBox");
const resultAmount    = document.getElementById("resultAmount");
const resultMeta      = document.getElementById("resultMeta");
const errorBox        = document.getElementById("errorBox");
const convertBtn      = document.getElementById("convertBtn");
const baseSymbol      = document.getElementById("baseSymbol");

// ---- Build currency buttons (FIX 2: show code + full name) ----
function buildButtons(container, type) {
  CURRENCIES.forEach(curr => {
    const btn = document.createElement("button");
    btn.classList.add("currency-btn");
    btn.dataset.currency = curr.code;

    // Show code on top, full name below
    btn.innerHTML = `
      <span class="currency-code">${curr.code}</span>
      <span class="currency-name">${curr.name}</span>
    `;

    btn.addEventListener("click", () => selectCurrency(curr.code, type));
    container.appendChild(btn);
  });
}

function getCurrencyInfo(code) {
  return CURRENCIES.find(c => c.code === code);
}

function selectCurrency(code, type) {
  const info = getCurrencyInfo(code);
  if (type === "base") {
    baseCurrency = code;
    // Update symbol in amount input
    baseSymbol.textContent = info ? info.symbol : code;
    document.querySelectorAll("#baseContainer .currency-btn")
      .forEach(b => b.classList.remove("selected-base"));
    baseContainer.querySelector(`[data-currency="${code}"]`)
      .classList.add("selected-base");
  } else {
    targetCurrency = code;
    document.querySelectorAll("#targetContainer .currency-btn")
      .forEach(b => b.classList.remove("selected-target"));
    targetContainer.querySelector(`[data-currency="${code}"]`)
      .classList.add("selected-target");
  }
}

buildButtons(baseContainer,   "base");
buildButtons(targetContainer, "target");

// ---- Swap button (FIX 3: auto-converts after swap) ----
document.getElementById("swapBtn").addEventListener("click", () => {
  if (!baseCurrency || !targetCurrency) return;

  const temp = baseCurrency;
  selectCurrency(targetCurrency, "base");
  selectCurrency(temp, "target");

  // Auto-convert after swap if amount is filled
  const amount = document.getElementById("amount").value;
  if (amount && parseFloat(amount) > 0) {
    doConvert();
  } else {
    hideResult();
  }
});

// ---- Result helpers ----
function showResult(data, amount) {
  resultAmount.textContent =
    `${parseFloat(amount).toFixed(2)} ${data.from} = ${data.convertedAmount.toFixed(4)} ${data.to}`;
  resultMeta.textContent =
    `Rate date: ${data.date}  ·  1 ${data.from} = ${(data.convertedAmount / amount).toFixed(6)} ${data.to}`;
  resultBox.hidden = false;
  errorBox.hidden  = true;
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden  = false;
  resultBox.hidden = true;
}

function hideResult() {
  resultBox.hidden = true;
  errorBox.hidden  = true;
}

// ---- Core convert function ----
async function doConvert() {
  const amount = document.getElementById("amount").value;

  if (!amount || parseFloat(amount) <= 0) {
    showError("Please enter a valid amount greater than 0.");
    return;
  }
  if (!baseCurrency) {
    showError("Please select a FROM currency.");
    return;
  }
  if (!targetCurrency) {
    showError("Please select a TO currency.");
    return;
  }
  if (baseCurrency === targetCurrency) {
    showError("FROM and TO currencies are the same — nothing to convert!");
    return;
  }

  hideResult();

  try {
    const url = `${BACKEND_URL}?amount=${amount}&base=${baseCurrency}&target=${targetCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Server error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.convertedAmount || data.convertedAmount <= 0) {
      throw new Error("Invalid conversion result from server.");
    }

    showResult(data, parseFloat(amount));

  } catch (err) {
    console.error("[PocketXchange] Conversion error:", err);
    showError(
      err.message.includes("Failed to fetch")
        ? "Cannot reach the backend. Make sure Spring Boot is running on port 4444."
        : `Error: ${err.message}`
    );
  }
}

// FIX 2: Convert button — just calls doConvert, no loading dots
convertBtn.addEventListener("click", doConvert);