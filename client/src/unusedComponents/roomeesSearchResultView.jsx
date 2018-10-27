import React from 'react';
import RoomeeItemView from './roomeeItemView';

const RoomeesSearchResultView = ({ roomees }) => (
  <div className="container">
    <div className="section">
      <div className="row columns is-multiline">
        {roomees.map(roomee => (
          <RoomeeItemView roomee={roomee} />
        ))}
      </div>
    </div>
  </div>
);

export default RoomeesSearchResultView;
