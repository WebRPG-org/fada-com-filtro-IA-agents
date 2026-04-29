// WorkAdventure script for Pokemon Agent Town

WA.onInit().then(() => {
    console.log('WorkAdventure initialized for Pokemon Agent Town');

    // Add custom logic here if needed
    // For example, to interact with the backend agents

    // Example: when entering the pokedex area, open the website
    WA.room.onEnterLayer('pokedex').subscribe(() => {
        WA.nav.openCoWebSite('../index.html');
    });
});