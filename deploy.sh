#!/usr/bin/env bash
rm -rf dist
rm dist.zip
npm run build
cp index.html ./dist
zip -r dist.zip ./dist
sudo scp -i ~/Documents/buffalo.pem dist.zip ec2-user@ec2-13-54-77-173.ap-southeast-2.compute.amazonaws.com:~/