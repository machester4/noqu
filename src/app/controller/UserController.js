import Queue from "../lib/Queue";

/**
 * This example send mail to all user in req body
 */
export default (req, res) => {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
      password
    };

    // Agregar job RegistrationMail en la cola
    await Queue.add("RegistrationMail", { user });

    return res.json(user);
};
