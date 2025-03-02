const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_API_KEY,
    cardholder,
    billing,
    company,
    email,
    expand,
    individual,
    metadata,
    phone_number,
    spending_controls,
    status,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/issuing/cardholders/${cardholder}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(billing ? { billing } : {}),
        ...(company ? { company } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(individual ? { individual } : {}),
        ...(metadata ? { metadata } : {}),
        ...(phone_number ? { phone_number } : {}),
        ...(spending_controls ? { spending_controls } : {}),
        ...(status ? { status } : {}),
      }),
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
const verifyInput = ({ BUILDABLE_STRIPE_API_KEY, cardholder }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_API_KEY:
      "A valid BUILDABLE_STRIPE_API_KEY field (string) was not provided in the input. Create your appropriate Connection to automatically add it.",
    INVALID_CARDHOLDER: "A valid cardholder field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_API_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_API_KEY);
  if (typeof cardholder !== "string") throw new Error(ERRORS.INVALID_CARDHOLDER);
};
