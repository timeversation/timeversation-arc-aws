@app
timeversation-arc-aws

@http
get /
get /api

@ws
walk-action

@aws
region us-west-2
profile personal
runtime nodejs18.x

@static
fingerprint true
folder ./dist
ignore
  .tar.gz
  tmp
  user
prune true
spa true