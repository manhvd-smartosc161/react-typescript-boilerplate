# Git Flow - Development Workflow

## 📋 Table of Contents

- [1. Branch Types](#1-branch-types)
- [2. Development Workflow](#2-development-workflow)
- [3. Commit Convention](#3-commit-convention)
- [4. Pull Request Guidelines](#4-pull-request-guidelines)
- [5. Code Review Process](#5-code-review-process)
- [6. Release Process](#6-release-process)
- [7. Hotfix Process](#7-hotfix-process)
- [8. Best Practices](#8-best-practices)
- [9. Git Flow Diagram](#9-git-flow-diagram)

---

## 1. Branch Types

### Main Branches

- **`master`** (or `main`): Production branch, contains released code
- **`develop`**: Development branch, contains latest code under development
- **`release/*`**: Release preparation branch (e.g., `release/v1.2.0`)

### Feature Branches

- **`feat/*`**: New feature development
- **`bugfix/*`**: Bug fixes during development
- **`hotfix/*`**: Critical production bug fixes
- **`refactor/*`**: Code refactoring
- **`chore/*`**: Other tasks (dependency updates, config changes, etc.)

---

## 2. Development Workflow

### Step 1: Task Assessment

When receiving a task, identify the work type:

| Type       | Description                 | Examples                                  |
| ---------- | --------------------------- | ----------------------------------------- |
| `feat`     | New feature                 | Add Settings page, add registration form  |
| `bugfix`   | Bug fix in development      | Fix CSS issues, fix validation logic      |
| `hotfix`   | Critical production bug fix | Fix critical bugs affecting users         |
| `refactor` | Code refactoring            | Optimize performance, refactor components |
| `chore`    | Other tasks                 | Update dependencies, configure CI/CD      |

### Step 2: Create New Branch

#### 2.1. Feature (feat)

```bash
# Ensure you're on develop branch and up to date
git checkout develop
git pull origin develop

# Create new feature branch
git checkout -b feat/add-setting-page
```

**Branch naming examples:**

- `feat/add-setting-page`
- `feat/implement-thai-translation`
- `feat/create-dashboard-chart`

#### 2.2. Bugfix

```bash
git checkout develop
git pull origin develop
git checkout -b bugfix/fix-profile-popup-css
```

**Branch naming examples:**

- `bugfix/fix-profile-popup-css`
- `bugfix/fix-form-validation`
- `bugfix/fix-api-error-handling`

#### 2.3. Refactor

```bash
git checkout develop
git pull origin develop
git checkout -b refactor/optimize-user-service
```

**Branch naming examples:**

- `refactor/optimize-user-service`
- `refactor/restructure-components`
- `refactor/improve-error-handling`

#### 2.4. Hotfix (checkout from master)

```bash
git checkout master
git pull origin master
git checkout -b hotfix/fix-login-critical-bug
```

**Branch naming examples:**

- `hotfix/fix-login-critical-bug`
- `hotfix/fix-payment-error`
- `hotfix/fix-data-loss-issue`

### Step 3: Implement Changes

- Code on the newly created branch
- Test thoroughly before committing
- Ensure code works correctly with no errors

### Step 4: Commit Code

#### 4.1. Commit Convention

**Format:**

```
[Type] Description
```

**Examples:**

```bash
git add .
git commit -m "[Feat] Add setting page"
git commit -m "[Bugfix] Fix CSS for profile popup"
git commit -m "[Refactor] Optimize user service performance"
git commit -m "[Hotfix] Fix critical login bug"
git commit -m "[Chore] Update dependencies"
```

#### 4.2. Commit Rules

✅ **GOOD:**

- Clear commit messages describing the actual changes
- Each commit focuses on a specific purpose
- Reasonable number of file changes per commit

```bash
git commit -m "[Feat] Add user profile form"
git commit -m "[Feat] Add profile validation schema"
git commit -m "[Feat] Integrate profile API"
```

❌ **BAD:**

- Vague, unclear commit messages
- One commit with too many unrelated changes
- Bundling multiple tasks into one commit

```bash
# BAD - Unclear
git commit -m "update"
git commit -m "fix bug"

# BAD - Too many unrelated changes
git commit -m "[Feat] Add profile page, fix CSS, update API, refactor components"
```

### Step 5: Push Code to Remote

```bash
# First push
git push -u origin feat/add-setting-page

# Subsequent pushes
git push
```

---

## 4. Pull Request Guidelines

### 4.1. Creating Pull Request

1. **Access GitHub/GitLab** and create Pull Request from your branch to `develop`

2. **Fill in information:**
   - **Title**: Clear PR name reflecting the content
     - ✅ Good: `[Feat] Add user settings page`
     - ❌ Bad: `Update code`
   - **Description**: Detailed description of what was done

     ```markdown
     ## Changes

     - Add Settings page with profile and password tabs
     - Implement Thai translation for auth forms
     - Add form validation for user profile

     ## Testing

     - Tested on Chrome, Firefox, Safari
     - All form validations working correctly

     ## Screenshots

     [Attach screenshots if needed]
     ```

3. **Assign:**
   - **Assignee**: Select yourself
   - **Reviewer**: Select the person who will review your code (team lead, senior dev, etc.)

### 4.2. Pull Request Rules

✅ **GOOD PR:**

- Focused on a specific purpose (one feature, one bug fix)
- Reasonable number of file changes (usually < 20 files)
- Code has been thoroughly tested
- Clear description
- No conflicts with develop branch

❌ **BAD PR:**

- Too many file changes (> 50 files)
- Multiple different purposes in one PR
- Untested code
- Has conflicts
- No description

> 💡 **Note:** A pull request with too many file changes is a bad pull request and will **NOT be approved**. It needs to be split into smaller PRs with specific purposes.

---

## 5. Code Review Process

### 5.1. Review Process

```
Developer creates PR → Reviewer reviews code → Comments/Approve
                                              ↓
                                     [Comments] → Developer fixes → Push again
                                              ↓
                                     [Approve] → Merge into develop
```

### 5.2. When Receiving Comments

1. **Read comments carefully** from reviewer
2. **Fix code** according to requirements
3. **Amend the last commit** to avoid creating extra commits:
   ```bash
   # Fix the code, then amend the last commit
   git add .
   git commit --amend -m "[Feat] Add user profile form with validation"
   ```
4. **Force push** to your branch (safe with --force-with-lease):
   ```bash
   git push --force-with-lease
   ```
5. **Reply** to comment to notify that it's fixed
6. Repeat the process until **Approved**

> 💡 **Why amend instead of new commit?**
>
> - Keeps commit history clean
> - Avoids cluttering with "fix review comments" commits
> - Maintains logical commit grouping
> - Easier to review and understand changes

### 5.3. When Approved

1. Reviewer will **Approve** PR
2. **Merge** PR into `develop` branch
3. **Delete** feature branch after merge (optional but recommended)
   ```bash
   git branch -d feat/add-setting-page
   git push origin --delete feat/add-setting-page
   ```

---

## 6. Release Process

### 6.1. Release Preparation

After a period of development, when there are enough features and bugfixes, the team will proceed with release.

#### Step 1: Create Release Branch

```bash
# Checkout from develop
git checkout develop
git pull origin develop

# Create release branch with version number
git checkout -b release/v1.2.0
```

#### Step 2: Testing on Release Branch

- QA team tests all new features
- Check regression (old features still work)
- Fix bugs found during testing (commit directly to release branch)

```bash
# Fix bugs on release branch
git commit -m "[Bugfix] Fix issue found in QA testing"
git push origin release/v1.2.0
```

#### Step 3: Update Version and Changelog

```bash
# Update version in package.json
# Update CHANGELOG.md with changes

git commit -m "[Release] Update version to v1.2.0 and changelog"
git push origin release/v1.2.0
```

#### Step 4: Merge into Master

```bash
# Create Pull Request: release/v1.2.0 → master
# After review and approval:

git checkout master
git pull origin master
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin master --tags
```

#### Step 5: Merge Back to Develop

Bugfixes on release need to be merged back to develop:

```bash
git checkout develop
git pull origin develop
git merge --no-ff release/v1.2.0
git push origin develop
```

#### Step 6: Delete Release Branch

```bash
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

#### Step 7: Deploy to Production

```bash
# Deploy code from master branch to production
# Follow team's CI/CD process
```

### 6.2. Release Timeline

```
Week 1-2: Development on develop
    ↓
Week 3: Create release branch, QA testing
    ↓
Week 4: Fix bugs, finalize release
    ↓
Deploy to production
```

---

## 7. Hotfix Process

Hotfix is used when there are critical bugs on production that need immediate fixing.

### 7.1. Hotfix Workflow

#### Step 1: Create Hotfix Branch from Master

```bash
git checkout master
git pull origin master
git checkout -b hotfix/fix-critical-login-bug
```

#### Step 2: Fix Bug

```bash
# Fix bug
git commit -m "[Hotfix] Fix critical login bug"
git push origin hotfix/fix-critical-login-bug
```

#### Step 3: Merge into Master

```bash
# Create PR: hotfix/fix-critical-login-bug → master
# After review and approval:

git checkout master
git merge --no-ff hotfix/fix-critical-login-bug
git tag -a v1.2.1 -m "Hotfix version 1.2.1"
git push origin master --tags
```

#### Step 4: Merge into Develop

```bash
git checkout develop
git merge --no-ff hotfix/fix-critical-login-bug
git push origin develop
```

#### Step 5: Deploy Immediately

```bash
# Deploy code from master to production
```

#### Step 6: Delete Hotfix Branch

```bash
git branch -d hotfix/fix-critical-login-bug
git push origin --delete hotfix/fix-critical-login-bug
```

---

## 8. Best Practices

### 8.1. Commit Frequently

- Small, frequent commits instead of large, infrequent ones
- Each commit should focus on one logical change
- **Use `git commit --amend`** when fixing review comments to avoid extra commits

### 8.2. Pull Frequently

```bash
# Before starting work each day
git checkout develop
git pull origin develop

# Before creating PR
git checkout develop
git pull origin develop
git checkout feat/your-branch
git rebase develop  # Recommended over merge
```

### 8.3. Write Meaningful Commit Messages

✅ Good:

- `[Feat] Add user authentication with JWT`
- `[Bugfix] Fix memory leak in dashboard component`
- `[Refactor] Extract validation logic to separate file`

❌ Bad:

- `update`
- `fix bug`
- `changes`

### 8.4. Split Pull Requests

Instead of one large PR with 100 files, split into:

- PR 1: `[Feat] Add user profile form` (10 files)
- PR 2: `[Feat] Add profile API integration` (5 files)
- PR 3: `[Feat] Add profile validation` (3 files)

### 8.5. Review Code Before Creating PR

- Self-review your code first
- Run linter and fix warnings
- Test on multiple browsers
- Ensure no console.log, debugger statements

### 8.6. Clean Commit History

**Good commit history:**

```
[Feat] Add user profile form
[Feat] Add profile validation
[Feat] Integrate profile API
```

**Bad commit history (too many fix commits):**

```
[Feat] Add user profile form
[Fix] Fix validation as per review
[Fix] Fix API integration as per review
[Fix] Fix CSS styling as per review
```

**Solution: Use amend**

```bash
# Instead of creating new commits for fixes
git add .
git commit --amend -m "[Feat] Add user profile form with validation and API integration"
git push --force-with-lease
```

### 8.7. Resolve Conflicts

```bash
# Update develop to latest
git checkout develop
git pull origin develop

# Rebase develop into your branch
git checkout feat/your-branch
git rebase develop

# Resolve conflicts if any
# After fixing conflicts:
git add .
git rebase --continue

# If multiple commits, may need to repeat process
# Then push (may need force push)
git push --force-with-lease
```

---

## 9. Git Flow Diagram

```
master    ─────────●─────────────────●──────────●─────→
                   │                 │          │
                   │              (tag v1.0)  (tag v1.1)
                   │                 │          │
release   ─────────┼────●────────●───┤          │
                   │    │        │   │          │
develop   ───●─────●────●────●───●───●──────●───●──────→
             │          │    │       │      │   │
             │          │    │       │      │   │
feat       ──●──●───────┘    │       │      │   │
             │               │       │      │   │
bugfix     ──────────────────●───────┘      │   │
                                            │   │
hotfix    ──────────────────────────────────●───┘

Legend:
● = Merge point
─ = Branch timeline
```
