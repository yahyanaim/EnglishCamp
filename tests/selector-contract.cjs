const ts=require('typescript');
module.exports=function selectorContract(source,file){
 const ast=ts.createSourceFile(file,source,99,true,ts.ScriptKind.TSX),result=[];
 function visit(node){if(ts.isJsxElement(node)&&['select','SelectField'].includes(node.openingElement.tagName.getText(ast))){
  const attrs=node.openingElement.attributes.properties;
  const attr=name=>attrs.find(item=>ts.isJsxAttribute(item)&&item.name.text===name);
  const change=attr('onChange')||attr('onValueChange'),fn=change?.initializer?.expression;
  let handler='';if(fn&&ts.isArrowFunction(fn)){const parameter=fn.parameters[0].name.getText(ast);handler=fn.body.getText(ast).replace(new RegExp('\\b'+parameter+'\\.target\\.value\\b','g'),'value');if(parameter!=='value')handler=handler.replace(new RegExp('\\b'+parameter+'\\b','g'),'value');}
  result.push({value:attr('value')?.initializer?.getText(ast),disabled:attr('disabled')?.initializer?.getText(ast),handler,options:node.children.map(child=>child.getText(ast)).join('').trim()});
 }ts.forEachChild(node,visit);}visit(ast);return result;
};
