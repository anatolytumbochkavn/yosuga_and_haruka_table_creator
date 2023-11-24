const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const scenarioFolder = fs.readdirSync(path.join(__dirname, "scenario"));

const scenarioFilesNames = [];

scenarioFolder.forEach(el => {
    scenarioFilesNames.push(el);
});

const getPhrases = scenario => {
    const phrasesArray = [];

    for (let i = 0; i < scenario.length; i++) {
        scenario[i] = scenario[i].replace("\r", "");
    }

    for (let i = 0; i < scenario.length; i++) {
        if (scenario[i].includes("@Talk")) {
            let charName;

            if (scenario[i].includes("voice=")) {
                charName = scenario[i].slice(scenario[i].indexOf("=") + 1, scenario[i].indexOf("voice") - 1);
            } else {
                charName = scenario[i].slice(scenario[i].indexOf("=") + 1, scenario[i].length);
            }

            let talkEnd;
            let phrase = "";

            for (let m = i; m < scenario.length; m++) {
                if (scenario[m].includes("@Hitret") || scenario[m].includes("@HitWait")) {
                    talkEnd = m;
                    break;
                }
            }

            for (let n = i + 1; n < talkEnd; n++) {
                if (!phrase) {
                    phrase += scenario[n];
                } else {
                    phrase += ` ${scenario[n]}`;
                }
            }

            if (charName == "Class Rep" || charName == "Class　Rep") {
                charName = "ClassRep";
            } else if (charName == "Ryouehi and Akira and Haruka and Sora" || charName == "Ryouehi　and　Akira　and　Haruka　and　Sora") {
                charName = "All";
            } else if (charName == "Post Office Clerk" || charName == "Post　Office　Clerk") {
                charName = "PostOfficeClerk";
            } else if (charName == "Delivery Person" || charName == "Delivery　Person") {
                charName = "DeliveryPerson";
            }

            if (charName == "心の声") {
                phrasesArray.push([null, phrase]);
            } else {
                phrasesArray.push([charName, phrase]);
            }
        }
    }

    return phrasesArray;
}

const phrases = [];

scenarioFolder.forEach(el => {
    const scenarioFile = fs.readFileSync(path.join(__dirname, "scenario", el), "utf16le").toString().split("\n");
    phrases.push(getPhrases(scenarioFile));
});

for (let i = 0; i < phrases.length; i++) {
    const wb = xlsx.utils.book_new();
    wb.SheetNames.push(scenarioFilesNames[i]);
    const wsData = [];

    for (let s = 0; s < phrases[i].length; s++) {
        wsData.push([phrases[i][s][0], phrases[i][s][1]]);
    }

    const ws = xlsx.utils.aoa_to_sheet(wsData);
    wb.Sheets[scenarioFilesNames[i]] = ws;
    xlsx.writeFile(wb, path.join(__dirname, "excel_output", `${scenarioFilesNames[i]}.xlsx`));
}

console.log("The table was successfully created.");