import express from 'express';
import { validatePartnership } from '../middleware/validate.js';
import { sendEmail, createPartnershipEmail } from '../utils/email.js';

const router = express.Router();

router.post('/partnership-volunteer', async (req, res, next) => {
  try {
    const validation = validatePartnership(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }

    const adminMailOptions = createPartnershipEmail(validation.data, true);
    const applicantMailOptions = createPartnershipEmail(validation.data, false);

    await Promise.all([
      sendEmail(adminMailOptions),
      sendEmail(applicantMailOptions),
    ]);

    res.status(200).json({
      success: true,
      message: 'Partnership volunteer application submitted successfully. A confirmation has been sent to your email.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;