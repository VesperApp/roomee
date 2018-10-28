import React from 'react';
import RoomsSearchResultView from './roomsSearchResultView';
import RoomeesSearchResultView from './unusedComponents/roomeesSearchResultView';

const SearchView = ({ term, listings, roomees, onInput, onSearchRooms, onSearchRoomees, onTitleClick }) => (
  <div>
    <div className="columns level is-multiline is-mobile is-centered control">
      <input
        className="column level-item is-one-quarter input is-small"
        style={{ textAlign: 'center' }}
        type="text"
        onChange={onInput}
        placeholder="Zipcode"
      />
      <button
        className="button is-small is-success"
        style={{ textAlign: 'center' }}
        type="submit"
        onClick={onSearchRooms}
      >
        Search Rooms
      </button>

      {/* 
      <button
        className="button is-small is-info"
        style={{ textAlign: 'center' }}
        type="submit"
        onClick={onSearchRoomees}
      >
        Roomees
      </button> */}
    </div>
    <div>
      {!listings.length && !roomees.length ? (
        <div className="has-text-centered title is-4">Sorry, no results found in this area</div>
      ) : (
        listings.map(item => <RoomsSearchResultView onTitleClick={onTitleClick} listing={item} key={item.createdAt} />)
      )}
      <RoomeesSearchResultView roomees={roomees} />
    </div>
  </div>
);

export default SearchView;
