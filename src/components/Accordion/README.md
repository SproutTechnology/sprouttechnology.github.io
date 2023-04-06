# Accordion

This is just a concept for an accordion inspired by Kevin Powell.

## Features

### A11Y

The accordion is designed with accessibility in mind. Screen readers should work, as well as keyboard navigation. Further it also reduces motion for those who prefer that.

### Responsive

It's responsive and changes direction (column/row) depending on viewport size.

### Outline

When using keyboard navigation the focus outline is applied to the whole panel with the same color as the icon.

### Sprout specifics

Initially the icons were all round, but I thought it would be fun to make it in the shape of the Sprout logo. Also the panels try to use this behaviour, mainly on larger viewports, otherwise it will look strange when the icon "arrow" connects with a rounded parent corner.

## TODO

- Probably change the sprites svg to individual svg's and use that instead of `svgSpritesIconId`.

- `handlePanelClick` could probably be improved and use element properties instead.

- Make the button (header/title) enable navigation?

- Move icon colors from css to somewhere else (as it's just 5 static colors at the moment). This should somehow still be connected to the outline color.

- Use Tailwind in conjuction with css?

## Links

- [Modern UI icons](https://www.svgrepo.com/collection/modern-ui-icons)
- [Initial inspiration by Zed Dash](https://codepen.io/z-/pen/OBPJKK)
- [Extended inspiration by Kevin Powell](https://www.youtube.com/watch?v=WJERnXiFFug)
