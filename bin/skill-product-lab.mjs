#!/usr/bin/env node
// Copyright (c) 未来飞马
//
// Licensed under the MIT License. See LICENSE in the project root
// for the full license text.
//
// Trademark Notice:
// The MIT license grants copyright permissions for source code only.
// It does NOT grant any rights to use trademarks including "未来飞马",
// "Harness Loop", "RSI", and associated slogan "让AI进化提前发生，让AI落地快人一步".
// Any use of these trademarks requires separate written permission.
// skill-product-lab CLI 入口
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const script = resolve(__dirname, '..', 'lib', 'skill-product-lab.mjs');
const args = process.argv.slice(2);

const r = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
process.exit(r.status ?? 0);
