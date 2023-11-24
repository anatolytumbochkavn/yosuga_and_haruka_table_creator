const fs = require("fs");
const path = require("path");
const readXlsxFile = require("read-excel-file/node");

const excelOutputFolder = fs.readdirSync(path.join(__dirname, "excel_output"));

excelOutputFolder.forEach(el => {
    readXlsxFile(path.join(__dirname, "excel_output", el)).then((rows) => {
        const scenarioFile = fs.readFileSync(path.join(__dirname, "rpy_scenario", el.slice(0, el.length - 5)) + ".rpy", "utf8").toString().split("\n");

        const phrasesLocation = [];

        for (let i = 0; i < scenarioFile.length; i++) {
            if (!scenarioFile[i].includes("Character(\"") && scenarioFile[i].includes("\"")) {
                phrasesLocation.push([scenarioFile[i].trim(), i]);
            }
        }

        for (let i = 0; i < phrasesLocation.length; i++) {
            if (rows[i][2] != undefined) {
                if (rows[i][2].includes("\"")) {
                    rows[i][2] = rows[i][2].replace(/["]+/g, "'");
                }

                if (phrasesLocation[i][0][0] == "\"") {
                    phrasesLocation[i][0] = `"${rows[i][2]}"`;
                } else {
                    phrasesLocation[i][0] = `${rows[i][0]} "${rows[i][2]}"`;
                }
            }
        }

        for (let i = 0; i < phrasesLocation.length; i++) {
            scenarioFile[phrasesLocation[i][1]] = `    ${phrasesLocation[i][0]}`;
        }

        fs.writeFileSync(path.join(__dirname, "output", `${el.slice(0, el.length - 5)}.rpy`), scenarioFile.join("\n"));
    });
});

console.log("The text from the tables has been successfully migrated to .rpy files.");