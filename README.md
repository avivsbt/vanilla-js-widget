# Recommendation Widget

## Actions

### Installation:
1. Clone the project.
2. Run `npm install`.

### Local Development:
1. Run `npm run dev`.

### Running Tests:
1. Run `npm run test`.

### Building for Production:
1. Run `npm run build`.

---

### Edit Online:
[Edit this project online on StackBlitz](https://stackblitz.com/~/github.com/avivsbt/vanilla-js-widget)

---

### Adding a New Banner by the System

To add a new banner, we need to provide an HTML element with the following attributes:

- `component`: Mandatory identifier for the component.
- `amount`: The number of ads in the banner.
- `type`: The type of banner, must be "sponsored".
- `category`: The category of the banner.
- `class`: Mandatory class "rwt".

For example:

```html
<div component="banner" amount="3" type="sponsored" category="technology" class="rwt">
    <!-- Banner content goes here -->
</div>
