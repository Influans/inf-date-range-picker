#!/usr/bin/env bash
git checkout -b release/v0.2.1 develop
git commit -a -m "Bumped version number to 0.2.1"
git checkout master
git merge --no-ff release/v0.2.1
git tag -a v0.2.1
git checkout develop
git merge --no-ff release/v0.2.1
git branch -d release/v0.2.1
