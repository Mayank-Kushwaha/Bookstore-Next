
import jwt from "jsonwebtoken";
require("dotenv").config();
const  { NEXT_PUBLIC_TOKEN_SECRET } = process.env;

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, NEXT_PUBLIC_TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }

}