let budgetController = (() => {

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        items: {
            inc: [],
            exp: []
        },
        counts: {
            inc: 0,
            exp: 0
        }
    };

    return {
        addItem: (type, description, value) => {
            let newItem, ID;

            if (data.items[type].length > 0) {
                ID = data.items[type][data.items[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'inc') {
                newItem = new Income(ID, description, value);
            } else if (type === 'exp') {
                newItem = new Expense(ID, description, value);
            }

            data.items[type].push(newItem);
            return newItem;
        }
    }

})();

let UIController = (() => {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    let createElementFromHTML = (htmlString) => {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        addItem: (obj, type) => {
            let html, element;

            // Create HTML and fill values
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${obj.value}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${obj.value}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            }

            // Insert created HTML into the DOM
            document.querySelector(element).insertAdjacentElement('beforeend', createElementFromHTML(html));
        },

        getDOMstring: () => {
            return DOMstrings;
        }
    }

})();

let appController = ((budgetCtrl, UICtrl) => {

    let setupListeners = () => {

        let DOMstring = UICtrl.getDOMstring();

        document.querySelector(DOMstring.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    let ctrlAddItem = () => {
        let input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();
        console.log('Input added: ' + JSON.stringify(input));

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UIController.addItem(newItem, input.type);

        // 4. Clear the fields

        // 5. Calculate and update budget

        // 6. Calculate and update percentages

    }

    return {
        init: () => {
            console.log('Application has been started');
            setupListeners();
        }
    }

})(budgetController, UIController);

appController.init();