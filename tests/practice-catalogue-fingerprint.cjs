const ts=require('typescript');
module.exports=source=>{
 const ast=ts.createSourceFile('practice.tsx',source,99,true,ts.ScriptKind.TSX),printer=ts.createPrinter({removeComments:true}),out={};
 function visit(n){if(ts.isVariableDeclaration(n)&&['CATEGORIES','TRAINER_COMPONENTS'].includes(n.name.text))out[n.name.text]=printer.printNode(ts.EmitHint.Expression,n.initializer,ast);ts.forEachChild(n,visit)}visit(ast);return out;
};
