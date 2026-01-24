# GLAMGO - Trello Board Structure

## Overview

This document provides the complete Trello board structure for managing GLAMGO development. You can use this as a template to create your Trello board.

---

## Board Setup

**Board Name:** GLAMGO - Beauty Supply Delivery App  
**Visibility:** Private (Team only)  
**Background:** Choose a professional background

### Power-Ups to Enable:
1. **Calendar** - View deadlines
2. **Custom Fields** - Story points, priority
3. **Card Aging** - Highlight stale cards
4. **GitHub** - Link commits and PRs

---

## Lists (Columns)

### 1. 📋 Backlog
**Purpose:** All user stories not yet started

### 2. 📅 Sprint Planning
**Purpose:** Stories being prepared for current sprint

### 3. 🔄 In Progress
**Purpose:** Stories currently being worked on

### 4. 👀 Code Review
**Purpose:** Stories awaiting code review

### 5. 🧪 Testing
**Purpose:** Stories in QA/testing phase

### 6. ✅ Done
**Purpose:** Completed stories (cleared weekly)

### 7. 🚀 Deployed
**Purpose:** Features live in production

### 8. 🐛 Bugs
**Purpose:** Bug reports and fixes

### 9. 💡 Ideas / Future
**Purpose:** Future enhancements and ideas

---

## Labels

Create these labels for categorization:

### Priority Labels
- 🔴 **Critical** (Red) - Must be done immediately
- 🟠 **High** (Orange) - Important, do soon
- 🟡 **Medium** (Yellow) - Normal priority
- 🟢 **Low** (Green) - Nice to have
- ⚪ **Backlog** (Gray) - Future consideration

### Feature Labels
- 🔐 **Auth** (Purple) - Authentication & user management
- 🛒 **Customer** (Blue) - Customer app features
- 🏪 **Vendor** (Teal) - Vendor dashboard features
- 🚗 **Driver** (Orange) - Driver app features
- 👨‍💼 **Admin** (Red) - Admin panel features
- 💳 **Payments** (Green) - Payment processing
- 📦 **Products** (Light Blue) - Product management
- 📍 **Location** (Pink) - Maps & location features
- 🔔 **Notifications** (Yellow) - Push notifications
- 📊 **Analytics** (Lime) - Analytics & reporting

### Technical Labels
- 🎨 **Frontend** (Sky) - UI/UX work
- ⚙️ **Backend** (Black) - Backend/Firebase work
- 🧪 **Testing** (Lime) - Test-related work
- 📚 **Documentation** (Yellow) - Documentation
- 🐛 **Bug** (Red) - Bug fixes
- 🔧 **Tech Debt** (Gray) - Technical debt

### Status Labels
- 🚫 **Blocked** (Red) - Blocked by dependency
- ⏸️ **On Hold** (Orange) - Paused temporarily
- 🔁 **Needs Review** (Purple) - Needs discussion

---

## Card Template

### Card Title Format
```
[Epic-ID] User Story Title (Points)
Example: [CUST-007] Browse Products by Category (5)
```

### Card Description Template
```markdown
## User Story
**As a** [user type]
**I want to** [action]
**So that** [benefit]

## Story Points
5

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Dependencies
- Depends on: [Card Name/Link]
- Blocks: [Card Name/Link]

## Technical Notes
- Implementation details
- API endpoints needed
- Database changes

## Design
- Link to Figma/designs
- Screenshots

## Testing
- [ ] Unit tests written
- [ ] Integration tests passed
- [ ] Manual testing completed
- [ ] QA sign-off

## Definition of Done
- [ ] Code complete
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Product owner approved
```

---

## Epic Cards (Separate Lists or Power-Up)

### Epic 1: Customer App 🛒

**Description:** Complete customer-facing mobile app

