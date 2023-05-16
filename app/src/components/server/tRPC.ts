
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const t = initTRPC.create();

export const tRpcRouter = t.router({
    currentPlayer: t.procedure.query(() => {
        console.log('CurrentPlayerCalled');
        return 123;
    })
});

export type TRCPApp = typeof tRpcRouter;

export const tRpcMiddleware = createExpressMiddleware({ router: tRpcRouter });

