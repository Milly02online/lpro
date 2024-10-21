# BACKEND (EXPRESS API):
- npm install -g express-generator
- express --version
- express --no-view --git backend
- cd backend
- npm install
- SET DEBUG=backend:* & npm start
- Teste no navegador: localhost:3000
- npm install --save bcrypt cors dotenv jsonwebtoken @prisma/client zod
- npm install --save-dev prisma nodemon
- npx prisma init --datasource-provider mysql
- npx prisma db push
- npx prisma generate

# FRONTEND (REACT APP)
- npm create vite@latest frontend -- --template react
- cd frontend
- npm install
- npm run dev
