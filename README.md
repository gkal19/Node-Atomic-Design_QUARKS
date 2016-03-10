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

Então no caso eu uso o Quark isEmptyString que utiliza os Quarks isEmpty e isString:

```js
// notEmptyString
'use strict';

module.exports = (value) => {
  const isEmpty = require('../isEmpty')(value)
  const isString = require('../../isString/isString')(value)

  if (isEmpty && isString) return true;

  return false;
};
```

Que por sua vez usa 2 outros Quarks:

```js
// isEmpty
'use strict';

module.exports = (value) => {
  const isNull = (value === null);
  const isUndefined = (value === undefined);
  const isEmpty = (value === '');
  if (isNull || isUndefined || isEmpty) return true;
  return false;
}

```

```js
// isOnlyLetters
'use strict';

module.exports = (value) => /[a-zA-Z]+/g.test(value);
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

## TDD

Como devemos testar nossos Quarks?

Para isso vamos utiliar o Chai com `expect` que foi ensinado [na aula 9](https://www.youtube.com/watch?v=OCB7jMZBIas).

Vamos entender como escrever 1 teste com ele:

```js
'use strict';

const expect = require('chai').expect;
const valueTRUE = 'Suissa';
const valueFALSE = 1;

describe('isString', () => {
  describe('é String',  () => {
    it('testando: "'+valueTRUE+'"', () => {
      expect(require('./isString')(valueTRUE)).to.equal(true);
    });
  });
  describe('não é String',  () => {
    it('testando: "'+valueFALSE+'"', () => {
      expect(require('./isString')(valueFALSE)).to.equal(false);
    });
  });
});
```

Então basicamente separamos nossos testes em 2:

- validado: 'é String'
- não validado: 'não é String'

```js
describe('é String',  () => {
  it('testando: '+valueTRUE, () => {
    expect(require('./isString')(valueTRUE)).to.equal(true);
  });
});
describe('não é String',  () => {
  it('testando: '+valueFALSE, () => {
    expect(require('./isString')(valueFALSE)).to.equal(false);
  });
});
```

Para rodar esse teste basta executar:

```
mocha isString/isString.test.js


  isString
    é String
      ✓ testando: Suissa
    não é String
      ✓ testando: 1


  2 passing (28ms)
```

Pronto ele não teve erros pois validamos nossos testes corretamente, porém testamos apenas com 1 valor e isso é ridículo né?

Então vamos agora criar um teste que valide vários valores, para fazer isso iniciamos colocando os valores verdadeiros e falsos em *arrays*:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];
```

Certo? Então definimos em `valuesTRUE` todos os valores possíveis que devem ser aceitos como *String* e em `valuesFALSE` todos os valores que não podem ser *String*.

Agora criamos a estrutura para os 2 testes:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];

describe('isString', () => {
  describe('é String',  () => {
  });
  describe('não é String',  () => {
  });
});
```

Bem simples não? Então basta fazer o que?

Criar uma função que itere sobre os valores do *array* e vá executando o `it` que é a função que irá testar realmente os valores:

```js
it('testando: '+valueTRUE, () => {
  expect(require('./isString')(valueTRUE)).to.equal(true);
});
```

Bom então sabemos que precisamos fazer 1 `it` para cada valor do *array* e obviamente não faremos isso manualmente, correto?

**Então como faremos?**

> forEach

**Mas como?**

Dessa forma:

```js
valuesTRUE.forEach( function(element, index) {
  it('testando: '+element,  () => {
    expect(require('./isString')(element)).to.equal(true);
  });
});
```

Percebeu que ele irá criar 1 `it` dinamicamente para cada item do *array* `valuesTRUE`?

Agora basta juntarmos tudo para ficar assim:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];

describe('isString', () => {
  describe('é String',  () => {
    valuesTRUE.forEach( function(element, index) {
      it('testando: '+element,  () => {
        expect(require('./isString')(element)).to.equal(true);
      });
    });
  });
  describe('não é String',  () => {
    valuesFALSE.forEach( (element, index) => {
      it('testando: '+element,  () => {
        expect(require('./isString')(element)).to.equal(false);
      });
    });
  });
});
```

