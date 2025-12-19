import jwt from "jsonwebtoken";
import { deleteUserSessionsByUserId, insertUserSessionRecord } from "../02-models/session.js";
import { setAccessTokenCookies, setRefreshTokenCookie } from "../06-utils/token.js";
import argon2 from "argon2";

export async function jwtAuthMiddeware(req, res, next) {
  const access_Token = req.cookies.access_Token;
  const refresh_Token = req.cookies.refresh_Token;

  // check both token exits or not
  if (!access_Token && !refresh_Token) {
    return res
      .status(401)
      .json({ success: false, message: "No token found. Unauthorized" });
  }

  // if refrese token not exits
  if (!refresh_Token) {
    return res
      .status(401)
      .json({ success: false, message: "No token found. Unauthorized" });
  }

  //  if refresh token is expired
  try {
    jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      const decoded = jwt.decode(refresh_Token);
      if (decoded && decoded.userId) {
        await deleteUserSessionsByUserId(decoded.userId);
      }

      res.clearCookie("refresh_Token"); //  Delete cookies when refresh expires
      res.clearCookie("access_Token");
      // console.log("referseh token expired");
      return res.status(401).json({ message: "Refresh token expired" }); // ✅ Better message
    }
     

    return res.status(401).json({ message: "No token found. Unauthorized" });
  }

  
      //4. if access token is not exits
    if(!access_Token){
        // console.log("access token not exits");

        return await handleExpiredAccessToken(req,res,next,refresh_Token);
    }



    // check if access tokein is expired or not
    try{

        const decoded=jwt.verify(access_Token,process.env.ACCESS_TOKEN_SECRET);
        req.userId=decoded.userId;
        
        // console.log("access_Token");

    }catch(err){
        // console.log("expired access token 2")
        if(err.name=="TokenExpiredError"){
            return await handleExpiredAccessToken(req,res,next,refresh_Token);
        }
         return res.status(401).json({ message:err.message});
    }


    next();


}



async function handleExpiredAccessToken(req,res,next,oldRefreshToken) {
    try{
      // console.log("hiiiiiii")
        const decoded=jwt.verify(oldRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        req.userId=decoded.userId;

        // 1. Create NEW access token
        const newAccessToken=setAccessTokenCookies(res,{userId: decoded.userId});

        
        // 2. Create NEW refresh token (ROTATE)
        const newRefreshToken = setRefreshTokenCookie(res, { userId: decoded.userId });


         // 3. Hash new refresh token
        const hashedNewRefresh = await argon2.hash(newRefreshToken);

        const userAgent = req.headers["user-agent"] || null;

          // 4. Save NEW refresh token in DB
        await insertUserSessionRecord(decoded.userId, hashedNewRefresh, userAgent, req.clientIp);
        
        next();

    }catch(err){
        return res.status(401).json({ message:err.message});
    }
}




/*

2. When access token expires(Refresh Token Rotation (Best Practice))

    Verify refresh token
    DO NOT store old refresh token again
    Rotate the refresh token → issue a NEW refresh token
*/


/*
🟢 CASE 1 — Refresh token on client is NOT expired
    👉 Client always stores and uses the latest refresh token only.
👉 Old refresh token is deleted by browser when new one is set.

*/