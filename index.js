//*const et fonctions generiques pour le jeu


const clouds = document.querySelectorAll(".hole");
console.log(clouds);
const scoreBoard = document.querySelector(".score");
console.log(scoreBoard)
const heads = document.querySelectorAll('.head');
console.log(heads);


let timeUp = false; //si jeu pas fini sinon true
let score = 0;//score de depart
let lastCloud;


//* on creer les 3 niveaux de difficultes

const speed = 50;

const typeWriter = () => {
    const nov = 'NOVICE';
    let i = 0;
    if (i < nov.length) {
        document.getElementById("demo1").textContent = nov;
        setTimeout(typeWriter, speed);
    }
}

const typeWriter1 = () => {
    const apprenti = "APPRENTI";
    let j = 0;
    if (j < apprenti.length) {
        document.getElementById("demo2").textContent = apprenti;
        setTimeout(typeWriter1, speed);
    }
}

const typeWriter2 = () => {
    const expert = "EXPERT";
    let k = 0;
    if (k < expert.length) {
        document.getElementById("demo3").textContent = expert;
        setTimeout(typeWriter2, speed);
    }
}

//=cache les 3 typeWriter
const myClick = () => {
    for (let i = 1; i <= 3; i++) {
        const levelHide = document.getElementById("demo" + 1);
        levelHide.addEventListener("click", () => {
            document.getElementById("demo1").style.display = "none";
            document.getElementById("demo2").style.display = "none";
            document.getElementById("demo3").style.display = "none";
        })
    }
}

// const myClick = () => {
//     for (let level of levelHide) {
//         const levelHide = document.querySelectorAll(".demo");
//         level.addEventListener("click", () => { levelHide.style.display = "none"; })
//     };
// }

//= funct hidden niveaux
document.getElementById("morty-play").addEventListener("click",
    () => {
        typeWriter();
        typeWriter1();
        typeWriter2();
        myClick();
    });



//=pour retourner une valeur aleatoire dans un intervalle doc MDN
const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);

}

//=pour que ma tete sorte de facon aleatoire d'un cloud
const randomCloud = (clouds) => {
    const indexCloud = Math.floor(Math.random() * clouds.length);
    console.log(indexCloud);
    const cloudSelect = clouds[indexCloud];
    console.log(cloudSelect);

    //->je m'assure que le cloud est different du dernier sinon RECURCIVE si idem je relance la fonction..
    if (cloudSelect === lastCloud) {
        return randomCloud(clouds); //*recursive
    }
    lastCloud = cloudSelect; //->on indique le dern cloud
    return cloudSelect;
}


//=je decide de mes intervalles pour chaque niveau puis je demande un temps et un emplacement (cloud)aleatoire

const showHead = () => {
    const time = randomTime(600, 1000);
    const cloud = randomCloud(clouds);
    cloud.classList.add("up");
    setTimeout(() => {
        if (!timeUp) showHead(); //->recursive tant que le temps n'est pas fini
        cloud.classList.remove("up");
    }, time);

}

const showHeadApprenti = () => {
    const time = randomTime(500, 800);
    const cloud = randomCloud(clouds);
    cloud.classList.add("up");
    setTimeout(() => {
        if (!timeUp) showHeadApprenti();
        cloud.classList.remove("up");
    }, time);

}
const showHeadExpert = () => {
    const time = randomTime(300, 500);
    const cloud = randomCloud(clouds);
    cloud.classList.add("up");
    setTimeout(() => {
        if (!timeUp) showHeadExpert();
        cloud.classList.remove("up");
    }, time);

}


//= demarrage jeux par niveaux

const startGame = () => {
    scoreBoard.textContent = 0; //->on remet tt a zero
    score = 0;
    timeUp = false;
    showHead(); //->on lance le jeu

    setTimeout(() => { //-> on stop le jeu et on ajoute un delais pour voir le score avant le END
        timeUp = true;
        setTimeout(() => { scoreBoard.textContent = "END"; }, 2000);
    }, 10000);
}

const startGameApprenti = () => {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    showHeadApprenti();

    setTimeout(() => {
        timeUp = true;
        setTimeout(() => { scoreBoard.textContent = "END" }, 2000);
    }, 10000);
}

const startGameExpert = () => {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    showHeadExpert();

    setTimeout(() => {
        timeUp = true;
        setTimeout(() => { scoreBoard.textContent = "END" }, 2000);
    }, 10000);
}



//= creation fonction ajout points au score a chaque click sur une tete (avec verif)
const playerScore = (event) => {
    if (!event.isTrusted) return; //-> si pas sur une tete..rien
    score++;
    scoreBoard.textContent = score;
    console.log(event);
}

heads.forEach(head => head.addEventListener("click", playerScore));




