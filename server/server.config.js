exports.fbConfig = {
  clientID: 2211856122434963,
  clientSecret: 'ef25c8bf4c78c71e7e6fd5061dc41960',
  callbackURL: 'http://localhost:4000/login/facebook/return',
  scope: ['user_friends', 'manage_pages', 'user_likes'],
  profileFields: ['id', 'displayName', 'photos', 'email', 'user_likes']
}
