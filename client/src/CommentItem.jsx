import React from 'react';
import DetailsRoom from './DetailsRoom.jsx';

const CommentItem = ({ comment }) => (
  <div>
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={comment.fbuser.picture} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong> {comment.fbuser.username} </strong> <small> @{comment.fbuser.username} </small>
            <small>{comment.updatedAt}</small>
            <br />
            {comment.text_comment}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item">
              <span className="icon is-small">
                <i className="fas fa-reply" />
              </span>
            </a>
            <a className="level-item">
              <span className="icon is-small">
                <i className="fas fa-retweet" />
              </span>
            </a>
            <a className="level-item">
              <span className="icon is-small">
                <i className="fas fa-heart" />
              </span>
            </a>
          </div>
        </nav>
      </div>
      <div className="media-right" />
    </article>
  </div>
);
export default CommentItem;
