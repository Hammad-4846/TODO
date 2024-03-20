exports.success = (statusCode: number, result: Object | String) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

exports.error = (statusCode: number, message: String) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};
