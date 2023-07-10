const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) { return };
        if (interaction.customId.startsWith(`start -`)) {
            //console.log(`begin start: '${interaction.customId}'`);		

            let buttonUserID01 = (interaction.customId).split("start - ");
            let buttonUserID = buttonUserID01[1];
            //console.log(`start buttonUserID: ${buttonUserID}`);
            //console.log(`start interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            //console.log(`start interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

            //--BEGIN TRANSLATIONS--//

            var lang = await LANG.LANG(interaction);
            //console.log(`LANG:${await LANG.LANG(interaction)}`);	

            function startTitle() {
                if (lang === "en") {
                    return `Start Auto Posting`;
                }
                if (lang === "es") {
                    return `Iniciar publicación automática`;
                }
                if (lang === "pt") {
                    return `Iniciar publicações automáticas`;
                }
                if (lang === "ru") {
                    return `Начать автоматические публикации`;
                }
                if (lang === "de") {
                    return `Automatische Beiträge starten`;
                }
                else if (lang === "pl") {
                    return `Uruchom automatyczne wiadomości`;
                }
                else if (lang === "fr") {
                    return `Démarrer les messages automatiques`;
                }
                else if (lang === "it") {
                    return `Avvia messaggi automatici`;
                }
                else if (lang === "zh") {
                    return `啟動自動消息`;
                }
                else if (lang === "ja") {
                    return `自動メッセージを開始する`;
                }
                else if (lang === "ko") {
                    return `자동 메시지 시작`;
                }
                else {
                    return `Start Auto Posting`;
                }
            }

            function startDesc() {
                if (lang === "en") {
                    return `Click **\'GTA\'** to set up GTA Online Auto Posts for **every Thursday at 5:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Online Auto Posts for **the first Tuesday of every month at 5:00 PM EST**.`;
                }
                if (lang === "es") {
                    return `Haga clic en **\'GTA\'** para comenzar a publicar publicaciones automáticas en línea de GTA Online para **todos los jueves a las 17:00 hora del este**.

Haga clic en **\'RDO\'** para comenzar a publicar publicaciones automáticas de Red Dead Online para **el primer martes de cada mes a las 17:00 hora del este**.`;
                }
                if (lang === "pt") {
                    return `Clique **\'GTA\'** para iniciar GTA Online auto posts para **todas as quintas-feiras às 17:00 Hora do Leste**.

Clique **\'RDO\'** para iniciar Red Dead Online auto posts para **a primeira terça-feira de cada mês às 17:00 Hora do Leste**.`;
                }
                if (lang === "ru") {
                    return `Щелчок **\'GTA\'** чтобы начать автоматическую публикацию GTA Online Auto Posts для **каждый четверг в 17:00 по восточному времени**.

Щелчок **\'RDO\'** чтобы начать автоматическую публикацию Red Dead Online для **первого вторника каждого месяца в 17:00 по восточному времени**.`;
                }
                if (lang === "de") {
                    return `Klicken Sie auf **\'GTA\'**, GTA Online Auto-Beiträge für jeden Donnerstag um **17:00 Uhr Ostküsten-Standardzeit (Nordamerika)** zu starten.

Klicken Sie auf **\'RDO\'**, Red Dead Online Auto-Beiträge für **den ersten Dienstag um jedes Monats 17:00 Uhr Ostküsten-Standardzeit (Nordamerika)** zu starten.`;
                }
                else if (lang === "pl") {
                    return `Kliknij **GTA**, aby uruchomić automatyczne wiadomości GTA Online w **każdy czwartek o 17:00 czasu wschodniego**.

Kliknij **RDO**, aby uruchomić automatyczne wiadomości Red Dead Online na **pierwszy wtorek każdego miesiąca o 17:00 czasu wschodniego**.`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur **GTA** pour démarrer les messages automatiques de GTA Online pour **tous les jeudis à 17h00, heure de l'Est**.
				
Cliquez sur **RDO** pour démarrer les messages automatiques de Red Dead Online pour **le premier mardi de chaque mois à 17h00, heure de l'Est**.`;
                }
                else if (lang === "it") {
                    return `Fai clic su **GTA** per avviare i messaggi automatici di GTA Online per **ogni giovedì alle 17:00 ora di New York**.
				
Fai clic su **RDO** per avviare i messaggi automatici di Red Dead Online per **il primo martedì di ogni mese alle 17:00 ora di New York**.`;
                }
                else if (lang === "zh") {
                    return `單擊 **GTA** 啟動 GTA 在線模式自動發送消息，時間為 **東部時間每週四 17:00**。
				
單擊 **RDO** 啟動 Red Dead 在線模式在 **每月第一個星期二東部時間 17:00 自動發送消息**。`;
                }
                else if (lang === "ja") {
                    return `**GTA** をクリックすると、**毎週木曜日の東部標準時間の 17:00** に GTA Online の自動メッセージが開始されます。
				
**RDO** をクリックすると、**毎月第 1 火曜日の東部時間 17:00** に Red Dead Online の自動メッセージが開始されます。`;
                }
                else if (lang === "ko") {
                    return `**GTA**을(를) 클릭하면 **매주 목요일 동부 표준시 17:00**에 GTA 온라인 자동 메시지가 시작됩니다.
				
**RDO**을(를) 클릭하면 **매월 첫 번째 화요일 동부 표준시 17:00**에 Red Dead 온라인 자동 메시지가 시작됩니다.`;
                }
                else {
                    return `Click **\'GTA\'** to set up GTA Online Auto Posts for **every Thursday at 5:00 PM EST**.

Click **\'RDO\'** to set up Red Dead Online Auto Posts for **the first Tuesday of every month at 5:00 PM EST**.`;
                }
            }

            function goBack() {
                if (lang === "en") {
                    return `Go Back`;
                }
                else if (lang === "es") {
                    return `Volver`;
                }
                else if (lang === "pt") {
                    return `Voltar`;
                }
                else if (lang === "ru") {
                    return `Вернуться`;
                }
                else if (lang === "de") {
                    return `Zurück`;
                }
                else if (lang === "pl") {
                    return `wróć`;
                }
                else if (lang === "fr") {
                    return `Retournez`;
                }
                else if (lang === "it") {
                    return `Torna all'ultima`;
                }
                else if (lang === "zh") {
                    return `回去`;
                }
                else if (lang === "ja") {
                    return `戻る`;
                }
                else if (lang === "ko") {
                    return `돌아가다`;
                }
                else {
                    return `Go Back`;
                }
            }

            function notYourButtonString() {
                if (lang === "en") {
                    return `These buttons are not for you.`;
                }
                else if (lang === "es") {
                    return `Estos botones no son para ti.`;
                }
                else if (lang === "pt") {
                    return `Esses botões não são para você.`;
                }
                else if (lang === "ru") {
                    return `Эти кнопки не для вас.`;
                }
                else if (lang === "de") {
                    return `Diese Schaltflächen sind nicht für Sie.`;
                }
                else if (lang === "pl") {
                    return `Te przyciski nie są dla ciebie.`;
                }
                else if (lang === "fr") {
                    return `Ces boutons ne sont pas pour vous.`;
                }
                else if (lang === "it") {
                    return `Questi pulsanti non fanno per te.`;
                }
                else if (lang === "zh") {
                    return `這些按鈕不適合您。`;
                }
                else if (lang === "ja") {
                    return `これらのボタンはあなたのためではありません。`;
                }
                else if (lang === "ko") {
                    return `이 버튼은 당신을 위한 것이 아닙니다.`;
                }
                else {
                    return `These buttons are not for you.`;
                }
            }

            function missingPermissions() {
                if (LANG === "en") {
                    return `You do not have the required permissions to do that.`;
                }
                else if (LANG === "es") {
                    return `No tienes permiso para hacer eso.`;
                }
                else if (LANG === "pt") {
                    return `Você não tem permissão para fazer isso.`;
                }
                else if (LANG === "ru") {
                    return `У вас нет разрешения на это.`;
                }
                else if (LANG === "de") {
                    return `Sie haben keine Erlaubnis dazu.`;
                }
                else if (LANG === "pl") {
                    return `Nie masz wymaganych uprawnień.`;
                }
                else if (LANG === "fr") {
                    return `Vous ne disposez pas des autorisations requises.`;
                }
                else if (LANG === "it") {
                    return `Non hai le autorizzazioni necessarie.`;
                }
                else if (LANG === "zh") {
                    return `您沒有所需的權限。`;
                }
                else if (LANG === "ja") {
                    return `必要な権限がありません。`;
                }
                else if (LANG === "ko") {
                    return `필요한 권한이 없습니다.`;
                }
                else {
                    return `You do not have the required permissions to do that.`;
                }
            }

            function errorString() {
                if (lang === "en") {
                    return `There was an error! Please try again.`;
                }
                if (lang === "es") {
                    return `Se ha producido un error. Inténtalo de nuevo.`;
                }
                if (lang === "pt") {
                    return `Ocorreu um erro. Por favor, tente novamente.`;
                }
                if (lang === "ru") {
                    return `Произошла ошибка. Пожалуйста, попробуйте еще раз.`;
                }
                if (lang === "de") {
                    return `Ein Fehler ist aufgetreten. Bitte versuche es erneut.`;
                }
                if (lang === "pl") {
                    return `Wystąpił błąd. Proszę spróbuj ponownie.`;
                }
                if (lang === "fr") {
                    return `Une erreur est survenue. Veuillez réessayer.`;
                }
                if (lang === "it") {
                    return `C'è stato un errore. Per favore riprova.`;
                }
                if (lang === "zh") {
                    return `發生了錯誤。請再試一次。`;
                }
                if (lang === "ja") {
                    return `エラーが発生しました。もう一度やり直してください。`;
                }
                if (lang === "ko") {
                    return `오류가 발생했습니다. 다시 시도해 주세요.`;
                }
                else {
                    return `There was an error! Please try again.`;
                }
            }

            //--END TRANSLATIONS--//

            const startEmbed = new EmbedBuilder()
                .setColor(0x00FF00) //Green 
                .setTitle(`${startTitle()}`)
                .setDescription(`${startDesc()}`)

            const startButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`gtastart - ${interaction.user.id}`)
                        .setLabel('GTA')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`rdostart - ${interaction.user.id}`)
                        .setLabel('RDO')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId(`startback - ${interaction.user.id}`)
                        .setLabel(`${goBack()}`)
                        .setStyle(ButtonStyle.Secondary),
                );

            //begin checking for permissions
            await interaction.deferUpdate();
            if (interaction.user.id !== buttonUserID) {
                await interaction.followUp({ content: `${notYourButtonString()}`, ephemeral: true });
            }
            else if ((interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) && (interaction.user.id === buttonUserID)) {
                await interaction.editReply({ embeds: [startEmbed], components: [startButtons] }).catch(err => console.log(`startEmbed Error: ${err}`));
            }
            else if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                await interaction.followUp({ content: `${missingPermissions()}`, ephemeral: true });
            }
            else {
                await interaction.followUp({ content: `${errorString()}`, ephemeral: true });
            } //end checking for permissions	

            function expiredDesc() {
                if (lang === "en") {
                    return `This interaction expired`;
                }
                if (lang === "es") {
                    return `Esta interacción expiró`;
                }
                if (lang === "pt") {
                    return `Esta interação expirou`;
                }
                if (lang === "ru") {
                    return `Срок действия этого взаимодействия истек`;
                }
                if (lang === "de") {
                    return `Diese Interaktion ist abgelaufen`;
                }
                if (lang === "pl") {
                    return `Ta interakcja wygasła`;
                }
                if (lang === "fr") {
                    return `Cette interaction a expiré`;
                }
                if (lang === "it") {
                    return `Questa interazione è scaduta`;
                }
                if (lang === "zh") {
                    return `此互動已過期`;
                }
                if (lang === "ja") {
                    return `このインタラクションの有効期限が切れました`;
                }
                if (lang === "ko") {
                    return `이 상호 작용이 만료되었습니다`;
                }
                else {
                    return `This interaction expired`;
                }
            }

            const expiredButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`expired`)
                        .setLabel(`${expiredDesc()}`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(':RSWeekly:1025248227248848940')
                        .setDisabled(true),
                );

            setTimeout(() => {
                interaction.editReply({ components: [expiredButton] });
            }, (60000 * 5))

        } //end if start
    },
};