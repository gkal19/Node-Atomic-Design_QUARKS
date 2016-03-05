# Node-Atomic-Design_QUARKS

Repositório de **TODOS** os quarks a serem utilizados em nossos sistemas.

## O que é?

Um [Quark](https://github.com/Webschool-io/be-mean-instagram/blob/master/Apostila/module-nodejs/pt-br/mongoose-atomic-design.md#Átomo) nada mais é que a menor parte/módulo/função utilizada pelo Átomo.

Nesse caso o Átomo é **um campo** no *Schema* do Mongoose.

```js
const Atom = {
  type: String
, get: require('./../quarks/quark-toUpper')
, set: require('./../quarks/quark-toLower')
, validate: require('./../quarks/quark-validate-string-lengthGTE3')
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
