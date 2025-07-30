Last login: Wed Jul 30 02:32:07 on ttys000

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
MacBook-Air-de-Alexandre:~ alexandreguenot$ cd ~/Desktop/kinexperience-app
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ echo '{
>   "rewrites": [
>     { "source": "/(.*)", "destination": "/" }
>   ]
> }' > vercel.json
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git add vercel.json
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git commit -m "Ajout fichier vercel.json pour fix 404 Vercel"
U	eslint.config.mjs
U	jsconfig.json
U	next.config.mjs
U	package.json
U	postcss.config.mjs
U	public/favicon.ico
U	public/file.svg
U	public/globe.svg
U	public/next.svg
U	public/vercel.svg
U	public/window.svg
U	src/components/HomePage.jsx
U	src/components/ModularGenerator.jsx
U	src/main.jsx
U	src/pages/Generator.jsx
U	src/pages/Home.jsx
U	src/pages/_app.js
U	src/pages/_document.js
U	src/pages/api/hello.js
U	src/pages/index.js
U	src/pages/index.jsx
U	src/styles/globals.css
error: Committing is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git push origin main
Everything up-to-date
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git reset --hard HEAD
HEAD is now at 78de041 Fix Vercel rewrite for React Router
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git add vercel.json
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git add vercel.json
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git commit -m "Ajout vercel.json clean"
interactive rebase in progress; onto 526ce65
Last commands done (2 commands done):
   pick d877c9d Fix Vercel rewrite for React Router
   pick cb9b1db Ajout vercel.json et corrections déploiement
No commands remaining.
You are currently editing a commit while rebasing branch 'main' on '526ce65'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	dist/
	vercel.json.save

nothing added to commit but untracked files present (use "git add" to track)
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git push origin main
Everything up-to-date
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git add vercel.json
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git rebase --continue
Successfully rebased and updated refs/heads/main.
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ git push origin main --force
Enumerating objects: 34, done.
Counting objects: 100% (34/34), done.
Delta compression using up to 4 threads
Compressing objects: 100% (32/32), done.
Writing objects: 100% (34/34), 61.39 KiB | 3.84 MiB/s, done.
Total 34 (delta 4), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (4/4), done.
To https://github.com/PhysioPro/kinexperience-next.git
 + cb9b1db...78de041 main -> main (forced update)
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ src/components/ModularGenerator.jsx
-bash: src/components/ModularGenerator.jsx: No such file or directory
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ open src/components/ModularGenerator.jsx
The file /Users/alexandreguenot/Desktop/kinexperience-app/src/components/ModularGenerator.jsx does not exist.
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ ls src/components
ls: src/components: No such file or directory
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ find . -name "ModularGenerator.jsx"
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ mkdir -p src/pages
MacBook-Air-de-Alexandre:kinexperience-app alexandreguenot$ nano src/pages/ModularGenerator.jsx

  UW PICO 5.09          File: src/pages/ModularGenerator.jsx          Modified  

import React from "react";

function ModularGenerator() {
  return (
    <div>
      <h1>Générateur de Programme</h1>
      <p>Ce composant a été recréé proprement.</p>
    </div>
  );
}

export default ModularGenerator;








^G Get Help  ^O WriteOut  ^R Read File ^Y Prev Pg   ^K Cut Text  ^C Cur Pos   
^X Exit      ^J Justify   ^W Where is  ^V Next Pg   ^U UnCut Text^T To Spell  
