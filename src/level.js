import { makeSprite, t } from "@replay/core";
import { Ball, ballRadius } from "./ball";
import { Input } from "./input";
import { Wall } from "./wall";
import { Hole, holeRadius } from "./hole";

const friction = 0.05;
const puttSpeed = 10;
const debug = false;
const boundaryWalls = [
  { x: 0, y: 600 / 2, height: 40, width: 600 },
  { x: 0, y: -600 / 2, height: 40, width: 600 },
  { x: 600 / 2, y: 0, height: 600, width: 40 },
  { x: -600 / 2, y: 0, height: 600, width: 40 },
];
const levelList = [
  {
    hole: { x: 0, y: 0 },
    ball: { x: 0, y: -220 },
    wallMap: [
      { x: -50, y: 0, height: 600, width: 20 },
      { x: 50, y: 0, height: 600, width: 20 },
    ],
  },
  {
    hole: { x: 0, y: 150 },
    ball: { x: 0, y: -220, direction: 270 },
    wallMap: [
      { x: 0, y: 0, height: 20, width: 250 },
    ],
  },
  {
    hole: { x: 200, y: 150 },
    ball: { x: -200, y: -220, direction: 90 },
    wallMap: [
      { x: -100, y: -60, height: 450, width: 20 },
      { x: 100, y: 60, height: 450, width: 20 },
    ],
  },
  {
    hole: { x: 0, y: -150 },
    ball: { x: 0, y: 220, direction: 270 },
    wallMap: [
      { x: -100, y: -140, height: 150, width: 20 },
      { x: 100, y: -140, height: 150, width: 20 },
      { x: 0, y: -75, height: 20, width: 180 },
    ],
  },
];

