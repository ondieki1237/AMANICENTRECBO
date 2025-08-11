import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

export const sendEmail = async (mailOptions) => {
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const createContactEmail = (data) => ({
  from: `"Amani Center" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO || process.env.EMAIL_USER,
  subject: data.subject || 'New Contact from Amani Center Website',
  text: `
New Contact Request Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Message: ${data.message}
  `,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2 style="color: #333;">New Contact Request</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `,
});

export const createVolunteerEmail = (data, isAdmin = true) => {
  const opportunitiesText = Array.isArray(data.opportunities) && data.opportunities.length > 0
    ? data.opportunities.join(', ')
    : 'None selected';

  if (isAdmin) {
    return {
      from: `" przeglądarka: Amani Center" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: data.email,
      subject: 'New Volunteer Application from Amani Center Website',
      text: `
New Volunteer Application Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Skills & Experience: ${data.skills || 'Not provided'}
Volunteer Opportunities: ${opportunitiesText}
Additional Information: ${data.message || 'None provided'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Volunteer Application</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Skills & Experience:</strong></p>
            <p style="white-space: pre-wrap;">${data.skills || 'Not provided'}</p>
            <p><strong>Volunteer Opportunities:</strong> ${opportunitiesText}</p>
            <p><strong>Additional Information:</strong></p>
            <p style="white-space: pre-wrap;">${data.message || 'None provided'}</p>
          </div>
          <p style="margin-top: 20px;">
            <a href="mailto:${data.email}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
              Reply to Applicant
            </a>
          </p>
        </div>
      `,
    };
  }

  return {
    from: `"Amani Center" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'Thank You for Your Volunteer Application',
    text: `
Dear ${data.name},

Thank you for applying to volunteer with Amani Center. We have received your application and will review it shortly.

Application Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Skills: ${data.skills || 'Not provided'}
Opportunities: ${opportunitiesText}

You will hear from us within 5-7 business days regarding next steps. If you have any questions, please don't hesitate to reply to this email.

Best regards,
Amani Center Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #333;">Thank You for Applying!</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p>Dear ${data.name},</p>
          <p>Thank you for applying to volunteer with Amani Center. We have received your application and will review it shortly.</p>
          <h3 style="margin-top: 20px;">Your Application Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Skills:</strong> ${data.skills || 'Not provided'}</p>
          <p><strong>Opportunities:</strong> ${opportunitiesText}</p>
          <p style="margin-top: 20px;">You will hear from us within 5-7 business days regarding next steps. If you have any questions, please don't hesitate to reply to this email.</p>
          <p>Best regards,<br/><strong>Amani Center Team</strong></p>
        </div>
      </div>
    `,
  };
};

export const createPartnershipEmail = (data, isAdmin = true) => {
  const partnershipInterestsText = Array.isArray(data.partnershipInterests) && data.partnershipInterests.length > 0
    ? data.partnershipInterests.join(', ')
    : 'None selected';

  if (isAdmin) {
    return {
      from: `"Amani Center" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: data.email,
      subject: 'New Partnership Volunteer Application from Amani Center Website',
      text: `
New Partnership Volunteer Application Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Skills & Experience: ${data.skills || 'Not provided'}
Partnership Interests: ${partnershipInterestsText}
Additional Information: ${data.message || 'None provided'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2 style="color: #333;">New Partnership Volunteer Application</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Skills & Experience:</strong></p>
            <p style="white-space: pre-wrap;">${data.skills || 'Not provided'}</p>
            <p><strong>Partnership Interests:</strong> ${partnershipInterestsText}</p>
            <p><strong>Additional Information:</strong></p>
            <p style="white-space: pre-wrap;">${data.message || 'None provided'}</p>
          </div>
          <p style="margin-top: 20px;">
            <a href="mailto:${data.email}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
              Reply to Applicant
            </a>
          </p>
        </div>
      `,
    };
  }

  return {
    from: `"Amani Center" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: 'Thank You for Your Partnership Volunteer Application',
    text: `
Dear ${data.name},

Thank you for applying to volunteer with Amani Center's partnership initiatives. We have received your application and will review it shortly.

Application Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Skills: ${data.skills || 'Not provided'}
Partnership Interests: ${partnershipInterestsText}

You will hear from us within 5-7 business days regarding next steps. If you have any questions, please don't hesitate to reply to this email.

Best regards,
Amani Center Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2 style="color: #333;">Thank You for Applying!</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p>Dear ${data.name},</p>
          <p>Thank you for applying to volunteer with Amani Center's partnership initiatives. We have received your application and will review it shortly.</p>
          <h3 style="margin-top: 20px;">Your Application Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Skills:</strong> ${data.skills || 'Not provided'}</p>
          <p><strong>Partnership Interests:</strong> ${partnershipInterestsText}</p>
          <p style="margin-top: 20px;">You will hear from us within 5-7 business days regarding next steps. If you have any questions, please don't hesitate to reply to this email.</p>
          <p>Best regards,<br/><strong>Amani Center Team</strong></p>
        </div>
      </div>
    `,
  };
};