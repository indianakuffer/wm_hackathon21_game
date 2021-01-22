import {makeSprite, t} from '@replay/core'

export const Wall = makeSprite({

  render({state, props}) {
    return [
      t.rectangle({
        height: props.height,
        width: props.width,
        color: '#472D30'
      })
    ]
  }

})