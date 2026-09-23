#!/usr/bin/env node
// Copyright (c) 未来飞马
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// Trademark Notice:
// The MPL-2.0 license grants copyright permissions for source code only.
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
