#!/bin/bash
# Git commit Bash Script
git config --global --replace-all user.email "niravshah"
git add .  
read -p "Commit description: " desc  
git commit -m "$desc"  
git push origin master
