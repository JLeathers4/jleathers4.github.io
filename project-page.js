const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((tab) => {
      tab.classList.toggle("active", tab === button);
      tab.setAttribute("aria-selected", tab === button ? "true" : "false");
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});
