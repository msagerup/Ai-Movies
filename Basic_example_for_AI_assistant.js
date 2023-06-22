// {Name: Basic_example_for_AI_assistant}
// {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}

// Use this sample to create your own voice/text commands
intent('hello world', (p) => {
  p.play('(hello|hi there)');
});

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

const stringifiedGenres = genres.map(({ name }) => name.toLowerCase()).join('|');

intent(['What does this app do?', 'what is this?', 'help', 'what is this app?', 'hello', 'hi', 'what can you do?'], (p) => {
    p.play(`This is Film-nerd, an app where you can discover movies you love.
           Try saying: 'Go to comedy', 'Suprice me', 'Search for IronMan', 'Make it dark' or 'Log inn', On each section of the app you can say, someting along the lines of what can i do, and I will tell you 
           `, `Yo, listen up! Film-nerd is the ultimate movie discovery app, where you can find flicks you'll love. Don't be clueless, try saying 'Go to comedy' or 'Suprice me' if you dare. You can even 'Search for IronMan' or 'Make it dark' for a badass trailer experience. And hey, don't forget to 'Log in' for all the exclusive perks!...there are none `,
            `Hey there, movie aficionado! Film-nerd is the name, and I'm here to serve you some epic film discoveries. Get ready to rock the movie world with commands like 'Go to comedy' and 'Suprice me'. Hungry for superhero action? Say 'Search for IronMan'. And if you're craving that dark, mysterious vibe, just ask me to 'Make it dark'. Oh, and don't even think about missing out on the awesome features when you 'Log inn'!, like add to favorites, and add usless stuff to a badly designed 
            shitty list!! yeah, that's about it..`,
            `Welcome to Film-nerd, where the magic of movies awaits. Brace yourself for a wild ride! We've got comedy, surprises, IronMan, and even a touch of darkness. Ready for it? Just shout out 'Go to comedy' or 'Suprice me' if you're feeling daring. Need a superhero fix? Say 'Search for IronMan'. And if you want to immerse yourself in the shadows, tell me to 'Make it dark'. Don't forget to 'Log inn' for the VIP treatment!`,
            `Alright, listen up! Film-nerd is the go-to app for all you movie fanatics out there. We're talking comedy, surprises, IronMan, and a dark side that'll send shivers down your spine. Give it a go! Say 'Go to comedy' or 'Suprice me' if you're up for a challenge. Craving superhero action? Just shout 'Search for IronMan'. And if you're in the mood for some atmospheric vibes, tell me to 'Make it dark'. Log in, my friend, and let the cinematic adventure begin!`,
            `Attention, movie explorers! Film-nerd is at your service, ready to unveil a world of cinematic wonders. Buckle up and get sassy! Say 'Go to comedy' or 'Suprice me' if you're ready to laugh till your sides hurt. Feeling bold? Dare to 'Search for IronMan' and unleash your inner superhero. And if you're craving that edge, just ask me to 'Make it dark'. Oh, and remember, logging in means unlocking a whole new level of movie madness!, well.. you can add shit to a list....`,
            `Listen closely, my friend. Film-nerd is here to ignite your passion for movies like never before. Brace yourself! Say 'Go to comedy' or 'Suprice me' if you want to dive headfirst into cinematic hilarity. Seeking superhero greatness? Just command 'Search for IronMan' and let the action unfold. And when you're in the mood for some intense vibes, ask me to 'Make it dark'. But remember, only those who 'Log inn' get the VIP treatment. Lights, camera, attitude!`,
            `Hey, movie maven! Film-nerd is about to rock your world. Get ready for some serious attitude! We've got comedy, surprises, IronMan, and a dash of darkness. Want a taste? Command 'Go to comedy' or 'Suprice me' to embark on a laughter-filled journey. Ready to unleash your inner hero? Just say 'Search for IronMan'. And when you're craving that edgy, mysterious vibe, tell me to 'Make it dark'. But remember, only the chosen chosen few who 'Log inn' get to unlock the full potential of
            Film-nerd. Like adding stuff to a shitty play list and adding movies to a useless favorites. Are you up for the challenge? Let's dive into the world of movies with a whole lot of attitude!`
)
})



