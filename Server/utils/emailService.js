import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendBookingConfirmation = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmation',
    text: `Your booking to ${bookingDetails.destination} is confirmed.\n\nDetails:\nStart Date: ${bookingDetails.startDate}\nEnd Date: ${bookingDetails.endDate}\nAdults: ${bookingDetails.adults}\nChildren: ${bookingDetails.children}\nTotal Price: ₹${bookingDetails.totalPrice}`,
    html: `
      <h2>Booking Confirmation</h2>
      <p>Your booking to <strong>${bookingDetails.destination}</strong> is confirmed.</p>
      <h3>Booking Details</h3>
      <ul>
        <li><strong>Start Date:</strong> ${new Date(bookingDetails.startDate).toLocaleDateString()}</li>
        <li><strong>End Date:</strong> ${new Date(bookingDetails.endDate).toLocaleDateString()}</li>
        <li><strong>Trip Type:</strong> ${bookingDetails.tripType === 'family' ? 'Family' : 'Friends'}</li>
        <li><strong>Adults:</strong> ${bookingDetails.adults}</li>
        <li><strong>Children:</strong> ${bookingDetails.children}</li>
        <li><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</li>
      </ul>
      <p>Thank you for choosing our service. We hope you have a wonderful trip!</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
