git checkout -b release/v{tag-version} develop
git commit -a -m "Bumped version number to {tag-version}"
git checkout master
git merge --no-ff release/v{tag-version}
git push
git tag -a v{tag-version}
git push --tags
git checkout develop
git merge --no-ff release/v{tag-version}
git branch -d release/v{tag-version}
