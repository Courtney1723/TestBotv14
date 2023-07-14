const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('node:fs'); //https://nodejs.org/docs/v0.3.1/api/fs.html#fs.readFile
const LANG = require('../../events/LANG.js');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, user) {

        if (!interaction.isButton()) { return };
        if ((interaction.customId.startsWith(`rdostartback -`)) || (interaction.customId.startsWith(`gtastartback -`))) {

            let rdo_gta = "";
            if (interaction.customId.startsWith(`rdostartback -`)) {
                rdo_gta += 'rdo';
            } else {
                rdo_gta += 'gta';
            }

            let buttonUserID01 = (interaction.customId).split(`${rdo_gta}startback - `);
            let buttonUserID = buttonUserID01[1];
            //console.log(`startBack buttonUserID: ${buttonUserID}`);
            //console.log(`startBack interaction.user.id === buttonUserID? ${interaction.user.id === buttonUserID}`);
            //console.log(`startBack interaction.user.id: ${interaction.user.id} && buttonUserID: ${buttonUserID}`);

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
                    return `Click **\'GTA\'** to set up GTA Online Auto Posts every week.

Click **\'RDO\'** to set up Red Dead Online Auto Posts every month.`;
                }
                if (lang === "es") {
                    return `Haz clic en **\'GTA\'** para configurar las actualizaciones automáticas de GTA Online todas las semanas.

Haga clic en **\'RDO\'** para configurar las actualizaciones automáticas de Red Dead Online todos los meses.`;
                }
                if (lang === "pt") {
                    return `Clique em **\'GTA\'** para configurar as atualizações automáticas do GTA Online toda semana.

Clique em **\'RDO\'** para configurar as atualizações automáticas do Red Dead Online todos os meses.`;
                }
                if (lang === "ru") {
                    return `Нажмите **\'GTA\'**, чтобы настроить еженедельное автоматическое обновление GTA Online.

Нажмите **\'RDO\'**, чтобы настроить ежемесячное автоматическое обновление Red Dead Online.`;
                }
                if (lang === "de") {
                    return `Klicken Sie auf **\'GTA\'**, um jede Woche automatische Updates für GTA Online einzurichten.

Klicken Sie auf **\'RDO\'**, um jeden Monat automatische Updates für Red Dead Online einzurichten.`;
                }
                else if (lang === "pl") {
                    return `Kliknij **\'GTA\'**, aby skonfigurować automatyczne aktualizacje GTA Online co tydzień.

Kliknij **\'RDO\'**, aby skonfigurować automatyczne aktualizacje Red Dead Online co miesiąc.`;
                }
                else if (lang === "fr") {
                    return `Cliquez sur **\'GTA\'** pour configurer les mises à jour automatiques de GTA Online chaque semaine.
				
Cliquez sur **\'RDO\'** pour configurer les mises à jour automatiques de Red Dead Online tous les mois.`;
                }
                else if (lang === "it") {
                    return `Fai clic su **\'GTA\'** per configurare gli aggiornamenti automatici di GTA Online ogni settimana.
				
Fai clic su **\'RDO\'** per configurare gli aggiornamenti automatici di Red Dead Online ogni mese.`;
                }
                else if (lang === "zh") {
                    return `點擊 **\'GTA\'** 設置 GTA 在線模式每周自動更新。
				
單擊 **\'RDO\'** 設置 Red Dead 在線模式每月自動更新。`;
                }
                else if (lang === "ja") {
                    return `**\'GTA\'** をクリックして、GTA オンラインの毎週の自動アップデートを設定します。
				
**\'RDO\'** をクリックして、レッド・デッド・オンラインの毎月の自動アップデートを設定します。`;
                }
                else if (lang === "ko") {
                    return `매주 GTA 온라인 자동 업데이트를 설정하려면 **\'GTA\'**를 클릭하십시오.
				
매달 Red Dead 온라인 자동 업데이트를 설정하려면 **\'RDO\'**를 클릭하세요.`;
                }
                else {
                    return `Click **\'GTA\'** to set up GTA Online Auto Posts every week.

Click **\'RDO\'** to set up Red Dead Online Auto Posts every month.`;
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
}