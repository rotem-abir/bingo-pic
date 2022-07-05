const model = {
    numberOfFotos: 10, // number of pictures to roll from the 'img' folder
    fotosData: [],
    init: function() {
        this.fotosData = this.addJpg();
    },
    addJpg: function() {
        let data = [];
        for (i = 0; i < this.numberOfFotos; i++) {
            let fotoNum = i+1; // +1 so it will start from Pic_(1).jpg
            fotoNum = fotoNum.toString();
            data[i] = "Pic_(" + fotoNum + ").jpg"; // naming convention is subject to changes with referal to line 69
        }
        return data;
    }
}

const vm = {
    fotoCount: 0,
    init: function() {
        this.fotoCount = 0
        model.init();
        view.init();
        console.log(model.fotosData); // prints the randomize pic deck
        this.buildBingo();
    },
    shuffleBingo: function(array) {
        let m = array.length, t, i;                 // While there remain elements to shuffle…
        while (m) {                                 // Pick a remaining element…
            i = Math.floor(Math.random() * m--);    // And swap it with the current element.
            t = array[m];                           // the last entry in the data
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    },
    buildBingo: function() {
        let mixedFotos = [];
        mixedFotos = this.shuffleBingo(model.fotosData);
        fotos = mixedFotos;
    }
}

const view = {
    init: function() {
        this.image = document.getElementById("bingoImg");
        this.button = document.getElementById("bingoButton");
        this.fotoNum = document.getElementById("fotoNum");
        this.image.src = "img/0_welcome.jpg";
        this.button.innerHTML = "<button onclick=view.randomImg()>BINGO</button>";
        this.fotoNum.innerHTML = "Ready?";
    },
    checkEnd: function() {
        if(vm.fotoCount === model.numberOfFotos) {
            this.image.src = "img/gameover.jpg";
            this.button.innerHTML = "<button onclick=vm.init()>New Game</button>";
            this.fotoNum.innerHTML = "That was fun!";
            return 1; // GAMR OVER
        }
        return 0;
        //////////////////////// ADD: show small image on the side
    },
    randomImg: function() {
        if(!this.checkEnd()) {
            let i = vm.fotoCount;
            this.image.src= `img/${model.fotosData[i]}`
            vm.fotoCount++;
            this.fotoNum.innerHTML =
            "pic " + model.fotosData[i].slice(4, 8) + " / round: " + vm.fotoCount; // if pictures prefix is longer than 3 letters (atm "pic"), change here to 5,9 etc
        }
    }
}

vm.init();