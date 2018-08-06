exports.fbConfig = {
  // Facebook App ID
  clientID: 2211856122434963,
  // Facebook App Secret
  clientSecret: 'ef25c8bf4c78c71e7e6fd5061dc41960',
  callbackURL: 'http://localhost:4000/login/facebook/return',
  scope: [
    'public_profile',
    'user_friends',
    'user_likes',
    'user_gender',
    'user_hometown',
    'user_location',
    'email',
    'user_birthday',
    'user_age_range',
    'user_photos',
    'user_events'
  ],
  profileFields: [
    'id',
    'displayName',
    'email',
    'gender',
    'photos',
    'age_range',
    'birthday',
    'hometown',
    'location'
  ],
};
