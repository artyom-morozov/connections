const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    BUILDABLE_STRIPE_API_KEY: $env.BUILDABLE_STRIPE_API_KEY, // Required
    id: "string", // Required

    // expand: ["string"],
    // failure_details: { code: "account_closed" },
  };
};
