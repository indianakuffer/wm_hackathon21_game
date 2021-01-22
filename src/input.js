import { makeSprite, t, random } from "@replay/core";

const wordList = [
  "romaunt",
  "virologists",
  "handling",
  "unwarlike",
  "coronaries",
  "distinct",
  "hostessing",
  "natron",
  "trammeled",
  "thiazines",
  "hawkweeds",
  "indigoes",
  "takeable",
  "goldbricks",
  "substrates",
  "tamanduas",
  "cagey",
  "subatomic",
  "overlengths",
  "bradawls",
  "pirarucus",
  "done",
  "hatchbacks",
  "embank",
  "hemostasis",
  "fragrant",
  "federates",
  "subspecies",
  "callipering",
  "leafs",
  "oologists",
  "batfishes",
  "gelidness",
  "bushily",
  "finance",
  "mythopeic",
  "sheila",
  "handguns",
  "colatitude",
  "walkyrie",
  "misterming",
  "paranoids",
  "unchic",
  "plannings",
  "traiks",
  "outrace",
  "misdefine",
  "tryingly",
  "boardlike",
  "penny",
  "ramillies",
  "rased",
  "empennage",
  "bedell",
  "rouging",
  "enwombs",
  "zooidal",
  "geotropic",
  "concocts",
  "salvoed",
  "talking",
  "tucks",
  "outacting",
  "hellcat",
  "forfeited",
  "sheddable",
  "overland",
  "cisco",
  "aerobat",
  "untouchable",
  "ectoprocts",
  "lopsidedly",
  "implied",
  "phthaleins",
  "nooser",
  "grimacers",
  "generators",
  "whimpering",
  "dipeptidase",
  "aeronomist",
  "deliquesce",
  "vizierate",
  "plied",
  "nosebleeds",
  "fathomed",
  "carrousels",
  "nonschool",
  "marshalled",
  "destitute",
  "uremic",
  "sanders",
  "toffees",
  "retirant",
  "twistier",
  "stadia",
  "litas",
  "screenable",
  "shantymen",
  "forfeit",
  "oca",
  "withier",
  "believably",
  "dermatoid",
  "finless",
  "birdfarms",
  "sulphurous",
  "infectors",
  "swivet",
  "hubs",
  "languets",
  "boatlift",
  "monogerm",
  "rightism",
  "moronities",
  "ceria",
  "corporals",
  "pentarchs",
  "thesps",
  "blueheads",
  "smothers",
  "outman",
  "mozzarella",
  "tangence",
  "unripe",
  "feterita",
  "sforzandos",
  "sulfurates",
  "chymosins",
  "thud",
  "displode",
  "in",
  "conflicts",
  "missetting",
  "scandal",
  "daybreak",
  "maid",
  "footnotes",
  "fellation",
  "sanguinary",
  "knocks",
  "azotizes",
  "sheerlegs",
  "parerga",
  "rotavirus",
  "bullocky",
];

