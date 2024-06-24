function removeComma(input) {
    input.value = input.value.replace(/,/g, '');
}

function calculateADB() {
    const ledgerBalance = parseFloat(document.getElementById('ledgerBalance').value);
    const currentADB = parseFloat(document.getElementById('currentADB').value);
    const avgBalanceIncrease = parseFloat(document.getElementById('avgBalanceIncrease').value);
    const bonusTrxDate = new Date(document.getElementById('bonusTrxDate').value);

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
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}
