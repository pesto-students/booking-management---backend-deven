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
    const subject = "Booking confirmation email";
    const data = {
      name: "Deven G",
      email: "youremail@g.com",
      dateCheckIn: "2023-12-12",
      dateCheckOut: "2023-12-13",
      adults: 1,
      children: 1,
      room: 1,
      specialRequest: "All is well",
    };

    try {
      const info = await sendBookingEmail({ to, subject, data });
      // console.log("{info}");
      // console.log({ info });
      expect(info.messageId).toBeTruthy();
    } catch (error) {
      // console.log("{Error}", error);
      expect(error).toBeNull();
    }
  });

  // it("should throw an error if email fails to send", async () => {
  //   const to = "invalid-recipient@example.com";
  //   const subject = "Test Email";
  //   const data = { name: "John Doe", date: "2022-01-01" };

  //   await expect(sendBookingEmail({ to, subject, data })).rejects.toResolve();
  // });
});
