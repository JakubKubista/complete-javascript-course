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
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentage = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);

    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  }

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

    calculatePercentages: () => {
      data.items.exp.forEach(element => {
        element.calculatePercentage(data.counts.inc);
      });
    },

    getPercentages: () => {
      let allPercentages = data.items.exp.map((element) => {
        return element.getPercentage();
      });
      return allPercentages;
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
    container: '.container',
    expensesPercentageLabel: '.item__percentage',
    monthLabel: '.budget__title--month'
  };

  // Private functions

  let formatNumber = (num, type) => {
    let int, dec, sign;

    num = Math.abs(num);
    num = num.toFixed(2);

    int = num.split('.')[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    dec = num.split('.')[1];

    sign = (type === 'exp') ? '-' : '+';

    return sign + int + '.' + dec;
  };

  let createElementFromHTML = (htmlString) => {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  let nodeListForEach = (list, callback) => {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i)
    }
  };

  // Public functions

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
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
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
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
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
      let type = (obj.budget > 0) ? 'inc' : 'exp';

      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, type);
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, type);

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    // Loop over DOM object via callback function
    displayPercentages: (percentages) => {
      let elements = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

      nodeListForEach(elements, (element, index) => {
        if (percentages[index] > 0) {
          element.textContent = percentages[index] + '%';
        } else {
          element.textContent = '---'
        }
      });
    },

    displayMonth: () => {
      let now, year, month, months;

      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth();

      document.querySelector(DOMstrings.monthLabel).textContent = months[month] + ' ' + year;
    },

    changedType: () => {
      let elements = document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue);

      nodeListForEach(elements, function (element) {
        element.classList.toggle('red-focus');
      });

      document.querySelector(DOMstrings.inputButton).classList.toggle('red');
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

    document.querySelector(DOMstring.inputType).addEventListener('change', UIController.changedType);
  };

  let updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    let budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UIController.displayBudget(budget);
  }

  let updatePercentages = () => {
    // 1. Calculate
    budgetCtrl.calculatePercentages();

    // 2. Read from the budget
    let percentages = budgetCtrl.getPercentages();

    // 3. Update UI
    UIController.displayPercentages(percentages);
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
      updatePercentages();

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

      // 3. Calculate and update budget
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    init: () => {
      console.log('Application has been started');
      UIController.displayMonth();
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