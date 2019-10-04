/**
 * @author Matsukii
 * 
 * @description random loading message generator
 */
module.exports = ()  => {
    let loadingMessages = new loadingMessages();

    let resp = {
        allMsgs: loadingMessages.msgs,
        genAll: loadingMessages.newMessageAllTypes(),
        genNorm: genAll.norm,
        genHTML: genAll.html,
    }
    
    return resp;

}

class loadingMessages{

    msgs = [
        'Loading',
        'Opening inventory...',
        'Looking for your history',
        'Link start!',
        'Do you know the way?',
        'loading the loading',
        "Oh snap! i'm in a infinite loop /*/(this may take some time...)",
        'Launching rockets...',
        'Searching for... /*/wait, what i need to load?',
        'Watching the dogs...',
        'How did you get there?',
        'Is this working?',
        'Yes!',
        'No',
        'Looking in your browse history... /*/Hmmm, what is this??',
        'Dont forget to drink water..',
        'Running with scissors',
        "I'm behind you... 👻 Boo!",
        'Definitely not a virus...',
        'Recharging the batteries',
        'Close the tab to load *faster*',
        'This will be loaded before One Piece ends /*/(i guess)',
        'Stay Hydrated',
        'Searching for bugs... /*/found 256...',
        'Checking TODOs...',
        "Please don't beat me if not loads",
        'Humanity can be saved from Thanos snap /*/if /*/Naruto duble the population with clones',
        `Is currently ${(new Date()).getHours()} hours and ${(new Date()).getMinutes()} mins`,
        'Just load',
        '( ͡° ͜ʖ ͡°) loading the things for you',
        'SPAAAAAAAAAAAAAAAAAAAAACE',
        'hehehe',
        'OwO',
        '(ﾉ◕ヮ◕)ﾉ*.✧',
        'Se o Pica-Pau tivesse comunicado a polícia, /*/isto nunca teria acontecido',
        'If Woody had gone right to the police, /*/this would never have happened',
        `ヽヽ｀ヽ｀、ヽヽ｀ヽ｀、ヽヽ｀ヽ ｀ /*/
        、ヽヽ｀ヽ｀、ヽヽ｀ヽ｀、｀、ヽヽ｀ /*/
        ｀ヽ Do you like rainy days? ｀ヽ /*/
        ｀ヽ｀、ヽヽ｀ヽ｀、ヽヽ｀ヽ｀、ヽヽ /*/
        ｀ヽ｀、ヽヽ｀ヽ｀、ヽヽ｀ヽ｀、ヽ   /*/ `,
        "hmm",
        "GOOD NIGHT /*/GOOD LUCK",
        "em caso de incendio, /*/fique embaixo do chuveiro para nao se queimar",
        "In case of fire, stay under shower /*/so that you do not burn yourself",
        "You can't write America without Erica",
        'De-De-Death! Dekomori Desu!',
        'Reality be rent. /*/Synapse break. /*/Banishment, this world!',
        'This will be loaded before Half Life 3 announcement',
        'CREEPER',
        'CREEPER /*/Aww man',
        'When did you notice there is a bunch of references in this messages? /*/(mainly related to weeabo things)',
        'OOF',
        'Pathetic.',
        'UwU',
        'NO U',
        ':)',
        'Did you know this song: /*/Turururu rururu rururu...?',
        'Tutturu o/',
        '(•ᴗ•)',
        'ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA ORA',
        'MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA',
        '◕‿◕ ✿',
        '>‿◕ loading',
        '(◍•ᴗ•◍)',
        '（＾ω＾）',
        '（╹◡╹）',
        '*make loading message later*',
        'Say Aaahhhh',
        'Searching for nemo',
        'DIO /*/JOTARO',
        'ZA WARUDO',
        'UωU',
        '!',
        '?',

    ];

    constructor() {
        this.message = this.newMessage();
        if(this.message == undefined){
            this.message = this.newMessage();
        };
    };

    /**
     * @description generate new message
     */
    newMessage() {
        return this.msgs[this.randomize()];
    }

    /**
     * @returns random msgs index
     */
    randomize(){
        let min = Math.ceil(0);
        let max = Math.floor(this.msgs.length-1);
        return Math.floor(Math.random() * (max-min+1)) + 1;
    }

    /**
     * @returns simple string message
     */
    static newm(){
        // return (new loadingMessages).message;
        let msg = (new loadingMessages).message;
        while(msg.lastIndexOf('/*/') > -1){
            msg = msg.replace('/*/', '');
        }
        // msg = msg.replace('/*/', '');
        return  `${msg}`;
    }
    /**
     * @returns HTML ready message with line break
     */
    static newmHTML(){
        let msg = (new loadingMessages).message
        while(msg.lastIndexOf('/*/') > -1){
            msg = msg.replace('/*/', '<br>');
        }
        return  `${msg}`;
    }

    /**
     * @returns all types of avaliable (plain text, html ready...)
     */
    static newMessageAllTypes(){
        let msg = (new loadingMessages).message;
        let norm = msg;
        let html = msg;
        while(norm.lastIndexOf('/*/') > -1){
            norm = norm.replace('/*/', '');
        }
        while(html.lastIndexOf('/*/') > -1){
            html = html.replace('/*/', '<br>');
        }

        return {plain: norm, html: html}
    }
}