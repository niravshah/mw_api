#!/bin/bash
# Git commit Bash Script
git config --global user.name "Billy Everyteen"
git add .  
read -p "Commit description: " desc  
git commit -m "$desc"  
git push origin master
