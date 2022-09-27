export default function Validate(data) {
  let error = {};
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!data.email.match(validRegex)) {
    error.email = "Email invalido!";
  }

  if (data.password.length < 8) {
    error.password = "Senha invalida! Permitido somente acima de 8 caracteres.";
  }

  if (
    data.passwordConfirm !== data.password ||
    data.passwordConfirm.length === 0
  ) {
    error.passwordConfirm =
      "Senhas não coincidem! Inserir a mesma senha que tem no campo acima.";
  }

  return error;
}
