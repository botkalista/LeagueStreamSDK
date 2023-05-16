import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';


import type { TRCPApp } from '../../app/src/components/server/tRPC';

export const sdk = createTRPCProxyClient<TRCPApp>({
    links: [
        httpBatchLink({
            url: 'http://127.0.0.1:9123/trpc'
        })
    ],
});