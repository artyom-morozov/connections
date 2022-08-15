require("dotenv").config();

import JiraIntegration from "../catalog/jira/Jira";

const jiraIntegration = new JiraIntegration({
  JIRA_PROJECT_ID: process.env.JIRA_PROJECT_ID as string,
  JIRA_HOST: process.env.JIRA_HOST as string,
  JIRA_OAUTH2_ACCESS_TOKEN: process.env.JIRA_OAUTH2_ACCESS_TOKEN as string,
});

describe("Jira Integration", () => {
  describe("init", () => {
    let webhookId: string | undefined;

    afterEach(async () => {
      await jiraIntegration.deleteWebhookEndpoint({ webhookId });
      webhookId = undefined;
    });

    it("should create a webhook", async () => {
      const testWebhookUrl = "https://example.com/webhook";
      const testEvents = ["jira:issue_created"];

      const { webhookData, events } = await jiraIntegration.init({
        webhookUrl: testWebhookUrl,
        events: testEvents,
      });

      expect(webhookData).toBeDefined();
      expect((webhookData as any).id).toBeDefined();
      expect((webhookData as any).config.url).toBe(testWebhookUrl);
      expect(events).toEqual(testEvents);

      webhookId = (webhookData as any).id;
    });
  });
})