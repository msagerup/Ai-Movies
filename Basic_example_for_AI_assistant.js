// {Name: Basic_example_for_AI_assistant}
// {Description: Learn how to create a dialog script with voice/text commands and text corpus for question answering}

// Use this sample to create your own voice/text commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});

const  genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

 const stringifiedGenres = genres.map(({ name }) => name.toLowerCase()).join("|");

intent(['What does this app do?', 'what is this?', 'help', 'what is this app?'], (p) => {
    p.play(`This is Film-nerd, an app where you can discover movies you love.
           Try saying: 'Go to comedy', 'Suprice me', 'Search for IronMan', 'Make it dark' or 'Log inn'
           `)
})

intent(['Make it dark', 'Dark mode'], (p) => {
       p.play({
        command: 'changeMode',
        mode: 'dark'
    })
    p.play("(Batman likes this, I hope you will as well.|Dark enough for you?|Alright, allergic to bright colors?|Embrace the darkness, for light reveals too much... especially embarrassing typos.|Congratulations, you've just taken a step closer to the void. Now your screen matches your soul.|Dark mode activated. Prepare for a descent into the depths of the interface... and your sanity.|Get ready to unlock the secrets hidden in the shadows. Just don't awaken any ancient curses.|Dark mode enabled. Time to plunge into the depths of the night, where pixels come alive... or do they?|Abandoning the light, are we? Watch out for lurking bugs in the darkness.|You've embraced the dark side of UI. Now prepare for the hauntingly beautiful aesthetics.|Dark mode activated. May your screen illuminate the abyss of your soul... or at least your late-night browsing.|Embracing the darkness like a true champion of code. May your bugs hide in the shadows and your syntax errors vanish into thin air.|Dark mode engaged. The veil of shadows shall now cloak your digital realm, granting you the power of eternal night.)")
})

intent(['Make it light', 'light mode'], (p) => {
       p.play({
        command: 'changeMode',
        mode: 'light'
    })
    p.play("(Light mode activated. Brace yourself for the shocking transition from the comforting embrace of darkness to the blinding embrace of light. Don't forget your sunglasses!|Congratulations, you've escaped the clutches of darkness and ventured into the realm of blinding radiance. Prepare to witness every flaw in your retinas!|Light mode engaged. Get ready for a world that's so bright, it could make you question your life choices... and the color palette of this app.|Get ready to abandon the soothing darkness and embrace the overwhelming brightness. Your eyes may protest, but at least you'll see everything in full clarity!|Light mode activated. Prepare for a sudden switch from the mysterious allure of darkness to the blinding glow of the heavens. It's like stepping into a cosmic disco!|By switching to light mode, you're willingly subjecting yourself to the merciless judgment of every pixel. Brace yourself for the scrutiny of an overzealous fashion critic!|Welcome to the world of light, where every color becomes a merciless spotlight, highlighting even the tiniest flaws in the app's design. Enjoy the revealing journey, my friend!|Light mode enabled. Brace yourself for the wrath of luminosity as every color demands your attention like a relentless interrogator. There's no hiding from this vibrant inquisition!|Prepare to immerse yourself in the unforgiving glow of light mode. Every shade, every detail, will be laid bare for your scrutiny. May your retinas endure the revelations!|Light mode engaged. Get ready to face the blinding brilliance that mocks your attempts at visual harmony. It's like a spotlight on your color choices. Good luck, dear user!)")
})