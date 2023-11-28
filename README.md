![ts](https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge)
![js](https://img.shields.io/badge/Javascript-f68333?style=for-the-badge)
![vue](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flekrat%2Flkt-paginator%2Fmaster%2Fpackage.json&query=%24.dependencies.vue&style=for-the-badge&label=vue&color=42b883)
![node](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Flekrat%2Flkt-paginator%2Fmaster%2Fpackage.json&query=%24.engines.node&style=for-the-badge&label=node&color=026e00)

LKT Paginator is a library for automatically load result pages from an HTTP API.

# Requirements
- Work with [LKT HTTP Client](https://github.com/lekrat/lkt-http-client) resources.

# Installation

With npm

```bash
npm i -S lkt-paginator
```

Load into your Vue App:

```typescript
import {createApp} from "vue";
import LktPaginator from 'lkt-paginator';

const app = createApp({});

app.use(LktPaginator);

// Alternatively, load updating button texts:
app.use(LktPaginator, {
    firstButtonName: 'First', // Default value
    prevButtonName: 'Prev', // Default value
    nextButtonName: 'Next', // Default value
    latestButtonName: 'Last' // Default value
});
```

# Usage

```typescript
export default {
    name: "YourComponent", 
    inheritAttrs: false,
    data() {
        return {
            page: 1,
            filters: {
                name: 'john'
            }
        }
    }
}
```

```vue
<lkt-paginator v-model="page" :filters="filters" resource="get-results-resource"></lkt-paginator>
```

## Props
### v-model
- Type: Integer

Current page number.

### filters
- Type: Object

Object keys will be passed as arguments to the resource.

### resource
- Type: String

The resource name to be called.

### palette
- Type: String

A palette name. It will add a new css selector, so you easily can have multiple styles.

### readOnly
- Type: Boolean

If true, the paginator won't perform any HTTP call.


# Stylesheet

This package includes one pure CSS stylesheet.

