# Marvel Comics E-Commerce

![image](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png)

Nesse desafio, criei uma pequena loja de revistas em quadrinhos que consome a API oficial da Marvel. Explicarei melhor nos tópicos seguintes!

#### Link para acesso: 

# Funcionalidades

### Comics List
A aplicação inicia na lista de revistas em quadrinho, com design baseado em cards, que renderizam título, autor e preço provindoss da API oficial da Marvel. 10% dos cards por página apresentarão uma borda dourada, simbolizando que são raros. Essas revistas serão as únicas a receberem o cupom raro no Cart View. 

### Busca de HQ por nome

No topo da página, há uma barra de pesquisa onde pode ser buscado uma HQ pelo nome, utilizando o parâmetro 'titleStartsWith' da API.

### Comic Detail
No clique em cada card, é renderizado um componente contendo detalhes da HQ, como descrição e data de publicação. Além disso, parte deste componente a comunicação com o carrinho de compras. Há dois botões para decrementar e incrementar a quantidade da HQ a ser destinada ao carrinho, bem como o botão 'Add to cart', que adiciona ao carrinho às revistas.

### Cart View

Após adicionar ao carrinho, a aplicação leva o usuário diretamente para o componente do carrinho, podendo continuar as compras, caso veja necessidade. São renderizados os cards de produto, contendo informações sobre este (título, preço, quantidade). Há no card um select onde o usuário pode alterar a quantidade, de 0 a 10. Caso escolha 0, o produto é retirado do carrinho. No campo de cupom, caso a revista seja comum, poderá ser colocado o código **regularcomic#456** e aplicá-lo. Se for raro, o cupom é **rarecomic#123**. Na parte inferior da página, são mostrados o subtotal do carrinho e o botão de checkout, que finaliza o pedido o encaminha o usuário à lista novamente. 

# Tecnologias utilizadas para o desenvolvimento do projeto

![image](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=Jasmine&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)

Para o gerenciamento de estado do carrinho e lista, utilizei a biblioteca RxJs, principalmente a interface Behavior Subject, que recebe e emite valores aos inscritos, atualizando, assim, em tempo real o estado da aplicação. No carrinho, por exemplo, o utilizei para atualizar a quantidade total, subtotal e os items no carrinho através de um Angular service chamado **Cart Service**. Também utilizei o Behavior Subject no **Comics Service** para armazenar o retorno da API e entregar aos componentes Comic Detail e Comics List.

Realizei testes para esses serviços com a biblioteca padrão do Angular, Jasmine.
