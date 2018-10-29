import React from 'react';
import RoomsSearchResultView from './roomsSearchResultView';
import RoomeesSearchResultView from './unusedComponents/roomeesSearchResultView';

const SearchView = ({ zipcode, listings, roomees, onInput, onSearchRooms, onTitleClick }) => (
  <div>
    <div className="field is-grouped is-grouped-centered">
      <div className="columns level is-multiline is-mobile is-centered control">
        <p className="control is-expanded">
          <input className="input" type="text" onChange={onInput} placeholder="Enter a zipcode" />
        </p>
        <p className="control">
          <button className="button is-info" type="submit" onClick={onSearchRooms}>
            Search
          </button>
        </p>
      </div>
    </div>
    <div>
      <br />
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
