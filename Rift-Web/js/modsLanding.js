window.rift.modsLanding = {
    animations: {
        introduced: false,
        intro: async function () {
            if(this.introduced === true)
                return;
            
            rift.tabManager.canTransition = false;
            this.introduced = true;
            
            let canvas = document.getElementById('confetti-canvas');
            canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

            const closedBox = document.querySelector(".mods-intro .icon #closedbox");
            const openBox = document.querySelector(".mods-intro .icon #openbox");
            const splode = document.querySelector(".mods-intro .icon .explosion-circle");
            const text = document.querySelector(".mods-intro .text");
            
            closedBox.style.display = "block";
            openBox.style.display = "none";
            splode.style.display = "none";
            text.style.display = "none";
            
            await this.boxShake();
            await this.boxSplode();
            await this.introduceText();
            
            rift.tabManager.canTransition = true;
        },
        boxShake: async function() {
            let boxShake = {
                shakeSpeed: 0
            };
            const shakeIntensify = anime({
                targets: boxShake,
                shakeSpeed: [0, 16],
                duration: 2500,
                easing: 'linear'
            }).finished;
            
            const box = document.querySelector(".mods-intro .icon #closedbox");
            while(boxShake.shakeSpeed !== 16) {
                box.style.transform = `translate(${Math.floor(Math.random() * boxShake.shakeSpeed)}px, ${Math.floor(Math.random() * boxShake.shakeSpeed)}px)`;
                await rift.utils.delay(0.01);
            }

            await Promise.all([shakeIntensify]);
        },
        boxSplode: async function() {
            console.log("Splode!");
            
            const closedBox = document.querySelector(".mods-intro .icon #closedbox");
            const openBox = document.querySelector(".mods-intro .icon #openbox");
            const splode = document.querySelector(".mods-intro .icon .explosion-circle");

            const splodeAnimation = anime({
                targets: [`.mods-intro .icon .explosion-circle`],
                scale: [5, 1],
                opacity: [1, 0]
            }).finished;
            const boxAnimation = anime({
                targets: [`.mods-intro .icon #openbox`],
                scale: [2, 1]
            }).finished;
            
            closedBox.style.display = "none";
            openBox.style.display = "block";
            splode.style.display = "block";

            // confetti time!!!
            const count = 6;
            for(let i = 0; i < count; i++)
                this.fire(300);
            
            await Promise.all([boxAnimation, splodeAnimation]);
        },
        fire: function (count) {
            let canvas = document.getElementById('confetti-canvas');
            canvas.confetti(Object.assign({}, { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }, { count, origin: {} }));
        },
        introduceText: async function() {
            const text = document.querySelector(".mods-intro .text");
            
            text.style.display = "block";

            const boxAnimation = anime({
                targets: [`.mods-intro .icon #openbox`],
                translateY: [0, -37]
            }).finished;
            const textAnimation = anime({
                targets: [`.mods-intro .text`],
                translateY: [50, 37],
                opacity: [0, 1]
            }).finished;

            await Promise.all([boxAnimation, textAnimation]);
        }
    }
}