document.getElementById("switch").addEventListener("click", () => {
  const stylesheet = document.getElementById("stylesheet");
  if (stylesheet.getAttribute("href") === "lean-dark.min.css") {
    stylesheet.setAttribute("href", "lean-light.min.css");
  } else {
    stylesheet.setAttribute("href", "lean-dark.min.css");
  }
});
