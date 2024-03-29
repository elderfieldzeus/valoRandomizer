class Agent {
    constructor (name) {
        this.name = name;
        this.icon = `${name}_icon.webp`;
        this.banner = `...`;
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

const agents = roles.flat();
sortAgents(agents);

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
        const icon = document.createElement("img");
        icon.src = `../assets/images/icons/${agent.icon}`;
        iconContainer.appendChild(icon);
    });
}

displayAgents();