export const Input = makeSprite({
  init({ state }) {
    return {
      charBuffer: "",
      acceptingInput: true,
      leftWord: "left",
      rightWord: "right",
      puttWord: "putt",
    };
  },

  loop({ state, device, props }) {
    let { charBuffer, acceptingInput, leftWord, rightWord, puttWord } = state;
    const controls = {
      mouseClick: device.inputs.pointer.justPressed,
      spacePressed: device.inputs.keysJustPressed[" "],
      leftPressed: device.inputs.keysJustPressed["ArrowLeft"],
      rightPressed: device.inputs.keysJustPressed["ArrowRight"],
    };
    if (acceptingInput) {
      if (device.inputs.keysJustPressed["a"]) {
        charBuffer += "a";
      }
      if (device.inputs.keysJustPressed["b"]) {
        charBuffer += "b";
      }
      if (device.inputs.keysJustPressed["c"]) {
        charBuffer += "c";
      }
      if (device.inputs.keysJustPressed["d"]) {
        charBuffer += "d";
      }
      if (device.inputs.keysJustPressed["e"]) {
        charBuffer += "e";
      }
      if (device.inputs.keysJustPressed["f"]) {
        charBuffer += "f";
      }
      if (device.inputs.keysJustPressed["g"]) {
        charBuffer += "g";
      }
      if (device.inputs.keysJustPressed["h"]) {
        charBuffer += "h";
      }
      if (device.inputs.keysJustPressed["i"]) {
        charBuffer += "i";
      }
      if (device.inputs.keysJustPressed["j"]) {
        charBuffer += "j";
      }
      if (device.inputs.keysJustPressed["k"]) {
        charBuffer += "k";
      }
      if (device.inputs.keysJustPressed["l"]) {
        charBuffer += "l";
      }
      if (device.inputs.keysJustPressed["m"]) {
        charBuffer += "m";
      }
      if (device.inputs.keysJustPressed["n"]) {
        charBuffer += "n";
      }
      if (device.inputs.keysJustPressed["o"]) {
        charBuffer += "o";
      }
      if (device.inputs.keysJustPressed["p"]) {
        charBuffer += "p";
      }
      if (device.inputs.keysJustPressed["q"]) {
        charBuffer += "q";
      }
      if (device.inputs.keysJustPressed["r"]) {
        charBuffer += "r";
      }
      if (device.inputs.keysJustPressed["s"]) {
        charBuffer += "s";
      }
      if (device.inputs.keysJustPressed["t"]) {
        charBuffer += "t";
      }
      if (device.inputs.keysJustPressed["u"]) {
        charBuffer += "u";
      }
      if (device.inputs.keysJustPressed["v"]) {
        charBuffer += "v";
      }
      if (device.inputs.keysJustPressed["w"]) {
        charBuffer += "w";
      }
      if (device.inputs.keysJustPressed["x"]) {
        charBuffer += "x";
      }
      if (device.inputs.keysJustPressed["y"]) {
        charBuffer += "y";
      }
      if (device.inputs.keysJustPressed["z"]) {
        charBuffer += "z";
      }
      if (device.inputs.keysJustPressed["Backspace"]) {
        charBuffer = charBuffer.substring(0, charBuffer.length - 1);
      }
      if (device.inputs.keysJustPressed["Enter"]) {
        const nextWord =
          wordList[Math.round(device.random() * wordList.length - 1)];
        if (leftWord === charBuffer) {
          props.steerLeft();
          charBuffer = "";
          leftWord = nextWord;
        }
        if (rightWord === charBuffer) {
          props.steerRight();
          charBuffer = "";
          rightWord = nextWord;
        }
        if (puttWord === charBuffer) {
          props.putt();
          charBuffer = "";
          puttWord = nextWord;
        }
      }
    }

    return {
      charBuffer,
      acceptingInput,
      leftWord,
      rightWord,
      puttWord,
    };
  },

  render({ state, device }) {
    const commonstyle = {
      color: "white",
      align: "left",
      x: -device.size.width / 2 + 10,
    };
    const shadowstyle = {
      color: "#000000cc",
      x: -device.size.width / 2 + 12,
    };
    return [
      t.text({
        text: `${state.charBuffer}_`,
        color: "#000000cc",
        y: -device.size.height / 2 + 45 - 2,
        x: 2,
      }),
      t.text({
        text: `${state.charBuffer}_`,
        y: -device.size.height / 2 + 45,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 13,
        text: `Putt: "${state.puttWord}"`,
        ...shadowstyle,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 15,
        text: `Putt: "${state.puttWord}"`,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 43,
        text: `Left: "${state.leftWord}"`,
        ...shadowstyle,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 45,
        text: `Left: "${state.leftWord}"`,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 78,
        text: `Right: "${state.rightWord}"`,
        ...shadowstyle,
      }),
      t.text({
        ...commonstyle,
        y: -device.size.width / 2 + 80,
        text: `Right: "${state.rightWord}"`,
      }),
    ];
  },
});
