let budgetController = (() => {

    return {

    }

})();

let UIController = (() => {

    let DOMstrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputVal: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                desc: document.querySelector(DOMstrings.inputDesc).value,
                val: document.querySelector(DOMstrings.inputVal).value
            };
        },

        getDOMstring: () => {
            return DOMstrings;
        }
    }

})();

let appController = ((budgetCtrl, UICtrl) => {

    let DOMstring = UICtrl.getDOMstring();

    let ctrlAddItem = () => {

        // 1. Get the field input data
        let input = UICtrl.getInput();

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Clear the fields

        // 5. Calculate and update budget

        // 6. Calculate and update percentages

    }

    document.querySelector(DOMstring.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (e) => {

        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }

    });

    return {

    }

})(budgetController, UIController);