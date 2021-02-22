# url-builder-ts

RFC 3986 compliant URL builder written in TypeScript.

## Installation

```bash
npm install --save url-builder-ts
```

## Example Usage

```typescript
import { UrlBuilder } from "url-builder-ts";

const url = new UrlBuilder("https").setHost("localhost").setPort(8080).build();
```
