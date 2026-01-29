# Sprint 1 - Troubleshooting Log

**Sprint:** Sprint 1 - Authentication & User Management  
**Date Range:** January 28-29, 2026  
**Status:** In Progress (8 of 21 points complete)

---

## 🔍 Issues Encountered & Resolutions

### Issue 1: Google OAuth - Web Client ID vs iOS Client ID
**Date:** January 28, 2026  
**User Story:** US-003 (Google Social Login)  
**Status:** ✅ Resolved

**Problem:**
- Initial error: "Error 400: invalid_request" when using Web Client ID
- Web Client IDs don't work with Expo Go's dynamic tunnel URLs

**Solution:**
- Switched from Web Client ID to iOS Client ID
- Updated `.env` with: `634050437151-rau10n7knt43mafg4uelcrhpoelr353h.apps.googleusercontent.com`
- Restarted Expo server with `--tunnel --clear` flags

**Outcome:** Progressed past initial 400 error

---

### Issue 2: OAuth Consent Screen Not Configured
**Date:** January 29, 2026  
**User Story:** US-003 (Google Social Login)  
**Status:** ✅ Resolved

**Problem:**
- Still getting 400 error after iOS Client ID fix
- OAuth consent screen was not properly configured

**Solution:**
1. Configured OAuth consent screen branding:
   - App name: "GlamGo Mobile"
   - User support email: doquanmac@gmail.com
   - App logo: Uploaded
   - Developer contact: macsolutions1991@gmail.com
2. Added test users (3 emails)
3. Added required scopes: email, profile, openid

**Outcome:** All configuration completed

---

### Issue 3: Google OAuth Still Returning 400 Error
**Date:** January 29, 2026  
**User Story:** US-003 (Google Social Login)  
**Status:** ⏸️ DEFERRED

**Problem:**
- After completing ALL OAuth configuration steps, still receiving:
  - "Access blocked: Authorization Error"
  - "Error 400: invalid_request"

**Attempted Solutions:**
1. ✅ Used iOS Client ID instead of Web Client ID
2. ✅ Configured OAuth consent screen with branding
3. ✅ Added test users (3 emails)
4. ✅ Added required scopes (email, profile, openid)
5. ✅ Saved all changes
6. ⏳ Waited for Google propagation (2-5 minutes)

**Current Status:**
- All code 100% complete
- All configuration steps completed
- Still blocked by 400 error

**Decision:** 
- Deferred to end of Sprint 1
- Documented in `US-003-Google-Social-Login-DEFERRED.md`
- Moving to higher-priority US-005 (Role-Based Navigation)

**Possible Next Steps (End of Sprint):**
1. Wait 24+ hours for full Google propagation
2. Try Web Client ID again
3. Check Google Cloud Console for warnings
4. Consider Firebase UI for Auth
5. Use native Google Sign-In after standalone build

---

## 📚 Key Learnings

### Google OAuth Setup
- Web Client IDs are for web apps, not Expo Go
- iOS/Android Client IDs work with React Native
- OAuth consent screen must be configured BEFORE testing
- Scopes must be explicitly added (not auto-configured)
- Test users must be whitelisted in "Testing" mode
- Google changes can take 2-5 minutes (or longer) to propagate

### Clean Architecture Benefits
- Reusing `AuthRepository` for both email/password and Google auth
- Separate use cases (`LoginUseCase`, `RegisterUseCase`, `GoogleSignInUseCase`)
- Easy to defer Google OAuth without breaking email/password auth

### Sprint Management
- Don't spend 2+ hours on one blocking issue
- Defer and move to higher-priority tasks
- Document thoroughly for later review
- Navigation (US-005) blocks ALL features - should have prioritized earlier

---

## ⏭️ Deferred Items

### US-003: Google Social Login
- **Code:** 100% complete
- **Configuration:** 100% complete
- **Testing:** Blocked by 400 error
- **Revisit:** End of Sprint 1 (after US-004, US-005, US-006)

---

**Last Updated:** January 29, 2026, 8:30 AM
