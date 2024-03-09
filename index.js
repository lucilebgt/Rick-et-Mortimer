const clouds = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const heads = document.querySelectorAll('.head');
let lastCloud;

let timeUp = false; //si jeu pas fini sinon true
let score = 0;//score de depart

//=pour retourner une valeur aleatoire dans un intervalle doc MDN
const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

//=pour que ma tete sorte de facon aleatoire d'un cloud
const randomCloud = (clouds) => {

    const indexCloud = Math.floor(Math.random() * clouds.length);
    const cloudSelect = clouds[indexCloud];

    //->je m'assure que le cloud est different du dernier sinon RECURCIVE si idem je relance la fonction..
    if (cloudSelect === lastCloud) {
        return randomCloud(clouds); //*recursive
    }
    lastCloud = cloudSelect; //->on indique le dern cloud
    return cloudSelect;
}

//=je decide de mes intervalles puis je demande un temps et un emplacement (cloud)aleatoire
const showHead = () => {
    const time = randomTime(600, 1000);
    const cloud = randomCloud(clouds);
    cloud.classList.add(".up");
    setTimeout(() => {
        if (!timeUp) showHead();
        cloud.classList.remove(".up");
    }, time);

}

//= creation fonction ajout points au score a chaque click sur une tete (avec verif)
const playerScore = (event) => {
    if (!event.isTrusted) return;
    score++;
    this.classList.remove(".up");
    scoreBoard.textContent = score;
}
heads.forEach(head => head.addEventListener("click", playerScore));

//= demarrage jeu

const startGame = () => {
    scoreBoard.textContent = 0; //->on remet tt a zero
    score = 0;
    timeUp = false;
    showHead(); //->on lance le jeu

    setTimeout(() => { //-> on stop le jeu et on ajoute un delais pour voir le score avant le END
        timeUp = true;
        setTimeout(() => { scoreBoard.textContent = "END" }, 2000);
    }, 10000);
}
//* on creer les 3 niveaux de difficultes

const speed = 50;




const typeWriter = () => {
    let c = 0;
    const nov = 'NOVICE';

    if (c < nov.length) {
        document.getElementById("demo1").textContent += nov.charAt(c);
        c++;
        setTimeout(typeWriter, speed);
    }
}
const typeWriter1 = () => {
    let c1 = 0;
    const apprenti = "APPRENTI";

    if (c1 < apprenti.length) {
        document.getElementById("demo2").textContent += apprenti.charAt(c1);
        c1++;
        setTimeout(typeWriter1, speed);
    }
}
const typeWriter2 = () => {
    let c2 = 0;
    const expert = "EXPERT";

    if (c2 < expert.length) {
        document.getElementById("demo3").textContent += expert.charAt(c2);
        c2++;
        setTimeout(typeWriter2, speed);
    }
}

document.getElementById("morty-play").addEventListener("click",
    () => { typeWriter(); typeWriter1(); typeWriter2() });



