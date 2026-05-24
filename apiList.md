//DEVTINDER APIs

##Auth Router
POST/signup
POST/login
POST/logout

##Profile Router
GET/profile/view
PATCH/profile/edit
PATCH/profile/password

##ConnectionRequestRouter
POST/request/send/intrested/: userId
POST/request/send/ignored/: userId
POST/request/review/accepted/: requestId
POST/request/review/rejected/: requestId

GET/user/connections
GET/user/requests
GET/user/feed - Gets you the profile of other users on platform


STATUS: IGNORE, INTRESTED, ACCEPETED, REJECTED


