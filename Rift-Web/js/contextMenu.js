window.rift.contextMenu = {
    contextMenuSelected: null,
    comeFromTop: false,
    animations: {
        introBottom: async function () {
            const containerInAnimation = anime({
                targets: [`.context-menu-container`],
                opacity: ['0%', '100%'],
                duration: 150,
                easing: 'easeOutQuad'
            }).finished;
            let contextMenuInAnimation = anime({
                targets: [`.context-menu`],
                translateY: [5, 0],
                duration: 150,
                easing: 'easeOutQuad'
            }).finished;

            await Promise.all([contextMenuInAnimation, containerInAnimation]);
        },
        introTop: async function () {
            const containerInAnimation = anime({
                targets: [`.context-menu-container`],
                opacity: ['0%', '100%'],
                duration: 150,
                easing: 'easeOutQuad'
            }).finished;
            let contextMenuInAnimationTop = anime({
                targets: [`.context-menu`],
                translateY: [-5, 0],
                duration: 150,
                easing: 'easeOutQuad'
            }).finished;

            await Promise.all([contextMenuInAnimationTop, containerInAnimation]);
        }
    },
    show: function(contextMenuTarget) {
        let container = document.getElementsByClassName('context-menu-container')[0];
        let ctxMenu = document.getElementsByClassName('context-menu')[0];
        let target = document.getElementById(contextMenuTarget);
        
        container.style.display = "flex";
        target.classList.add("context-menu-focused");
        this.contextMenuSelected = contextMenuTarget;
        
        let offsetX = 0;
        let offsetY = 0;
        if(rift.utils.mouse.mouseX + ctxMenu.offsetWidth > window.innerWidth) {
            offsetX = window.innerWidth - (rift.utils.mouse.mouseX + ctxMenu.offsetWidth);
        }
        if(rift.utils.mouse.mouseY + ctxMenu.offsetHeight > window.innerHeight) {
            offsetY = window.innerHeight - (rift.utils.mouse.mouseY + ctxMenu.offsetHeight);
            this.comeFromTop = true;
        }
        else {
            this.comeFromTop = false;
        }
        
        ctxMenu.style.left = `${rift.utils.mouse.mouseX + offsetX}px`;
        ctxMenu.style.top = `${rift.utils.mouse.mouseY + offsetY}px`;
        
        if(this.comeFromTop === true) {
            this.animations.introTop();
        }
        else {
            this.animations.introBottom();
        }
    },
    hide: function(evt) {
        if(evt == null || evt.which == 3 || evt.target === document.getElementsByClassName('context-menu-container')[0]) {
            let target = document.getElementById(this.contextMenuSelected);
            if(target != null) {
                target.classList.remove("context-menu-focused");
            }
            
            document.getElementsByClassName('context-menu-container')[0].style.display = "none";
            this.contextMenuSelected = null;
        }
    }
}

// Add event listeners
window.onresize = function(evt) {
    if(rift.contextMenu.contextMenuSelected != null) {
        rift.contextMenu.hide();
    }
};
document.addEventListener("click", evt => rift.contextMenu.hide(evt));
document.addEventListener("mousedown", evt => rift.contextMenu.hide(evt));
