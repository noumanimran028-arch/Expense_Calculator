 let currentBalance = 0;

    function saveBudget() {
        let userBudget = Number(document.querySelector("#budgetInput").value);
        let budgetErrorMsg = document.querySelector("#budgetError");
        let budgetDisplayEl = document.querySelector("#budgetDisplay");

        if (isNaN(userBudget) || userBudget <= 0) {
            budgetErrorMsg.innerHTML = "Please enter a valid budget";
            return;
        }

        budgetErrorMsg.innerHTML = "";

        // SESSION STORAGE
        sessionStorage.setItem("budget", userBudget);

        budgetDisplayEl.innerHTML = "$" + userBudget;

        showTotal();
    }

    function addExpense() {
        let expenseValue = Number(document.querySelector("#expenseInput").value);
        let expenseErrorMsg = document.querySelector("#expenseError");
        let expenseDisplayEl = document.querySelector("#expenseDisplay");

        let storedBudget = Number(sessionStorage.getItem("budget")) || 0;

        if (storedBudget === 0) {
            expenseErrorMsg.innerHTML = "Please save a budget first";
            return;
        }

        if (isNaN(expenseValue) || expenseValue <= 0 || expenseValue > currentBalance) {
            expenseErrorMsg.innerHTML = "Please enter a valid expense amount";
            return;
        }

        expenseErrorMsg.innerHTML = "";

        let totalExpenses = Number(sessionStorage.getItem("expense")) || 0;
        totalExpenses += expenseValue;

        sessionStorage.setItem("expense", totalExpenses);

        expenseDisplayEl.innerHTML = "$" + totalExpenses;

        showTotal();
    }

    function showTotal() {
        let storedBudget = Number(sessionStorage.getItem("budget")) || 0;
        let storedExpense = Number(sessionStorage.getItem("expense")) || 0;

        currentBalance = storedBudget - storedExpense;

        document.querySelector("#remainingDisplay").innerHTML =
            "Remaining balance: $" + currentBalance;
    }

    function removeExpense() {
        sessionStorage.removeItem("expense");

        document.querySelector("#expenseDisplay").innerHTML = "";
        document.querySelector("#expenseInput").value = "";

        showTotal();
    }

    window.onload = function () {
        let storedBudgetValue = Number(sessionStorage.getItem("budget")) || 0;
        let storedExpenseValue = Number(sessionStorage.getItem("expense")) || 0;

        document.querySelector("#budgetDisplay").innerHTML = "$" + storedBudgetValue;
        document.querySelector("#budgetInput").value = storedBudgetValue;

        document.querySelector("#expenseDisplay").innerHTML = "$" + storedExpenseValue;

        showTotal();
    };
