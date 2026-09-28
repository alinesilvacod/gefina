import { ServerResponse } from 'node:http';

export default function send
(response: ServerResponse,
statuscode:number,
body: unknown
 ): void {
response.writeHead(
    statuscode,
    {'content-type': 'application/json'}
);
response.end(JSON.stringify(body));
}