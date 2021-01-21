import { makeSprite } from "@replay/core";
import { Level } from "./level";
import { Menu } from "./menu";

export const Game = makeSprite({
  init() {
    return {view: 'menu'};
  },

  render({ state, updateState }) {
    const inMenu = state.view === 'menu'

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
    width: 400,
    height: 600,
    maxHeightMargin: 150,
  },
  defaultFont: {
    name: "Helvetica",
    size: 24,
  },
};

export const options = {
  dimensions: "scale-up",
};
