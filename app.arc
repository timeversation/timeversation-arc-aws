@app
timeversation-arc-aws

@http
get /
get /api
post /auth

@ws
walk-action

@aws
region us-west-2
profile personal
runtime nodejs20.x

@static
fingerprint true
folder ./dist
ignore
  .tar.gz
  tmp
  user
prune true
spa true