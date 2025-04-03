
function openTab(evt, tabName) {
    // Get all tab content elements
    const tabContents = document.getElementsByClassName("tab-content");
    // Remove 'active' class from all tab contents
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // Get all tab buttons
    const tabButtons = document.getElementsByClassName("tab-button");
    // Remove 'active' class from all tab buttons
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show the selected tab content and mark its button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function filterInputNumber(input) {
    input.value = input.value.replace(/[^0-9.-]/g, '');
  }

function calculateADB() {
    const ledgerBalance = parseFloat(document.getElementById('ledgerBalance').value);
    const currentADB = parseFloat(document.getElementById('currentADB').value);
    const avgBalanceIncrease = parseFloat(document.getElementById('avgBalanceIncrease').value);
    const bonusTrxDate = new Date(document.getElementById('adbBonusTrxDate').value);

    if (isNaN(ledgerBalance) || isNaN(currentADB) || isNaN(avgBalanceIncrease) || isNaN(bonusTrxDate)) {
        // alert('Please enter valid numeric values for all inputs.');
        document.getElementById('finalADB').value = "Invalid Input Values";
        return;
    }

    const bonusTrxDays = bonusTrxDate.getDate();
    const daysInMonth = getDaysInMonth(bonusTrxDate);
    console.log(daysInMonth);

    const finalADB = ((currentADB * bonusTrxDays) + (ledgerBalance * (daysInMonth - bonusTrxDays))) / daysInMonth - (currentADB - avgBalanceIncrease);

    document.getElementById('finalADB').value = finalADB.toFixed(2);
}

function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function setDatesAsYesterday() {
    const bonusTrxDateElements = document.getElementsByName('bonusTrxDate');
    console.log(bonusTrxDateElements);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0];
    bonusTrxDateElements.forEach((ele) => {
        ele.value = formattedDate;
    });
}

function calculateLedgerBalance() {
    const currentBalance = parseFloat(document.getElementById('currentLedgerBalance').value);
    const targetADB = parseFloat(document.getElementById('targetADB').value);
    const currentADB = parseFloat(document.getElementById('ledgerCurrentADB').value);
    const avgBalanceIncrease = parseFloat(document.getElementById('ledgerAvgBalanceIncrease').value);
    const bonusTrxDate = new Date(document.getElementById('ledgerBonusTrxDate').value);

    if (isNaN(targetADB) || isNaN(currentADB) || isNaN(avgBalanceIncrease) || isNaN(bonusTrxDate) || isNaN(currentBalance)) {
        // alert('Please enter valid numeric values for all inputs.');
        document.getElementById('ledgerBalanceToAdd').value = "Invalid Input Values";
        return;
    }

    const bonusTrxDays = bonusTrxDate.getDate();
    const daysInMonth = getDaysInMonth(bonusTrxDate);
    console.log(daysInMonth);

    const ledgerBalance = ((targetADB + (currentADB - avgBalanceIncrease)) * daysInMonth - currentADB * bonusTrxDays) / (daysInMonth - bonusTrxDays)

    document.getElementById('ledgerBalanceToAdd').value = Math.ceil(ledgerBalance * 100) / 100 - currentBalance;
}

window.addEventListener('load', function() {
    setDatesAsYesterday();
})
