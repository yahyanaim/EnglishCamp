const ts=require('typescript');
// The shared shadcn wrappers render the same div/button tags; compare the full teaching logic.
module.exports=function normalize(source,file){
 source=source.replace(/import \{[^\n]*\} from "@\/components\/ui\/PracticeSurface";\n/g,'')
 .replace(/const MotionPracticeButton = motion.create\(PracticeButton\);\n/g,'')
 .replace(/\bMotionPracticeButton\b/g,'motion.button').replace(/\bPracticeButton\b/g,'button').replace(/\bPracticeCard\b/g,'div');
 const ast=ts.createSourceFile(file,source,99,true,ts.ScriptKind.TSX);
 const result=ts.transform(ast,[ctx=>root=>{
  function visit(n){
   if(ts.isJsxAttribute(n)&&n.name.text==='className')return undefined;
   // Class-valued option-state strings and metadata affect presentation only.
   if((ts.isStringLiteralLike(n)||ts.isTemplateHead(n)||ts.isTemplateMiddle(n)||ts.isTemplateTail(n))&&/(?:bg|text|border|ring|rounded|shadow)-/.test(n.text)){
    if(ts.isStringLiteralLike(n))return ts.factory.createStringLiteral('<classes>');
   }
   return ts.visitEachChild(n,visit,ctx);
  }return ts.visitNode(root,visit);
 }]);
 const text=ts.createPrinter({removeComments:true}).printFile(result.transformed[0]);result.dispose();return text;
};
