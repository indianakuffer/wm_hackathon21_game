import { makeSprite, t } from "@replay/core";

export const ballRadius = 5;
const lineHeight = 100;

export const Ball = makeSprite({

  render({state, props}) {
    return [
      t.line({
        color: "#E26D5C",
        thickness: 1,
        path: [
          [0, 0],
          [0, lineHeight],
        ],
        rotation: (-props.direction + 90) % 360
      }),
      t.circle({
        radius: ballRadius,
        color: '#FFF1D6',
      }),
    ];
  },
});
