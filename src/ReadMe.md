every time make a api call it will check user is authenticatted or not so, in the TCP IP protocol you make req get response and  connection closed

everytime you make an api call the user need to be validate wether the user coming from authorized source or not for that user should be logged in
what is mean by logged in and what happen when user login?
=> suppose user first time coming to your app and user makes login request
when it make login request server says if email & pass correct then server generates a JWT tokens(json web token) sever send jwt token to user and jwt now stored with user
when user make api call for get profile, updaye profile and so on with all the request it send jwt token.
and every time server validate request.
=> cookies => wheever you are login server wrap the jwt inside cookies, token is unique & secret.
every time cookie travel and validated on every request and API call.

=>we can set expriry data for cookies and JWT token

//authentication flow


whenever user logging in server will create token attaches into a cookie and send back now the cookies will be stored by the browser any request which is coming next that cookies will send along. when the cookie send along we validate it once again and do whatever we want to do :- authentication flow