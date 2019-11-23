// SETTING ALL THE VARIABLES FOR PROGRAM
var cardDeck = ['sa', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 'sj', 'sq', 'sk', 'da', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'dj', 'dq', 'dk', 'ca', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'cj', 'cq', 'ck', 'ha', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'hj', 'hq', 'hk'];
var redCards = ['da', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'dj', 'dq', 'dk', 'ha', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'hj', 'hq', 'hk'];
var blackCards = ['sa', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 'sj', 'sq', 'sk', 'ca', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'cj', 'cq', 'ck'];
var playedCards = [];

var yourChoice = 'BLACK';
var correctAnswer;

var cardIdentifier;
var roundIdentifier;
var switchIdentifier;
var endLoopIdentifier;

var roundRule;
var rule1;
var rule2;
var rule3;
var rule4;

var playerName;

var attemptAmount = 0;
var succeedAmount = 0;

var randomCards = new Array();
var scrollSize;

// THESE ARE THE SOUNDS FOR DEALING AND FLIPPING CARDS
var dealCards = new Audio("assets/sounds/deal_cards.wav");
var flipCard = new Audio("assets/sounds/flip_card.wav");

// CHANGES THE SCROLL DOWN WINDOW WHEN CARD IS CLICKED
if (window.matchMedia('(min-width: 768px)').matches) {
    scrollSize = 100;
} else {
    scrollSize = 0;
}

// EXECUTED WHEN DARK SCHEME IS CHOSEN IN SETTINGS
function changeColorDark() {
    $('.text-color').css('color','#ffffff');
    $('.intro-settings').css('background-color','#000000');
    $('.menu-settings').css('background-color','#000000');
    $('.settings-divider').css('background-color','#fafafa');
};

// EXECUTED WHEN LIGHT SCHEME IS CHOSEN IN SETTINGS
function changeColorLight() {
    $('.text-color').css('color','#000000');
    $('.intro-settings').css('background-color','#fafafa');
    $('.menu-settings').css('background-color','#fafafa');
    $('.settings-divider').css('background-color','#000000');
};

// EXECUTED WHEN GREEN BACKGROUND IS CHOSEN IN SETTINGS
function changeBackgroundGreen() {
    $('.background-styling').css('background','url("assets/images/background_texture_green.jpg") no-repeat center center fixed');
};

// EXECUTED WHEN RED BACKGROUND IS CHOSEN IN SETTINGS
function changeBackgroundRed() {
    $('.background-styling').css('background','url("assets/images/background_texture_red.jpg") no-repeat center center fixed');
};

// CHANGE YOUR PREDICTION BETWEEN RED AND BLACK
function changeColor() {
    if ($('#color_choice').is(':checked')) {
        yourChoice = `RED`;
    } else {
        yourChoice = `BLACK`;
    }
};

// SAVE SETTINGS FUNCTION
function changeSettings() {
    if ($('#player_name_settings').val() == '') {
    } else {
        playerName = $('#player_name_settings').val();
    }
    if ($('#round_one_rule_settings').val() == '') {
    } else {
        rule1 = $('#round_one_rule_settings').val();
    }
    if ($('#round_two_rule_settings').val() == '') {
    } else {
        rule2 = $('#round_two_rule_settings').val();
    }
    if ($('#round_three_rule_settings').val() == '') {
    } else {
        rule3 = $('#round_three_rule_settings').val();
    }
    if ($('#round_four_rule_settings').val() == '') {
    } else {
        rule4 = $('#round_four_rule_settings').val();
    }
    $('#settings_button').css('display','block');
    $('.menu-settings').css('height','100px');
    $('.settings-window').css('display','none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout( function(){
        $('.menu-settings').css('position','fixed');
        $('.menu-settings').css('overflow-y','hidden');
        $('body').css('overflow','auto');
    }  , 1000 );

    if ($('#player_name_settings').val() == '' && $('#round_one_rule_settings').val() == '' && $('#round_two_rule_settings').val() == '' && $('#round_three_rule_settings').val() == '' && $('#round_four_rule_settings').val() == '') {
        $('#warning_textfield').empty('');
        $('#warning_textfield').append('<p class="warning-text-spacing">No changes made.</p>');
    } else {
        $('#warning_textfield').empty('');
        $('#warning_textfield').append('<p class="warning-text-spacing">Changes saved.</p>');
    }
}

// EXECUTED WHEN SETTINGS BUTTON IS PRESSED
$('#settings_button').click(function () {
    $('#settings_button').css('display','none');
    $('.menu-settings').css('height','564px');
    setTimeout( function(){ 
        $('.menu-settings').css('position','absolute');
        $('.settings-window').css('display','block');
        $('.menu-settings').css('overflow-y','auto');
        $('body').css('overflow','hidden');
      }  , 1000 );
});

