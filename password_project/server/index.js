import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'password_app'
};

app.post('/api/save-password', async (req, res) => {
    const { password } = req.body;
  
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ error: 'Password non valida' });
    }
  
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(
        'INSERT INTO password_logs (password) VALUES (?)',
        [password]
      );
      await connection.end();
      res.status(200).json({ message: 'Password salvata con successo' });
    } catch (error) {
      console.error('Errore salvataggio password:', error);
      res.status(500).json({ error: 'Errore server' });
    }
  });
  

  app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
  });