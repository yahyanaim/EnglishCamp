"""Render the exported grammar-reference JSON using the project's Nunito/DM Sans fonts.
Usage: python render-grammar-reference.py sections.json font-directory output.pdf
Requires reportlab. Font directory contains Nunito-700.ttf, DM-Sans-400.ttf, DM-Sans-700.ttf.
"""
import sys,json,re,hashlib
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
source,fontdir,target=map(Path,sys.argv[1:4])
for name,file in [('CampDisplay','Nunito-700.ttf'),('CampBody','DM-Sans-400.ttf'),('CampBold','DM-Sans-700.ttf')]:pdfmetrics.registerFont(TTFont(name,str(fontdir/file)))
sections=json.loads(source.read_text())
purple=colors.HexColor('#7E22CE');ink=colors.HexColor('#2F203A');muted=colors.HexColor('#5E5267');soft=colors.HexColor('#F3E8FF')
styles={
 'title':ParagraphStyle('title',fontName='CampDisplay',fontSize=23,leading=28,textColor=purple,spaceAfter=9),
 'intro':ParagraphStyle('intro',fontName='CampBody',fontSize=10,leading=15,textColor=muted,spaceAfter=13),
 'section':ParagraphStyle('section',fontName='CampDisplay',fontSize=16,leading=21,textColor=purple,spaceBefore=14,spaceAfter=10,keepWithNext=True),
 'heading':ParagraphStyle('heading',fontName='CampBold',fontSize=10.5,leading=15,textColor=ink,spaceAfter=4,keepWithNext=True),
 'body':ParagraphStyle('body',fontName='CampBody',fontSize=9.5,leading=14,textColor=ink,spaceAfter=7),
 'example':ParagraphStyle('example',fontName='CampBody',fontSize=9,leading=13,textColor=ink,backColor=soft,borderPadding=7,spaceBefore=5,spaceAfter=11,leftIndent=5,rightIndent=5),
 'note':ParagraphStyle('note',fontName='CampBody',fontSize=8.5,leading=12,textColor=muted,spaceAfter=6),
}
def clean(s):
 s=s.replace('→',' -> ').replace('–','-').replace('—',' - ').replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"').replace('\u2011','-').replace('…','...')
 return escape(re.sub(r' +',' ',s))
def para(s,style):return Paragraph(clean(s),styles[style])
flow=[para('Grammar reference','title'),para('EnglishCamp | Eleven practical reference sections','intro'),para('Rules, sentence forms and contextual examples. This English-language print edition uses the same reference data as the website. Arabic support remains available in the online examples.','body'),para('Topics: '+' | '.join(s['title'] for s in sections),'note')]
for section in sections:
 for index,item in enumerate(section['content']):
  block=([para(section['title'],'section')] if index==0 else []) + [para(item['title'],'heading'),para(item['formation'],'body')]
  for ex in item['examples']:block.append(para(ex['en'],'example'))
  for note in item.get('notes',[]):block.append(para(note,'note'))
  block.append(Spacer(1,5));flow.append(KeepTogether(block))
flow.append(para('Study reference. Examples are learning material, not examination-board questions.','note'))
def decorate(canvas,doc):
 canvas.saveState();w,h=A4;canvas.setStrokeColor(colors.HexColor('#E9DEF1'));canvas.line(42,h-30,w-42,h-30);canvas.setFont('CampBold',8);canvas.setFillColor(purple);canvas.drawString(42,h-23,'EnglishCamp');canvas.setFont('CampBody',8);canvas.setFillColor(muted);canvas.drawRightString(w-42,h-23,'Grammar reference');canvas.drawString(42,24,'EnglishCamp | Original study reference');canvas.drawRightString(w-42,24,f'Page {doc.page}');canvas.restoreState()
target.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(target),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=45,bottomMargin=42,title='EnglishCamp Grammar Reference',author='EnglishCamp',pageCompression=1)
doc.build(flow,onFirstPage=decorate,onLaterPages=decorate)
manifest={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pdfSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'sections':len(sections),'fonts':['Nunito','DM Sans'],'language':'English; online reference retains Arabic examples'}
target.with_suffix('.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(str(target))
