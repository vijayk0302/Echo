import aj from "../lib/arjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "rate limit is excedded to-Too Many Requests",
        });
      }
    //   else if (decision.reason.isBot.apply()) {
    //     return res.status(403).json({
    //       message: "No bots allowed",
    //     });
    //   } else {
    //     return res.status(403).json({
    //       message: "Access denied by security reason",
    //     });
    //   }
    } else if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "No bots allowed",
      });
    }
    next()
  } catch (error) {
    console.log("arcjet protecton error :", error);
    next();
  }
};


export default arcjetProtection