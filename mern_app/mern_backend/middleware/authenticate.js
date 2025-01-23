//? Import required modules and libraries
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendResponse from "../helpers/sendResponse.js";
import { userModel } from "../models/user.js";

//? Middleware function to authenticate users using jwt token
export async function authenticateUser(req, res, next) {
  try {
    //* Extract the token from the authorization header
    const bearerToken = req?.headers?.authorization;
    console.log('Auth Header:', bearerToken);
    
    if (!bearerToken) {
      return sendResponse(res, 403, null, false, "No authorization header provided.");
    }

    const token = bearerToken.split(" ")[1];
    console.log('Extracted Token:', token);

    //* If token is not provided, return an error response
    if (!token)
      return sendResponse(res, 403, null, false, "Token not provided.");

    //* Verify the token using the secret key
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //* If decoding fails, return an error response
    if (!decodedData)
      return sendResponse(res, 404, null, false, "Error in token decoding.");

    //* Find the user in database using the id from decoded data
    const user = await userModel.findById(decodedData._id);
    //* If user does not exist, return an error response
    if (!user) return sendResponse(res, 404, null, false, "User not found.");

    //* Attach decoded data to the request object for further use
    req.user = decodedData;
    next();
  } catch (err) {
    console.error("Authentication error:", {
      error: err.message,
      headers: req.headers,
      authHeader: req.headers.authorization
    });
    return sendResponse(res, 500, null, false, "Authentication failed: " + err.message);
  }
}
