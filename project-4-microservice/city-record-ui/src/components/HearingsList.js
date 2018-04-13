import React from 'react'
import Hearing from './Hearing'

const HearingsList = (props) => {
  return (
    <div>
      {
        props.hearings.map((hearing, index) => {
          return (
            <Hearing
              hearing={hearing}
              key={index}
              index={index} />
            )
          })
        }
      </div>
    )
  }

  export default HearingsList
