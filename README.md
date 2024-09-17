# GitHub 3D Globe Clone 🌍

Este é um clone do antigo Globo 3D do GitHub, desenvolvido utilizando tecnologias modernas como Next.js, Three.js e Web Workers. O projeto simula a visualização de conexões entre cidades ao redor do mundo em um globo interativo 3D.

## ✨ Funcionalidades

- **Globo 3D interativo**: Visualize um globo com mapas e conexões entre cidades usando arcos.
- **Conexões animadas**: Exibição de arcos representando rotas entre diferentes pontos no globo.
- **Rotação automática**: O globo pode ser configurado para girar automaticamente.
- **Customização de cores e efeitos**: As cores do globo, arcos e atmosfera podem ser customizadas.
- **Atmosfera ao redor do globo**: Uma camada de atmosfera que realça a visualização.
- **Uso de Web Workers**: Processamento assíncrono para manipulação de dados complexos em segundo plano.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/) 14.2.6: Framework React para desenvolvimento de aplicações web modernas.
- [React](https://reactjs.org/) 18: Biblioteca para construção de interfaces de usuário.
- [Three.js](https://threejs.org/) 0.167.1: Biblioteca JavaScript para renderização gráfica 3D.
- [Three-Globe](https://github.com/vasturiano/three-globe) 2.31.1: Extensão do Three.js para visualização de globos 3D.
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber): Renderização declarativa de cenas 3D em React.
- [@react-three/drei](https://github.com/pmndrs/drei): Utilitários e componentes adicionais para Three.js.
- [TypeScript](https://www.typescriptlang.org/) 5: Superset do JavaScript para tipagem estática.
- [Tailwind CSS](https://tailwindcss.com/) 3.4.1: Framework de CSS utilitário para estilização rápida.
- **Web Workers**: Para realizar o processamento de dados pesados, como as rotas e arcos, de forma assíncrona.

### Passos para rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/Gbmesquita-costa/Github-Globe-Clone.git
   cd github3dglobe

   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Execute o projeto no ambiente de desenvolvimento:

   ```bash
   npm run dev

   ```

4. Scripts Disponíveis
   npm run dev: Inicia o servidor de desenvolvimento.
   npm run build: Compila o projeto para produção.
   npm start: Inicia o projeto compilado em modo de produção.
   npm run lint: Verifica o código com as regras do ESLint.

### 🛠 Estrutura do Código

- [components/globe/globe-config.tsx]: Configurações e lógica principal para o globo 3D.
- [data/globe.json]: Dados GeoJSON para renderização dos polígonos do globo.
- [globe-worker.ts]: Arquivo Web Worker para processamento assíncrono das rotas e arcos.
- [public]: Contém arquivos públicos, como imagens e ícones.

### 🙏 Contribuição

Se você encontrar bugs ou tiver sugestões, sinta-se à vontade para abrir uma issue ou enviar um pull request.

### ⭐ Agradecimento

Se este projeto te ajudou ou você achou interessante, considere dar uma ⭐ no GitHub. Sua contribuição é muito apreciada!
