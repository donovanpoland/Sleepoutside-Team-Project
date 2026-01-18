export default class Alert {
  constructor(alertsUrl) {
    this.alertsUrl = alertsUrl;
  }

  async init() {
    const alerts = await this.getAlerts();
    if (!alerts || alerts.length === 0) return;

    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach((alert) => {
      const p = document.createElement("p");
      p.textContent = alert.message;

      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;

      section.appendChild(p);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(section);
    }
  }

  async getAlerts() {
    try {
      const response = await fetch(this.alertsUrl);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      return [];
    }
  }
}
