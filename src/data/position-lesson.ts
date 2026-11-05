export const POSITION_WORDS = [
 {id:'in',label:'in / inside',group:'position',rule:'Within the boundaries of a place or container.',example:'The ball is in the box.',description:'A violet ball is enclosed by the sides of an open box.'},
 {id:'on',label:'on',group:'position',rule:'Touching and supported by a surface.',example:'The ball is on the table.',description:'A violet ball touches the top of a table.'},
 {id:'under',label:'under',group:'position',rule:'Lower than something, often directly beneath it.',example:'The ball is under the table.',description:'A violet ball sits directly beneath the table top.'},
 {id:'above',label:'above',group:'position',rule:'Higher than something; contact is not required.',example:'The ball is above the shelf.',description:'A violet ball floats higher than a shelf, with a visible gap.'},
 {id:'below',label:'below',group:'position',rule:'At a lower level than something else.',example:'The ball is below the shelf.',description:'A violet ball is lower than the shelf, with a visible gap.'},
 {id:'next-to',label:'next to / beside',group:'position',rule:'At the side of something, with little space between.',example:'The ball is next to the box.',description:'A violet ball sits immediately to the right of a box.'},
 {id:'between',label:'between',group:'position',rule:'In the space separating two reference objects.',example:'The ball is between the boxes.',description:'A violet ball sits in the middle of two boxes.'},
 {id:'behind',label:'behind',group:'position',rule:'At the back of something, from the viewer’s position.',example:'The ball is behind the box.',description:'The lower part of a violet ball is hidden by a box in front of it.'},
 {id:'in-front-of',label:'in front of',group:'position',rule:'On the nearer side of something, from the viewer’s position.',example:'The ball is in front of the box.',description:'A violet ball overlaps the front of a box and remains fully visible.'},
 {id:'opposite',label:'opposite',group:'position',rule:'Across from something, on the other side of a space.',example:'The ball is opposite the box, across the path.',description:'A violet ball and a box face each other on opposite sides of a path.'},
 {id:'near',label:'near',group:'position',rule:'Not far away; it does not have to be immediately beside.',example:'The ball is near the box.',description:'A violet ball sits a short distance from a box.'},
 {id:'outside',label:'outside',group:'position',rule:'Not within the boundaries of a place or container.',example:'The ball is outside the box.',description:'A violet ball sits beyond the right edge of an open box.'},
 {id:'up',label:'up',group:'movement',rule:'Towards a higher position.',example:'Move the ball up.',description:'A violet ball follows an arrow pointing upwards.'},
 {id:'down',label:'down',group:'movement',rule:'Towards a lower position.',example:'Move the ball down.',description:'A violet ball follows an arrow pointing downwards.'},
 {id:'into',label:'into',group:'movement',rule:'From outside to inside a place or container.',example:'Move the ball into the box.',description:'An arrow leads a violet ball from outside into an open box.'},
 {id:'out-of',label:'out of',group:'movement',rule:'From inside to outside a place or container.',example:'Move the ball out of the box.',description:'An arrow leads a violet ball from inside to outside an open box.'},
] as const;
export type PositionWord = typeof POSITION_WORDS[number];
export type PositionId = PositionWord['id'];