Executando nosso teste ficará assim:

```
mocha isString/isString.test.js


  isString
    é String
      ✓ testando: Suissa
      ✓ testando: 1
      ✓ testando: 
      ✓ testando:  
    não é String
      ✓ testando: null
      ✓ testando: undefined
      ✓ testando: 1
      ✓ testando: true
      ✓ testando: [object Object]
      ✓ testando: ()=>{}


  10 passing (28ms)
```

Mas é óbvio que ainda podemos melhorar esse código refatorando-o, acompanhe comigo pois iremos separar as funções de teste dos `describe`s:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];

const testTRUE = (values) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(true);
    });
  });
};

const testFALSE = (values) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(false);
    });
  });
};

describe('isString', () => {
  describe('é String',  () => testTRUE(valuesTRUE));
  describe('não é String',  () => testFALSE(valuesFALSE));
});
```

**OK! Mas para que isso?**

> Ahhhhhhhh! Você ainda não notou o padrão?

Perceba essas duas funções: `testTRUE` e `testFALSE`.

Conseguiu ver o padrão agora?

> Ainda não? Então vamos analisar!

```js
const testTRUE = (values) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(true);
    });
  });
};

const testFALSE = (values) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(false);
    });
  });
};
```

Vamos retirar apenas o miolo delas:

```js
values.forEach( (element) => {
  it('testando: '+element,  () => {
    expect(require('./isString')(element)).to.equal(true);
  });
});

values.forEach( (element) => {
  it('testando: '+element,  () => {
    expect(require('./isString')(element)).to.equal(false);
  });
});
```

Agora sim você deve ter percebido que o único valor que mudou nas 2 foi... ???

> O valor que passamos para função `to.equal`!

Pronto! Agora basta mudarmos esse valor para uma variável que as 2 funções ficarão iguais:

```js
values.forEach( (element) => {
  it('testando: '+element,  () => {
    expect(require('./isString')(element)).to.equal(valueToTest);
  });
});

values.forEach( (element) => {
  it('testando: '+element,  () => {
    expect(require('./isString')(element)).to.equal(valueToTest);
  });
});
```

Aí você deve se perguntar: 

> De onde vem o valor de `valueToTest`?

Ótima pergunta! Vem pela função genérica que iremos criar:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];

const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};

describe('isString', () => {
  describe('é String',  () => test(valuesTRUE, true));
  describe('não é String',  () => test(valuesFALSE, false));
});
```

Acho que agora temos um padrão bem simples e claro para utilizar em nossos testes, não?

Bom eu ainda quero refatorar mais um pouco, mas o que podemos fazer então?

Podemos ver que dentro do `describe` *master* `describe('isString'` nós **SEMPRE** teremos apenas 2 `describe`s:

```js
describe('isString', () => {
  describe('é String',  () => test(valuesTRUE, true));
  describe('não é String',  () => test(valuesFALSE, false));
});
```

Agora vamos analisar o padrão deles:

```js
const messageTRUE = 'é String';
const messageFALSE = 'não é String';

describe('isString', () => {
  describe(messageTRUE,  () => test(valuesTRUE, true));
  describe(messageFALSE,  () => test(valuesFALSE, false));
});
```

Sabemos então que o `describe` é formado de:

- mensagem para o teste
- função que executa o teste

O que precisamos fazer é criar um objeto que possa agregar toda essa lógica, por exemplo:

```js
const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];
const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};
const describes = [
  {type: true, message: 'é String', test: test}
, {type: false, message: 'não é String', test: test}
]
```

Então em 1 objeto nós temos:

