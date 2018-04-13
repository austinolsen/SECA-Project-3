import React from 'react';

const Hearing = (props) => {
    return (
      <div>
        <hr/>
        <h6>{props.hearing.short_title}</h6>
        <p>from <strong>{props.hearing.agency_name}</strong> - {props.hearing.event_date}</p>
        <hr/>
      </div>
    )
  }



export default Hearing
