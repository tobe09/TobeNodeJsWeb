const PostFixNotation = (() => {

    let stack = [];
    const push = symbol => stack.push(symbol);
    const pop = () => stack.pop();
    const peek = () => stack[stack.length - 1];
    const isEmpty = () => stack.length === 0;

    const isOperator = symbol => ['+', '-', '*', '/', '(', ')', '^'].includes(symbol);

    const isLeftRightAssoc = symbol => symbol !== '^';

    function precedence(symbol) {
        switch (symbol) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
        }
    }

    function solve(opd1, opd2, opr) {
        switch (opr) {
            case '+': return opd2 + opd1;
            case '-': return opd2 - opd1;
            case '*': return opd2 * opd1;
            case '/': return opd2 / opd1;
            case '^': return Math.pow(opd2, opd1);
        }
    }

    return class {
        getPostfix(infix) {
            let postfix = [];

            stack = [];
            infix = [...infix].filter(char => char !== ' ');

            for (const symbol of infix) {
                if (!isOperator(symbol)) {
                    postfix.push(symbol);
                }
                else if (isEmpty() || peek() === '(') {
                    push(symbol);
                }
                else if (symbol === '(') {
                    push(symbol);
                }
                else if (symbol === ')') {
                    while (peek() != '(') {
                        postfix.push(pop());
                    }
                    pop();
                }
                else if (precedence(symbol) > precedence(peek())) {
                    push(symbol);
                }
                else if (precedence(symbol) === precedence(peek())) {
                    if (isLeftRightAssoc(symbol)) {
                        postfix.push(pop());
                    }
                    push(symbol);
                }
                else {
                    while (precedence(symbol) < precedence(peek())) {
                        postfix.push(pop());
                    }
                    push(symbol);
                }
            }

            while (stack.length > 0) {
                postfix.push(pop());
            }

            return postfix.join('');
        }

        evaluate(postfix) {
            stack = [];

            for (const symbol of postfix) {
                if (!isOperator(symbol)) {
                    push(symbol);
                }
                else {
                    const operand1 = parseInt(pop());
                    const operand2 = parseInt(pop());
                    const value = solve(operand1, operand2, symbol);
                    push(value);
                }
            }

            return pop();
        }
    }
})();


function solveInfixPostfix() {
    const infixes = [" 2 * ((1 +3) *   5 -3^2)", '5^2^1^3*2-4+2', '6*3', '4/ 2+5*2', '4 *', '5', 'null'];

    const postFixer = new PostFixNotation();

    for (const infix of infixes) {
        console.log(infix);

        const postfix = postFixer.getPostfix(infix);
        console.log(postfix);

        const result = postFixer.evaluate(postfix);
        console.log(result + '\n');
    }
}
solveInfixPostfix();