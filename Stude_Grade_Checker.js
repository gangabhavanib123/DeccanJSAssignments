function gradeChecker() {
    const marks = parseInt(document.getElementById("marks").value);
    let res = "";

    if (isNaN(marks) || marks < 0 || marks > 100) {
        res = "Please enter a valid number between 0 and 100.";
    } else if (marks === 90) {
        res = "Congratulations! You scored A grade.";
    } else if (marks >= 75) {
        res = "Congratulations! You scored B grade.";
    } else if (marks >= 60) {
        res = "Congratulations! You scored C grade.";
    } else if (marks >= 40) {
        res = "Congratulations! You scored D grade.";
    } else {
        res = "F(Fail).";
    }

    document.getElementById("result").textContent = res;
}