- type: tipo do teste
- message: mensagem do teste
- test: função de validação

Estamos usando a mesma função genérica `test` criada anteriormente e agora como faço isso funcionar com o `describe`?

Então aqui precisamos entender que não podemos fazer como no `it`, que deixamos bem genérico, em vez disso precisamos **obrigatoriamente** ter 2 `describe`s separados.

Podemos fazer da seguinte forma:

1. itere no *array* `describes`
2. teste o `type` do `describe`
3. crie o `describe` correto a partir do `type`
4. chame a função `test` corretamente

Fazendo isso nosso código ficará assim:

```js
describe('isString', () => {
  describes.forEach( (element, index) => {
    if(element.type) {
      describe(element.message,  () => {
        test(valuesTRUE, element.type);
      });
    }
    else {
      describe(element.message,  () => {
        test(valuesFALSE, element.type);
      });
    }
  });
});
```

Perceba que quando ele entrar em `if(element.type)` só entrará com o objeto com o `type=true`, nesse caso irá criar o `describe` correto para os teste que devem dar `true` e logo após no `else` cria o `describe` para os valores que devem dar `false`.

Juntando tudo isso nosso código ficou assim:

```js
'use strict';

const expect = require('chai').expect;

const valuesTRUE = ['Suissa', '1', '', ' '];
const valuesFALSE = [null, undefined, 1, true, {}, ()=>{}];
const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};
const describes = [
  {type: true, message: 'é String', test: test}
, {type: false, message: 'não é String', test: test}
]

describe('isString', () => {
  describes.forEach( (element, index) => {
    if(element.type) {
      describe(element.message,  () => {
        test(valuesTRUE, element.type);
      });
    }
    else {
      describe(element.message,  () => {
        test(valuesFALSE, element.type);
      });
    }
  });
});
```

Agora execute ele no terminal:

```
mocha isString/isString.test.module.js


  isString
    é String
      ✓ testando: Suissa
      ✓ testando: 1
      ✓ testando: 
      ✓ testando:  
    não é String
      ✓ testando: null
      ✓ testando: undefined
      ✓ testando: 1
      ✓ testando: true
      ✓ testando: [object Object]
      ✓ testando: ()=>{}


  10 passing (16ms)
```

Agora sabe o que seria bom?

> Dar uma refatoradinha marota!

**MAS POR QUE CARAIOOOOO!!!??**

Apenas observe:

```js
'use strict';

const expect = require('chai').expect;

const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};
const describes = [
  { type: true
  , message: 'é String'
  , test: test
  , values: ['Suissa', '1', '', ' ']
  }
, 
  { type: false
  , message: 'não é String'
  , test: test
  , values: [null, undefined, 1, true, {}, ()=>{}]
  }
]

describe('isString', () => {
  describes.forEach( (element, index) => {
    if(element.type) {
      describe(element.message,  () => {
        test(element.values, element.type);
      });
    }
    else {
      describe(element.message,  () => {
        test(element.values, element.type);
      });
    }
  });
});
```

**Ah legal você só mudou os valores para dentro do objeto e aí?**

Tente advinhar o porquê eu fiz isso!

Tá vou te ajudar.

Imagine que você quer transformar agora esse código em um módulo de testes genérico, como você faria? Que possa ser usado dessa forma:

```js
const describes = [
  { type: true
  , message: 'é String'
  , values: ['Suissa', '1', '', ' ']
  }
, 
  { type: false
  , message: 'não é String'
  , values: [null, undefined, 1, true, {}, ()=>{}]
  }
];
require('./index')('isString', describes);
```

Vou lhe falar como eu faria então.

Perceba que não tenho mais a função `test` nesse objeto pois não é da responsabilidade dele conhecer essa função, sua única responsabilidade é ter os dados necessários para testar, nossa função `test` já é genérica para funcionar sem precisar ser definida anteriormente.

