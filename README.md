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
- `credit`: Indicates whether the content is for credit.

You can also insert content between the opening and closing tags using the `slot` element. In this case, the slot is of type "credit".

For example:

```html
<div component="banner" amount="3" type="sponsored" category="technology" class="rwt" credit="true">
    <!-- Slot for custom content of type "credit" -->
    <slot name="credit"></slot>
</div>
```

### Before running the HTML page, add the following script in the `<head>` section:

If we want to support IE, use the following script:

```html
<script type="text/javascript">
    var isIE = (!!window.MSInputMethodContext && !!document.documentMode) || navigator.appVersion.indexOf("MSIE 10") !== -1;
    if (isIE) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'ie/styles.css';
      document.head.appendChild(link);

      var script = document.createElement('script');
      script.src = 'ie/script.js';
      document.head.appendChild(script);
    }
</script>
```

For other browsers, use:

```html
<!--[if !IE]> -->
<script src="src/main.js" type="module"></script>
<!-- <![endif]-->
```



