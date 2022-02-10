
const playBtn = document.querySelector('.main__button');
const menuAudio = document.querySelectorAll('.menu__button');
const playPause = document.querySelector('.main__button use');
const backgroundImage = document.querySelector('.main__container');
const messageButton = document.querySelector('.main__message-btn');
const messageWindow = document.querySelector('.main__message');
const secretLvl = document.querySelector('.logo');
const adaptMenuBtn = document.querySelector('.menu__button-arrow');
const fonk = document.querySelector('.fonk-container');
const fonkMessage = document.querySelector('.hero');
const honkedImg = document.querySelector('.honked__img');

const imgArr = ['forest', 'drozd', 'honk', 'slavka', 'javoronok', 'solovey', 'zarynka'];

let audioCheck = false;
let windowCheck = true;
let intervalCheck;

const audio = new Audio();

const playAudio = (target) => {
    audio.src = `./assets/audio/${target.dataset.audio}.mp3`
    audio.currentTime = 0;
    audio.play();
    audioCheck = true;
    backgroundImage.style.backgroundImage = `url('./assets/img/${target.dataset.audio}.jpg')`;
};

const btnErrorFunc = () => {
    console.log('close message window');
    document.querySelector('.main__message-btn-svg').style.fill = '#ff0000';
    setTimeout(() => {
        document.querySelector('.main__message-btn-svg').style.fill = '';
    }, 1000);
};

messageButton.addEventListener('click', () => {
    playAudio(messageButton);
    messageWindow.style.display = 'none';
    windowCheck = false;
    playPause.setAttribute("href", "./assets/svg/sprite.svg#pause");
    menuAudio[0].classList.add('menu__button-active');
});

menuAudio.forEach((audioBtn) => {
    audioBtn.addEventListener('click', (e) => {
        const eTarget = e.target.textContent.replace(/\s/g, '')
        if (windowCheck == true) {
            btnErrorFunc();
        } else {
            activeBtnChng(eTarget);
            playAudio(audioBtn);
            playPause.setAttribute("href", "./assets/svg/sprite.svg#pause");
        };
    });
});

const activeBtnChng = (x) => {
    menuAudio.forEach((y) => {
        const btnTxtCntnt = y.textContent.replace(/\s/g, '')
        if (x == btnTxtCntnt) {
            y.classList.add('menu__button-active')
        } else {
            y.classList.remove('menu__button-active')
        }
    })
}

playBtn.addEventListener('click', () => {
    if (audioCheck == true) {
        audio.pause();
        playPause.setAttribute("href", "./assets/svg/sprite.svg#play");
        audioCheck = false;
    } else {
        audio.play();
        playPause.setAttribute("href", "./assets/svg/sprite.svg#pause");
        audioCheck = true;
    };
});

const pageSwitch = () => {
    intervalCheck = null;
    if (windowCheck == true) {
        btnErrorFunc();
    } else {
        playAudio(secretLvl);
        audio.volume = 0.5;
        playBtn.style.display = 'none';
        fonk.style.display = 'block';
        secretLvl.innerHTML = '<img src="https://cdn.betterttv.net/emote/5df7f0fba9b7773bc0e6dbb5/2x" alt="HONKED" class ="honked__img" height="43px"></img>'; 
        document.querySelector('.menu').style.display = 'none';
       
        secretLvl.removeEventListener('click', pageSwitch);
        secretLvl.addEventListener('click', () => {
            document.querySelector('.honked__img').classList.add('honked__img-active');
            setTimeout(() => {
                location.reload();
            }, 2500);
        })
        const intervalFunc = () => {
            setTimeout(() => {
                fonkMessage.innerHTML = '<span>RES3T<br>P4G_E</span>'
                fonkMessage.dataset.text = 'RES3T P4G_E';
            }, 2000);
            setTimeout(() => {
                fonkMessage.innerHTML = '<span>ОБН0ВИТ3<br>С7Р4НИ_У</span>'
                fonkMessage.dataset.text = 'ОБН0ВИТ3 С7Р4НИ_У';
            }, 4000);
        }
        intervalCheck = setInterval(intervalFunc, 4000);
    };
}

secretLvl.addEventListener('click', pageSwitch);

adaptMenuBtn.addEventListener('click', () => {
    if (windowCheck == true) {
        btnErrorFunc();
    } else {
        document.querySelector('.menu__list').classList.toggle('menu__list-active');
        document.querySelector('.menu__arrow-logo').classList.toggle('menu__arrow-logo-active');
    };
});

const preloadImages = (x) => {
    x.forEach((y) => {
        const img = new Image();
        img.src = `./assets/img/${y}.jpg`;
    })
}
document.addEventListener("DOMContentLoaded", () => {
    preloadImages(imgArr);
});