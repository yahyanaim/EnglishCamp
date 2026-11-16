/** Owner-requested export of the visible page; neutralizes spreadsheet formulas in names. */
export function adminCsv(rows:unknown[][]){return '\uFEFF'+rows.map(row=>row.map(value=>{let text=String(value??'');if(/^[\s]*[=+@-]|^[\t\r\n]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}).join(',')).join('\r\n');}
