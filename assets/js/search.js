const input = document.getElementById("search-input")
const button = document.getElementById("search-button")

button.addEventListener("click", () => {
  if (input.value) {
    location.href = "index.html?q=" + input.value
  }
});

input.addEventListener("keypress", (ev) => {
  if (ev.key === "Enter") {
    document.getElementById("search-button").click();
  }
})
