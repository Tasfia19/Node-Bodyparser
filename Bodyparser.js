const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { Validator } = require('validatorjs');

const app = new Koa();
app.use(bodyParser());

const rules = {
  username: 'required|string|min:3|max:30',
  email: 'required|email',
  password: 'required|string|min:3|max:30',
};

app.use(async (ctx) => {
  const { body } = ctx.request;


  const validator = new Validator(body, rules);

  const passes = validator.passes();

  if (!passes) {
    ctx.status = 400;
    ctx.body = { error: validator.errors.first() };
  } else {
    ctx.status = 200;
    ctx.body = { message: 'Request body is valid!' };
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
