class Agent {
    constructor (name, role) {
        //initialize
        this.name = name;
        this.icon = document.createElement("img");
        this.iconBox = document.createElement("div");
        this.iconFilter = document.createElement("span");
        this.banner = `../assets/images/banner/${name}_Banner.png`;
        this.status = true;

        //role assignment
        switch(role) {
            case 0:
                this.role = "controller"; break;
            case 1:
                this.role = "duelist"; break;
            case 2:
                this.role = "initiator"; break;
            case 3:
                this.role = "sentinel"; break;
            default:
                this.role = "ERROR";
        }

        //DOM
        this.iconBox.appendChild(this.iconFilter);
        this.iconBox.appendChild(this.icon);

        //img src
        this.icon.src = `../assets/images/icons/${name}_icon.webp`;

        //classes
        this.iconBox.className = "iconBox";
        this.iconFilter.classList.add("cross");
        this.iconFilter.classList.add("iconFilter");

        //event listeners
        this.iconBox.addEventListener("click", () => {
            const rolled = getRolledAgents(agents);
            if(this.iconBox.classList.contains("exempted")) {
                this.iconBox.classList.remove("exempted");
                this.status = true;
            }
            else if (rolled.length > 1) {
                this.iconBox.classList.add("exempted");
                this.status = false;
            }
            else {
                alert("CANNOT EXEMPT ALL AGENTS");
            }
        });
    }
}

const controller = ["Astra", "Brimstone", "Clove", "Harbor", "Omen", "Viper"];
const duelist = ["Iso", "Jett", "Neon", "Phoenix", "Raze", "Reyna", "Yoru"];
const initiator = ["Breach", "Fade", "Gekko", "KAYO", "Skye", "Sova"];
const sentinel = ["Chamber", "Cypher", "Deadlock", "Killjoy", "Sage"];

const roles = [controller, duelist, initiator, sentinel];

roles.forEach((role, index) => {
    var agentClass;
    for(let i = 0; i < role.length; i++) {
        agentClass = new Agent(role[0], index);
        role.shift();
        role.push(agentClass);
    }
    //improve this
});

const agents = roles.flat();

//connect to html

const random = document.querySelector(".randomButton");
const banner = document.getElementById("displayedBanner");

//randomizer button
random.addEventListener("click", () => randomizer());

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

function displayAgents(agents) {
    const iconContainer = document.querySelector(".icons");

    agents.forEach((agent) => {
        iconContainer.appendChild(agent.iconBox);
    });
}

function removeHighlight(agents) {
    agents.forEach(agent => {
        agent.iconBox.classList.remove("highlight");
    });
}

function addHighlight(iconBox) {
    iconBox.classList.add("highlight");
}

function getRolledAgents(agents) {
    const rolled = [];
    for(let i = 0; i < agents.length; i++) {
        if(agents[i].status === true) {
            rolled.push(agents[i]);
        }
    }

    return rolled;
}

function changeAgent(agents) {
    removeHighlight(agents);
    const rolledAgents = getRolledAgents(agents);

    let num = Math.floor(Math.random() * 100) % rolledAgents.length;

    banner.src = rolledAgents[num].banner;
    addHighlight(rolledAgents[num].iconBox);
    console.log(rolledAgents, num);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function randomizer() {
    banner.classList.remove("chosen");
    //random 5 times fast 200ms
    for(let i = 0; i < 10; i++) {
        await sleep(100);
        changeAgent(agents);
    }

    //random 3 times 500ms
    for(let i = 0; i < 3; i++) {
        await sleep(200);
        changeAgent(agents);
    }

    //random 2 times 1000ms
    for(let i = 0; i < 3; i++) {
        await sleep(400);
        changeAgent(agents);
    }

    await sleep(500);
    changeAgent(agents);
    banner.classList.add("chosen");
}

// FUNCTION CALL

sortAgents(agents);
displayAgents(agents);
// changeAgent();