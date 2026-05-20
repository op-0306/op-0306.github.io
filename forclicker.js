// ===== 희귀 아이템 시스템 =====

let boxCost = Number(localStorage.getItem('boxCost')) || 100;

const items = [
  {
    name: "🍀 Lucky Coin",
    rarity: "COMMON",
    chance: 50,
    effect: () => {
      perClick += 1;
    }
  },

  {
    name: "⚡ Speed Battery",
    rarity: "RARE",
    chance: 30,
    effect: () => {
      autoCoins += 2;
    }
  },

  {
    name: "💎 Diamond Finger",
    rarity: "EPIC",
    chance: 15,
    effect: () => {
      perClick += 5;
    }
  },

  {
    name: "👑 GOD HAND",
    rarity: "LEGENDARY",
    chance: 5,
    effect: () => {
      perClick += 20;
      autoCoins += 10;
    }
  }
];

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const boxCostEl = document.getElementById("boxCost");
const inventoryEl = document.getElementById("inventory");
const itemLog = document.getElementById("itemLog");

function saveInventory() {
  localStorage.setItem("inventory", JSON.stringify(inventory));
  localStorage.setItem("boxCost", boxCost);
}

function updateInventoryUI() {
  inventoryEl.innerHTML = "";

  if (inventory.length === 0) {
    inventoryEl.innerHTML = "no items";
    return;
  }

  inventory.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} (${item.rarity})`;
    div.style.marginTop = "6px";
    inventoryEl.appendChild(div);
  });
}

function getRandomItem() {
  const rand = Math.random() * 100;

  let total = 0;

  for (const item of items) {
    total += item.chance;

    if (rand <= total) {
      return item;
    }
  }
}

document.getElementById("boxBtn").addEventListener("click", () => {

  if (score < boxCost) {
    itemLog.textContent = "❌ not enough coin";
    return;
  }

  score -= boxCost;

  const wonItem = getRandomItem();

  inventory.push({
    name: wonItem.name,
    rarity: wonItem.rarity
  });

  wonItem.effect();

  itemLog.innerHTML = `
    🎉 YOU GOT:<br>
    <strong>${wonItem.name}</strong><br>
    (${wonItem.rarity})
  `;

  boxCost = Math.floor(boxCost * 1.35);

  boxCostEl.textContent = boxCost;

  updateInventoryUI();
  updateUI();
  saveInventory();
});

// 최초 실행
boxCostEl.textContent = boxCost;
updateInventoryUI();
