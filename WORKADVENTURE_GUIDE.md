# Guia: Configurando Agentes Pokémon no WorkAdventure

## 📋 Pré-requisitos
- Backend exposto via ngrok: https://mating-avalanche-canyon.ngrok-free.dev
- Frontend pronto para hospedagem

## 🚀 Passo a Passo

### 1. Hospede o Frontend
Para que o WorkAdventure possa acessar, hospede o frontend online:

**Opção A: GitHub Pages (Recomendado)**
```bash
# Criar repositório no GitHub
# Fazer upload dos arquivos da pasta frontend/
# Ativar GitHub Pages no repositório
# URL será: https://seu-usuario.github.io/nome-repo/
```

**Opção B: Arquivo HTML Standalone (Mais Fácil)**
- Use o arquivo `index-standalone.html` criado
- Faça upload para qualquer host gratuito (pastebin, GitHub Gist, etc.)
- Ou abra em https://htmlpreview.github.io/ colando o código

### 2. Acesse o Map Builder do WorkAdventure
- Vá para: https://workadventu.re/map-builder/
- Faça login ou crie uma conta gratuita

### 3. Crie um Novo Mapa
- Clique em "Create a new map"
- Escolha template "Empty room"
- Nomeie como "Pokemon Agent Town"

### 4. Configure a Área Interativa
- Use a ferramenta Rectangle para criar uma área
- Nas propriedades da área, adicione:
  ```
  Name: pokedex-area
  openWebsite: [URL_DO_SEU_HTML_HOSPEDADO]
  ```

### 5. Adicione Elementos Visuais (Opcional)
- Adicione sprites de Pokémon usando o asset library
- Configure áreas para diferentes agentes

### 6. Publique e Teste
- Clique em "Publish"
- Use a URL gerada para acessar o mapa
- Clique na área para abrir a interface dos agentes

## 🔧 URLs Atuais
- **Backend API**: https://mating-avalanche-canyon.ngrok-free.dev
- **Frontend Local**: http://127.0.0.1:8081
- **HTML Standalone**: `index-standalone.html` (pronto para hospedar)

## ⚠️ Notas Importantes
- O ngrok free expira após algumas horas - renove quando necessário
- Para produção, use um servidor dedicado
- O HTML standalone é uma versão simplificada da interface completa