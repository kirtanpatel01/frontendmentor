const btnContainer = document.getElementById("btn-container");
const btns = [];
const submitBtn = document.getElementById("submit-btn");
const ratingCard = document.getElementById("rating-card")
const successCard = document.getElementById("success-card")
const userRating = document.getElementById("user-rating")

let rating;

const generateBtn = (index) => {
  const btn = document.createElement("button");
  btn.id = index;
  btn.classList.add("btn");
  btn.innerText = index;

  btn.addEventListener("click", () => {
    btns.forEach(btn => btn.classList.remove("active"))
    rating = btn.id;
    btns.filter(btn => parseInt(btn.id) <= rating).forEach(btn => btn.classList.add("active"))
  })
  btns.push(btn)

  return btn;
};

for (let i = 1; i <= 5; i++) {
  btnContainer.appendChild(generateBtn(i));
}

submitBtn.addEventListener("click", () => {
  if(!rating) {
    const span = document.createElement("span")
    span.classList.add(
      "text-red-500", 
      "font-mono", 
      "text-center", 
      "text-sm",
      "text-center",
      "w-full",
      "block"
    )
    span.innerText = "Please select atleast one rating!"
    ratingCard.appendChild(span)
    return;
  }
  ratingCard.classList.add("hidden")
  successCard.classList.remove("hidden")
  userRating.innerText = rating
})

function back() {
  ratingCard.classList.remove("hidden")
  successCard.classList.add("hidden")
}