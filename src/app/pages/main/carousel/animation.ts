export function startAnimation() {
  const random_cryptos:  HTMLCollectionOf<Element> = document.getElementsByClassName('hot-crypto-wrap');

  console.log(random_cryptos.length) // 0???

  for (let i = 0; i < random_cryptos.length; i++) {
    console.log(i)
    console.log(random_cryptos.item(i));
  }

}
