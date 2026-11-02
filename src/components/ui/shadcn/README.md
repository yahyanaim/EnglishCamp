# EnglishCamp shadcn/ui primitives

These components are adapted from the official shadcn/ui New York registry and retain its MIT licence in LICENSE.md. Upstream source: https://ui.shadcn.com/r/styles/new-york/{name}.json (retrieved 30 October 2026).

This application deliberately retains React 18 and Tailwind CSS 3. Semantic colours in tailwind.config.ts reference aliases in globals.css, which in turn reference the existing EnglishCamp colours. There is no replacement palette or font. The existing secondary colour scale remains available alongside its new DEFAULT/foreground aliases.

The legacy Button, Card, Badge and Modal exports adapt these primitives, retaining their public props and visible placement. Text inputs and textareas in course activities and mock exams retain their labels, handlers, rows and persisted state. Radio and checkbox controls remain native. The shared `SelectField` adapter uses Radix Select for violet menu surfaces and keyboard focus, retaining the original option labels, values, disabled states and state-update behaviour.

Button variant/size `unstyled` supplies shared focus/disabled treatment while allowing established exam classes to control appearance and dimensions. `asChild` uses Radix Slot and introduces no extra layout element. The legacy animated Card wraps the forwarded card component without adding a nested DOM wrapper. Dialog uses Radix focus management, Escape/backdrop dismissal, the existing overlay colour and the existing content order.

Use the primitives through these existing adapters where possible. Any later registry additions should be reviewed against the existing Tailwind 3 configuration and EnglishCamp tokens. Do not rerun an initialisation command that replaces the application theme. Official compatibility guidance: https://v3.shadcn.com/docs/installation/next and https://ui.shadcn.com/docs/components-json.
