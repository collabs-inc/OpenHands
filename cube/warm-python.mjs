import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
const scripts = path.join(process.argv[2], 'node_modules/@openhands/agent-canvas/scripts');
const { buildAgentServerCommand } = await import(pathToFileURL(path.join(scripts, 'dev-safe.mjs')));
const { buildAutomationCommand } = await import(pathToFileURL(path.join(scripts, 'dev-with-automation.mjs')));
for (const build of [buildAgentServerCommand, buildAutomationCommand]) {
  const { command, args } = build({});
  const result = spawnSync(command, [...args, '--help'], { env: process.env, stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Could not prepare OpenHands Python runtime.');
}
