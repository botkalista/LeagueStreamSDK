
import child from 'node:child_process';
import path from 'node:path';

export const corePath = path.join(__dirname, '../../../../', 'core');

export const proc = child.exec(`npm run dev -- --host 127.0.0.1 --port 9000`, { cwd: corePath });

proc.stdout?.on('data', e => console.log('[VITE]', e.toString()));
proc.stderr?.on('data', e => console.error('[VITE]', e.toString()));
