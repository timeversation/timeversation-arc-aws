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
profile aws_timeverstaion
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
cors true

@shared
src src/shared

@tables
connections
  connectionId *String

user 
  userId *String

siteMetadata
  metaDataId *String

avatar
  avatarId *String

robot
  robotId *String

place
  placeId *String