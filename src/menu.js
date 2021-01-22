import { makeSprite, t } from "@replay/core";

export const Menu = makeSprite({
  render({ props, device }) {
    const { inputs } = device;

    if (inputs.keysJustPressed[" "]) {
      props.start();
    }

    return [
      t.text({
        text: "Type the correct word to point left, right, or putt.",
        color: "white",
        y: 220,
      }),
      t.text({
        font: { size: 18 },
        text: "(Space to begin)",
        color: "white",
        y: 190,
      }),
    ];
  },
});
