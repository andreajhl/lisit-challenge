const createErrorLogMessage = (response, message) => {
  const status = response?.status || 400;
  const errorMessage = response?.message || message;

  const logData = {
    errorMessage,
      responseStatus: status,
    ...response?.data && {
      responseData: JSON.stringify(response?.data),
    },
  };

  return logData;
};

const logErrors = (error, message) => {
  const errorMsg = `'----ERROR----' ${message}`;
  const logData = createErrorLogMessage(error, message);

  console.error(errorMsg, logData);
};

export { createErrorLogMessage, logErrors };
