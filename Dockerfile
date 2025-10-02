# 1. imagem base com node
FROM node:20-alpine

# 2. definir diretório de trabalho dentro do container
WORKDIR /app

# 3. copiar package.json e package-lock.json
COPY package*.json ./

# 4. instalar dependências
RUN npm install

# 5. copiar todo o resto do frontend
COPY . .

# 6. expor a porta do Vite
EXPOSE 5173

# 7. comando pra rodar em dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
