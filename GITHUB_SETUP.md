# GitHub Setup Guide

## Step-by-Step Instructions to Push Your Project to GitHub

### 1. Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. **Repository name**: `my-sales-dashboard`
5. **Description**: `A modern sales analytics dashboard built with Next.js 15, featuring interactive charts and atomic design principles`
6. Choose **Public** or **Private** (your choice)
7. **DO NOT** initialize with README, .gitignore, or license (we already have them)
8. Click **Create repository**

### 2. Connect Your Local Repository to GitHub

Copy and run these commands in your terminal (replace `yourusername` with your GitHub username):

```bash
git remote add origin https://github.com/yourusername/my-sales-dashboard.git
git branch -M main
git push -u origin main
```

### 3. Verify Your Repository

After pushing, you should see all your files on GitHub at:
`https://github.com/yourusername/my-sales-dashboard`

### 4. Add GitHub Actions (Optional - For CI/CD)

Create `.github/workflows/deploy.yml` for automated deployment to Vercel:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 5. Troubleshooting

**Issue**: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/my-sales-dashboard.git
```

**Issue**: "ERROR: Permission to yourusername/repo denied"
- Make sure you're logged into Git with your GitHub credentials
- Use `git config --list` to verify your git configuration

**Issue**: Want to use SSH instead of HTTPS?
```bash
# Generate SSH key if you don't have one:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add it to GitHub settings, then use:
git remote set-url origin git@github.com:yourusername/my-sales-dashboard.git
```

### 6. Update Package.json with Repository Info

Once your GitHub repository is created, consider updating `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/my-sales-dashboard.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/my-sales-dashboard/issues"
  },
  "homepage": "https://github.com/yourusername/my-sales-dashboard#readme"
}
```

### 7. Deploy to Vercel (Recommended)

1. Go to [Vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. **Import Git Repository** and select your GitHub repo
4. Configure project settings (defaults are usually fine)
5. Click **Deploy**

Your app will be live at `https://my-sales-dashboard-yourusername.vercel.app`

## Branch Strategy

Current setup uses `main` branch. For larger projects, consider:

```bash
# Create a development branch
git checkout -b develop
git push origin develop

# Create feature branches
git checkout -b feature/new-feature
git push origin feature/new-feature
```

## Managing Secrets

For API keys and sensitive data:

1. Create `.env.local` (already in .gitignore)
2. Add variables:
```env
NEXT_PUBLIC_API_URL=https://your-api.com
API_SECRET_KEY=your-secret-key
```

3. On Vercel, add these in Project Settings → Environment Variables

## Making Your First Commit

We already created an initial commit. For future updates:

```bash
# Make changes to files
git add .
git commit -m "feat: add new feature description"
git push origin main
```

## Useful GitHub Resources

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://github.com/features/actions)

---

**Your project is now ready to be pushed to GitHub!** 🚀
