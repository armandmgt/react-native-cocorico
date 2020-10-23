const validators = Object.freeze({
  email: '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b', // [something]@[something].[smth]
  password: '',
});

export default validators;
