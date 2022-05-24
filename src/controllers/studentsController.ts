import { Router } from 'express';

const studentsController = Router();

studentsController.get('/', (req, res) => {
  res.send('Visualizza studenti');
});

studentsController.get('/add', (req, res) => {
  res.send('Aggiungi studente');
});


export default studentsController;