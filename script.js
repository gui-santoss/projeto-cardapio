const allproductsBtn = document.querySelector('.all-products-btn')
const mapBtn = document.querySelector('.map-btn')
const sumBtn = document.querySelector('.sum-btn')
const filterBtn = document.querySelector('.filter-btn')
const productList = document.querySelector('.product-list')
var sum = 0
var atualmenu = []


const cleanproducts = () => {
    while (productList.firstChild){
        productList.removeChild(productList.firstChild)
    }
} //função que limpa os produtos da ul para evitar que se acumulem

function sumTot(menu) {
    const total = menu.reduce((acc, item) => {
        acc += item.price
        return acc
    }, 0)

    sum = total
} //soma o valor dos produtos e coloca na variável global sum

function filterVegan(menu){

    cleanproducts()

    const veganMenu = menu.filter(item => {
        if (item.vegan === true) return true
        else return false
    })

    showProducts(veganMenu)

}//filtra quais produtos são veganos e os adiciona em um array, após isso chama a função para exibir os produtos

function showProducts(menu) {

    cleanproducts()

    menu.forEach(item => {
        var product = document.createElement('li')
        var productImg = document.createElement('img')

        productImg.src = item.src

        var productName = document.createElement('p')
        productName.textContent = item.name
        
        var productValue = document.createElement('p')
        productValue.textContent = `R$ ${item.price}`

        product.appendChild(productImg);
        product.appendChild(productName);
        product.appendChild(productValue);

        productList.appendChild(product);
    });

    sumTot(menu)
    atualmenu = menu
} // mostra os produtos, colocando-os na ul

function showDiscount() {

    const menuWithDiscount = menuOptions.map((item) => {
        return  {
            name: item.name,
            price: item.price * 0.9,
            vegan: item.vegan,
            src: item.src
        };
    });

    showProducts(menuWithDiscount);
}; // cria um novo objeto alterando o valor dos produtos, dando 10% de desconto 

function showSum() {

    cleanproducts()

    var sumResult = document.createElement('li')
    var sumResultText = document.createElement('p')
    sumResultText.textContent = `A soma do valor dos Produtos é igual a R$ ${sum}`

    sumResult.appendChild(sumResultText)
    productList.appendChild(sumResult)
    
} // responsável por mostrar a soma, criando um cartão apenas para isso

allproductsBtn.addEventListener('click', function() {
    showProducts(menuOptions)
})
mapBtn.addEventListener('click', showDiscount)
sumBtn.addEventListener('click', showSum)
filterBtn.addEventListener('click', function() {
    filterVegan(atualmenu)
})