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

  let calculateTotal = (type) => {
    let sum = 0;
    data.items[type].forEach(element => {
      sum = sum + element.value;
    });
    data.counts[type] = sum;
  };

  let data = {
    items: {
      inc: [],
      exp: []
    },
    counts: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: (type, description, value) => {
      let newItem, id;

      if (data.items[type].length > 0) {
        id = data.items[type][data.items[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      if (type === 'inc') {
        newItem = new Income(id, description, value);
      } else if (type === 'exp') {
        newItem = new Expense(id, description, value);
      }

      data.items[type].push(newItem);
      return newItem;
    },

    deleteItem: (type, id) => {
      let ids, index;

      ids = data.items[type].map((element) => {
        return element.id;
      });

      index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1)
      }
    },

    calculateBudget: () => {

      // 1. Calculate total icome and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // 2. Calculate the budget: income - expenses
      data.budget = data.counts.inc - data.counts.exp;

      // 3. Calculate the percentage o income that we spent
      if (data.counts.inc > 0) {
        data.percentage = Math.round((data.counts.exp / data.counts.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.counts.inc,
        totalExp: data.counts.exp,
        percentage: data.percentage
      };
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
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
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
        // Convert string to a number
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addItem: (obj, type) => {
      let html, element;

      // Create HTML and fill values
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}">
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
        html = `<div class="item clearfix" id="exp-${obj.id}">
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

    deleteItem: (id) => {
      let element = document.getElementById(id);
      element.parentNode.removeChild(element);
    },

    clearFileds: () => {
      let fields;
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // Transform prototype object (DOM object) into array.
      let fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach((element, index, array) => {
        element.value = '';
      });

      fieldsArr[0].focus();
    },

    displayBudget: (obj) => {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
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

    document.querySelector(DOMstring.container).addEventListener('click', ctrlDeleteItem);
  };

  let updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    let budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UIController.displayBudget(budget);
  }

  let ctrlAddItem = () => {
    let input, newItem;

    // 1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      console.log('Input added: ' + JSON.stringify(input));

      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UIController.addItem(newItem, input.type);

      // 4. Clear the fields
      UIController.clearFileds();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Calculate and update percentages

    }
  }

  let ctrlDeleteItem = (event) => {
    let item, itemId, type, id;

    if (event.target.parentNode.className === 'item__delete--btn') {
      itemId = event.target.closest('.item').id;
      type = itemId.split('-')[0];
      id = parseInt(itemId.split('-')[1]);

      // 1. Delete from data structure
      item = budgetCtrl.deleteItem(type, id);

      // 2. Delete from UI
      UIController.deleteItem(itemId);

      // 3. Update budget
      updateBudget();
    }
  };

  return {
    init: () => {
      console.log('Application has been started');
      UIController.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupListeners();
    }
  }

})(budgetController, UIController);

appController.init();