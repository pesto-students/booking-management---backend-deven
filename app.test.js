const request = require("supertest");
const app = require("./app");
const { sendBookingEmail } = require("./lib/sendEmail");

describe("GET /", () => {
  it("responds with status 404", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("sendBookingEmail function", () => {
  it("should send an email successfully", async () => {
    const to = "to@example.com";
    const subject = "Test Email";
    const data = { name: "John Doe", date: "2022-01-01" };

    try {
      const info = await sendBookingEmail({ to, subject, data });
      console.log("{info}");
      console.log({ info });
      expect(info.messageId).toBeTruthy();
    } catch (error) {
      console.log("{Error}", error);
      expect(error).toBeNull();
    }
  }, 310000);

  // it("should throw an error if email fails to send", async () => {
  //   const to = "invalid-recipient@example.com";
  //   const subject = "Test Email";
  //   const data = { name: "John Doe", date: "2022-01-01" };

  //   await expect(sendBookingEmail({ to, subject, data })).rejects.toResolve();
  // });
});