Beleza então vamos criar o `testModule/testModule.js`:

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {
}
```

Agora você entenderá o porquê passamos o `testName` também, antes de refatorarmos vamos analisar a função `test`:

```js
const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./isString')(element)).to.equal(valueToTest);
    });
  });
};
```

Percebeu que o únco valor definido diretamente ali é o `'./isString'`?

É exatamente por isso que passamos esse valor para nosso módulo em vez de definir manualmente, para que dessa forma ele possa funcionar com qualquer outro módulo.

Então nossa função refatorada fica assim:

```js
const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./../'+testName+'/'+testName)(element)).to.equal(valueToTest);
    });
  });
};
```

Claro que precisamos definir um padrão de pastas para que funcione sem problemas, mas isso é assunto para outra aula :p

Depois disso basta colocar o `testName` no primeiro `describe` e pronto!

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        expect(require('./../'+testName+'/'+testName)(element)).to.equal(valueToTest);
      });
    });
  };

  describe(testName, () => {
    describes.forEach( (element, index) => {
      if(element.type) {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      else {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
    });
  });
};
```

Agora sim você pode testar qualquer *Quark* nosso facilmente dessa forma:

```js
'use strict';

const describes = [
  { type: true
  , message: 'é String'
  , values: ['Suissa', '1', '', ' ']
  }
, 
  { type: false
  , message: 'não é String'
  , values: [null, undefined, 1, true, {}, ()=>{}]
  }
];
require('./testModule')('isString', describes);
```

**BEM MELHOR AGORA NÃO??!!**

Que bom pois esse é o nosso padrão para testes!

Agora chegamos a um impasse, sabe porquê?

### Testes diferentes

Sim imagine que nossa função a ser testada não receba apenas 1 valor, mas sim 2!

Vou pegar um exemplo nosso, o `isEnum`.

```js
'use strict';

module.exports = (value, list) => {

  const isEnum = require('./createIsEnum')(list)

  const validated = isEnum(value);
  if (validated) return true;

  return false;
};
```

> Por que o isEnum recebe 2 valores e não apenas 1 como os outros?

Bom é bem simples, primeiro você precisa entender o que é o `ENUM`.

Ele é basicamente uma lista de valores onde para um valor ser aceito ele **precisa obrigatoriamente** existir nessa lista.

Ou seja, para testarmos essa funcionalidade precisamos passar o valor a ser testado e a lista de valores aceitáveis, correto?

Vamos ver então como usamos esse módulo:

```js
const assert = require('assert');

const list = ['suissa', 'itacir'];
const valueTRUE = 'suissa';
const valueFALSE = 'pitchulo';

assert.equal(true, require('./isEnum')(valueTRUE, list));
assert.equal(false, require('./isEnum')(valueFALSE, list));
```

Agora levando para o nosso conceito mais genérico precisamos nos ater ao segundo parâmetro `list` e pensar então como podemos passar esses valores na forma que aprendemos.

Podemos fazer o seguinte, adicionar o `list` no nosso *array* `describes`:

```js
'use strict';

const describes = [
  { list: ['suissa', 'itacir'] }
, { type: true
  , message: 'é ENUM'
  , values: ['suissa', 'itacir']
  }
, { type: false
  , message: 'não é ENUM'
  , values: [null, undefined, 1, true, {}, ()=>{}]
  }
];
require('./testModuleCreate')('isEnum', describes);
```

Perceba que estou usando um módulo diferente, o `testModuleCreate`, pois precisaremos modificar o nosso `testModule` e para não dar merda preferi criar um novo.

A primeira coisa que devemos fazer é a lógica do `list`:

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const list = describes.splice(0,1);
};
```

O que fizemos ali em cima foi retirar o primeiro elemento do *array* `describes` que é onde está nosso `list`, porém olhe só o resultado de `describes.splice(0,1)`:

```js
[ { list: [ 'suissa', 'itacir' ] } ]
```

Isso acontece porque o `splice` nos retorna um *array* com os elementos retirados, então vamos ajeitar essa função para pegar apenas:

```js
[ 'suissa', 'itacir' ]
```

Você já deve ter imaginado como né? Isso mesmo assim:

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const list = describes.splice(0,1)[0].list;
};
```

