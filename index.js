const { transform } = require("@babel/core");

// 解析したら変更したりする対象の JS ソースコード
const src = "1+2";

// 自作プラグイン
// transform メソッドに渡せば、そのまま使えちゃう
const plugin = ({ types: t }) => ({
  visitor: {
    BinaryExpression: nodePath => {
      if (nodePath.node.operator !== "*") {
        const newAst = t.binaryExpression(
          "*",
          nodePath.node.left,
          nodePath.node.right
        );
        nodePath.replaceWith(newAst);
      }
    }
  }
});

const { code } = transform(src, { plugins: [plugin] });
console.log(code); // --> 1 * 2;
