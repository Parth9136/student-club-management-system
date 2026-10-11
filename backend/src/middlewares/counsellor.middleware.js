import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { connectionSQL } from "../db/index.js";

/**
 * Authorise ONLY counsellors.
 * Expects a JWT in the cookie `accessToken`
 * or the header `Authorization: Bearer <token>`.
 */
export const verifyCounsellor = asyncHandler(async (req, res, next) => {
    console.log("hi");
  /* ---------- 1. Get token ---------- */
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized: token missing");
  }

  /* ---------- 2. Decode token & fetch Mongo user ---------- */
  let userM;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    userM = await User.findById(decoded?._id).select("-password -refreshToken");

    if (!userM) {
      throw new ApiError(401, "Unauthorized: user not found");
    }
  } catch (err) {
    throw new ApiError(401, "Invalid token: " + err.message);
  }

  /* ---------- 3. Check SQL: must be a counsellor ---------- */
  const conn = await connectionSQL();
  const email = userM.userId.toLowerCase();       
  console.log(email)   // userId == email in your setup

  const [rows] = await conn.execute(
    `SELECT Email FROM Counsellor WHERE Email = ?`,
    [email]
  );

  if (rows.length === 0) {
    // Not a counsellor ⇒ reject
    throw new ApiError(403, "Access denied: counsellor credentials required");
  }

  /* ---------- 4. Success ---------- */
  req.user = userM;         // attach user object to request
  next();
});






