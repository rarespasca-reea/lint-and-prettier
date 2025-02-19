module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Ensure switch cases and break statements are aligned with extra indentation.',
    },
    fixable: 'whitespace',
    schema: [],
  },
  create(context) {
    return {
      SwitchStatement(node) {
        const sourceCode = context.getSourceCode();
        const switchIndent = sourceCode.getText(node).match(/^\s*/)[0];
        const expectedCaseIndent = switchIndent + '  ';
        const expectedStatementIndent = expectedCaseIndent + '  ';

        node.cases.forEach((caseNode) => {
          if (caseNode.consequent.length > 0) {
            const caseText = sourceCode.getText(caseNode).split('\n')[0];
            const currentCaseIndent = caseText.match(/^\s*/)[0];

            if (currentCaseIndent !== expectedCaseIndent) {
              context.report({
                node: caseNode,
                message: 'Case statements should be indented 2 spaces after switch.',
                fix(fixer) {
                  return fixer.replaceTextRange(
                    [caseNode.range[0], caseNode.range[0] + currentCaseIndent.length],
                    expectedCaseIndent,
                  );
                },
              });
            }

            caseNode.consequent.forEach((statement) => {
              const statementText = sourceCode.getText(statement);
              const currentStatementIndent = statementText.match(/^\s*/)[0];

              if (currentStatementIndent !== expectedStatementIndent) {
                context.report({
                  node: statement,
                  message: 'Statements inside case should be indented 4 spaces after switch.',
                  fix(fixer) {
                    return fixer.replaceTextRange(
                      [statement.range[0], statement.range[0] + currentStatementIndent.length],
                      expectedStatementIndent,
                    );
                  },
                });
              }
            });

            const lastStatement = caseNode.consequent[caseNode.consequent.length - 1];
            if (lastStatement && lastStatement.type === 'BreakStatement') {
              const lastStatementText = sourceCode.getText(lastStatement);
              const currentBreakIndent = lastStatementText.match(/^\s*/)[0];

              if (currentBreakIndent !== expectedCaseIndent) {
                context.report({
                  node: lastStatement,
                  message: 'Break statements should be aligned with case.',
                  fix(fixer) {
                    return fixer.replaceTextRange(
                      [lastStatement.range[0], lastStatement.range[0] + currentBreakIndent.length],
                      expectedCaseIndent,
                    );
                  },
                });
              }
            }
          }
        });
      },
    };
  },
};
