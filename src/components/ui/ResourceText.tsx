import { Fragment } from "react";
import { resourceParts } from "@/data/resource-links";
export function ResourceText({text}:{text:string}){return <>{resourceParts(text).map((part,i)=>part.url?<a key={i} className="camp-resource-link" href={part.url} target="_blank" rel="noreferrer">{part.text}</a>:<Fragment key={i}>{part.text}</Fragment>)}</>;}