// WHEN CLOSE BUTTON IS CLICKED IN SETTINGS SCREEN
$('#close_settings').click(function () {
    $('#settings_button').css('display','block');
    $('.menu-settings').css('height','100px');
    $('.settings-window').css('display','none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout( function(){
        $('.menu-settings').css('position','fixed');
        $('.menu-settings').css('overflow-y','hidden');
        $('body').css('overflow','auto');
    }  , 1000 );
});

// WHEN START GAME IS CLICKED ON THE INTRO SCREEN
function startGame() {
    $('.intro-settings').css('overflow','hidden');
    $('.intro-settings').css('height','0px');
    $('#game_info').css('top','0');
    $('body').css('overflow','auto');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    playerName = $('#player_name').val();
    if ($('#round_one_rule').val() == '') {
        rule1 = 'Take one zip';
    } else {
        rule1 = $('#round_one_rule').val();
    }
    if ($('#round_two_rule').val() == '') {
        rule2 = 'Take two zips';
    } else {
        rule2 = $('#round_two_rule').val();
    }
    if ($('#round_three_rule').val() == '') {
        rule3 = 'Take three zips';
    } else {
        rule3 = $('#round_three_rule').val();
    }
    if ($('#round_four_rule').val() == '') {
        rule4 = 'Take one shot';
    } else {
        rule4 = $('#round_four_rule').val();
    }

    dealCards.play();
    $('#warning_textfield').empty();

    // 10 RANDOM CARDS WILL BE PICKED FROM THE CARD DECK
    for (i = randomCards.length; i < 10; i++) {
        randomCards.push(cardDeck.splice(Math.floor(Math.random() * cardDeck.length), 1));
    }

    // BELOW THE CARDS ARE BEING DEALT
    for (i = 0; i < 10; i++) {
        if (i > 3) {
            $('#btn_card' + i).prop('disabled', true);
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default_disabled.png"></img>`);
        } else if (i <= 3) {
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default.png"></img>`);
            $('#btn_card' + i).prop('disabled', false);
        }
    }
    $('#warning_textfield').append(`<p class="warning-text-spacing">Good luck ${playerName}!</p>`);

    console.log(randomCards.toString());
    console.log(`-- Create random Cards --`);
}

// THIS IS EXECUTED WHEN POPUP MESSAGE IS CLOSED
$('#modal_message').on('hidden.bs.modal', function (e) {
    dealCards.play();
    $('#warning_textfield').empty();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // CHECKING FOR A NEW PLAYER NAME
    if ($('#player_name_next').val() == '') {
    } else {
        playerName = $('#player_name_next').val();
        $('#warning_textfield').append(`<p class="warning-text-spacing">Good luck ${playerName}!</p>`);
        $('#player_name_next').removeAttr('value');
    }

    // CLEARS THE FIELD
    for (i = 0; i < 10; i++) {
        $('#card' + i).empty();
    }

    // DEALS NEW CARDS TO THE TABLE
    for (i = 0; i < 10; i++) {
        if (i > 3) {
            $('#btn_card' + i).prop('disabled', true);
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default_disabled.png"></img>`);
        } else if (i <= 3) {
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default.png"></img>`);
            $('#btn_card' + i).prop('disabled', false);
        }
    }
});

// RESETS THE PLAYING FIELD
$('#reset_button').click(function () {
    dealCards.play();
    $('#warning_textfield').empty();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    for (i = 0; i < 10; i++) {
        $('#card' + i).empty();
    }

    for (i = 0; i < 10; i++) {
        if (i > 3) {
            $('#btn_card' + i).prop('disabled', true);
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default_disabled.png"></img>`);
        } else if (i <= 3) {
            $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default.png"></img>`);
            $('#btn_card' + i).prop('disabled', false);
        }
    }
});