**Stories:**
1. US-007: Browse Products by Category (5)
2. US-008: Search Products (4)
3. US-009: Filter Products (4)
4. US-010: Sort Products (3)
5. US-011: View Product Details (5)
6. US-012: View Vendor Profile (3)
7. US-013: Add to Cart (4)
8. US-014: View Cart (4)
9. US-015: Update Cart Quantity (3)
10. US-016: Remove from Cart (2)
11. US-017: Manage Delivery Addresses (5)
12. US-018: Checkout Flow (5)
13. US-019: Add Payment Method (5)
14. US-020: Process Payment (5)
15. US-021: Place Order (5)
16. US-022: Order Confirmation (3)
17. US-023: View Order History (4)
18. US-024: Apply Promo Code (4)
19. US-025: Track Order Real-Time (5)
20. US-026: View Driver Location (5)
21. US-027: Contact Driver (3)
22. US-028: Receive Order Notifications (4)
23. US-029: Cancel Order (4)
24. US-030: Rate and Review Order (4)

**Total Points:** 98

---

### Epic 2: Vendor Dashboard 🏪

**Description:** Web/mobile dashboard for vendors

**Stories:**
1. US-031: Vendor Registration (5)
2. US-032: Store Profile Setup (4)
3. US-033: Vendor Dashboard (4)
4. US-034: Add Product (5)
5. US-035: Edit Product (3)
6. US-036: Manage Inventory (4)
7. US-037: Receive Orders (4)
8. US-038: View Order Details (3)
9. US-039: Accept/Reject Order (4)
10. US-040: Update Order Status (4)
11. US-041: Order History for Vendor (3)
12. US-042: Vendor Notifications (3)

**Total Points:** 46

---

### Epic 3: Driver App 🚗

**Description:** Mobile app for delivery drivers

**Stories:**
1. US-043: Driver Registration (5)
2. US-044: Driver Dashboard (4)
3. US-045: Go Online/Offline (3)
4. US-046: Receive Delivery Requests (4)
5. US-047: Accept Delivery (4)
6. US-048: Navigate to Pickup (5)
7. US-049: Pickup Order (3)
8. US-050: Navigate to Customer (4)
9. US-051: Complete Delivery (4)
10. US-052: Proof of Delivery (4)
11. US-053: Track Earnings (4)
12. US-054: View Delivery History (3)
13. US-055: Request Payout (4)
14. US-056: View Performance Metrics (3)
15. US-057: Report Delivery Issues (3)

**Total Points:** 57

---

### Epic 4: Admin Panel 👨‍💼

**Description:** Admin dashboard for platform management

**Stories:**
1. US-058: Admin Dashboard (5)
2. US-059: Approve Vendor Applications (4)
3. US-060: Approve Driver Applications (4)
4. US-061: Manage Users (4)
5. US-062: Monitor Orders (4)
6. US-063: Moderate Reviews (3)
7. US-064: Manage Categories (4)
8. US-065: Configure Platform Settings (4)
9. US-066: Create Promo Codes (4)
10. US-067: View Advanced Analytics (5)
11. US-068: Generate Financial Reports (4)
12. US-069: Manage Featured Content (3)

**Total Points:** 48

---

### Epic 5: Backend/API ⚙️

**Description:** Firebase backend, security rules, and cloud functions

**Stories:**
1. US-001: User Registration (5)
2. US-002: User Login (3)
3. US-003: Social Login (4)
4. US-004: User Profile Management (4)
5. US-005: Role-Based Navigation (3)
6. US-006: Logout (2)
7. Technical: Firebase Setup (3)
8. Technical: Security Rules (4)
9. Technical: Cloud Functions Setup (4)
10. Technical: Stripe Integration (5)
11. Technical: Google Maps Integration (4)
12. Technical: Push Notifications Setup (4)
13. Technical: Analytics Setup (3)

**Total Points:** 48

---

## Sprint Lists

Create separate lists for each sprint:

### Sprint 1: Authentication & User Management
- Copy cards from backlog
- Move to Sprint 1 list
- Set due dates

### Sprint 2: Customer App - Product Browsing
- Copy cards from backlog
- Move to Sprint 2 list
- Set due dates

*(Continue for all 12 sprints)*

---

## Trello Board Views

### 1. By Sprint
**Filter:** Show cards for current sprint only  
**Sort:** By priority

