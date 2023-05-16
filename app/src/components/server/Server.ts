
import { app } from "./Express";

import { corePath, proc } from './SSR';
const port = process.env.PORT || 9123;

console.log(corePath, proc.pid);

export function listen() {
    return app.listen(port, () => console.log(`Listening on port ${port}`));
}