// THIS IS THE MOST IMPORTAND PART OF THE PROGRAM AND WILL GO DEEPER INTO IT BELOW - THIS IS EXECUTED WHENEVER A CARD IS CLICKED ON
$('#btn_card0, #btn_card1, #btn_card2, #btn_card3, #btn_card4, #btn_card5, #btn_card6, #btn_card7, #btn_card8, #btn_card9').click(function () {
    flipCard.play();
    $('#warning_textfield').empty();

    // THIS WILL CHECK WHICH CARD IS PRESSED AND GIVES THE IDENTIFIER THE CORRESPONDING NUMBER
    for (i = 0; i < 10; i++) {
        if (i == this.id.substr(this.id.length - 1)) {
            cardIdentifier = i;
        }
    }
    
    // ASSIGNING OTHER SETTINGS TO VARRIABLE DEPENDING ON THE CARD IDENTIFIER ABOVE
    for (i = 0; i < 10; i++) {
        if (cardIdentifier <= 3) {
            roundIdentifier = 0;
            switchIdentifier = 3;
            endLoopIdentifier = 7;
            roundRule = rule1;
        } else if (cardIdentifier <= 6) {
            roundIdentifier = 4;
            switchIdentifier = 6;
            endLoopIdentifier = 9;
            roundRule = rule2;
            window.scrollTo({ top: scrollSize, behavior: 'smooth' });
        } else if (cardIdentifier <= 8) {
            roundIdentifier = 7;
            switchIdentifier = 8;
            endLoopIdentifier = 10;
            roundRule = rule3;
            window.scrollTo({ top: scrollSize * 4, behavior: 'smooth' });
        } else if (cardIdentifier == 9) {
            roundIdentifier = 9;
            switchIdentifier = 9;
            endLoopIdentifier = 10;
            roundRule = rule4;
        }
    }

    // HERE IT CHECKS WHAT COLOR THE CHOSEN CARD IS
    for (i = 0; i < 26; i++) {
        if (randomCards[cardIdentifier].indexOf(redCards[i]) > -1) {
            correctAnswer = `RED`;
        } else if (randomCards[cardIdentifier].indexOf(blackCards[i]) > -1) {
            correctAnswer = `BLACK`;
        }
    }

    // HERE IT CHECKS IF YOUR PREDICTION COLOR IS THE SAME AS THE COLOR OF THE CARD
    if (yourChoice === correctAnswer) {
        for (i = roundIdentifier; i < endLoopIdentifier; i++) {
            $('#card' + i).empty();
            if (i > switchIdentifier) {
                $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default.png"></img>`);
                $('#btn_card' + i).prop('disabled', false);
            } else if (i <= switchIdentifier) {
                $('#btn_card' + i).prop('disabled', true);
                if (i == cardIdentifier) {
                    $('#card' + i).append(`<img class="card_style" src="assets/images/cards/${randomCards[cardIdentifier]}.png"></img>`);
                } else {
                    $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default_disabled.png"></img>`);
                }
            }
        }

        // THIS CHECKS IF THE CHOSEN CARD IS THE ONE IN THE LAST ROUND AND GIVES YOU A WIN MESSAGE IF THAT IS THE CASE
        if (cardIdentifier == 9) {
            succeedAmount = succeedAmount + 1;
            $('#message_header').empty();
            $('#message_body').empty();
            $('#message_header').append(`<h5>Congratulations! You WON and may leave the buss!</h5>`);
            $('#message_body').append(`<p>Who will be next to enter the buss?</p><input id="player_name_next" class="form-control" type="text"
                placeholder="John">`);
            $('#modal_message').modal('show');
        } else {
            $('#warning_textfield').append('<p class="warning-text-spacing">CORRECT! Next card.</p>');
        }

    // THIS IS EXECUTED IF YOUR PREDICTION WAS WRONG
    } else {
        for (i = roundIdentifier; i < 11; i++) {
            $('#card' + i).empty();
            if (i != cardIdentifier) {
                $('#card' + i).append(`<img class="card_style" src="assets/images/card_covers/card_cover_default_disabled.png"></img>`);
            }
            $('#btn_card' + i).prop('disabled', true);
        }
        $('#card' + cardIdentifier).append(`<img class="card_style" src="assets/images/cards/${randomCards[cardIdentifier]}.png"></img>`);
        attemptAmount = attemptAmount + 1;
        $('#message_header').empty();
        $('#message_body').empty();
        $('#message_header').append(`<h5>You lost...</h5>`);
        $('#message_body').append(`<p>You choose <b>${yourChoice}</b>.<br>${roundRule} and try again.</p><img class="card_style" src="assets/images/cards/${randomCards[cardIdentifier]}.png"></img>`);
        $('#modal_message').modal('show');
    }

    $('#show_stats').empty();
    $('#show_stats').append(`<p class="stats-setting">Tries: ${attemptAmount}<br>Wins: ${succeedAmount}</p>`);

    // TAKES CHOSEN CARD OUT AND PUSHES IT INTO A VARIABLE OF PLAYED CARDS
    playedCards.push(randomCards[cardIdentifier]);
    randomCards.splice(cardIdentifier, 1);

    // IF THE CARD DECK IS EMPTY THIS WILL PUSH ALL THE PLAYED CARDS INTO THE CARD DECK
    if (cardDeck.length < 1) {
        for (i = 0; i < playedCards.length; i++) {
            cardDeck.push(playedCards[i].toString());
        }
        playedCards = [];
        $('#warning_textfield').empty();
        $('#warning_textfield').append('<p class="warning-text-spacing">Card deck shuffled.</p>');
    }
    
    // REPLACES THE OLD CARD WITH A NEW ONE
    randomCards.splice(cardIdentifier, 0, cardDeck.splice(Math.floor(Math.random() * cardDeck.length), 1));
    console.log(cardDeck);
    console.log(cardDeck.toString());
    console.log(cardDeck.length);
    console.log(randomCards.toString());
    console.log(`Push in new card`);
    console.log(`-------------------------`);
});