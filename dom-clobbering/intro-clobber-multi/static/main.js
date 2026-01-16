class FactorialNode {
    constructor() {
        this.next = null;
    }
}

function tetr(base, height) {
    let ans = 1n;
    for (let i = 0; i < height; i++) {
        ans = base ** ans;
    }
    return ans;
}

function setupSequence() {
    const params = new URLSearchParams(window.location.search);
    const sequence = params.get("sequence");
    if (sequence === null) return; // No sequence provided
    const sequenceStrArr = sequence.split(","); 
    const sequenceIntArr = [];
    const intValidation = /^\s*\d+\s*$/;
    for (const valueStr of sequenceStrArr) {
        if (!valueStr.match(intValidation)) return; // Not a valid int
        const valueInt = BigInt(valueStr);
        sequenceIntArr.push(valueInt);
    }

    head = new FactorialNode();
    let current = head;
    let base = 2n;
    let height = 1n;
    for (const valueInt of sequenceIntArr) {
        if (valueInt == tetr(base, height)) {
            current.next = new FactorialNode();
            current = current.next;
            height++;
        } else {
            return;
        }
    }
}

function validateLength(targetLength) {
    let current = head;
    let length = 0;
    while (length < targetLength) {
        if (current.next != null) { // Sanity check: if head.next = null then our tetration sequence did not start with 2 (is length 0)
            current = current.next;
            length++;
        } else {
            return false; // Didn't get to the target length :(
        }
    }
    return true;
}

document.getElementById("check-tetration").addEventListener("click",()=>{
    setupSequence();
    if (validateLength(6)) {
        alert("SUCCESS");
    } else {
        alert("FAIL")
    }
})
