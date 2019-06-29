"use_strict";
m.route.prefix("#");

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function ask_reboot () {
  if(confirm('Value was setted! Do you want to reboot now to apply it?'))
    navigator.engmodeExtension.startUniversalCommand("reboot", true);
}

let enabled = JSON.parse(window.localStorage.getItem('enabled'));;

const enable_second_sim = 'setprop persist.radio.multisim.config dsds';
const disable_second_sim = 'setprop persist.radio.multisim.config none';

const set_net_types_1_sim = 'setprop persist.moz.ril.0.network_types gsm,wcdma,lte';
const set_net_types_2_sim = 'setprop persist.moz.ril.1.network_types gsm,wcdma,lte';

const enable_cmd = enable_second_sim + ' && ' + set_net_types_1_sim + ' && ' + set_net_types_2_sim;

const main = {
  oncreate: () => {
    document.querySelector("button").focus();
  },
  view: () =>
    m("main", [
      m("h1", "second-sim-control"),
      m("h3", "by tolsi"),
      m("hr"),
      m("button",
        {
          onclick: () => {
            if(!enabled) {
              navigator.engmodeExtension.startUniversalCommand(enable_cmd, true);
              enabled = true;
            } else {
              navigator.engmodeExtension.startUniversalCommand(disable_second_sim, true);
              enabled = false;
            }
            window.localStorage.setItem('enabled', JSON.stringify(enabled));
            ask_reboot();
          }
        },
      (enabled == true ? "Disable" : "Enable") + " SIM"),
      m("h3", "<<< SIM " + ( enabled ? "enabled" : "disabled" ) + " >>>")
    ])
};

m.route(document.body, "main", {
  main: main
});