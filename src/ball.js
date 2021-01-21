import { makeSprite, t } from "@replay/core";

export const ballRadius = 5;
const lineHeight = 100;

export const Ball = makeSprite({
  init({ props }) {
    return {
      direction: props.direction
    }
  },

  render({state, props}) {
    return [
      t.line({
        color: "red",
        thickness: 1,
        path: [
          [0, 0],
          [0, lineHeight],
        ],
        rotation: props.direction
      }),
      t.circle({
        radius: ballRadius,
        color: "white",
      }),
    ];
  },
});
