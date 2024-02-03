let saveAllData = () => {
    localStorage.setItem('2828', JSON.stringify(allQuestion));
}
const saveItem = JSON.parse(localStorage.getItem('2828'));

let allQuestion;

if (Array.isArray(saveItem)) {
    allQuestion = saveItem;
} else {
    allQuestion = [
        {
            key: "create",
            question: "Hi",
            answer: "Hola",
            check: "noAnswer",
            status: "noAnswer",
            classList: "hide_addSection"
        },
        {
            key: "create",
            question: "Yes",
            answer: "Si",
            check: "noAnswer",
            status: "noAnswer",
            classList: "hide_addSection"
        },
        {
            key: "create",
            question: "I'm",
            answer: "soy",
            check: "noAnswer",
            status: "noAnswer",
            classList: "hide_addSection"
        },
    ]
}

saveAllData()

// ========================>
const getBackBtn = document.getElementById("backToMain")
const addSectionBtn = document.getElementById("addQ")
let addSection = document.getElementById("addSection")
addSection.className = allQuestion[0].classList

addSectionBtn.addEventListener("click", () => {
    allQuestion[0].classList = "add_section"
    addSection.className = allQuestion[0].classList
    saveAllData()
})

getBackBtn.addEventListener("click", () => {
    allQuestion[0].classList = "hide_addSection"
    addSection.className = allQuestion[0].classList
    saveAllData()
})

const userQuestion = document.getElementById("addQuestion")
const userAnswerAdd = document.getElementById("addAnswer")
const addButton = document.getElementById("pushNewData")

addButton.addEventListener("click", () => {
    if (userQuestion.value !== "" && userAnswerAdd.value !== "") {
        location.reload()
        allQuestion.push({
            key: "create",
            question: `${userQuestion.value}`,
            answer: `${userAnswerAdd.value}`,
            check: "noAnswer",
            status: "noAnswer",
            classList: "hide_addSection"
        });
        saveAllData()
        
        userAnswerAdd.value = ""
        userQuestion.value = ""
        // currentDataFunc()
        
        
    } 
})

//=======(Add function)
const currentListTable = document.getElementById("current_list_data");
const currentDataFunc = () => {
    for (currentData in allQuestion) {
        convertNumData = parseInt(currentData)
        addNum = parseInt(currentData)
        const DataQuestion = allQuestion[convertNumData].question
        const DataAnswer = allQuestion[convertNumData].answer
    
        //create Table row
        const createTableRow = document.createElement("tr")
        currentListTable.appendChild(createTableRow)
    
        //create Table heading for question
        const createTableHeading = document.createElement("th")
        createTableHeading.textContent = `${addNum += 1}: ${DataQuestion}`
        createTableRow.appendChild(createTableHeading)
    
        //create table heading for Answer
        const createThForAnswer = document.createElement("th")
        createThForAnswer.textContent = DataAnswer
        createTableRow.appendChild(createThForAnswer)
    
        //create remove button
        const thRemoveBtn = document.createElement("th")
        createTableRow.appendChild(thRemoveBtn)
    
        const removeBtn = document.createElement("button")
        removeBtn.classList = convertNumData
        removeBtn.id = `${convertNumData}removeBtn`
        removeBtn.textContent = "remove"
        thRemoveBtn.appendChild(removeBtn)
    }
}

currentDataFunc()

for (allRemoveBtn in allQuestion) {
    add = parseInt(allRemoveBtn)
    let getRemoveBtn = document.getElementById(`${add}removeBtn`)

    getRemoveBtn.addEventListener("click", () => {
        location.reload()
        convertNum = parseInt(getRemoveBtn.className)
        allQuestion.splice(convertNum, 1)
        saveAllData()
        // console.log(convertNum)
    })
}
// ========================>

const thCorrect = document.getElementById("thCorrect")
const thMistake = document.getElementById("thMistake")
const thSkipped = document.getElementById("thSkipped")

