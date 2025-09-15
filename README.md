📢 Project Setup Instructions

Follow these steps to work on the project.

1️⃣ Clone the Repository (only once)

Run this the first time you set up the project:

//bash
git clone https://github.com/mickolucas/admin-dashboard.git
cd admin-dashboard

2️⃣ Switch to the Shared Development Branch

We will all work starting from the develop-frontend branch:

//bash
git checkout develop-frontend
git pull origin develop-frontend

3️⃣ Create Your Own Feature Branch (para di sabog sabog yung code nyo mag kanya kanya kayong branch)

Before making changes, create your own branch based on develop-frontend.
Use the format:

//bash
Example:
git checkout -b joshua-frontend


This makes it clear what you’re working on.


(if done na kayo mag code)
4️⃣ Save Your Work
After coding, run these commands to save and upload your work:

git add .
git commit -m "feat: add navbar"
git push -u origin feat/navbar


5️⃣ Open a Pull Request (PR)

Go to GitHub → your repo.
Click Pull Requests → New Pull Request.
Set target branch = develop-frontend.
Add a clear title (example: feat: add navbar).
Submit the PR.

👉 This way, your changes can be reviewed and merged safely without breaking main.
