class Agent {
    constructor (name) {
        this.name = name;
        this.icon = document.createElement("img");
        this.iconBox = document.createElement("div");
        this.iconFilter = document.createElement("div");
        this.banner = document.createElement("img");
        this.status = true;


        this.iconBox.appendChild(this.iconFilter);
        this.iconBox.appendChild(this.icon);


        this.icon.src = `../assets/images/icons/${name}_icon.webp`;
        // this.banner.src = `../assets/images/banners/${name}_banner.webp`;

        this.iconBox.className = "iconBox";
        this.iconFilter.className = "iconFilter"

        this.iconBox.addEventListener("click", () => {
            this.status = !this.status;
            if(this.iconBox.classList.contains("exempted")) {
                this.iconBox.classList.remove("exempted");
            }
            else {
                this.iconBox.classList.add("exempted");
            }
        });
    }
}

const controller = ["Astra", "Brimstone", "Clove", "Harbor", "Omen", "Viper"];
const duelist = ["Iso", "Jett", "Neon", "Phoenix", "Raze", "Reyna", "Yoru"];
const initiator = ["Breach", "Fade", "Gekko", "KAYO", "Skye", "Sova"];
const sentinel = ["Chamber", "Cypher", "Deadlock", "Killjoy", "Sage"];

const roles = [controller, duelist, initiator, sentinel];

roles.forEach((role) => {
    var agentClass;
    for(let i = 0; i < role.length; i++) {
        agentClass = new Agent(role[0]);
        role.shift();
        role.push(agentClass);
    }
    //improve this
});

function sortAgents(agents) {
    for(let i = 0; i < agents.length; i++) {
        for(let j = 0; j < agents.length - i - 1; j++) {
            if(agents[j].name > agents[j + 1].name) {
                let temp = agents[j];
                agents[j] = agents[j + 1];
                agents[j + 1] = temp;
            }
        }  
    }
}

function displayAgents() {
    const iconContainer = document.querySelector(".icons");

    agents.forEach((agent) => {
        iconContainer.appendChild(agent.iconBox);
    });
}


const agents = roles.flat();
sortAgents(agents);

console.log(agents);
displayAgents();