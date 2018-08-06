import React from "react";
import RoomeeItemView from "./roomeeItemView.jsx";

const RoomeesSearchResultView = ({ roomees }) => {
  return <div className="container">
      <div className="section">
        <div class="row columns is-multiline">
          {roomees.map(roomee => <RoomeeItemView roomee={roomee}/>)}
        </div>
      </div>
    </div>;
};

export default RoomeesSearchResultView;