const ScoreBoard = () => {
    let skipCount = 0
    let WrongCount = 0
    let CorrectCount = 0

    for (x in allQuestion) {
        ScoreNum = parseInt(x)
        // console.log(ScoreNum)
        forCheckData = allQuestion[ScoreNum].check
        forWrongData = allQuestion[ScoreNum].status

        if (forCheckData === "skip") {
            skipCount += 1
            thSkipped.textContent = skipCount
        }

        if (forCheckData === "itsCorrect") {
            CorrectCount += 1
            thCorrect.textContent = CorrectCount
        }

        if (forWrongData === "Wrong!" && forCheckData === "noAnswer") {
            WrongCount += 1
            thMistake.textContent = WrongCount
        }
        // console.log(forCheckData)
    }
}

ScoreBoard()

// create Element ==>
const container = document.getElementById("container")

const mainFunction = () => {
    //get all the questions
    for (answer_question in allQuestion) {
        getQuestionKey = allQuestion[answer_question].key
        getQuestions = allQuestion[answer_question].question
        getAnswer = allQuestion[answer_question].answer
        getCheck = allQuestion[answer_question].check
        getStatus = allQuestion[answer_question].status

        let forId = parseInt(answer_question)
        // console.log(`meow test: ${getCheck}`)
    
        if (getQuestionKey === "create") {
            //create a div inside the container
            const question_container = document.createElement("div")
            question_container.id = forId += 1
            question_container.className = "question_container"
            container.append(question_container)

            // questions
            const createQuestion = document.createElement("h1")
            createQuestion.id = `${forId}question`
            createQuestion.textContent = `${forId}: ${getQuestions}`
            question_container.append(createQuestion)

            // for result
            const result_section = document.createElement("h3")
            if (getStatus === "noAnswer") {
                result_section.textContent = `Remarks: no answer`
                
            } 
            if (getStatus === "Wrong!") {
                result_section.textContent = `Remarks: ${getStatus}`
                result_section.style = "color: red;"
                
            } 
            if (getStatus === "Correct!") {
                result_section.textContent = `Remarks: ${getStatus}`
                result_section.style = "color: green;"
                
            }
            if (getCheck === "skip") {
                result_section.textContent = `Remarks: Skipped`

            }
            result_section.id = `${forId}remarks`
            question_container.append(result_section)

            //create div ===>
            const createDiv = document.createElement("div")
            createDiv.className = "input_section_data"
            question_container.append(createDiv)
            //create div ===>


            // for user answer
            const userInput1 = document.createElement("input")
            userInput1.type = "text"
            userInput1.placeholder = "Enter your answer"
            userInput1.className = `${forId}answer`
            userInput1.id = forId
            createDiv.append(userInput1)


            //div for button ===>
            const div_forBtn = document.createElement("div")
            div_forBtn.className = "divForBtn"
            question_container.append(div_forBtn)
            //div for button ===>

            //submit button
            const submitUserAnswer = document.createElement("button")
            if (getCheck === "skip") {
                submitUserAnswer.textContent = "Disable"
                submitUserAnswer.style = "background-color: gray; color: white;"

            } else if (getCheck === "noAnswer") {
                submitUserAnswer.textContent = "Submit"
                
            } else if (getCheck === "itsCorrect") {
                submitUserAnswer.textContent = "Disable"
                submitUserAnswer.style = "background-color: gray; color: white;"
            } 

            submitUserAnswer.className = `${forId}answer`
            submitUserAnswer.id = forId
            div_forBtn.append(submitUserAnswer)

            //Skip button
            const skipButton = document.createElement("button")
            if (getCheck === "skip") {
                skipButton.textContent = "Try again"

            } else if (getCheck === "noAnswer") {
                skipButton.textContent = "Skip"

            } else if (getCheck === "itsCorrect") {
                skipButton.textContent = "Try again"

            }
            skipButton.className = `${forId}skip`
            skipButton.style = "background-color: rgb(255, 187, 0);"
            skipButton.id = forId
            div_forBtn.append(skipButton)
        }
    }

    //  for click event
    const allButtons = document.querySelectorAll("button")

    allButtons.forEach(buttons => {
        if (buttons.className === `${buttons.id}answer`) {
            buttons.addEventListener("click", () => {
                const getUserAnswer = document.getElementsByClassName(buttons.className)
                const getSkipBtn = document.getElementsByClassName(`${buttons.id}skip`)
                const getRemarks = document.getElementById(`${buttons.id}remarks`)
                // console.log(getUserAnswer[0].value = "")
                // console.log(buttons)

                console.log()

                //continue this tomorrow
                // this is for submit button
                currentNum = buttons.id - 1
                if (buttons.textContent === "Submit") {
                    if (getUserAnswer[0].value === "") {
                        console.log("skip")
                    } else {
                        userAnswer = getUserAnswer[0].value
                        correctAnswer = allQuestion[currentNum].answer
                        ConvertUserAnswer = String(userAnswer).toLowerCase()
                        convertCorrectAnswer = String(correctAnswer).toLowerCase()

                        if (ConvertUserAnswer === convertCorrectAnswer) {
                            console.log("correct answer")

                            // if correct disable submit button
                            allQuestion[currentNum].check = "itsCorrect"
                            buttons.textContent = "Disable"
                            buttons.style = "background-color: gray; color: white;"
                            getSkipBtn[0].textContent = "Try again"
                            allQuestion[currentNum].status = "Correct!"
                            getRemarks.textContent = "Remarks: Correct!"
                            getRemarks.style = "color: green;"
                            saveAllData()
                            ScoreBoard()
                            thMistake.textContent = 0
                        } else {
                            // allQuestion[currentNum].check = "itsWrong"
                            allQuestion[currentNum].status = "Wrong!"
                            getRemarks.textContent = "Remarks: Wrong!"
                            getRemarks.style = "color: red;"
                            saveAllData()
                            ScoreBoard()
                            thMistake.textContent = 0
                        }
                    }
                }
                ScoreBoard()
                //to clear the input value
                getUserAnswer[0].value = ""
            })
        }

        if (buttons.className === `${buttons.id}skip`) {
            buttons.addEventListener("click", () => {
                getButtonId = `${buttons.id}answer`
                let allButton = document.getElementsByClassName(getButtonId)
                currentQuestion = parseInt(allButton[1].id)
                currentQuestion -=1
                const getRemarks = document.getElementById(`${buttons.id}remarks`)
               
                
                let skip = allQuestion[currentQuestion].check
                ScoreBoard()
                
                if (skip === "skip") {
                    allQuestion[currentQuestion].check = "noAnswer"
                    buttons.textContent = "Skip"
                    // console.log(`my current test ${allButtons}`)
                    buttons.style = "background-color: rgb(255, 187, 0);"
                    allQuestion[currentQuestion].status = "noAnswer"
                    getRemarks.textContent = "Remarks: no answer"
                    // console.log("test1")
                    thSkipped.textContent = 0
                    thMistake.textContent = 0
                    saveAllData()
                    ScoreBoard()
                }
                
                if (skip === "noAnswer") {
                    allQuestion[currentQuestion].check = "skip"
                    buttons.textContent = "Try again"
                    buttons.style = "background-color: rgb(255, 187, 0);"
                    allQuestion[currentQuestion].status = "noAnswer"
                    getRemarks.textContent = "Remarks: Skipped"
                    getRemarks.style = "color: black;"
                    // console.log("test2")
                    thMistake.textContent = 0
                    saveAllData()
                    ScoreBoard()
                    
                }
                
                if (skip === "itsCorrect") {
                    allQuestion[currentQuestion].check = "noAnswer"
                    buttons.textContent = "Skip"
                    buttons.style = "background-color: rgb(255, 187, 0);"
                    
                    allButton[1].textContent = "Submit"
                    allButton[1].style = "background-color: yellow; color: black;"
                    allQuestion[currentQuestion].status = "noAnswer"
                    getRemarks.textContent = "Remarks: no answer"
                    // console.log("test3")
                    thCorrect.textContent = 0
                    saveAllData()
                    ScoreBoard()
                }
                ScoreBoard()
                // test
                const testFunction = () => {
                    // console.log(allButton[1].textContent = "meow")
                    // console.log(skip)

                    if (skip === "noAnswer") {
                        allButton[1].textContent = "Disable"
                        allButton[1].style = "background-color: gray; color: white;"
                        ScoreBoard()
                        
                    }
                    if (skip === "skip") {
                        allButton[1].textContent = "Submit"
                        allButton[1].style = "background-color: yellow;"
                        ScoreBoard()
                    }
                }
                ScoreBoard()
                // test
                testFunction()
                
                
                saveAllData()
                
                //user input
                allButton[0].value = ""
            })
        }
    })
}
mainFunction()

// export {allQuestion};