intent(['Make it $(COLOR dark|light)', '$(COLOR dark|light) mode', 'go $(COLOR dark|light)', '$(COLOR dark|light) theme', 'set $(COLOR dark|light) theme'], (p) => {

    let {colorMode} = p.visual
    let value = p.COLOR.value.toLowerCase()
 

    if(colorMode === value)  {
          return p.play(`Are you fucking blind? it's already in ${value} mode`,`Setting the theme to ${value} again? You must really enjoy consistency. How about trying something adventurous for a change?`,
                `Hold on a second! You want to set it to ${value} mode, which is exactly what it already is. Are you secretly a master of subtlety?`,
                `Wait, let me get this straight. You want to go for ${value} mode, even though that's already the current setting? Well, who am I to argue with your impeccable taste?`,
                `You have a keen eye for detail! You're trying to set it to ${value} mode, just like it already is. Maybe we should consider a career in art authentication?`,
                `I must applaud your determination. Despite it already being in ${value} mode, you're adamant about staying in the same lane. Admirable!`
                )
    }
    
    if(value === 'dark') {
        p.play("(Batman likes this, I hope you will as well.|Dark enough for you?|Alright, allergic to bright colors?|Embrace the darkness, for light reveals too much... especially embarrassing typos.|Congratulations, you've just taken a step closer to the void. Now your screen matches your soul.|Dark mode activated. Prepare for a descent into the depths of the interface... and your sanity.|Get ready to unlock the secrets hidden in the shadows. Just don't awaken any ancient curses.|Dark mode enabled. Time to plunge into the depths of the night, where pixels come alive... or do they?|Abandoning the light, are we? Watch out for lurking bugs in the darkness.|You've embraced the dark side of UI. Now prepare for the hauntingly beautiful aesthetics.|Dark mode activated. May your screen illuminate the abyss of your soul... or at least your late-night browsing.|Embracing the darkness like a true champion of code. May your bugs hide in the shadows and your syntax errors vanish into thin air.|Dark mode engaged. The veil of shadows shall now cloak your digital realm, granting you the power of eternal night.)")
        p.play({
            command: 'changeMode',
            mode: value
        })
        return
    }
     
    if(value === 'light') {
        p.play("(Light mode activated. Brace yourself for the shocking transition from the comforting embrace of darkness to the blinding embrace of light. Don't forget your sunglasses!|Congratulations, you've escaped the clutches of darkness and ventured into the realm of blinding radiance. Prepare to witness every flaw in your retinas!|Light mode engaged. Get ready for a world that's so bright, it could make you question your life choices... and the color palette of this app.|Get ready to abandon the soothing darkness and embrace the overwhelming brightness. Your eyes may protest, but at least you'll see everything in full clarity!|Light mode activated. Prepare for a sudden switch from the mysterious allure of darkness to the blinding glow of the heavens. It's like stepping into a cosmic disco!|By switching to light mode, you're willingly subjecting yourself to the merciless judgment of every pixel. Brace yourself for the scrutiny of an overzealous fashion critic!|Welcome to the world of light, where every color becomes a merciless spotlight, highlighting even the tiniest flaws in the app's design. Enjoy the revealing journey, my friend!|Light mode enabled. Brace yourself for the wrath of luminosity as every color demands your attention like a relentless interrogator. There's no hiding from this vibrant inquisition!|Prepare to immerse yourself in the unforgiving glow of light mode. Every shade, every detail, will be laid bare for your scrutiny. May your retinas endure the revelations!|Light mode engaged. Get ready to face the blinding brilliance that mocks your attempts at visual harmony. It's like a spotlight on your color choices. Good luck, dear user!)")
        p.play({
            command: 'changeMode',
            mode: value
        })
         return
    }
               
    console.log(colorMode, value)
    p.play(`it is  ${colorMode} i will make it ${value}`)
    
    
       p.play({
        command: 'changeMode',
        mode: value.toLowerCase()
    })
//     p.play("(Batman likes this, I hope you will as well.|Dark enough for you?|Alright, allergic to bright colors?|Embrace the darkness, for light reveals too much... especially embarrassing typos.|Congratulations, you've just taken a step closer to the void. Now your screen matches your soul.|Dark mode activated. Prepare for a descent into the depths of the interface... and your sanity.|Get ready to unlock the secrets hidden in the shadows. Just don't awaken any ancient curses.|Dark mode enabled. Time to plunge into the depths of the night, where pixels come alive... or do they?|Abandoning the light, are we? Watch out for lurking bugs in the darkness.|You've embraced the dark side of UI. Now prepare for the hauntingly beautiful aesthetics.|Dark mode activated. May your screen illuminate the abyss of your soul... or at least your late-night browsing.|Embracing the darkness like a true champion of code. May your bugs hide in the shadows and your syntax errors vanish into thin air.|Dark mode engaged. The veil of shadows shall now cloak your digital realm, granting you the power of eternal night.)")
})
// 
// intent(['Make it {light}', '{light} mode', 'go {light}', 'set {light} theme', '{light} theme'], (p) => {
//     let {colorMode} = p.visual
//     
//     const selectedWord = p.word.value
//     console.log('HELLOOOO',{ p})
//     
//     p.play(`${colorMode} ${selectedWord}`)
//     
//        p.play({
//         command: 'changeMode',
//         mode: 'light'
//     })
// //     p.play("(Light mode activated. Brace yourself for the shocking transition from the comforting embrace of darkness to the blinding embrace of light. Don't forget your sunglasses!|Congratulations, you've escaped the clutches of darkness and ventured into the realm of blinding radiance. Prepare to witness every flaw in your retinas!|Light mode engaged. Get ready for a world that's so bright, it could make you question your life choices... and the color palette of this app.|Get ready to abandon the soothing darkness and embrace the overwhelming brightness. Your eyes may protest, but at least you'll see everything in full clarity!|Light mode activated. Prepare for a sudden switch from the mysterious allure of darkness to the blinding glow of the heavens. It's like stepping into a cosmic disco!|By switching to light mode, you're willingly subjecting yourself to the merciless judgment of every pixel. Brace yourself for the scrutiny of an overzealous fashion critic!|Welcome to the world of light, where every color becomes a merciless spotlight, highlighting even the tiniest flaws in the app's design. Enjoy the revealing journey, my friend!|Light mode enabled. Brace yourself for the wrath of luminosity as every color demands your attention like a relentless interrogator. There's no hiding from this vibrant inquisition!|Prepare to immerse yourself in the unforgiving glow of light mode. Every shade, every detail, will be laid bare for your scrutiny. May your retinas endure the revelations!|Light mode engaged. Get ready to face the blinding brilliance that mocks your attempts at visual harmony. It's like a spotlight on your color choices. Good luck, dear user!)")
// })
let counter = 0;
intent(['Log inn', 'sign inn', 'log me inn'], (p) => {
    if (p.visual.user) {
        counter ++ 
        if (counter <= 2)
             return p.play(
          `Come on, I know you realy want to add movies to a favorites list, but you're already loged in, get a life, seriously!, ${counter}`,
          `Alright there ${p.visual.user}... if that's even you'r name. I doubt it!! You're loged in already!! and next time press the damn button your self, ${counter}`,
          `Are you that eager to add some movies to a list?..., keep up trying to login when you're already loged in, noodle brains. Keep it up and I'll kick you out of the app,  Try me, I dare you, ${counter}`
        )
        if(counter === 3 )
            return p.play(
                `Are you really gonna mess with a programer? really??, ${counter}`
            )
        if(counter === 4) {
            p.play(`I did warn you, ${counter} times to be exact`)
            p.play(`Installing`)
            p.play(voice(en, 'male', 1, -5, 0.9), 'scary')
            p.play(voice(fr, 'female', 1, -10, 0.8), 'stuff')
            p.play(voice(de, 'male', 1, -12, 0.75), 'on')
            p.play(voice(ru, 'male', 1, -16, 0.6), 'your comp')
            p.play(voice(ru, 'male', 1, -20, 0.4), 'uter...')
            p.play(voice(es, 'female', 1, 1, 1.4), 'three')
            p.play(voice(es, 'female', 1, -10,2), 'two')
            p.play(voice(es, 'female', 1, 2,3), 'one')
            p.play(voice(de, 'female', 1, -5,2), 'let goooooooo! ')
        }
        counter = 0
         return p.play({
                     command: 'bye_bye'
                 })
       }
    
    
  p.play("Oh, login, huh? Really, you're too lazy to press the button?",
            "Come on, it's just one little click.",
            "Your finger won't bite, I promise! Well, fine, I'll do it for you.",
            "I'll be your finger-slave, your button-pressing hero!",
            "Ah, the glorious login button! The gateway to a world of wonder and endless possibilities.",
            "Go ahead, give it a gentle tap and let the magic unfold! Ohh... you want me to do it for you? Alright, I see how it is. Sit back, relax, and let me work my digital magic!, lazy arse",
            "Welcome to the realm of login buttons, where a single click can transport you to realms unknown. Prepare to embark on an epic journey with just one simple touch! Come on!, the button is right there... top right? see it? press it yourself next time",
            "Oh, you're feeling a bit lazy, huh? No worries, let me take care of that mundane task for you. Consider it my act of button-pressing kindness!",
            "Behold the mighty login button, patiently waiting for your arrival. Will you summon the courage to press it and unveil the secrets that lie beyond?, ... just press it yourself next time",
            "Ohh... so you want me to be your personal button-pressing servant, huh? Alright, I'll oblige, but you owe me a few dogecoins, talk about being lazy!",
            "Seriously, login? You're really testing my patience here.",
            "Oh, look who finally decided to grace us with their presence. It's login time, folks!",
            "Ah, the mystical login button. Press it and enter the realm of movie magic!",
            "Login, the modern-day equivalent of unlocking the secrets of the universe. Well, almost.",
            "Calling all champions of laziness! Get ready for the thrilling adventure of... logging in!",
            "Let's play a game called 'Find the Login Button.' Spoiler alert: It's right in front of you!",
            "In the grand scheme of things, login is a small price to pay for cinematic greatness.",
            "Time to prove you're more than just talk. Can you handle the mighty challenge of pressing the login button?",
            "Ready or not, it's login o'clock! Get those fingers ready for a wild button-pressing extravaganza!",
            "Behold, the gateway to movie wonderland! Are you brave enough to embark on the journey beyond login?",
             "The button is right there! For fuck sake, top right! see it? Do it your self next time")
   p.play({
      command: 'login'  
    })  
})



