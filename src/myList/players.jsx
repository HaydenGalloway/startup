import React from 'react';

import { GameEvent, GameNotifier } from './gameNotifier';
import './players.css';

export function Players(props) {
  const userName = props.userName;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    console.log('Adding event handler');
    GameNotifier.addHandler(handleGameEvent);

    return () => {
      console.log('Removing event handler');
      GameNotifier.removeHandler(handleGameEvent);
    };
  }, []);

  function handleGameEvent(event) {
    console.log('Handling game event:', event);
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.AddItem) {
        message = 'added an item';
      } else if (event.type === GameEvent.RemoveItem) {
        message = 'removed an item';
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'player-event'}>{event.from.split('@')[0]}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='players'>
      User: 
      <span className='player-name'>{userName}</span>
      <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}
