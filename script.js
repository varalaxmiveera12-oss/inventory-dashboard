// Capstone: Interactive Product Inventory & Analytics Dashboard
// Runs in the browser. Output goes to the real console AND the on-page panel.

(function () {
  "use strict";

  const outputEl = document.getElementById("output");

  // Logger: mirrors console.log into the page
  function log(message) {
    console.log(message);
    outputEl.textContent += message + "\n";
  }

  // ---------- 2) Conditional logic: category badges (switch + thresholds) ----------
  function getCategory(price) {
    switch (true) {
      case price < 100:
        return "Budget";
      case price < 500:
        return "Standard";
      default:
        return "Premium";
    }
  }

  // ---------- 4) Functions & scope ----------
  // Regular function; `total` is local and never leaks into global scope
  function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
      total += item.price;
    }
    return total;
  }

  // Arrow functions with default parameters (tax % and flat discount)
  const applyAdjustments = (amount, taxRate = 0, discount = 0) =>
    (amount - discount) * (1 + taxRate / 100);

  const formatList = (arr) => `[${arr.map((s) => `"${s}"`).join(", ")}]`;

  // ---------- Main program ----------
  function runCapstone(useDemo) {
    outputEl.textContent = "";
    log("--- Initializing Inventory System ---");

    // 1) Data & input initialization (pre-existing items)
    const inventory = [
      { name: "Laptop", price: 800 },
      { name: "Mouse", price: 25 },
    ];

    // 3) Loop with continue/break: allow up to 3 attempts for valid input
    let newItem = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      let rawName;
      let rawPrice;

      if (useDemo) {
        rawName = "Monitor";
        rawPrice = "150";
      } else {
        rawName = prompt("Enter product name:", "Monitor");
        if (rawName === null) {
          log("Input cancelled.");
          break; // user pressed Cancel -> stop asking
        }
        rawPrice = prompt("Enter product price:", "150");
        if (rawPrice === null) {
          log("Input cancelled.");
          break;
        }
      }

      // Validate name
      if (rawName.trim() === "") {
        log("Invalid name, please try again.");
        continue;
      }

      // Explicit conversion + validate price
      const price = Number(rawPrice);
      if (rawPrice.trim() === "" || Number.isNaN(price) || price <= 0) {
        log("Invalid price, please try again.");
        continue;
      }

      newItem = { name: rawName.trim(), price: price };
      break;
    }

    if (newItem === null) {
      log("No valid product entered. Continuing with existing inventory.");
    } else {
      // Loop + break: search for a duplicate name
      let duplicate = false;
      for (const item of inventory) {
        if (item.name.toLowerCase() === newItem.name.toLowerCase()) {
          duplicate = true;
          break;
        }
      }
      if (duplicate) {
        log(`"${newItem.name}" already exists, skipping.`);
      } else {
        inventory.push(newItem);
        log(`[Prompt executed: User adds "${newItem.name}" at "$${newItem.price}"]`);
      }
    }

    // 5) forEach: print inventory sheet
    log("\n--- Processing Inventory Roster (forEach) ---");
    inventory.forEach((item) => {
      log(`* Item: ${item.name} ($${item.price}) -> Category: ${getCategory(item.price)}`);
    });

    // Financial analytics
    log("\n--- Financial Analytics ---");
    const total = calculateTotal(inventory);
    log(`Total Inventory Value: $${total}`);

    // 5) filter + map
    const affordable = inventory
      .filter((item) => item.price < 200)
      .map((item) => item.name);
    log(`Filtered Affordable Items (Under $200): ${formatList(affordable)}`);

    const report = inventory.map((item) => `${item.name.toUpperCase()}: $${item.price}`);
    log(`Formatted Report List: ${formatList(report)}`);

    // Bonus: custom tax/discount
    log(`Bonus - Total with 10% tax and $50 discount: $${applyAdjustments(total, 10, 50).toFixed(2)}`);
  }

  // Button wiring
  document.getElementById("runPrompt").addEventListener("click", function () {
    runCapstone(false);
  });
  document.getElementById("runDemo").addEventListener("click", function () {
    runCapstone(true);
  });
  document.getElementById("clearBtn").addEventListener("click", function () {
    outputEl.textContent = "Click a button above to run the program.";
  });
})();
