import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => {
    return { theme: "LIGHT" };
  },
  actions: {
    swapTheme() {
      if (this.theme === "LIGHT") {
        this.theme = "DARK";
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
        this.theme = "LIGHT";
      }
    },
  },
});