### 2. By Epic
**Filter:** Show cards by epic label  
**Sort:** By story points

### 3. By Assignee
**Filter:** Show cards assigned to you  
**Sort:** By due date

### 4. Calendar View
**Power-Up:** Calendar  
**Show:** All cards with due dates

---

## Custom Fields

Add these custom fields to cards:

1. **Story Points** (Number)
   - Values: 1, 2, 3, 4, 5

2. **Sprint** (Dropdown)
   - Values: Sprint 1, Sprint 2, ..., Sprint 12

3. **Epic** (Dropdown)
   - Values: Customer App, Vendor Dashboard, Driver App, Admin Panel, Backend/API

4. **Status** (Dropdown)
   - Values: Not Started, In Progress, Blocked, In Review, Testing, Done

5. **Priority** (Dropdown)
   - Values: Critical, High, Medium, Low

---

## Card Examples

### Example 1: Feature Card

**Title:** [CUST-007] Browse Products by Category (5)

**Labels:**
- 🟠 High
- 🛒 Customer
- 🎨 Frontend
- 📦 Products

**Description:**
```markdown
## User Story
**As a** customer
**I want to** browse products by category
**So that** I can find what I need

## Story Points
5

## Acceptance Criteria
- [ ] Display product categories on home screen
- [ ] Tapping category shows filtered products
- [ ] Products display image, name, price, vendor
- [ ] Infinite scroll/pagination works
- [ ] Loading states shown

## Dependencies
- Depends on: US-001 (User Registration)
- Blocks: US-008 (Search Products)

## Technical Notes
- Firestore query: `products` collection filtered by `categoryId`
- Use FlatList with onEndReached for pagination
- Cache category data in Redux

## Design
- [Link to Figma]

## Testing
- [ ] Unit tests for product filtering logic
- [ ] Integration test for Firestore query
- [ ] Manual testing on iOS/Android
- [ ] Performance testing with 1000+ products
```

**Checklist:**
- [ ] Design approved
- [ ] Code implemented
- [ ] Tests written
- [ ] Code reviewed
- [ ] QA passed
- [ ] Documentation updated
- [ ] Deployed to staging

**Due Date:** End of Sprint 2

**Assigned To:** Developer Name

**Custom Fields:**
- Story Points: 5
- Sprint: Sprint 2
- Epic: Customer App
- Status: Not Started
- Priority: High

---

### Example 2: Bug Card

**Title:** [BUG-001] Cart total not updating when quantity changed

**Labels:**
- 🔴 Critical
- 🐛 Bug
- 🛒 Customer
- 🎨 Frontend

**Description:**
```markdown
## Bug Report

### Description
When user updates product quantity in cart, the item subtotal updates but the cart total doesn't recalculate.

### Steps to Reproduce
1. Add item to cart
2. Go to cart screen
3. Increase quantity using + button
4. Observe that subtotal updates but total remains the same

### Expected Behavior
Cart total should automatically recalculate when quantity changes

### Actual Behavior
Cart total stays the same until screen is refreshed

### Environment
- iOS 16.0
- App version 1.0.0 (Sprint 3)

### Screenshots
[Attach screenshot]

### Fix
- Update cart slice reducer to recalculate total
- Add useEffect to recalculate on items change
```

**Checklist:**
- [ ] Bug reproduced
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Tests added
- [ ] Fix verified
- [ ] Regression testing done

**Due Date:** ASAP

**Priority:** Critical

---

### Example 3: Technical Debt Card

**Title:** [TECH-001] Refactor product list component

**Labels:**
- 🟡 Medium
- 🔧 Tech Debt
- 🎨 Frontend

**Description:**
```markdown
## Technical Debt

### Issue
ProductList component is too large (500+ lines) and handles too many responsibilities.

### Proposed Solution
- Extract ProductCard into separate component
- Extract filter logic into custom hook
- Move pagination logic to hook
- Simplify state management

### Benefits
- Easier to test
- Better performance
- More reusable components
- Easier to maintain

### Effort
3 story points

### Priority
Medium (do when time permits)
```

