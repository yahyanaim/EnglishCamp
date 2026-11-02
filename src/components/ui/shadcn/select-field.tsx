"use client";
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const EMPTY = "__camp_empty_option__";
type Choice = { value: string; label: React.ReactNode; disabled?: boolean };
function choices(children: React.ReactNode): Choice[] {
  return React.Children.toArray(children).flatMap(child => {
    if (!React.isValidElement<{ value?: string | number; disabled?: boolean; children?: React.ReactNode }>(child)) return [];
    if (child.type === React.Fragment) return choices(child.props.children);
    return [{ value: String(child.props.value ?? ""), label: child.props.children, disabled: child.props.disabled }];
  });
}
function textLabel(node: React.ReactNode): string {
  return React.Children.toArray(node).map(child => typeof child === "string" || typeof child === "number" ? String(child) : React.isValidElement<{children?: React.ReactNode}>(child) ? textLabel(child.props.children) : "").join("");
}
type Props = {
  value?: string | number; defaultValue?: string | number; onValueChange?: (value: string) => void;
  children: React.ReactNode; className?: string; style?: React.CSSProperties; id?: string; name?: string; title?: string;
  disabled?: boolean; required?: boolean; "aria-label"?: string; "aria-labelledby"?: string; "aria-describedby"?: string;
};

/** A Radix-backed violet selector. The authored option labels and values are retained. */
export function SelectField({ value, defaultValue, onValueChange, children, className, style, id, name, title, disabled, required, ...aria }: Props) {
  const options = choices(children);
  const [localValue, setLocalValue] = React.useState(String(defaultValue ?? options[0]?.value ?? ""));
  const current = value === undefined ? localValue : String(value);
  const currentOption = options.find(option => option.value === current);
  return <Select.Root value={current || EMPTY} name={name} disabled={disabled} required={required} onValueChange={next => {
    const selected = next === EMPTY ? "" : next; setLocalValue(selected); onValueChange?.(selected);
  }}>
    <Select.Trigger style={style} id={id} title={title} className={cn("camp-select-trigger", className)} {...aria} aria-label={aria["aria-label"] || (aria["aria-labelledby"] ? undefined : title || textLabel(currentOption?.label) || "Choose an option")}>
      <Select.Value>{currentOption?.label ?? "Choose an option"}</Select.Value><Select.Icon asChild><ChevronDown size={16} aria-hidden="true" /></Select.Icon>
    </Select.Trigger>
    <Select.Portal><Select.Content position="popper" sideOffset={6} collisionPadding={12} className="camp-select-menu">
      <Select.ScrollUpButton className="camp-select-scroll"><ChevronUp size={15} /></Select.ScrollUpButton>
      <Select.Viewport className="camp-select-viewport">{options.map(option => <Select.Item className="camp-select-option" key={option.value} value={option.value || EMPTY} disabled={option.disabled}>
        <Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator><Check size={15} /></Select.ItemIndicator>
      </Select.Item>)}</Select.Viewport>
      <Select.ScrollDownButton className="camp-select-scroll"><ChevronDown size={15} /></Select.ScrollDownButton>
    </Select.Content></Select.Portal>
  </Select.Root>;
}
