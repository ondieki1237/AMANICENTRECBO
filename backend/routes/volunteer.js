import express from 'express';
import { validateVolunteer } from '../middleware/validate.js';
import { sendEmail, createVolunteerEmail } from '../utils/email.js';

const router = express.Router();

router.post('/volunteer-application', async (req, res, next) => {
  try {
    const validation = validateVolunteer(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const adminMailOptions = createVolunteerEmail(validation.data, true);
    const applicantMailOptions = createVolunteerEmail(validation.data, false);

    await Promise.all([
      sendEmail(adminMailOptions),
      sendEmail(applicantMailOptions),
    ]);

    res.status(200).json({
      success: true,
      message: 'Volunteer application submitted successfully. A confirmation has been sent to your email.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;