Onde `describes.splice(0,1)[0]` irá pegar o primeiro elemento do *array* retornado e depois acessamos a propriedade `list` com `describes.splice(0,1)[0].list`.

Beleza após isso precisamos modificar apenas o `require` do módulo pois precisamos adicionar o parâmetro `list` dessa forma:

```js
const list = describes.splice(0,1)[0].list;
const test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      expect(require('./../'+testName+'/'+testName)(element, list)).to.equal(valueToTest);
    });
  });
};
```

Ou seja, modificamos apenas essas partes para que o módulo aceite um tipo de teste diferente, ficando assim:

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {

  const list = describes.splice(0,1)[0].list;
  const test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        let validated = require('./../'+testName+'/'+testName)(element, list);
        expect(validated).to.equal(valueToTest);
      });
    });
  };

  describe(testName, () => {
    describes.forEach( (element, index) => {
      if(element.type) {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      else {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      if(element.list) return true;
    });
  });
};

```

Bom você com certeza deve se perguntar:

> Bah teve que criar outro módulo só por causa dessa modificação?

Teve apenas para facilitar nossa visualização do padrão, você já percebeu qual é?

**Simples!**

Em um módulo ele não trabalha com o `list` e no outro trabalha, então precisamos criar uma lógica para que possamos trabalhar com apenas 1 módulo.

**Basta fazer o que?**

Vamos inciar com um simples `if/else`:

```js
let test = () => {};

if(describes[0].list) {
  const list = describes.splice(0,1)[0].list;
  test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        let validated = require('./../'+testName+'/'+testName)(element, list);
        expect(validated).to.equal(valueToTest);
      });
    });
  };
}
else {
  test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        let validated = require('./../'+testName+'/'+testName)(element);
        expect(validated).to.equal(valueToTest);
      });
    });
  };
}
```

Porém não precisamos desse `else`, consegue ver como ficará?

Assim:

```js
let test = (values, valueToTest) => {
  values.forEach( (element) => {
    it('testando: '+element,  () => {
      let validated = require('./../'+testName+'/'+testName)(element);
      expect(validated).to.equal(valueToTest);
    });
  });
};

if(describes[0].list) {
  const list = describes.splice(0,1)[0].list;
  test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        let validated = require('./../'+testName+'/'+testName)(element, list);
        expect(validated).to.equal(valueToTest);
      });
    });
  };
}
```

**Entendeu o porquê retiramos o `else`?**

Porque definimos a função `test` com o seu padrão no início e depois só sobrescrevemos ela caso o `describes` possua `list` no nosso padrão de objeto.

Pronto com isso finalizamos esse módulo genérico de testes para nossos Quarks.

```js
'use strict';

const expect = require('chai').expect;

module.exports = (testName, describes) => {
  let test = (values, valueToTest) => {
    values.forEach( (element) => {
      it('testando: '+element,  () => {
        let validated = require('./../'+testName+'/'+testName)(element);
        expect(validated).to.equal(valueToTest);
      });
    });
  };
  if(describes[0].list) {
    const list = describes.splice(0,1)[0].list;
    test = (values, valueToTest) => {
      values.forEach( (element) => {
        it('testando: '+element,  () => {
          let validated = require('./../'+testName+'/'+testName)(element, list);
          expect(validated).to.equal(valueToTest);
        });
      });
    };
  }

  describe(testName, () => {
    describes.forEach( (element, index) => {
      if(element.type) {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      else {
        describe(element.message,  () => {
          test(element.values, element.type);
        });
      }
      if(element.list) return true;
    });
  });
};

```
