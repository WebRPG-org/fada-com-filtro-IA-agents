# 🤖 IA Agents - Bot de Coleta de Escolas

## 📋 Sobre

Bot em TypeScript que automatiza a coleta de dados de escolas infantis no Google Maps e envia os dados para um webhook do Make.com.

## ✨ Funcionalidades

- ✅ Busca por "escola infantil" em qualquer localidade
- ✅ Coleta de dados completos (nome, endereço, telefone, Instagram)
- ✅ Integração com webhook do Make.com
- ✅ Scroll automático para carregar mais resultados
- ✅ Tratamento robusto de erros

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com seu webhook do Make
```

## 📝 Configuração

1. **Adicionar webhook do Make.com**

   Edite o arquivo `.env` e adicione seu webhook do Make.com:

   ```
   WEBHOOK_URL=https://hook.make.com/seuwebhook
   ```

## 🎯 Como Usar

### Bot de Coleta de Escolas

```bash
npm run bot
```

O bot irá:
1. Abrir Google Maps
2. Buscar por escolas infantis em Cabo Frio
3. Coletar dados de até 10 escolas
4. Enviar cada resultado para seu webhook do Make
5. Mostrar um resumo final

### Scraper Simples

```bash
npm run scraper
```

Versão mais simples que apenas coleta dados do Google Maps sem enviar para webhook.

## 📤 Dados Enviados ao Webhook

```json
{
  "nome": "Nome da Escola",
  "endereco": "Rua X, Número Y, Cabo Frio",
  "telefone": "(24) 1234-5678",
  "instagram": "https://instagram.com/escola"
}
```

## 🛠️ Tecnologias

- **TypeScript** - Linguagem tipada
- **Playwright** - Automação de navegador
- **Axios** - Cliente HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Make.com** - Automação de fluxos

## ⚙️ Scripts Disponíveis

```bash
npm run bot      # Rodar bot de coleta
npm run scraper  # Rodar scraper simples
npm run build    # Compilar TypeScript para JavaScript
npm test         # Rodar testes Playwright
```

## ⚠️ Notas Importantes

- O navegador abre em modo visual (não headless) para você acompanhar
- Seladores do Google Maps podem mudar, então o bot tenta múltiplas estratégias
- Respeite os termos de serviço do Google Maps
- Configure rate limits em seu webhook se necessário

## 📚 Estrutura

```
├── bot.ts            # 🤖 Bot principal com integração Make
├── scraper.ts       # 🔎 Scraper simples
├── package.json     # Dependências e scripts
├── tsconfig.json    # Configuração TypeScript
├── .env             # Variáveis de ambiente (não commitado)
├── .env.example     # Exemplo de arquivo .env
└── .gitignore       # Arquivos ignorados pelo git
```

## 🤝 Contribuições

Sinta-se livre para fazer fork e abrir PRs!

---

**Desenvolvido com ❤️ usando TypeScript e Playwright**
