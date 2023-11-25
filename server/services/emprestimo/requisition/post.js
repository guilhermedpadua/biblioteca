const email = _req.getString('email')

const dbRecipient = _db.queryFirst(`
  SELECT 
      configuration."value" AS "email"
  FROM 
      configuration
  INNER JOIN 
      configuration_parameter ON configuration_parameter.id = configuration.parameter_id
  WHERE 
      configuration_parameter.code = 'contact-notification-recipient'
`);

const contactData = _val.map().set("email", _req.getString("email"));

const smtp = _smtp.init();

smtp.to = dbRecipient.getString("email");
smtp.subject = "Nova requisição de contato para o CRM4IT";
smtp.html = _template.getOutput("email/contact_requisition", contactData);

smtp.attachment(
  "logo.png",
  "image/png",
  _app.file("public/images/logo.png"),
  "logo"
);

smtp.send();

const smtpClient = _smtp.init();

smtpClient.to = email;
smtpClient.subject = 'Obrigado pelo contato';
smtpClient.html = _template.getOutput('email/feedback_requisition', contactData);

smtpClient.attachment(
    "logo.png",
    "image/png",
    _app.file("public/images/logo.png"),
    "logo"
);

smtpClient.send();

_out.json(_val.map().set("result", true));
