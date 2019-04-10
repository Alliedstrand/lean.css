document.getElementById("switch").addEventListener("click", () => {
  const stylesheet = document.getElementById("stylesheet");
  if (stylesheet.getAttribute("href") === "dist/lean-dark.css") {
    stylesheet.setAttribute("href", "dist/lean-light.css");
  } else {
    stylesheet.setAttribute("href", "dist/lean-dark.css");
  }
});
