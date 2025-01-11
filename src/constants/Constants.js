import { EVENTS_DEFAULT } from "@holywater-tech/ads-builder/framework/components/EventsDispatcher";
import Screen from "../Screen";

export const EVENTS = {
  ...EVENTS_DEFAULT,
  ON_MACHINE_CLICK: "onMachineClick",
  ON_STOP_CLICK: "onStopClick",
  NEXT_SCENE: "NEXT_SCENE",
  ON_DESELECT_CLICK: "onDeselectClick",
  ON_BUTTON_CLICK_START: "onButtonClickStart",
  HAPPY: "happy",
  SHOW_DRESS_ITEM: "setItems",
  SHOW_NEXT_ITEM: "onChangeScene",
  REMOVE_ITEM: "removeItem",
  CHANGE_SCENE: "onChangeScene",
  CHANGE_HAIR: "onChangeHair" /* your custom events */,
};

export const ITEMS = ["1", "2", "3", "4", "5"];
export const LAYERS_DEPTH = {
  TITLE: 5,
  ITEM_GLOW: 35,
  ITEM_BASE: 34,
  ITEM: 30,
  MISTAKES: 33,
  TIMER: 35,
  HAND_TUTORIAL: 44,
};
const machines = {};
export const SPIN_ITEMS = [
  { name: "slot_7" },
  { name: "slot_77" },
  { name: "slot_bar" },
  { name: "slot_bar_3" },
  { name: "slot_bar5" },
  { name: "slot_bar_2" },
  { name: "slot_rings" },
  { name: "slot_bar_33" },
  { name: "slot_tripple" },
  { name: "slot_wild" },
  { name: "slot_777" },
  { name: "slot_chery" },
  { name: "slot_four" },
];
export const SPIN_ITEMS1 = [
  { name: "slot1_1" },
  { name: "slot1_2" },
  { name: "slot1_6" },
  { name: "slot1_3" },
  { name: "slot1_4" },
  { name: "slot1_5" },
  { name: "slot1_8" },
  { name: "slot1_9" },
  { name: "slot1_5" },
  { name: "slot1_3" },
  { name: "slot1_7" },
  { name: "slot1_11" },
  { name: "slot1_10" },
];
export const SPIN_ITEMS2 = [
  { name: "slot2_1" },
  { name: "slot2_2" },
  { name: "slot2_9" },
  { name: "slot2_3" },
  { name: "slot2_4" },
  { name: "slot2_5" },
  { name: "slot2_6" },
  { name: "slot2_8" },
  { name: "slot2_5" },
  { name: "slot2_3" },
  { name: "slot2_7" },
  { name: "slot2_8" },
  // { name: "slot2_11" },
  { name: "slot2_10" },
];
export const SPIN_ITEMS3 = [
  { name: "slot3_8" },
  { name: "slot3_3" },
  { name: "slot3_10" },
  { name: "slot3_1" },
  { name: "slot3_2" },
  { name: "slot3_7" },
  { name: "slot3_4" },
  { name: "slot3_5" },
  { name: "slot3_6" },
  { name: "slot3_9" },
  { name: "slot3_5" },
  { name: "slot3_3" },
  { name: "slot3_11" },
];

export const SLOT1 = {
  // base: "slot1_base",
  position: [0, 0],
  // middle: "slot1_middle",
  middlePosition: [16, 92],
  positionSpin: [
    { x: -90, y: 40 },
    { x: -5, y: 40 },
    { x: 78, y: 40 },
  ],
  distanceBetween: 100,
  highPosition: -150,
  scale: 0.65,
  depth: 12,
  slots: SPIN_ITEMS,
  winBorder: [
    { x: -130, y: 40 },
    { x: 0, y: 40 },
    { x: 125, y: 40 },
  ],
  winScale: 0.75,
};
// export const POSITION = {
//   choices: Screen.phoneProportions ? [0, 380, 0, 480] : [0, 430, 0, 480],
//   mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
//   buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
//   messageTitle: Screen.phoneProportions
//     ? [0, -100, 0, -100]
//     : [0, -100, 0, -30],
//   level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
// };
export const SCALE = {
  choices: Screen.phoneProportions
    ? [0.8, 0.8, 0.8, 0.8]
    : [0.8, 0.8, 0.8, 0.8],
  mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
  buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
  title: Screen.phoneProportions
    ? [0.22, 0.22, 0.22, 0.22]
    : [0.22, 0.22, 0.22, 0.22],
  messageTitle: Screen.phoneProportions ? [0, 350, 0, -100] : [0, 350, 0, -30],
  level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};

export const SHEETS = {
  ITEM_BASE: "btn",
  ITEM_GLOW: "btn_tap",
  HAND_TUTORIAL: "hand_tutorial",
};

export const POSITIONS_PHONE = {
  top: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
  bottom: Screen.iphoneSEProportions ? [0, -230, 0, -180] : [0, -230, 0, -210],
  machine: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};
export const POSITIONS = {
  top:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.top
      : [0, 0, 0, 0],
  bottom:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.bottom
      : [0, -230, 0, -150],
  machine:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? POSITIONS_PHONE.machine
      : [0, 0, 0, 0],
};

const SCALES_PHONE = {
  top: Screen.phoneProportions
    ? [0.7, 0.7, 0.65, 0.65]
    : [0.7, 0.7, 0.65, 0.65],
  bottom: Screen.iphoneSEProportions ? [1, 1, 0.6, 0.6] : [1, 1, 0.8, 0.8],
  machine: Screen.iphoneSEProportions
    ? [1.6, 1.6, 1.2, 1.2]
    : [1.4, 1.4, 1.2, 1.2],
};

export const SCALES = {
  top:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.top
      : [0.7, 0.7, 0.5, 0.5],
  bottom:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.bottom
      : [1, 1, 0.65, 0.65],
  machine:
    Screen.iphoneSEProportions || Screen.phoneProportions
      ? SCALES_PHONE.machine
      : [1.1, 1.1, 1.2, 1.2],
};
export const SCENE_LIGHT = [
  { x: 5, y: 175, scale: 0.95 },
  { x: -180, y: 170, scale: 0.95 },
  { x: 180, y: 170, scale: 0.95 },
  { x: -310, y: 155, scale: 0.9 },
  { x: 308, y: 155, scale: 0.9 },
  { x: -410, y: 135, scale: 0.8 },
  { x: 410, y: 135, scale: 0.85 },
];

export const BET = [
  { "10K": 10000 },
  { "125K": 125000 },
  { "1M": 1000000 },
  { "2.5M": 2500000 },
  { "20.5M": 20500000 },
  { "50M": 50000000 },
  { "100M": 100000000 },
];
