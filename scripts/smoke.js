#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILL_DIR = path.join(ROOT, 'skills', 'skill-product-lab');

function fail(msg) { console.error('SMOKE FAIL: ' + msg); process.exit(1); }

// 1. 包结构
if (!fs.existsSync(path.join(SKILL_DIR, 'SKILL.md'))) fail('missing skills/skill-product-lab/SKILL.md');
for (const rel of ['bin/skill-product-lab.mjs', 'lib/skill-product-lab.mjs', 'skill-package-manifest.json', '.claude-plugin/plugin.json']) {
  if (!fs.existsSync(path.join(ROOT, rel))) fail('missing ' + rel);
}

// 2. 元数据一致性：包名/版本/bin 三处对齐
const readJSON = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const pkg = readJSON('package.json');
const manifest = readJSON('skill-package-manifest.json');
const plugin = readJSON('.claude-plugin/plugin.json');
if (pkg.name !== 'skill-product-lab') fail('package.json name should be skill-product-lab, got ' + pkg.name);
if (manifest.name !== 'skill-product-lab') fail('manifest name should be skill-product-lab, got ' + manifest.name);
if (plugin.name !== 'skill-product-lab') fail('plugin.json name should be skill-product-lab, got ' + plugin.name);
if (manifest.version !== pkg.version) fail(`version mismatch: manifest ${manifest.version} vs package ${pkg.version}`);
if (plugin.version !== pkg.version) fail(`version mismatch: plugin ${plugin.version} vs package ${pkg.version}`);
if (!pkg.bin || !pkg.bin['skill-product-lab']) fail('package.json bin should expose skill-product-lab');

// 3. 无残留旧名（模式由片段拼出，避免本文件自匹配）
//    版本历史里 "更名 old → new" 这类记录是有意保留的，不计为残留。
const OLD_NAME = ['fmode', 'product', 'lab'].join('-');
const OLD_RE = new RegExp(OLD_NAME);
const RENAME_NOTE = /更名|renamed/i;
const stale = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!/\.(js|mjs|json|md)$/.test(entry.name)) continue;
    const lines = fs.readFileSync(full, 'utf8').split('\n');
    if (lines.some(l => OLD_RE.test(l) && !RENAME_NOTE.test(l))) stale.push(path.relative(ROOT, full));
  }
})(ROOT);
if (stale.length) fail(`stale "${OLD_NAME}" references in: ` + stale.join(', '));

// 4. 模块导出（SKILL.md 承诺的组件式调用）
const mod = await import(pathToFileURL(path.join(ROOT, 'lib', 'skill-product-lab.mjs')).href);
for (const fn of ['analyze', 'renderHTML']) {
  if (typeof mod[fn] !== 'function') fail('export ' + fn + ' is not a function');
}

// 5. analyze() 输出契约：九个板块齐全
const d = mod.analyze('面向25-35岁白领的抗氧化胶原蛋白软糖，含VC，电商渠道');
for (const key of ['raw', 'voc', 'marketShare', 'priceBand', 'competition', 'reposition', 'categoryPos', 'views', 'recommendation']) {
  if (d[key] === undefined) fail('analyze() result missing ' + key);
}
if (!d.recommendation || !d.recommendation.name) fail('analyze() recommendation has no name');
for (const view of ['market', 'user', 'supply', 'process', 'regulation']) {
  if (!d.views[view]) fail('analyze() views missing ' + view);
}

// 6. renderHTML() 产出可用的完整 HTML
const html = mod.renderHTML(d);
if (typeof html !== 'string' || html.length < 500) fail('renderHTML() returned too little content');
if (!/^<!DOCTYPE html>/i.test(html.trim())) fail('renderHTML() output is not a full HTML document');
if (!html.includes(d.recommendation.name)) fail('renderHTML() does not mention the recommended product');

console.log('SMOKE OK: skill-product-lab package structure + metadata + exports + analyze contract + HTML render verified');
