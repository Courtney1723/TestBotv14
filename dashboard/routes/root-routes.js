const express = require('express');
const users = require('../../data/users');

const router = express.Router();

const commands = ["AutoPost", "GTA", "Help", "Language", "Ping", "RDO"];

router.get('/', (req, res) => res.render('index'));

router.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'Autopost', icon: 'fas fa-paper-plane' },
    { name: 'GTA', icon: 'fas fa-car-crash' }, 
		{ name: 'Help', icon: 'fas fa-info-circle' },
		{ name: 'Language', icon: 'fas fa-language' },
    { name: 'Ping', icon: 'fas fa-table-tennis' },		
    { name: 'RDO', icon: 'fas fa-hat-cowboy-side' },		
  ],
  commands: Array.from(commands.values()),
  commandsString: JSON.stringify(Array.from(commands.values()))
}));

module.exports = router;
