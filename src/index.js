import { makeSprite, t } from "@replay/core";
import { Level } from "./level";
import { Menu } from "./menu";

export const Game = makeSprite({
  init({ preloadFiles, updateState }) {
    preloadFiles({
      audioFileNames: [
        "putt.mp3",
        "clap.wav",
        "cheer.mp3",
        "hole.mp3",
        "cough.mp3",
      ],
    }).then(() => {
      updateState((state) => {
        return { ...state, view: "menu" };
      });
    });

    return {
      view: "loading",
    };
  },

  render({ state, updateState, device }) {
    let { view } = state;
    const inMenu = view === "menu";
    if (view === "loading") {
      return [
        t.text({
          text: "Loading...",
          color: 'black'
        }),
      ];
    }

    return [
      Level({
        id: `level`,
        paused: inMenu,
      }),
      inMenu
        ? Menu({
            id: "menu",
            start: () => {
              updateState((prevState) => {
                return {
                  ...prevState,
                  view: "level",
                };
              });
            },
          })
        : null,
    ];
  },
});

export const gameProps = {
  id: "Game",
  size: {
    width: 600,
    height: 600,
    maxHeightMargin: 150,
    WidthMargin: 150,
  },
  defaultFont: {
    name: "Helvetica",
    size: 24,
  },
};

export const options = {
  dimensions: "scale-up",
};
