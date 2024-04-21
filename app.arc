@app
timeversation-arc-aws

@http
get /
get /api
post /auth

@ws
auth-action
walk-action

@aws
region us-west-2
profile personal
runtime nodejs20.x

@static
fingerprint false
folder ./dist
ignore
  .tar.gz
  tmp
  user
prune true
spa true

@shared
src src/shared

@tables
connections
  connectionId *String

user 
  userId *String