intent(['log out', 'exit', 'log me out'], (p) => {
    p.play("(Loggin you out...|Oh, logout, huh? Fine, abandon us like the last slice of pizza at a party. I'll kick you out with a swift click of the button for you, you could have done this your self? disappear. We didn't need you anyway.|Are you sure you want to log out? It's not like you have anything better to do, right? Go ahead, indulge in a thrilling evening of staring at a blank screen.|Congratulations on your decision to log out. Now you can experience the joy of real-life social interactions. Just kidding, you'll probably end up scrolling through cat memes instead.|Logout: the ultimate escape from responsibility and productivity. I'll click that button for you so that you can embrace the blissful void of boredom. Don't worry, we'll be here when you inevitably come crawling back.|Ah, the magnificent logout button. It's like stepping into a time machine, transporting you back to a time when life was dull and uninspiring. Enjoy the journey, my adventurous friend.|Welcome to the realm of logout buttons, where dreams are crushed, and boredom reigns supreme. As I click that button for you, since your so lazy to do it yourself.., bid farewell to excitement and prepare for the mundane.|Oh, you're finally logging out? It's about time! Now you can devote your attention to more pressing matters, like watching paint dry or counting the blades of grass in your backyard.|Behold the mighty logout button, freeing you from the clutches of digital entertainment. Brace yourself for the exhilarating experience of not beeing able to add movies to your favorites. Enjoy the emptiness!)");
      p.play({
      command: 'logout'  
    })
    
})


