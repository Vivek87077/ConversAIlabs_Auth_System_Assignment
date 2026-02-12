# 🔒 The Silent Server (Backend Debugging Assignment)

Welcome to **The Silent Server**! 🚀 This project is a thrilling backend debugging challenge where a broken authentication flow was meticulously analyzed, fixed, and validated step-by-step.

**Objective:** Repair the authentication system and ensure the complete **login → OTP → JWT → protected route** flow works flawlessly. 🔄

## 🚀 Setup

1. **Install dependencies:** 📦

   ```bash
   npm install
   ```

2. **Start the server:** ▶️
   ```bash
   npm start
   ```
   🌐 Server runs at: `http://localhost:3000`

## 🎯 Assignment Objective

The goal is to fix the broken authentication endpoints so that a user can:

- 🔑 **Login** to get a session ID and OTP.
- 🔢 **Verify the OTP** to get a valid session cookie.
- 🎫 **Exchange the Session** for a JWT Access Token.
- 🛡️ **Access Protected Routes** using the token.

---

## 🔧 Debugging Summary

The following issues were identified and resolved:

1. **Logger Middleware Issue** 🐛
   - Logger was incorrectly acting as authentication middleware.
   - It was blocking all routes with 401 responses.
   - **Fix:** Converted it into a proper request logger and added `next()`.

2. **OTP Logging Issue** 📝
   - OTP was generated but not logged.
   - **Fix:** Updated console log to include OTP value.

3. **Token Endpoint Bug** 🍪
   - `/auth/token` incorrectly read session from Authorization header.
   - It should read session from `session_token` cookie.
   - **Fix:**
     - Enabled cookie-parser
     - Reading `req.cookies.session_token`
     - Validating session properly

4. **Auth Middleware Bug** 🔐
   - `next()` was missing after successful JWT verification.
   - This caused the request to hang indefinitely.
   - **Fix:** Added `next()` inside the try block.

## 🔍 Verification Steps

### Step 1: Login 🔑

**Endpoint:** `POST /auth/login`
The server should generate a session and log an OTP to the console.

**Test Command:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<YOUR_EMAIL@example.com>","password":"password123"}'
```

**Expected Outcome:**

- Server logs the OTP (e.g., `[OTP] Session abc12345 generated`).
- Response contains `loginSessionId`.

### Step 2: Verify OTP 🔢

**Endpoint:** `POST /auth/verify-otp`
The server fails to verify the OTP correctly. You need to find out why.
_Hint: Check data types and how cookies are set._

**Test Command:**
(Replace `<loginSessionId>` and `<otp>` with values from Task 1)

```bash
curl -c cookies.txt -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"loginSessionId":"<loginSessionId>","otp":"<otp_from_logs>"}'
```

**Expected Outcome:**

- `cookies.txt` is created containing a session cookie.
- Response says "OTP verified".

### Step 3: Get JWT Token 🎫

**Endpoint:** `POST /auth/token`
This endpoint is supposed to issue a JWT, but it has a bug in how it reads the session.

**Test Command:**

```bash
# Uses the cookie captured in Task 2
curl -b cookies.txt -X POST http://localhost:3000/auth/token
```

**Expected Outcome:**

- Response contains `{ "access_token": "..." }`.

### Step 4: Access Protected Route 🛡️

**Endpoint:** `GET /protected`
Ensure the middleware correctly validates the token.

**Test Command:**

```bash
# Replace <jwt> with the token from Task 3
curl -H "Authorization: Bearer <jwt>" http://localhost:3000/protected
```

**Expected Outcome:**

- Response: `{ "message": "Access granted", "user": ... }`

---

## 🎯 Expected Output

After fixing the bugs, you should be able to run the following sequence successfully:

1. **Login** 🔑: Receive a `loginSessionId` and see an OTP in the server logs.
2. **Verify OTP** 🔢: Receive a session cookie (`session_token`).
3. **Get Token** 🎫: Exchange the session cookie for a JWT (`access_token`).
4. **Access Protected Route** 🛡️: Use the JWT to get a 200 OK response with user details and a **unique Success Flag**.

## 📋 Submission Details

The repository includes:

- 🔧 Fixed source code
- 📄 `output.txt` containing terminal outputs of all four test commands
- 📊 Clear demonstration of successful authentication flow

## 👤 Author

**Vivek Sharma**
📧 vsharma87077@gmail.com

## 🏆 Final Status

Authentication flow fully debugged and functional:

- ✅ Login
- ✅ OTP Verification
- ✅ Token Generation
- ✅ Protected Route Access
- ✅ Success Flag Generated
