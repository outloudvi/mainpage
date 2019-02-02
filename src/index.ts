import './index.scss';

interface musicitem {
    id: number;
    title: string;
    author: string | string[];
    links: object;
    embed: object;
}

const PLAYER = [
    'soundcloud',
    'ncm',
    'youtube'
];

const MUSIC_URL = 'https://cdn.jsdelivr.net/gh/outloudvi/tellurmusic@master/music.json';

export const EMBED = {
    soundcloud: (id) => `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>`,
    ncm: (id) => `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=86 src="https://music.163.com/outchain/player?type=2&id=${id}&auto=1&height=66"></iframe>`,
    youtube: (id) => `<iframe src="https://www.youtube-nocookie.com/embed/${id}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="615" frameborder="0"></iframe>`
};

let MUSIC: musicitem[] = [
    {
        id: 1,
        title: 'Tide (Feat. Ke\'nekt)',
        author: 'Foria',
        links: {
            soundcloud: 'https://soundcloud.com/foria/foria-tide-feat-kenekt',
            ncm: 'https://music.163.com/#/song?id=39443010'
        },
        embed: {
            soundcloud: 237174647,
            ncm: 39443010
        }
    }
];

let playerType = 0;
let currentId = 1;

export function updatePlayer(id: number): void {
    let music = MUSIC[id];
    document.getElementById('np').innerText = `${music.author} - ${music.title}`;
    document.title = `${music.author} - ${music.title} | outv.im`;
    if (PLAYER[playerType] in music.embed === false) {
        let thisPlayerType = Object.keys(MUSIC[id].embed)[0];
        playerType = PLAYER.findIndex(x => x === thisPlayerType);
    }
    document.getElementById('bottomPlayer').innerHTML = EMBED[PLAYER[playerType]](music.embed[PLAYER[playerType]]);
    document.getElementById('btnSwitch').innerText = `Switch source\n(current: ${PLAYER[playerType]})`;
}

export function nextSong(): void {
    if (currentId < MUSIC.length - 1) {
        currentId++;
    } else {
        currentId = 0;
    }
    updatePlayer(currentId);
    checkSourceStatus(currentId);
}

function checkSourceStatus(id: number) {
    let targetNumber: number;
    if (playerType < PLAYER.length - 1) {
        targetNumber = playerType + 1;
    } else {
        targetNumber = 0;
    }
    if (Object.keys(MUSIC[id].embed).length > 1) {
        // Source already deemed at updatePlayer()
        // document.getElementById('btnSwitch').innerText = 'Switch source';
        document.getElementById('btnSwitch').className = 'lItem blueones button button-enabled';
        document.getElementById('btnSwitch').removeAttribute('disabled');
    } else {
        document.getElementById('btnSwitch').innerText = 'No other source available';
        document.getElementById('btnSwitch').className = 'lItem blueones button button-disabled';
        document.getElementById('btnSwitch').setAttribute('disabled', 'disabled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        MUSIC = await fetch(MUSIC_URL).then(async resp => resp.json());
    })().catch(err => { throw err; });
    console.log('Music list updated.');
    nextSong();
});

document.getElementById('btnNextsong').addEventListener('click', () => {
    nextSong();
});

document.getElementById('btnSwitch').addEventListener('click', () => {
    let availableList = Object.keys(MUSIC[currentId].embed);
    let id = availableList.findIndex(x => x === PLAYER[playerType]);
    if (id < availableList.length - 1) {
        id++;
    } else {
        id = 0;
    }
    playerType = PLAYER.findIndex(x => x === availableList[id]);
    updatePlayer(currentId);
});
