# 🧹 Git Cleanup & Repository Reconnection Plan

**Date:** January 24, 2026  
**Project:** GLAMGO Beauty Supply Delivery App  
**Issue:** Git disconnected + files need cleanup before Sprint 1

---

## 🚨 **CRITICAL SECURITY ISSUE FOUND!**

### **Your `.env` file contains LIVE API keys and is being tracked!**

**Immediate Risk:**
- ✅ `.env` is in `.gitignore` (good!)
- ❌ BUT Git repository is corrupted/disconnected
- ⚠️ If you reconnect and push, secrets could be exposed!

---

## 📋 **Part 1: Files That Should NOT Be in Git**

### 🔴 **CRITICAL - MUST DELETE FROM GIT HISTORY:**

#### 1. **`.env`** - Contains ALL your API keys! 🔥
**Why:** Has live Stripe keys, Firebase keys, Google Maps keys
```
STRIPE_SECRET_KEY="sk_live_51St1q..." ← LIVE SECRET KEY!
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..." ← LIVE KEY!
```
**Risk:** If pushed to GitHub, anyone can:
- Charge your Stripe account
- Access your Firebase database
- Use your Google Maps quota
**Action:** Must ensure it's NEVER committed

---

#### 2. **`.expo/`** folder - Expo cache & build artifacts
**Why:** Contains temporary build files and device configs
**Files:**
- `.expo/devices.json` - Device registry
- `.expo/README.md` - Auto-generated
**Action:** Already in `.gitignore` ✅ (keep ignored)

---

#### 3. **`node_modules/`** - 871 installed packages
**Why:** 
- Massive size (~500-800 MB)
- Can be regenerated with `npm install`
- Different on different machines
**Action:** Already in `.gitignore` ✅ (keep ignored)

---

### 🟡 **DOCUMENTATION FILES - Consider Consolidating:**

You have **15+ documentation files** in the root. Some are redundant:

#### Redundant Setup Guides (Can delete after setup):
- `FIREBASE_SETUP.md` ← Detailed Firebase guide
- `STRIPE_SETUP.md` ← Stripe keys guide  
- `GOOGLE_MAPS_SETUP.md` ← Maps setup guide
- `GET_TEST_KEYS_GUIDE.md` ← API keys walkthrough
- `LETS_DO_THIS_TOGETHER.md` ← Interactive setup guide
- `MOBILE_TESTING_TROUBLESHOOTING.md` ← Troubleshooting

**Why delete:** Setup is complete, these are one-time use guides  
**Keep:** `GETTING_STARTED.md` (general onboarding)  
**Action:** Move to `/docs/archive/` or delete

#### Completion Reports (Historical, not needed in repo):
- `FIREBASE_DEPLOYMENT_SUCCESS.md` ← Firebase completion
- `DEPENDENCIES_INSTALLED.md` ← Package install summary
- `SETUP_COMPLETE.md` ← Full setup summary
- `GITHUB_PUSH_SUCCESS.md` ← Previous push report
- `GIT_CLEANUP_AUDIT.md` ← This type of audit file

**Why delete:** One-time status reports, not documentation  
**Action:** Delete or move to `/docs/history/`

#### Keep These Documentation Files:
- ✅ `README.md` - Project overview
- ✅ `ARCHITECTURE.md` - System design
- ✅ `FIREBASE_SCHEMA.md` - Database schema
- ✅ `USER_STORIES.md` - Requirements
- ✅ `SPRINT_PLAN.md` - Development timeline
- ✅ `SPRINT_TEMPLATE.md` - Sprint doc template
- ✅ `SPRINT_0_REVIEW.md` - Sprint 0 history
- ✅ `TRELLO_BOARD.md` - Project management
- ✅ `BRAND_GUIDELINES.md` - Visual identity
- ✅ `DOCUMENTATION_INDEX.md` - Doc navigation
- ✅ `PROJECT_SUMMARY.md` - High-level overview
- ✅ `GETTING_STARTED.md` - Onboarding guide

---

### 🟢 **FILES TO KEEP (Essential for Project):**

#### Configuration Files:
- ✅ `package.json` - NPM dependencies
- ✅ `package-lock.json` - Locked versions
- ✅ `tsconfig.json` - TypeScript config
- ✅ `app.json` - Expo config
- ✅ `firebase.json` - Firebase config
- ✅ `.firebaserc` - Firebase project alias
- ✅ `.env.example` - Environment template (no secrets)
- ✅ `.gitignore` - Git ignore rules

#### Security Rules:
- ✅ `firestore.rules` - Firestore security
- ✅ `firestore.indexes.json` - Database indexes
- ✅ `storage.rules` - Storage security

