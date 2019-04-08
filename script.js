document.getElementById("switch").addEventListener("click", () => {
  const stylesheet = document.getElementById("stylesheet");
  const ph = document.getElementById("ph");
  if (stylesheet.getAttribute("href") === "dist/lean-dark.css") {
    stylesheet.setAttribute("href", "dist/lean-light.css");
    ph.src = ph.src.replace("theme=dark", "theme=light");
  } else {
    stylesheet.setAttribute("href", "dist/lean-dark.css");
    ph.src = ph.src.replace("theme=light", "theme=dark");
  }
});
