const generateId = () => `sera${Math.round(Math.random() * 1e8).toString(16)}`

const
totalBalance = document.querySelector('.total__balance'),
totalMoneyIncome = document.querySelector('.total__money-income'),
totalMoneyExpences = document.querySelector('.total__money-expenses'),
historyList = document.querySelector('.history__list'),
form = document.querySelector('#form'),
operationName = document.querySelector('.operation__name'),
operationAmount = document.querySelector('.operation__amount');

let dbOperation = JSON.parse(localStorage.getItem('calc')) || [];

//localStorage.clear();

// if(localStorage.getItem('calc')){
//     dbOperation = JSON.parse(localStorage.getItem('calc'));
// }

const renderOperation = (operation) => {
    //console.log(operation);
    
    const className = operation.amount < 0 ? 
                    'history__item-minus' : 
                    'history__item-plus';
    
    const listItem = document.createElement('li');
    
    listItem.classList.add('history__item');

    listItem.classList.add(className);

    listItem.innerHTML = `${operation.description}
        <span class="history__money">${operation.amount} ₽</span>
        <button class="history__delete" data-id="${operation.id}">x</button>
    `;
    historyList.append(listItem);
};

const updateBalance = () => {
    
    // const resultIncome = dbOperation.filter((item) => {
    //     return item.amount > 0;
    // })
    const resultIncome = dbOperation
        .filter((item) => item.amount > 0 )
        .reduce((result, item) => result + item.amount, 0);

    //console.log(resultIncome);
    
    // const resultExpences = dbOperation.filter((item) => {
    //     return item.amount < 0;
    // })
    const resultExpences = dbOperation
        .filter((item) => item.amount < 0 )
        .reduce((result, item) => result + item.amount, 0);
    
    //  console.log(resultExpences);

    totalMoneyIncome.textContent = resultIncome + ' ₽';

    totalMoneyExpences.textContent = resultExpences + ' ₽';

    totalBalance.textContent = (resultIncome + resultExpences) + ' ₽';
};

const addOperation = (event) => {
    
    event.preventDefault();

    const operationNameValue = operationName.value,
            operationAmountValue = operationAmount.value;


            operationName.style.borderColor = '';
            operationAmount.style.borderColor = '';

            // if(operationNameValue !== '' && operationAmountValue !== ''){
            if(operationNameValue  && operationAmountValue){

                const operation = {
                    id: generateId(),
                    description: operationNameValue,
                    amount: +operationAmountValue,
                };

                dbOperation.push(operation);

                init();

                //console.log(dbOperation);

                // console.log (operationNameValue);
                // console.log (operationAmountValue);

                
            } else {
                if (!operationNameValue)operationName.style.borderColor = 'red';
                if (!operationAmountValue)operationAmount.style.borderColor = 'red';
            }

            operationName.value = '';
            operationAmount.value = '';
            
};

const deleteOperation = (event) => {
    
    const target = event.target;

    if(target.classList.contains('history__delete')){
        //console.log(event.target.dataset.id);
        dbOperation = dbOperation
                    .filter(operation => operation.id !== target.dataset.id);
        
        init();
    }
     
};

const init = () => {
    historyList.textContent = '';

    dbOperation.forEach(renderOperation)
    
    updateBalance();
    // dbOperation.forEach((item) => {
    //     renderOperation(item);
    // })

    // for(let i = 0; i < 5; i++){
    //     renderOperation(dbOperation[i]);
    // }

    localStorage.setItem('calc', JSON.stringify(dbOperation));
    
};

form.addEventListener('submit', addOperation);

// form.addEventListener('submit', () => {

// });

historyList.addEventListener('click', deleteOperation);

init();

// https://www.youtube.com/watch?v=L256ggQtOPQ