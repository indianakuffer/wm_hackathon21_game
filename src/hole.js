import {makeSprite, t} from '@replay/core'

export const holeRadius = 10

export const Hole = makeSprite({

  render({state}) {
    return [
      t.circle({
        color: 'black',
        radius: holeRadius
      })
    ]
  }
})