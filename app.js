"use_strict";
m.route.prefix("#");

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function ask_reboot () {
  if(confirm('Setting was saved! Do you want to reboot to apply it now?'))
    navigator.engmodeExtension.startUniversalCommand("reboot", true);
}

let enabled = navigator.engmodeExtension.getPropertyValue("persist.radio.multisim.config") == "dsds";

const main = {
  oncreate: () => {
    document.querySelector("button").focus();
  },
  view: () =>
    m("div", {class: "kui-app"}, [
      m("div", {class: "kui-header", id: "header"}, [
        m("h2", {class: "kui-h2"}, "Second SIM toggle"),
      ]),
      m("br"),
      m("div", {class: "kui-toast", id: "status"}, [
        m("p", {class: "kui-pri"}, "SIM 2 is " + ( enabled ? "enabled" : "disabled" )),
        m("div", {class: "kui-toast-shadow"})
      ]),
      m("button", {class: "kui-btn", id: "toggle",
          onclick: () => {
            if(!enabled) {
              navigator.engmodeExtension.setPropertyValue("persist.radio.multisim.config", "dsds");
              navigator.engmodeExtension.setPropertyValue("persist.moz.ril.0.network_types", "gsm,wcdma,lte");
              navigator.engmodeExtension.setPropertyValue("persist.moz.ril.1.network_types", "gsm,wcdma,lte");
              enabled = true;
            } else {
              navigator.engmodeExtension.setPropertyValue("persist.radio.multisim.config", "none");
              enabled = false;
            }
            ask_reboot();
          }
        },
      (enabled == true ? "Disable" : "Enable") + " SIM 2"),
      m("br"),
      m("div", {class: "kui-sec",id: "footer"}, [
        m("text", "2019, by "),
        m("a", {href:"http://tolsi.ru"}, "tolsi.ru")
      ])
    ])
};

m.route(document.body, "main", {
  main: main
});