export const Level = makeSprite({
  init({ device }) {
    const { size } = device;
    
    return {
      ballDirection: 90,
      ballX: levelList[0].ball.x,
      ballY: levelList[0].ball.y,
      ballSpeed: 0,
      holeX: levelList[0].hole.x,
      holeY: levelList[0].hole.y,
      level: 0,
      walls: [...boundaryWalls, ...levelList[0].wallMap],
    };
  },

  loop({ props, state, device }) {
    let {
      ballDirection,
      ballX,
      ballY,
      ballSpeed,
      walls,
      holeX,
      holeY,
      level,
    } = state;

    if (props.paused) {
      return state;
    }

    // Movement
    ballSpeed -= friction;
    if (ballSpeed - friction < 0) {
      ballSpeed = 0;
    }
    // converts from clockwise degree measurement to counter-clockwise
    let radians = ballDirection * (Math.PI / 180);
    let nextX = ballX + ballSpeed * Math.cos(radians);
    let nextY = ballY + ballSpeed * Math.sin(radians);
    // Collisions
    const collision = wallCollision(nextX, nextY, walls);
    if (collision) {
      // if colliding, change direction
      switch (collision) {
        case "top":
        case "bottom":
          ballDirection = 360 - ballDirection;
          break;
        case "left":
        case "right":
          ballDirection = 180 - ballDirection;
          break;
        default:
          break;
      }
      radians = ballDirection * (Math.PI / 180);
      nextX = ballX + ballSpeed * Math.cos(radians);
      nextY = ballY + ballSpeed * Math.sin(radians);
    }
    ballX = nextX;
    ballY = nextY;
    // Hole in
    if (holeCollision(ballX, ballY, holeX, holeY)) {
      level = 3;
      const newLevel = levelList[level];
      const newWalls = newLevel.wallMap;
      ballDirection = newLevel.ball.direction;
      ballX = newLevel.ball.x;
      ballY = newLevel.ball.y;
      holeX = newLevel.hole.x;
      holeY = newLevel.hole.y;
      ballSpeed = 0;
      walls = [...boundaryWalls, ...newWalls];
    }

    return {
      ballDirection,
      ballX,
      ballY,
      ballSpeed,
      walls,
      holeX,
      holeY,
      level,
    };
  },

  render({ state, updateState, device }) {
    const { size } = device;
    return [
      t.rectangle({
        id: "safe-area",
        color: "#999D58",
        width: size.width + size.widthMargin * 2,
        height: size.height + size.heightMargin * 2,
      }),
      Hole({
        id: "hole",
        x: state.holeX,
        y: state.holeY,
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
      Input({
        id: "input",
        ballSpeed: state.ballSpeed,
        steerLeft: () => {
          updateState((prevState) => ({
            ...prevState,
            ballDirection: prevState.ballDirection + 30,
          }));
        },
        steerRight: () => {
          updateState((prevState) => ({
            ...prevState,
            ballDirection: prevState.ballDirection - 30,
          }));
        },
        putt: () => {
          device.audio("putt.mp3").play();
          updateState((prevState) => ({
            ...prevState,
            ballSpeed: puttSpeed,
          }));
        },
      }),
      t.text({
        align: 'right',
        text: `level`,
        color: '#000000cc',
        x: size.width / 2 - 10,
        y: size.width / 2 - 10,
      }),
      t.text({
        align: 'right',
        text: `level`,
        x: size.width / 2 - 12,
        y: size.width / 2 - 8,
      }),
      t.text({
        text: `${state.level}`,
        font: {'size': 60},
        color: '#000000cc',
        x: size.width / 2 - 35,
        y: size.width / 2 - 45,
      }),
      t.text({
        text: `${state.level}`,
        font: {'size': 60},
        x: size.width / 2 - 37,
        y: size.width / 2 - 43,
      }),

      ///////////
      debug
        ? t.text({
            align: "left",
            x: -size.width / 2,
            y: size.height / 2 - 12,
            text: `dir: ${state.ballDirection}`,
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
    { x: ballX, y: ballY + ballRadius / 4 },
    { x: ballX, y: ballY - ballRadius / 4 },
    { x: ballX - ballRadius / 4, y: ballY },
    { x: ballX + ballRadius / 4, y: ballY },
    { x: ballX, y: ballY },
  ];
  for (const wall of walls) {
    while (pointInRect({ x: ballX, y: ballY }, wall)) {
      ballX--;
      ballY--;
    }
    if (ballPoints.some((point) => pointInRect(point, wall))) {
      if (
        ballY - ballRadius / 2 <= wall.y - wall.height / 2 &&
        ballY - ballRadius / 2 <= wall.y + wall.height / 2
      ) {
        return "top";
      } else if (
        ballY + ballRadius / 2 >= wall.y - wall.height / 2 &&
        ballY + ballRadius / 2 >= wall.y + wall.height / 2
      ) {
        return "bottom";
      } else if (
        ballX + ballRadius / 2 >= wall.x - wall.width / 2 &&
        ballX + ballRadius / 2 >= wall.x + wall.width / 2
      ) {
        return "left";
      } else if (
        ballX - ballRadius / 2 <= wall.x - wall.width / 2 &&
        ballX - ballRadius / 2 <= wall.x + wall.width / 2
      ) {
        return "right";
      }
    }
  }
}

function holeCollision(ballX, ballY, holeX, holeY) {
  const ballPoints = [
    { x: ballX, y: ballY + ballRadius / 4 },
    { x: ballX, y: ballY - ballRadius / 4 },
    { x: ballX - ballRadius / 4, y: ballY },
    { x: ballX + ballRadius / 4, y: ballY },
    { x: ballX, y: ballY },
  ];
  const colliding = ballPoints.some((point) => {
    const distance = Math.sqrt(
      Math.pow(point.x - holeX, 2) + Math.pow(point.y - holeY, 2)
    );
    // console.log(distance, holeRadius / 2)
    if (distance <= holeRadius / 2) {
      return true;
    }
  });

  if (colliding) {
    return true;
  }
}

function pointInRect(point, rect) {
  if (
    point.x > rect.x - rect.width / 2 &&
    point.x < rect.x + rect.width / 2 &&
    point.y > rect.y - rect.height / 2 &&
    point.y < rect.y + rect.height / 2
  ) {
    return true;
  }
}
