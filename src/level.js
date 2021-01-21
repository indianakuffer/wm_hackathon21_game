import { makeSprite, t } from "@replay/core";
import { Ball, ballRadius } from "./ball";
import { Wall } from "./wall";

const friction = 0.05;
const puttSpeed = 5;
const debug = true;

export const Level = makeSprite({
  init({}) {
    return {
      ballDirection: 0,
      ballX: 0,
      ballY: -250,
      ballSpeed: 0,
      walls: [
        { x: -0, y: 0, height: 50, width: 20 },
        { x: -50, y: -200, height: 50, width: 20 },
      ],
    };
  },

  loop({ props, state, device }) {
    let { ballDirection, ballX, ballY, ballSpeed, walls } = state;

    if (props.paused) {
      return state;
    }

    const controls = {
      mouseClick: device.inputs.pointer.justPressed,
      spacePressed: device.inputs.keysJustPressed[" "],
      leftPressed: device.inputs.keysJustPressed["ArrowLeft"],
      rightPressed: device.inputs.keysJustPressed["ArrowRight"],
    };

    // Steering
    if (ballSpeed === 0) {
      if (controls.leftPressed) {
        ballDirection -= 10;
      }
      if (controls.rightPressed) {
        ballDirection += 10;
      }
      if (controls.spacePressed) {
        ballSpeed = puttSpeed;
      }
    }

    // Movement
    ballSpeed -= friction;
    if (ballSpeed - friction < 0) {
      ballSpeed = 0;
    }
    // converts from clockwise degree measurement to counter-clockwise
    const realDegrees = (-ballDirection + 90) % 360;
    const radians = realDegrees * (Math.PI / 180);
    ballX += ballSpeed * Math.cos(radians);
    ballY += ballSpeed * Math.sin(radians);

    // Collisions
    // if (wallCollision(ballX, ballY, walls)) {
    const collision = wallCollision(ballX, ballY, walls);
    switch (collision) {
      case "top":
        ballDirection += 180;
        break;
      default:
        break;
    }
    // }

    return {
      ballDirection,
      ballX,
      ballY,
      ballSpeed,
      walls,
    };
  },

  render({ state, device }) {
    const { size } = device;
    return [
      t.rectangle({
        id: "safe-area",
        color: "#add8e6",
        width: size.width + size.widthMargin * 2,
        height: size.height + size.heightMargin * 2,
      }),
      Ball({
        id: "ball",
        x: state.ballX,
        y: state.ballY,
        direction: state.ballDirection,
      }),
      ...state.walls.map((wall, idx) =>
        Wall({
          id: `wall-${idx}`,
          x: wall.x,
          y: wall.y,
          height: wall.height,
          width: wall.width,
        })
      ),
      ///////////
      debug
        ? t.text({
            align: "left",
            x: -size.width / 2,
            y: size.height / 2 - 12,
            text: `dir: ${state.ballDirection}, ${Math.abs(
              state.ballDirection % 360
            )}deg`,
          })
        : null,
      debug
        ? t.text({
            align: "left",
            x: -size.width / 2,
            y: size.height / 2 - 42,
            text: `speed: ${state.ballSpeed.toFixed(1)}`,
          })
        : null,
    ];
  },
});

function wallCollision(ballX, ballY, walls) {
  const ballPoints = [
    { x: ballX, y: ballY + ballRadius / 2 },
    { x: ballX, y: ballY - ballRadius / 2 },
    { x: ballX - ballRadius / 2, y: ballY },
    { x: ballX + ballRadius / 2, y: ballY },
  ];
  for (const wall of walls) {
    if (
      ballPoints.some(
        (point) =>
          pointInRect(point, wall) || pointInRect(point, wall)
      )
    ) {
      console.log('hit')
      return true;
    }
  }
}

function pointInRect(point, rect) {

  return (
    point.x > rect.x - rect.width / 2 &&
    point.x < rect.x + rect.width / 2 &&
    point.y > rect.y - rect.height / 2 &&
    point.y < rect.y + rect.height / 2
  );
}
