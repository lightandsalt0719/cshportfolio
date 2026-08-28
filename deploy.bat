@echo off
cd C:\Users\Administrator\Desktop\csh-portfolio
rclone copy . r2:cshportfolio --progress
git add -A
git commit -m "update"
git push