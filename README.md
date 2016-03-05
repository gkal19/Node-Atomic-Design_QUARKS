# Node-Atomic-Design_QUARKS

Repositório de **TODOS** os quarks a serem utilizados em nossos sistemas.

## O que é?

Um [Quark](https://github.com/Webschool-io/be-mean-instagram/blob/master/Apostila/module-nodejs/pt-br/mongoose-atomic-design.md#Átomo) nada mais é que a menor parte/módulo/função utilizada pelo Átomo.

Nesse caso o Átomo é **um campo** no *Schema* do Mongoose.

```js
const Atom = {
  type: String
, get: require('./../quarks/toUpper')
, set: require('./../quarks/toLower')
, validate: require('./../quarks/notEmptyStringValidate')
, required: true
, index: true
}

module.exports = Atom;
```

E esse campo possui alguns atributos, sendo esses os Quarks:

- type
- get
- set
- validate
- required
- index

Porém iremos nos focar inicialmente apenas nos Quarks de `validate`.

Então vamos ver como é o Quark `notEmptyStringValidate`:

```js
// notEmptyStringValidate
'use strict';

const notEmpty = require('./notEmptyString');

module.exports = {
  validator: (value) => {
    return notEmpty.validate(value);
  }
, message: 'O valor {VALUE} para o campo nome não pode ser vazio!'
};

```

Para facilitar o reuso eu separei os Quarks puros dos especificos para o Mongoose, pois o Quark do Mongose tem uma estrutura diferente do Quarks básico, os nossos Quarks não possuem o campo de mensagem, por exemplo.

Então no caso eu uso o Quark `notEmptyStringValidate` que utiliza o Quark `notEmptyString`:

```js
// notEmptyString
'use strict';

module.exports = {
  validate: (value) => {
    const validated = require('./notEmpty')(value)
    if (!validated) return false;

    const isOnlyLetters = require('./isOnlyLetters')(value);
    if (!isOnlyLetters) return false;

    return true;
  }
};
```

Que por sua vez usa 2 outros Quarks:

```js
// notEmpty
'use strict';

module.exports = (value) => {
  if (value === null || value === undefined) return false;
  return true;
}
```

```js
// isOnlyLetters
'use strict';

module.exports = (value) => { return value.match(/[a-zA-Z]+/g) };
```

Dessa forma podemos criar Quarks mais complexos apenas agregando Quarks menores.

## Padrão

Basicamente separamos os Quarks em 2 tipos:

- Modificadores: to{Name}
- Respondedores: is{Name}

Porém ainda temos mais 1 tipo especial que é para validação do Mongoose.


### to{Name}

Esse tipo de Quark é aquele que recebe 1 valor como entrada e retorna outro valor modificado.

Por exemplo o `toUpperCase`:

```js
module.exports = (value) => value.toUpperCase();
```


### is{Name}

Um Quark básico para validação deverá retornar **APENAS** 1 valor booleano (ou `true` ou `false`) e deverá receber **APENAS** 1 valor como parâmetro da sua função.

Devemos começar com os Quarks que devem responder alguma pergunta simples, por exemplo:

- isEmpty
- isOnlyLetters
- isOnlyNumbers
- etc

Nesse caso o padrão de módulo para esse tipo de Quark é:

```js
'use strict';

module.exports = (value) => {
  if (validação) return true;
  return false;
}
```

Como esses Quarks serão usados como validação sempre iniciaremos retornando `false`, pois caso passe por todos os testes que o validem como verdadeiro a função acabará chegando ao seu final para retornar `false`, com isso **invalidando** o valor passado.

Vamos pegar o exemplo do `isEmpty`:

```js
'use strict';

module.exports = (value) => {
  if (value === null || value === undefined) return true;
  return false;
}
```

Agora podemos criar Quarks mais *complexos* reusando esse Quark toda vez que precisemos garantir que um valor não seja nem `null` nem `undefined`, ou seja, praticamente em todos os Átomos que definam `required: true`.

Vamos criar, como exemplo, o Quark `isNotEmptyMoney` que além de testar se não é vazio também deve verificar se o valor é maior que `0`, pois se for `0` será nossa definição de `dinheiro vazio`:

```js
'use strict';

module.exports = (value) => {
  // validação base
  const validated = require('./isEmpty')(value)
  if (validated) return true;
  // validação se é Number
  // validação se maior que 0
  return false;
};
```

Você deve se perguntar: por que 2 validações ali sendo que poderia ser 1 só?

Tudo bem agora eu lhe respondo com outra pergunta:

> Quando vc vai validar o valor de qualquer campo numérico, o que você **SEMPRE** terá que fazer?
> - Validar se é numérico

Pronto ta aí sua resposta. :p

Então sabemos que para adicionar outra validação basta fazer a mesma coisa da validação `isEmpty`:

```js
'use strict';

module.exports = (value) => {
  // validação base
  let validated = require('./isEmpty')(value)
  if (validated) return true;
  // validação se é Number
  // validação se maior que 0
  validated = require('./isNumber')(value)
  if(validated) {
     if(value > 0) return true;
  }
  return false;
};
```

Coloquei um `if` dentro do outro para exemplificar melhor, agora adicionamos o Quark novo `isNumber` que ainda não existe, então vamos criá-lo:

```js
'use strict';

module.exports = (value) => {
  if(!isNaN(parseFloat(value)) && isFinite(value) && value > 0) return true;
  return false;
};
```

Pronto agora temos o Quark `isNotEmptyMoney` que iremos utilizar no Quark especifico de validação do Mongoose, `isNotEmptyMoneyValidate`:

```js
'use strict';

module.exports = {
  validator: (value) => {
    return require('./isNotEmptyMoney')(value);
  }
, message: 'O valor {VALUE} não pode ser vazio e precisa ser maior que 0!'
};
```

Dessa forma separamos todas as funções reusáveis do nosso sistema, pois uma vez criada **qualquer função** ela deverá ser apenas usada.


### {Name}Validate

Como já visto anteriormente o padrão para o Quark de validação do Mongoose é:

```js
'use strict';

module.exports = {
  validator: (value) => {}
, message: 'O valor {VALUE} para o campo ...'
};
```

Ou seja, é apenas um objeto com 2 atributos:

- validator: função validadora
- message: mensagem de erro

Logo não precisamos criar 1 Quark com toda sua lógica dentro de `validator`, precisamos apenas chamar o Quark dessa função:

```js
'use strict';

module.exports = {
  validator: (value) => {
    return require('./isNotEmptyMoney')(value);
  }
, message: 'O valor {VALUE} não pode ser vazio e precisa ser maior que 0!'
};
```

Não se preocupe que logo mais as mensagens também virarão Quarks. ;)


## Quarks base

Depois de entender como funcionam os Quarks podemos listar alguns que sempre usaremos e que não dependem de outros, como:

- isEmpty
- isNumber
- isString
- isBoolean
- isDate

Depois deles podemos listar alguns Quarks específicos para campos:

- isUserID
- isName
- isEmail
- isDateOfBirth
- isPhone
  + isPhoneDDD
  + isPhoneNumber
- isCPF
- isCPNJ
- isAddress
  + isAddressType //logradouro
  + isAddressName
  + isAddressNumber
  + isAddressCEP
  + isAddressCity
  + isAddressState
  + isAddressCountry

Todos eles usarão os Quarks base internamente.
