import { setApiKey, send, MailDataRequired } from '@sendgrid/mail';

setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail({
  to,
  html,
  attachmentData,
  attachmentName,
  from = 'mathieuaxel1995@hotmail.fr',
  subject = "Hey i'm done! GedBot.",
}: {
  to: string;
  html: string;
  attachmentData?: string;
  attachmentName?: string;
  from?: string;
  subject?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<any> {
  const msg: MailDataRequired = {
    to,
    from,
    subject,
    html,
  };
  if (attachmentData && attachmentName) {
    msg.attachments = [
      {
        content: attachmentData,
        filename: attachmentName,
      },
    ];
  }
  return send(msg);
}

export function isValidEmail(str: string): boolean {
  const regMatchs = str.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regMatchs && regMatchs.length > 0;
}
