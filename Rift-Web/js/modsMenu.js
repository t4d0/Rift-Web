window.rift.modsMenu = {
    currentTab: "myMods",
    setTab: function(tab) {
        let oldPage = document.querySelector(`.container #${this.currentTab}`);
        let newPage = document.querySelector(`.container #${tab}`);
        
        if(!oldPage || !newPage) {
            console.error("that page doesn't exist!");
            return;
        }
        
        let oldPageRadio = document.querySelector(`.header #${this.currentTab}-radio`);
        let newPageRadio = document.querySelector(`.header #${tab}-radio`);
        
        oldPageRadio.classList.remove("active");
        newPageRadio.classList.add("active");
        
        oldPage.style.display = "none";
        newPage.style.display = "flex";
        this.currentTab = tab;
    }
}