const INTERNAL_ERROR = {
  code: 'INTERNAL_ERROR',
  message: 'Internal server error',
};

const BODY_REQUIRED_ERROR = {
  code: 'BODY_REQUIRED',
  message: 'Request body is required',
};

export const hasBody = (request) =>
  request.body && typeof request.body === 'object' && Object.keys(request.body).length > 0;

export const sendSuccess = (response, data, statusCode = 200) =>
  response.status(statusCode).json({
    success: true,
    data,
  });

export const sendError = (response, { statusCode = 500, code, message } = {}) =>
  response.status(statusCode).json({
    success: false,
    error: {
      code: code ?? INTERNAL_ERROR.code,
      message: statusCode >= 500 ? INTERNAL_ERROR.message : (message ?? INTERNAL_ERROR.message),
    },
  });

export const handleCorePost = (delegate) => async (request, response, next) => {
  try {
    if (!hasBody(request)) {
      return sendError(response, {
        statusCode: 400,
        ...BODY_REQUIRED_ERROR,
      });
    }

    const result = await delegate(request.body);

    return sendSuccess(response, result);
  } catch (error) {
    return next(error);
  }
};
