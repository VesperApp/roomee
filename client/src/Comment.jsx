import React from 'react';
import $ from 'jquery';

import CommentItem from './CommentItem';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_listing: this.props.id,
      listComment: [],
    };
    this.loadComment(this.props.id);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(' the use r s', JSON.parse(localStorage.getItem('user_fb') || '{}'));
  }

  loadComment(idListing) {
    // get request fetches the zipcode of the user's IP address and calls onEnterSite
    $.ajax({
      url: '/comment',
      type: 'GET',
      data: idListing,
      success: data => {
        this.setState({
          listComment: data,
          user_fb: JSON.parse(localStorage.getItem('user_fb') || '{}'),
        });
      },
      error: err => {
        // console.log('mon error c', err);
      },
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(stringifyFormData(data));
    var dataToSend = stringifyFormData(data);
    var converstObj = JSON.parse(dataToSend);
    converstObj['listingId'] = this.state.id_listing;
    converstObj['fbuserId'] = 1;

    $.ajax({
      url: '/comment',
      type: 'POST',
      data: JSON.stringify(converstObj),
      contentType: 'application/json',
      success: data => {
        this.loadComment(this.props.id);
      },
      error: function(error) {
        console.error('the err', error.responseText);
      },
    });
  }

  render() {
    return (
      <div>
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={this.state.picture} />
            </p>
          </figure>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea className="textarea" name="text_comment" placeholder="Add a comment..." />
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <input type="submit" value="Submit" className="button is-info" />
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item" />
                </div>
              </nav>
            </div>
          </form>
        </article>
        {this.state.listComment.map(comment => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
export default Comment;
