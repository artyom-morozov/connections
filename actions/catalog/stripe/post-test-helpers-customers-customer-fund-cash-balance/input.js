const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    customer: "string", // Required
    amount: 0, // Required
    currency: "string", // Required

    // expand: ["string"],
    // reference: "string",
  };
};
