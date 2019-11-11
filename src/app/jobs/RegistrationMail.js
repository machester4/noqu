import Mail from "../lib/Mail";

export default {
  key: "RegistrationMail",
  options: {},
  async handle({ data }) {
    const { user } = data;
    await Mail.sendMail({
      from: "Queue Test",
      to: `${user.name} <${user.email}>`,
      subject: "Mail de prueba",
      html: `Hola, ${user.name}, este es un mail de prueba :D`
    });
  }
};
