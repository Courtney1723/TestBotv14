const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setNameLocalizations({
            "es-ES": 'latencia',
            "pt-BR": 'latência',
            ru: 'задержка',
            de: 'latenz',
            pl: 'latência',
            fr: 'latence',
            it: 'latenza',
            "zh-CN": '乒',
            ja: 'レイテンシー',
            ko: '지연',
        })
        .setDescription('Replies with Pong!')
        .setDescriptionLocalizations({
            "es-ES": 'Tiempo de respuesta en milisegundos',
            "pt-BR": 'Tempo de resposta em milissegundos',
            ru: 'Время отклика в миллисекундах',
            de: 'Reaktionszeit in Millisekunden',
            pl: 'Czas odpowiedzi w milisekundach',
            fr: 'Temps de réponse en millisecondes',
            it: 'Tempo di risposta in millisecondi',
            "zh-CN": '以毫秒為單位的響應時間',
            ja: 'ミリ秒単位の応答時間',
            ko: '응답 시간(밀리초)',
        })
        .setDMPermission(true),
    async execute(interaction) {
        await interaction.reply(`Pong! (${client.ws.ping}ms)`);
    },
};