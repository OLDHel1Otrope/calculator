class Calculator {
    constructor(previousoperandtextelement,currentoperandtextelement) {
        this.previousoperandtextelement=previousoperandtextelement
        this.currentoperandtextelement=currentoperandtextelement
        this.clear()
    }

    clear(){
        this.currentOPerand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number=='.' && this.currentOPerand.includes('.')) return
        this.currentOPerand=this.currentOPerand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOPerand==='') return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOPerand
        this.currentOPerand=''
    }

    compute() {
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOPerand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case'+':
                computation=prev+current
                break
            case'-':
                computation=prev-current
                break
            case'×':
                computation=prev*current
                break    
            case'÷':
                computation=prev/current
                break
            default:
                return
        }
        this.currentOPerand=computation
        this.operation=undefined
        this.previousOperand=''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }   

    updateDisplay() {
        this.currentoperandtextelement.innerText = this.getDisplayNumber(this.currentOPerand)
        if(this.operation!=null){
            this.previousoperandtextelement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else{
            this.previousoperandtextelement.innerText=' '
        } 
    }
}



const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const allcleareButton=document.querySelector('[data-clear]')
const previousoperandtextelement=document.querySelector('[data-previous-operand]')
const currentoperandtextelement=document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousoperandtextelement, currentoperandtextelement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allcleareButton.addEventListener('click',button =>{
    calculator.clear()
    calculator.updateDisplay()
})

