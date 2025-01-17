import { CollectionAfterChangeHook } from 'payload/types'
import { newContactForm } from '../../../email-templates/contactEmail'
const OPERATION = 'create'
const SUBJECT = 'New contact submission'
export const newContactEmail: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  if (operation === OPERATION) {
    req.payload.sendEmail({
      to: doc.email,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: SUBJECT,
      html: newContactForm({
        userName: doc.last_name,
        email: doc.email,
        subject: doc.subject,
        message: doc.query,
      }),
    })
  }
}
