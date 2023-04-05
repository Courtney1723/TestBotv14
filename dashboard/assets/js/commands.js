const descriptions = ["Get the latest GTA Online or Red Dead Online bonuses to a server of your choosing", "Get the latest GTA Online bonuses", "View all the Rockstar Weekly bot commands and useful links.", "Change the language for your preferred server", "The bot will reply with \"Pong!\"", "Get the  latest Red Dead Online bonuses."];

$('.categories li').on('click', setCategory);

function setCategory() {
  blank();

  const selected = $(this);
  selected.addClass('active');  

  const categoryCommands = $(`.commands .${selected[0].id}`);
  categoryCommands.show();
  
  updateResultsText(categoryCommands);
}
function blank() {
  $('.categories li').removeClass('active');
  $('.commands li').hide();
}

function updateResultsText(arr) {  
  $('#commandError').text(
    (arr.length <= 0)
    ? 'There is nothing to see here.'
    : '');
}

setCategory.bind($('.categories li')[0])();