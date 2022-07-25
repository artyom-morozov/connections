const axios = require("axios");

const run = async (input) => {
  const { BUILDABLE_TATUM_API_KEY, BUILDABLE_TATUM_API_URL, type, from, to } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "get",
      url: "{TATUM_API_URL}/v3/flow/block/events",
      headers: { "x-api-key": BUILDABLE_TATUM_API_KEY },
      params: { type, from, to },
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: error.response.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_TATUM_API_KEY, BUILDABLE_TATUM_API_URL, type, from, to }) => {
  const ERRORS = {
    INVALID_BUILDABLE_TATUM_API_KEY:
      "A valid BUILDABLE_TATUM_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_BUILDABLE_TATUM_API_URL:
      "A valid BUILDABLE_TATUM_API_URL field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_TYPE: "A valid type field (string) was not provided in the input.",
    INVALID_FROM: "A valid from field (number) was not provided in the input.",
    INVALID_TO: "A valid to field (number) was not provided in the input.",
  };

  if (typeof BUILDABLE_TATUM_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_TATUM_API_KEY);
  if (typeof BUILDABLE_TATUM_API_URL !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_TATUM_API_URL);
  if (typeof type !== "string") throw new Error(ERRORS.INVALID_TYPE);
  if (typeof from !== "number") throw new Error(ERRORS.INVALID_FROM);
  if (typeof to !== "number") throw new Error(ERRORS.INVALID_TO);
};
