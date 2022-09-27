export default function ValidateLogin(data) {
  let error = {};

  if (data.email === "") {
    error.email = "Este campo é obrigatório!";
  }

  if (data.password === "") {
    error.password = "Este campo é obrigatório!";
  }

  return error;
}
