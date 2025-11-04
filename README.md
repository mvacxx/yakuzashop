# Yakuzashop Web Storefront

Uma página única para vender SolarBite com visual inspirado em becos neon de Tóquio. O layout traz tipografia marcante, cores crimson e detalhes dourados para transmitir a atmosfera de um clã Yakuza recolhendo tributos.

## Recursos

- **Pacotes dinâmicos**: cards exibidos a partir de dados em JavaScript com descrições temáticas e benefícios.
- **Três rituais de pagamento**: destaque para créditos in-game, PayPal e cripto com instruções que combinam com a narrativa.
- **Formulário de tributo**: coleta codinome, contato e observações, simulando o envio de um pedido para os contadores do clã.
- **Animações suaves**: efeitos de hover, gradientes e scanlines reforçam o clima underground.

## Pré-visualização

Abra `index.html` em qualquer navegador moderno. Não há dependências extras ou servidor obrigatório.

## Hospedagem no Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) e instale o [Vercel CLI](https://vercel.com/cli) se desejar implantar pelo terminal.
2. Faça fork ou envie este repositório para o seu GitHub pessoal.
3. No painel da Vercel, clique em **Add New > Project** e importe o repositório.
4. Quando solicitado, mantenha o framework como **Other** e defina a raiz do projeto como o diretório onde estão `index.html`, `styles.css` e `script.js`.
5. Na seção **Build & Output Settings**, informe:
   - **Build Command**: deixe em branco (site estático puro).
   - **Output Directory**: `.` (ponto) para indicar a raiz do projeto.
6. Clique em **Deploy**. A Vercel fará upload dos arquivos estáticos e disponibilizará uma URL pública.
7. Para atualizações futuras, basta fazer push das alterações na branch conectada; a Vercel criará novas pré-visualizações e implantações automáticas.

> **Dica**: Se preferir usar a linha de comando, execute `vercel deploy --prod` no diretório do projeto após configurar o Vercel CLI.

## Personalização

- Ajuste pacotes, preços e benefícios editando o array `offers` em `script.js`.
- Modifique perguntas frequentes em `faqs` dentro do mesmo arquivo.
- Atualize cores, fontes e efeitos no arquivo `styles.css` para criar novas variações do clã.

## Estrutura do projeto

```
├── index.html      # Estrutura principal da vitrine
├── script.js       # Dados dos pacotes e interações da página
└── styles.css      # Estilo Yakuza neon e animações
```