#### Source Code:
- ✅ `App.tsx` - Main app entry
- ✅ `index.ts` - Entry point
- ✅ `src/` - All source code
- ✅ `assets/` - Images, fonts, icons

---

## 📝 **Part 2: Updated .gitignore**

Your current `.gitignore` is good but missing some items:

```gitignore
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env
.env*.local

# typescript
*.tsbuildinfo

# generated native folders
/ios
/android

# ========================================
# 🔒 GLAMGO Custom Additions
# ========================================

# Firebase
.firebase/
firebase-debug.log
firestore-debug.log
ui-debug.log

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db
Desktop.ini

# Temporary files
*.tmp
*.temp
*.log
*.cache

# Test coverage
coverage/
.nyc_output/

# Build artifacts
build/
.expo-shared/

# Documentation archives (optional)
docs/archive/
docs/history/
```

---

## 🎯 **Part 3: Recommended Actions**

### ✅ **STEP 1: Clean Up Documentation (Optional)**

**Delete these temporary files:**
```bash
rm FIREBASE_SETUP.md
rm STRIPE_SETUP.md
rm GOOGLE_MAPS_SETUP.md
rm GET_TEST_KEYS_GUIDE.md
rm LETS_DO_THIS_TOGETHER.md
rm MOBILE_TESTING_TROUBLESHOOTING.md
rm FIREBASE_DEPLOYMENT_SUCCESS.md
rm DEPENDENCIES_INSTALLED.md
rm SETUP_COMPLETE.md
rm GITHUB_PUSH_SUCCESS.md
rm GIT_CLEANUP_AUDIT.md
```

**Or create archive folder:**
```bash
mkdir -p docs/archive
mv FIREBASE_SETUP.md docs/archive/
mv STRIPE_SETUP.md docs/archive/
mv GOOGLE_MAPS_SETUP.md docs/archive/
mv GET_TEST_KEYS_GUIDE.md docs/archive/
mv LETS_DO_THIS_TOGETHER.md docs/archive/
mv MOBILE_TESTING_TROUBLESHOOTING.md docs/archive/
mv FIREBASE_DEPLOYMENT_SUCCESS.md docs/archive/
mv DEPENDENCIES_INSTALLED.md docs/archive/
mv SETUP_COMPLETE.md docs/archive/
mv GITHUB_PUSH_SUCCESS.md docs/archive/
mv GIT_CLEANUP_AUDIT.md docs/archive/
```

---

### ✅ **STEP 2: Verify .env is Protected**

**Check if .env is in gitignore:**
```bash
grep "\.env" .gitignore
```

**Should see:**
```
.env
.env*.local
```

✅ **Your .gitignore already has this!**

---

### ✅ **STEP 3: Reinitialize Git Repository**

**Your Git is corrupted. Let's fix it:**

```bash
# Remove broken git repo
rm -rf .git

# Initialize fresh repo
git init

# Add all files (respecting .gitignore)
git add .

# Check what will be committed (make sure .env is NOT listed!)
git status

# First commit
git commit -m "feat: initial GLAMGO project setup with Firebase, Stripe, and Google Maps integration"

# Connect to GitHub
git remote add origin https://github.com/developedbydmac/glamgo-app.git

# Push to GitHub
git branch -M main
git push -u origin main --force
```

---

### ✅ **STEP 4: Verify .env is NOT Committed**

**After git add, check:**
```bash
git status
```

**❌ If you see `.env` in the list, STOP and run:**
```bash
git reset HEAD .env
echo ".env" >> .gitignore
git add .gitignore
```

---

## 🔒 **Part 4: Security Checklist**

Before pushing to GitHub:

- [ ] `.env` file is in `.gitignore`
- [ ] `.env` does NOT appear in `git status`
- [ ] `.env.example` exists (without real keys) ✅
- [ ] `node_modules/` is ignored ✅
- [ ] `.expo/` is ignored ✅
- [ ] No other sensitive files committed

---

## 📊 **Part 5: File Cleanup Summary**

### Files to Keep (Essential):
| Category | Count | Examples |
|----------|-------|----------|
| Source Code | ~10 | `App.tsx`, `index.ts`, `src/` |
| Config | 8 | `package.json`, `firebase.json`, `tsconfig.json` |
| Security Rules | 3 | `firestore.rules`, `storage.rules`, `firestore.indexes.json` |
| Core Docs | 12 | `README.md`, `ARCHITECTURE.md`, `SPRINT_PLAN.md` |
| **Total** | **~33 files** | **(Plus src/ folder structure)** |

### Files to Remove (Optional):
| Category | Count | Action |
|----------|-------|--------|
| Setup Guides | 6 | Delete or archive |
| Status Reports | 5 | Delete or archive |
| **Total** | **11 files** | **~40 KB saved** |

---

## 🚀 **Part 6: What Happens After Cleanup**

