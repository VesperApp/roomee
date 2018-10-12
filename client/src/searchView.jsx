import React from 'react';
import RoomsSearchResultView from './roomsSearchResultView';
import RoomeesSearchResultView from './roomeesSearchResultView';

const SearchView = ({ term, listings, roomees, onInput, onSearchRooms, onSearchRoomees, onTitleClick }) => (
  <div>
    <div className="columns level is-multiline is-mobile is-centered control">
      <input
        className="column level-item is-one-quarter input is-small"
        style={{ textAlign: 'center' }}
        type="text"
        value={term}
        onChange={onInput}
        placeholder="Zip Code"
      />
      <button
        className="button is-small is-success"
        style={{ textAlign: 'center' }}
        type="submit"
        onClick={onSearchRooms}
      >
        Rooms
      </button>
      <button
        className="button is-small is-info"
        style={{ textAlign: 'center' }}
        type="submit"
        onClick={onSearchRoomees}
      >
        Roomees
      </button>
    </div>
    <div>
      {!listings.length && !roomees.length ? (
        <div className="has-text-centered title is-4">Sorry, no results found in this area</div>
      ) : (
        listings.map(item => <RoomsSearchResultView onTitleClick={onTitleClick} listing={item} key={item.id} />)
      )}
      <RoomeesSearchResultView roomees={roomees} />
    </div>
  </div>
);

export default SearchView;
//column is-half is-offset-one-quarter level-item heading input
//column level-item has-text-centered heading button
//column is-one-fifth is-narrow
