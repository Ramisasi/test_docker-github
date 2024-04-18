import nodeoutlook from 'nodejs-nodemailer-outlook'

export function SendEmail(recver, subj, mess) {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.SenderEmail,
            pass: process.env.Senderpass
        },
        from: process.env.SenderEmail,
        to: recver,
        subject: subj,
        html: mess,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }
    );
}