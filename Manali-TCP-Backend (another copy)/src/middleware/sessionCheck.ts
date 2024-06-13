import { Response, Request, NextFunction } from 'express';
import redisHelper from '../helpers/redis.helper';
import sendResponse from '../responses/response.helper';
import { RESPONSE_MESSAGES, STATUS_CODES, REDIS_VARIABLES } from '../constants';

/**
 * It is use to check if the cookie in requests exists and then verifies it
 * and extends the session time for the use for every request made
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    const userAgent = await redisHelper.getDataFromRedisKey(
      REDIS_VARIABLES.UserAgent,
      token
    );

    const userAgentRequest = req.headers['user-agent'];

    if (userAgent === userAgentRequest && token) {
      const data = await redisHelper.getDataFromRedisKey(
        REDIS_VARIABLES.UserData,
        token
      );
      if (data) {
        const updatedSeconds = Math.floor(Date.now() / 1000) + 60 * 60;

        // updating the user agent time for session login
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserAgent,
          { [token]: userAgent },
          updatedSeconds
        );

        // updating the token time for session login
        await redisHelper.storeInRedis(
          REDIS_VARIABLES.UserData,
          { [token]: data },
          updatedSeconds
        );

        // if the user access token is found and valid proceed the user to its request
        next();
      } else {
        return sendResponse(res, {
          message: RESPONSE_MESSAGES.UNAUTHORIZED,
          status: STATUS_CODES.UNAUTHORIZED
        });
      }
    } else {
      return sendResponse(res, {
        message: RESPONSE_MESSAGES.UNAUTHORIZED,
        status: STATUS_CODES.UNAUTHORIZED
      });
    }
  } catch (err) {
    console.log(err, 'this is the error');
    return sendResponse(res, {
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
      status: STATUS_CODES.INTERNALSERVER
    });
  }
};
