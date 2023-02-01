////////////////////////////////
// Nullish coalescing operator//
// zero, string vazio, array vazio, false, undefined e null sao valores falsy
///////////////////////////////

const idade = 0;

console.log("Sua idade é " + (idade || "inexistente")); // inexistente
console.log("Sua idade é " + (idade && "inexistente")); // 0
console.log("Sua idade é " + (idade ?? "inexistente")); // 0

const idade2 = null;

console.log("Sua idade é " + (idade2 || "inexistente")); // inexistente
console.log("Sua idade é " + (idade2 && "inexistente")); // null
console.log("Sua idade é " + (idade2 ?? "inexistente")); // inexistente

/////////////////////////////
// Objetos //////////////////
/////////////////////////////

const user = {
  name: "Élio",
  idade: 33,
  adress: { street: "Rua teste", number: 62 },
  nickname: "Vieira",
};

console.log(Object.keys(user)); // name, idade, adress
console.log(Object.values(user)); // Elio, 33, Rua Teste, 62
console.log("name" in user); // true
console.log("nome" in user); // false
//console.log(JSON.stringify(Object.values(user)));
console.log(Object.entries(user)); // 3 arrays ['name','Elio]['idade',33]['adress', street:'Rua teste', number:62]

/////////////////////////////
// DESESTRUTURAÇÃO //////////
/////////////////////////////

// desestrutura e renomeia os valores address e name, e coloca um valor por defeito no campo nickname, caso não exista no objeto
const { adress: endereço, name: nome, nickname = "Prodlem" } = user;

console.log(nome); // Élio
console.log(endereço); // street: "Rua teste", number: 62
console.log(nickname); // vieira (porque existe no objeto, senão seria Prodlem)

function mostraIdade({ idade }) {
  return idade;
}

console.log(mostraIdade(user)); // 33

/////////////////////////////
// REST operator //////////
/////////////////////////////

const { name, ...rest } = user;

console.log(rest); // idade:33, address : {...}, nickname: 'Vieira'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const first = array[0];
const second = array[1];
const [firstElement, secondElement, ...restante] = array;

console.log(firstElement); // 1
console.log(secondElement); // 2
console.log(restante); // 3,4,5,6,7,8,9,10

const [um, , tres, , cinco] = array;
console.log(um); // 1
console.log(tres); // 3
console.log(cinco); // 5

/////////////////////////////
// Short syntax /////////////
////////////////////////////

const altura = 1.78;
const peso = 73;

const jogador = {
  altura,
  peso,
};

console.log(jogador); // altura: 1.78, peso: 73

/////////////////////////////
// Optional Chaining ////////
////////////////////////////

const user3 = {
  name: "Élio",
  idade: 33,
  adress: {
    street: "Rua teste",
    number: 62,
    showFullAddress() {
      return "ok";
    },
  },
  carro: {
    marca: "opel",
    modelo: { nome: "corsa", cor: "branco", ano: 2012 },
  },
};

console.log(user3.adress); // undefined
console.log(user3.adress ? user3.adress : "não existe"); // não existe

// verifica se o objeto user 3 tem o campo carro, depois verifica se tem o campo carro.modelo e a seguir carro.modelo.nome
console.log(user3.carro?.modelo?.nome ?? "não existe"); // corsa

//só vai chamar a funcão caso exista (nomeFunção?.()) assim não provoca erros
console.log(user3.adress?.showFullAddress?.()); //ok

const key = "name";

console.log(user3[key]); //Élio

/////////////////////////////
// Métodos de Array ////////
////////////////////////////
//metodos mais usados (map,filter,every,some,find,findIndex,reduce)

const arr = [1, 2, 3, 4, 5];

for (const item of arr) {
  console.log(item + " (for of)"); // 1 , 2 , 3 ,4 ,5
}

// não consegue fazer return
arr.forEach((item) => {
  console.log(item + " (for each)");
});

// consegue fazer return, retorna sempre um array com o mesmo tamanho do array original
// usa-se o map quando se quer transformar um array em outro array
const novoArray = arr.map((item) => {
  if (item % 2 === 0) {
    return item * 10;
  } else {
    return item;
  }
});

console.log(novoArray); // 1, 20,3,40,5

/////////
// Filter
//////////

const newArr = novoArray.filter((item) => item % 2 === 0);

console.log(newArr); //20,40

const newArr2 = novoArray
  .filter((item) => item % 2 === 0)
  .map((item) => item * 10);

console.log(newArr2); //200,400

/////////
// Every
//////////

//every tem de ter sempre 1 return
// newArr2 = [200,400]
const todosItensSaoNumeros = newArr2.every((item) => {
  return typeof item === "number";
});

console.log(todosItensSaoNumeros); // true

/////////
// Some
//////////

const arr4 = [1, 7, "T", 3, 8];
const peloMenosUmItemNaoENumero = arr4.some((item) => {
  return typeof item !== "number";
});

console.log(peloMenosUmItemNaoENumero); // true

const primeiroValorPar = arr4.find((item) => item % 2 == 0);
console.log(primeiroValorPar); // 8

const indexDoPrimeiroValorPar = arr4.findIndex((item) => item % 2 == 0);
console.log(indexDoPrimeiroValorPar); // 4

/////////
// Reduce
//////////

const arrRed = [2, 3, 4, 1, 3];
const soma = arrRed.reduce((acc, item) => {
  console.log(acc);
  return acc + item;
}, 0);

console.log(soma);

/////////////////////////////
// Template literals ////////
////////////////////////////

const userName = "";
const message = "Bem vindo, " + userName;

const message2 = `Bem vindo, ${userName ? userName : "visitante"}`;

console.log(message); //
console.log(message2); // visitante

/////////////////////////////
// Promises ////////////////
////////////////////////////

//.then/.catch

// const somaDoisNumeros = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b);
//     }, 2000);
//   });
// };

// somaDoisNumeros(1, 3)
//   .then((soma) => {
//     console.log(soma);
//   })
//   .catch((erro) => console.log(erro));

async function getDataFromGithub() {
  try {
    const response = await fetch("https://api.github.com/users/eliovieira");
    const data = await response.json();

    return data.name;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("deu");
  }
}

getDataFromGithub().then((name) => {
  console.log(name);
});

import { sub, sum } from "./lib/math.js";
console.log(sum(2, 8));
console.log(sub(8, 2));
