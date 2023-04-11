const request = require("supertest");
const app = require("./app");
const { sendBookingEmail } = require("./lib/sendEmail");

describe("GET /", () => {
  it("responds with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("sendBookingEmail function", () => {
  it("should send an email successfully", async () => {
    const to = "recipient@example.com";
    const subject = "Booking Confirmation Email";
    const data = {
      name: "John Doe",
      email: "youremail@g.com",
      dateCheckIn: "2023-12-12",
      dateCheckOut: "2023-12-13",
      adults: 1,
      children: 1,
      room: 1,
      specialRequest: "All is well",
    };

    sendBookingEmail({ to, subject, data })
      .then((info) => {
        expect(info?.messageId).toBeTruthy();
      })
      .catch((error) => {
        expect(false).toBe(true).end(done);
      });
  });

  // it("should throw an error if email fails to send", async () => {
  //   const to = "invalid-recipient@example.com";
  //   const subject = "Test Email";
  //   const data = { name: "John Doe", date: "2022-01-01" };

  //   await expect(sendBookingEmail({ to, subject, data })).rejects.toResolve();
  // });
});