### Before Cleanup (Current):
```
glamgo-app/
├── .env ← DANGER! Contains secrets
├── .git/ ← Broken/disconnected
├── 15+ documentation files ← Some redundant
├── node_modules/ ← 871 packages
└── src/ ← Source code
```

### After Cleanup (Clean):
```
glamgo-app/
├── .env ← Protected by .gitignore ✅
├── .env.example ← Template (no secrets) ✅
├── .git/ ← Fresh & connected ✅
├── Essential docs only ← 12 core files ✅
├── node_modules/ ← Ignored ✅
├── src/ ← Source code ✅
└── docs/archive/ ← Old guides (optional)
```

---

## ⚡ **Quick Commands to Run**

### Option A: Delete Temporary Docs
```bash
rm FIREBASE_SETUP.md STRIPE_SETUP.md GOOGLE_MAPS_SETUP.md GET_TEST_KEYS_GUIDE.md LETS_DO_THIS_TOGETHER.md MOBILE_TESTING_TROUBLESHOOTING.md FIREBASE_DEPLOYMENT_SUCCESS.md DEPENDENCIES_INSTALLED.md SETUP_COMPLETE.md GITHUB_PUSH_SUCCESS.md GIT_CLEANUP_AUDIT.md
```

### Option B: Archive Temporary Docs
```bash
mkdir -p docs/archive
mv *_SETUP.md *_GUIDE.md *_SUCCESS.md *_COMPLETE.md *_TROUBLESHOOTING.md *_AUDIT.md LETS_DO_THIS_TOGETHER.md docs/archive/
```

### Reinitialize Git:
```bash
rm -rf .git
git init
git add .
git status  # VERIFY .env is NOT listed!
git commit -m "feat: initial GLAMGO project setup"
git remote add origin https://github.com/developedbydmac/glamgo-app.git
git branch -M main
git push -u origin main --force
```

---

## 🎯 **My Recommendation**

**Run these commands in order:**

```bash
# 1. Archive temporary docs (not delete, just in case)
mkdir -p docs/archive
mv FIREBASE_SETUP.md STRIPE_SETUP.md GOOGLE_MAPS_SETUP.md GET_TEST_KEYS_GUIDE.md LETS_DO_THIS_TOGETHER.md MOBILE_TESTING_TROUBLESHOOTING.md FIREBASE_DEPLOYMENT_SUCCESS.md DEPENDENCIES_INSTALLED.md SETUP_COMPLETE.md GITHUB_PUSH_SUCCESS.md docs/archive/

# 2. Verify .env protection
grep "\.env" .gitignore

# 3. Reinitialize git
rm -rf .git
git init

# 4. Add files
git add .

# 5. CHECK - Make sure .env is NOT in the list!
git status

# 6. Commit
git commit -m "feat: initial GLAMGO project with Clean Architecture, Firebase, Stripe, Google Maps"

# 7. Connect to GitHub
git remote add origin https://github.com/developedbydmac/glamgo-app.git

# 8. Push
git branch -M main
git push -u origin main --force
```

---

## ✅ **Success Criteria**

After running commands, verify:

1. **Git reconnected:**
   ```bash
   git remote -v
   # Should show: origin  https://github.com/developedbydmac/glamgo-app.git
   ```

2. **`.env` NOT committed:**
   ```bash
   git ls-files | grep .env
   # Should show NOTHING (or only .env.example)
   ```

3. **Clean working directory:**
   ```bash
   git status
   # Should show: "nothing to commit, working tree clean"
   ```

4. **GitHub updated:**
   - Visit: https://github.com/developedbydmac/glamgo-app
   - Should see your updated files
   - Check commits: Should see your new commit

---

## 🚨 **IMPORTANT WARNINGS**

### ⚠️ If `.env` Appears in `git status`:
```bash
# STOP! Remove it from staging:
git reset HEAD .env

# Verify it's ignored:
echo ".env" >> .gitignore
git add .gitignore
git commit -m "fix: ensure .env is ignored"
```

### ⚠️ If You Already Pushed `.env` to GitHub:
1. **Immediately rotate ALL API keys:**
   - Firebase: Revoke and regenerate
   - Stripe: Deactivate and create new keys
   - Google Maps: Delete and create new key
2. **Remove from Git history:**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   git push --force --all
   ```

---

## 📞 **Next Steps After Cleanup**

Once Git is reconnected and clean:

1. ✅ **Verify on GitHub** - Check repository looks good
2. ✅ **Start Sprint 1** - Begin building authentication
3. ✅ **Regular commits** - Commit after each feature
4. ✅ **Branch strategy** - Create feature branches for new work

---

**Created:** January 24, 2026  
**Status:** Ready to execute cleanup

**👑 GLAMGO - From Roots to Doorstep 👑**