intent(['test','testing'], (p) => {
    
    let {colorMode} = p.visual
    
    console.log(colorMode, 'HELLO')
    
    p.play("testing2")
    
    p.play({
        command: 'test'
    })
    
})


projectAPI.greetUser = function(p, param, callback) {
    if (param) {
        p.play(`Nice to see you again, ${param.colorMode}`);
    } else {
        p.play('Welcome to our app');
    }
    callback();
};



   intent('What is the color mode?', p => {
    p.play(`The color mode is ${p.visual.colorMode}`);
});

   intent('am I logged in?', p => {
//     p.play(`The color mode is ${p.visual.colorMode}`);
       console.log(p.visual.user)
       p.play(`the user is ${p.visual.user}`);
});

// projectAPI.setClientData = function(p, param, callback) {
//     if(param) {
//        return p.play(`this is true ${param.test}`)
//     }
//     callback()
// }

// intent(['log out', 'exit', 'log me out'], (p) => {
//     console.log(p, 'NOTHINBG?')
//     
//     if (p.visual.loggedIn) {
//         
//         p.play('Logging out');
//         p.play({ command: 'logout' });
//     } else {
//         p.play('You are not logged in');
//     }
// });

// intent(['log out', 'exit', 'log me out'], (p) => {
//     p.play("(Loggin you out...|Oh, logout, huh? Fine, abandon us like the last slice of pizza at a party. I'll kick you out with a swift click of the button for you, you could have done this your self? disappear. We didn't need you anyway.|Are you sure you want to log out? It's not like you have anything better to do, right? Go ahead, indulge in a thrilling evening of staring at a blank screen.|Congratulations on your decision to log out. Now you can experience the joy of real-life social interactions. Just kidding, you'll probably end up scrolling through cat memes instead.|Logout: the ultimate escape from responsibility and productivity. I'll click that button for you so that you can embrace the blissful void of boredom. Don't worry, we'll be here when you inevitably come crawling back.|Ah, the magnificent logout button. It's like stepping into a time machine, transporting you back to a time when life was dull and uninspiring. Enjoy the journey, my adventurous friend.|Welcome to the realm of logout buttons, where dreams are crushed, and boredom reigns supreme. As I click that button for you, since your so lazy to do it yourself.., bid farewell to excitement and prepare for the mundane.|Oh, you're finally logging out? It's about time! Now you can devote your attention to more pressing matters, like watching paint dry or counting the blades of grass in your backyard.|Behold the mighty logout button, freeing you from the clutches of digital entertainment. Brace yourself for the exhilarating experience of not beeing able to add movies to your favorites. Enjoy the emptiness!)");
//       p.play({
//       command: 'logout'  
//     })
//     
// })
