"""Render the exported grammar-reference JSON using the project's Nunito/DM Sans fonts.
Usage: python render-grammar-reference.py sections.json font-directory output.pdf [positions.json]
Requires reportlab. Font directory contains Nunito-700.ttf, DM-Sans-400.ttf, DM-Sans-700.ttf.
"""
import sys,json,re,hashlib
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,KeepTogether,Table,TableStyle,PageBreak
from reportlab.graphics.shapes import Drawing,Group,Circle,Rect,Line,String
from reportlab.graphics.svgpath import SvgPath
from xml.etree import ElementTree
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
source,fontdir,target=map(Path,sys.argv[1:4])
for name,file in [('CampDisplay','Nunito-700.ttf'),('CampBody','DM-Sans-400.ttf'),('CampBold','DM-Sans-700.ttf')]:pdfmetrics.registerFont(TTFont(name,str(fontdir/file)))
sections=json.loads(source.read_text())
positions=json.loads(Path(sys.argv[4]).read_text()) if len(sys.argv)>4 else []
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

def vector(svg):
 drawing=Drawing(208,112)
 flipped=Group();flipped.transform=(1,0,0,-1,0,112)
 def add(node,parent,inherited=None):
  inherited=inherited or {}
  style={**inherited,**{k:v for k,v in node.attrib.items() if k in ['fill','stroke','stroke-width','opacity','stroke-dasharray']}}
  tag=node.tag.split('}')[-1]
  if tag in ['svg','g']:
   group=Group();parent.add(group)
   for child in node:add(child,group,style)
   return
  if tag not in ['path','circle']:return
  fill=None if style.get('fill')=='none' else colors.HexColor(style.get('fill','#000000'))
  shape=SvgPath(node.attrib['d'],fillColor=fill,strokeColor=None if style.get('stroke','none')=='none' else colors.HexColor(style['stroke'])) if tag=='path' else Circle(float(node.attrib['cx']),float(node.attrib['cy']),float(node.attrib['r']))
  shape.fillColor=None if style.get('fill')=='none' else colors.HexColor(style.get('fill','#000000'))
  shape.strokeColor=None if style.get('stroke','none')=='none' else colors.HexColor(style['stroke'])
  shape.strokeWidth=float(style.get('stroke-width',1))
  opacity=float(style.get('opacity',1));shape.fillOpacity=opacity;shape.strokeOpacity=opacity
  if style.get('stroke-dasharray'):shape.strokeDashArray=[float(n) for n in style['stroke-dasharray'].split()]
  parent.add(shape)
 add(ElementTree.fromstring(svg),flipped);drawing.add(flipped);return drawing

def position_lesson():
 blocks=[PageBreak(),para('Position and movement','section'),para('Follow the violet ball. Position words tell us where something is; movement words tell us where it goes.','body')]
 for group,title in [('position','Where is it?'),('movement','Where does it go?')]:
  blocks.append(para(title,'heading'))
  cards=[]
  for item in positions:
   if item['group']!=group:continue
   cards.append([vector(item['svg']),para(item['label'],'heading'),para(item['rule'],'body'),para(item['example'],'example')])
  rows=[cards[i:i+2] for i in range(0,len(cards),2)]
  for row in rows:
   table=Table([row],colWidths=[255.5,255.5],hAlign='LEFT')
   table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BOX',(0,0),(-1,-1),.5,colors.HexColor('#E9DEF1')),('INNERGRID',(0,0),(-1,-1),.5,colors.HexColor('#E9DEF1')),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),10)]))
   blocks.append(table)
  blocks.append(Spacer(1,12))
 blocks.extend([para('Notice the difference','heading'),para('On requires contact with a surface; above only means higher. Under often means directly beneath something; below compares levels. In describes position; into describes movement.','body')])
 return blocks

def noun_diagram():
 d=Drawing(360,62)
 for x in [24,194,232,270]:
  d.add(Rect(x,19,26,34,rx=3,ry=3,fillColor=soft,strokeColor=purple,strokeWidth=1))
  for y in [43,36,29]:d.add(Line(x+5,y,x+21,y,strokeColor=purple,strokeWidth=1))
 d.add(Line(124,36,157,36,strokeColor=purple,strokeWidth=1))
 d.add(String(8,3,'One book is here.',fontName='CampBody',fontSize=9,fillColor=ink))
 d.add(String(173,3,'Three books are here.',fontName='CampBody',fontSize=9,fillColor=ink))
 return d

flow=[para('Grammar reference','title'),para(f'EnglishCamp | {len(sections)} practical reference sections','intro'),para('Rules, sentence forms and contextual examples. This English-language print edition uses the same reference data as the website. Includes illustrated position and movement words.','body'),para('Topics: '+' | '.join(s['title'] for s in sections),'note')]
for section in sections:
 for index,item in enumerate(section['content']):
  block=([para(section['title'],'section')]+([noun_diagram()] if section['id']=='singular-and-plural' else []) if index==0 else []) + [para(item['title'],'heading'),para(item['formation'],'body')]
  for ex in item['examples']:block.append(para(ex['en'],'example'))
  for note in item.get('notes',[]):block.append(para(note,'note'))
  block.append(Spacer(1,5));flow.append(KeepTogether(block))
if positions:flow.extend(position_lesson())
flow.append(para('Study reference. Examples are learning material, not examination-board questions.','note'))
def decorate(canvas,doc):
 canvas.saveState();w,h=A4;canvas.setStrokeColor(colors.HexColor('#E9DEF1'));canvas.line(42,h-30,w-42,h-30);canvas.setFont('CampBold',8);canvas.setFillColor(purple);canvas.drawString(42,h-23,'EnglishCamp');canvas.setFont('CampBody',8);canvas.setFillColor(muted);canvas.drawRightString(w-42,h-23,'Grammar reference');canvas.drawString(42,24,'EnglishCamp | Original study reference');canvas.drawRightString(w-42,24,f'Page {doc.page}');canvas.restoreState()
target.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(target),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=45,bottomMargin=42,title='EnglishCamp Grammar Reference',author='EnglishCamp',pageCompression=1)
doc.build(flow,onFirstPage=decorate,onLaterPages=decorate)
manifest={'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pdfSha256':hashlib.sha256(target.read_bytes()).hexdigest(),'sections':len(sections),'fonts':['Nunito','DM Sans'],'language':'English','positionDiagrams':len(positions),'positionSourceSha256':hashlib.sha256(Path(sys.argv[4]).read_bytes()).hexdigest() if positions else None}
target.with_suffix('.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(str(target))
