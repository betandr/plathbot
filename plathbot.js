var Botkit = require('botkit')
var fs = require('fs') // NEW: Add this require (for loading from files).
var responses = [
    'Dying is an art, like everything else. I do it exceptionally well. I do it so it feels like hell. I do it so it feels real. I guess you could say I\'ve a call.',
    'I took a deep breath and listened to the old bray of my heart. I am. I am. I am.',
    'If you expect nothing from anybody, you’re never disappointed.',
    'Is there no way out of the mind?',
    'There must be quite a few things that a hot bath won\'t cure, but I don\'t know many of them.',
    'Perhaps when we find ourselves wanting everything, it is because we are dangerously close to wanting nothing.',
    'Kiss me and you will see how important I am.',
    'I shut my eyes and all the world drops dead; I lift my eyes and all is born again.',
    'Every woman adores a Fascist, The boot in the face, the brute Brute heart of a brute like you.',
    'I have the choice of being constantly active and happy or introspectively passive and sad. Or I can go mad by ricocheting in between.',
    'The silence depressed me. It wasn\'t the silence of silence. It was my own silence.',
    'I felt my lungs inflate with the onrush of scenery—air, mountains, trees, people. I thought, "This is what it is to be happy."',
    'Let me live, love, and say it well in good sentences',
    'And when at last you find someone to whom you feel you can pour out your soul, you stop in shock at the words you utter— they are so rusty, so ugly, so meaningless and feeble from being kept in the small cramped dark inside you so long.',
    'Remember, remember, this is now, and now, and now. Live it, feel it, cling to it. I want to become acutely aware of all I’ve taken for granted.',
    'If neurotic is wanting two mutually exclusive things at one and the same time, then I\'m neurotic as hell. I\'ll be flying back and forth between one mutually exclusive thing and another for the rest of my days.',
    'I shut my eyes and all the world drops dead; I lift my eyes and all is born again.',
    'I desire the things that will destroy me in the end.',
    'I like people too much or not at all. I\'ve got to go down deep, to fall into people, to really know them.',
    'If the moon smiled, she would resemble you. You leave the same impression Of something beautiful, but annihilating.',
    'We should meet in another life, we should meet in air, me and you.',
    'The trouble was, I had been inadequate all along, I simply hadn\'t thought about it.',
    'I talk to God but the sky is empty.',
    'There is nothing like puking with somebody to make you into old friends.',
    'How we need another soul to cling to.',
    'I felt very still and empty, the way the eye of a tornado must feel, moving dully along in the middle of the surrounding hullabaloo.',
    'So many people are shut up tight inside themselves like boxes, yet they would open up, unfolding quite wonderfully, if only you were interested in them.',
    'What did my arms do before they held you?',
    'The worst enemy to creativity is self-doubt.',
    'Life has been some combination of fairy-tale coincidence and joie de vivre and shocks of beauty together with some hurtful self-questioning.',
    'I felt wise and cynical as all hell.',
    'I didn’t want any flowers, I only wanted to lie with my hands turned up and be utterly empty. How free it is, you have no idea how free.',
    'I write only because There is a voice within me That will not be still.',
    'Eternity bores me, I never wanted it.',
    'I think I made you up inside my head.',
    'How frail the human heart must be―a mirrored pool of thought.',
    'If they substituted the word \'Lust\' for \'Love\' in the popular songs it would come nearer the truth.',
    'So much working, reading, thinking, living to do! A lifetime is not long enough.',
    'What horrifies me most is the idea of being useless: well-educated, brilliantly promising, and fading out into an indifferent middle age.',
    'I thought the most beautiful thing in the world must be shadow.',
    'Is anyone anywhere happy?',
    'I love my rejection slips. They show me I try.'
];
var controller = Botkit.slackbot({debug: false})

if (!process.env.slack_token_path) {
  console.log('Error: Specify slack_token_path in environment')
  process.exit(1)
}

fs.readFile(process.env.slack_token_path, function (err, data) {
  if (err) {
    console.log('Error: Specify token in slack_token_path file')
    process.exit(1)
  }
  data = String(data)
  data = data.replace(/\s/g, '')
  controller
    .spawn({token: data})
    .startRTM(function (err) {
      if (err) {
        throw new Error(err)
      }
    })
})

controller.hears(
  ['who are you', 'what are you'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    bot.reply(message, " I am, I am, I am...and I was made by @betandr")
  })

controller.hears(
  [''], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) {
    var index = Math.floor(Math.random()*responses.length);
    bot.reply(message, responses[index])
  })