---

## Board Maintenance

### Daily
- Move cards between columns as work progresses
- Update card progress in comments
- Add blockers/issues as they arise

### Weekly (Sprint Review)
- Archive completed cards
- Move unfinished stories back to backlog
- Create cards for next sprint
- Update sprint progress

### Bi-weekly (Sprint Planning)
- Review backlog
- Estimate new stories
- Prioritize stories for next sprint
- Assign stories to team members
- Set sprint goals

---

## Automation Rules

Set up these Butler automation rules:

### Rule 1: Move to Testing
**When** card is moved to "Code Review"  
**And** all checklist items are checked  
**Then** move card to "Testing"

### Rule 2: Add Due Date
**When** card is added to sprint list  
**Then** set due date to end of sprint

### Rule 3: Notify on Block
**When** "Blocked" label is added  
**Then** send notification to @team

### Rule 4: Archive Old Cards
**Every** Monday at 9 AM  
**Then** archive all cards in "Done" list older than 7 days

### Rule 5: Stale Card Warning
**When** card has been in "In Progress" for 5 days  
**Then** add comment "This card may be stale. Please update status."

---

## Team Workflow

### 1. Sprint Planning (Monday)
- Review last sprint
- Plan current sprint
- Move cards to sprint list
- Set sprint goal

### 2. Daily Standup
- What I did yesterday
- What I'm doing today
- Any blockers
- Update Trello cards

### 3. Development
- Move card to "In Progress"
- Create feature branch
- Commit regularly with card reference
- Update card comments

### 4. Code Review
- Move card to "Code Review"
- Create PR with card link
- Tag reviewer
- Address feedback

### 5. Testing
- Move card to "Testing"
- Run automated tests
- Manual testing
- QA sign-off

### 6. Deployment
- Move card to "Deployed"
- Deploy to staging/production
- Verify in production
- Close card

---

## Reporting

### Sprint Velocity Chart
Track story points completed per sprint:
- Sprint 1: 29 points
- Sprint 2: 28 points
- Sprint 3: 29 points
- etc.

### Burndown Chart
Track remaining work in sprint:
- Day 1: 30 points remaining
- Day 2: 26 points remaining
- Day 3: 22 points remaining
- etc.

### Cumulative Flow Diagram
Track cards in each column over time

---

## Tips for Success

### 1. Keep Cards Small
- Break large stories into smaller tasks
- Target 3-5 points per card max
- Easier to estimate and track

### 2. Update Regularly
- Update cards daily
- Add comments for progress
- Move cards promptly

### 3. Use Checklists
- Break down acceptance criteria
- Track sub-tasks
- Clear definition of done

### 4. Link Related Items
- Link dependent cards
- Reference GitHub PRs
- Link design files

### 5. Archive Old Cards
- Keep board clean
- Archive completed work weekly
- Use filters to find old cards

---

## Trello Board URL Template

After creating your board, share it with your team:

**Production Board:** https://trello.com/b/YOUR_BOARD_ID/glamgo-production  
**Staging Board:** https://trello.com/b/YOUR_BOARD_ID/glamgo-staging  
**Backlog Board:** https://trello.com/b/YOUR_BOARD_ID/glamgo-backlog

---

## Integration with GitHub

### Commit Message Format
```
feat(customer): implement product browsing [CUST-007]

- Added category filter
- Implemented pagination
- Added loading states

Closes #7
```

### PR Title Format
```
[CUST-007] Browse Products by Category
```

### Linking
- Trello card → GitHub PR
- GitHub PR → Trello card
- Automatic updates on merge

---

## Quick Start Checklist

- [ ] Create Trello board
- [ ] Add team members
- [ ] Create lists (columns)
- [ ] Create labels
- [ ] Enable power-ups
- [ ] Add custom fields
- [ ] Create Epic cards
- [ ] Import Sprint 1 stories
- [ ] Set up automation rules
- [ ] Share board with team
- [ ] Start Sprint 1! 🚀

---

**Ready to build GLAMGO! Let's go! 💄✨**

