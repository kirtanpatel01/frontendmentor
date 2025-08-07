const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");

const selectors = document.querySelectorAll("#daily, #weekly, #monthly");
const timers = document.querySelectorAll(".time");
const current = document.querySelectorAll(".current");
const last = document.querySelectorAll(".last");
const cards = document.querySelectorAll(".card");

const cardColors = {
  Work: "bg-orange",
  Play: "bg-blue",
  Study: "bg-pink",
  Exercise: "bg-green",
  Social: "bg-purple-700",
  "Self Care": "bg-yellow",
};

const icons = {
  Work: "icon-work.svg",
  Play: "icon-play.svg",
  Study: "icon-study.svg",
  Exercise: "icon-exercise.svg",
  Social: "icon-social.svg",
  "Self Care": "icon-self-care.svg",
};

let selected = "daily";
let data;

selectors.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectors.forEach((b) => b.classList.add("opacity-50"));
    btn.classList.remove("opacity-50");
    selected = btn.id;
    setTimers(selected);
    initialize()
  });
});

function setTimers() {
  timers.forEach((time) => {
    time.innerHTML = selected.charAt(0).toUpperCase() + selected.slice(1);
  });
}

function generateCard(title, current, previous) {
  const id = title.toLowerCase().replace(" ", "-");
  const bgClass = cardColors[title];
  const icon = icons[title];

  return `
    <div id="${id}" class="card ${bgClass}">
      <img src="./images/${icon}" alt="${title}" class="card-img" />
      <div class="card-content">
        <div class="card-header">
          <h2 class="card-title">${title}</h2>
          <button class="card-btn">...</button>
        </div>
        <div class="card-data">
          <h1 class="current-data"><span class="current">${current}</span>hrs</h1>
          <span class="last-data">
            Last <span class="time">${capitalize(selected)}</span> - <span class="last">${previous}</span>hrs
          </span>
        </div>
      </div>
    </div>
  `;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// load the data
// set "daily" as selected timer
async function initialize() {
  document.getElementById(selected).classList.remove("opacity-50");
  setTimers(selected);
  try {
    const res = await fetch("./data.json");
    if (!res.ok) throw new Error("Oops! 404");
    data = await res.json();

    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    data.forEach((item) => {
      const { current, previous } = item.timeframes[selected];
      const cardHTML = generateCard(item.title, current, previous);
      cardsContainer.innerHTML += cardHTML;
    });
  } catch (err) {
    console.error(err);
  }
}

initialize();
