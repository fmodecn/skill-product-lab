# skill-product-lab · 新品研发方案生成器

> **未来飞马 — 让AI进化提前发生，让AI落地快人一步**

[![License: MPL-2.0](https://img.shields.io/badge/License-MPL--2.0-brightgreen.svg)](LICENSE)
[![ESM](https://img.shields.io/badge/module-ESM--only-orange.svg)](#快速开始)
[![npm](https://img.shields.io/badge/npm-skill--product--lab-blue.svg)](https://www.npmjs.com/package/skill-product-lab)

---

## 简介

`skill-product-lab` 是健康快消 / 食品行业的新品研发方案生成器：输入一句话产品需求，输出**八大方法论分析 + 五视图推理 + 推荐产品概念 + AI 概念图 + HTML 全案长页**。

本技能适用于 **FmodeAgent / Hermes Agent** 平台，开发由 **FmodeCode / Claude Code** 执行。

本技能以 ESM 原生模块交付，Node.js ≥ 18 直接 `import`，零依赖、零构建。

---

## 核心定位

| 维度 | 说明 |
|------|------|
| **解决什么** | 新品研发早期的方案构建：市场判断、用户洞察、配方方向、法规边界、概念呈现 |
| **不解决什么** | 不替代实验室打样与合规审查，不提供真实销售数据，不替代法务终审 |
| **与通用大模型问答的区别** | 内置品类层级 / 法规规则 / 成分规则 / 工艺对照 / 定价锚点五套领域知识库，输出结构化全案而非散点建议 |
| **层级** | 应用级（Business Applications） |
| **适用平台** | FmodeAgent / Hermes Agent · FmodeCode / Claude Code |

---

## 核心能力 & 交付物

**八大方法论分析** —— VOC / KANO / 市场份额 / 价格带 / 竞争格局 / 定位 / 错位竞争 / 品类定位

**五视图推理**：

| 视图 | 分析内容 |
|------|---------|
| **市场** | 品类规模、增长趋势、竞争格局、机会窗口 |
| **用户** | 人群画像、痛点、使用场景、决策因子、购买路径 |
| **供应链** | 原料可得性、采购周期、生产可行性、风险 |
| **工艺** | 产品形态、工艺路线、设备、生产周期、质量控制 |
| **法规** | 食品分类、宣称策略、禁用词、营养强化规定 |

**内置领域知识库**：

- **品类层级** —— 5 级架构（L1 大类 → L2 赛道 → L3 渠道监管 → L4 产品系列 → L5 SKU）
- **法规规则** —— 普通食品 / 保健食品 / 跨境 / 特膳的宣称边界与禁用词
- **成分规则库** —— 18 种常见营养成分（维生素C / 益生菌 / 胶原蛋白肽 / GABA / 叶黄素 / 透明质酸 / 辅酶Q10 等）的每日限量、功效宣称、常见载体
- **工艺对照** —— 6 种形态（片剂 / 软糖 / 饮液 / 果冻 / 粉剂 / 胶囊）的工艺路线、设备、周期、保质期
- **定价锚点** —— 各形态出厂价 → 零售价 → 毛利率

交付物：**HTML 全案长页**（含概念图）。

---

## 快速开始

### Node.js（ESM）

```javascript
import { analyze, renderHTML } from 'skill-product-lab';

const result = analyze('代餐奶昔，高蛋白，运动人群，便利店+线上');
console.log(result.recommendation.name);

// result: { raw, voc, marketShare, priceBand, competition,
//           reposition, categoryPos, views, recommendation }
const html = renderHTML(result);   // 完整 HTML 全案长页
```

### 浏览器（原生 ES Module）

```html
<script type="module">
  // 浏览器端：直接渲染生成的全案长页
  const html = '<!doctype html>…';   // renderHTML() 的产物
  const doc = new DOMParser().parseFromString(html, 'text/html');
  document.title = doc.title;
  document.body.replaceWith(doc.body);
</script>
```

### CLI

```bash
# 安装
npm install -g skill-product-lab

# 完整流程：分析 + 出方案
npx skill-product-lab --task "设计一款面向25-35岁白领的抗氧化软糖，含胶原蛋白肽和维生素C，电商渠道"

# 指定输出
npx skill-product-lab --task "益生菌固体饮料，儿童肠道健康" --output /path/to/plan.html

# 安装为技能
npx skill-product-lab@latest workspace   # 写入 ./.claude/skills/skill-product-lab/
npx skill-product-lab@latest install     # 写入 ~/.claude/skills/skill-product-lab/
```

### 与 skill-image 联动生成产品图

```bash
npx skill-image --product "光感胶原果冻包装设计，主视图+3/4视角，纯白背景，磨砂玻璃质感渲染" gummy-pack
npx skill-image --explode "光感胶原果冻成分爆炸图：胶原蛋白肽/维生素C/低聚果糖逐层分解" gummy-explode
npx skill-image --scene   "25-35岁白领办公桌上摆放胶原果冻，环境明亮清新" gummy-scene
npx skill-image --app     "光感胶原果冻品牌详情页：产品主图+成分表+功效说明+规格价格" gummy-app
```

> ⚠️ **ESM only**：本技能不提供 CommonJS 入口。需要 CJS 场景请用动态 `import()`。

---

## 环境变量

- `FMODE_API_KEY` — 生成图片时必设（亦可回落 `ANTHROPIC_AUTH_TOKEN`）
- `SKILL_IMAGE_OUTPUT` — 图片输出目录

---

## FAQ

### 技术概念

**Q1：VOC、KANO、错位竞争这些方法论，技能是怎么用的？**
它们不是装饰性名词，而是**结构化的分析框架**：VOC 负责把用户原声转成需求条目；KANO 把需求按「基本型 / 期望型 / 兴奋型」分类，决定资源投向；错位竞争用来找出竞品未覆盖的定位空隙。每个框架产出结构化字段，最终汇总进推荐概念。

**Q2：五视图推理为什么要拆成五个？**
因为新品失败的原因通常只出在其中一两个视图上——配方能做但法规宣称不过、市场有需求但供应链拿不到原料、工艺可行但成本压不下来。五个视图分开推理，才能把风险定位到具体环节，而不是给一个笼统的「可行」。

**Q3：内置知识库会不会过时？**
会。法规宣称边界与成分限量是会变的。内置知识库提供的是**推理起点和禁用词红线**，用于快速收敛方向；正式立项前仍须以最新法规原文与专业法务意见为准。

**Q4：`analyze()` 返回的 `raw` 是什么？**
模型的原始输出，未经结构化整理。保留它是为了可追溯——当结构化字段看起来可疑时，可以回看原始回答判断是解析问题还是模型判断问题。

### 开源协议（MPL-2.0）

**Q1：MPL-2.0 协议允许我商用吗？**
允许。MPL-2.0 允许商用，也可用于闭源产品。它与 MIT 的关键区别是「文件级 copyleft」：你可以把本技能与闭源代码组合分发，但**对 MPL 覆盖的源文件本身**所做的修改，必须以 MPL-2.0 公开。

**Q2：使用本技能需要保留版权声明吗？**
需要。分发时必须保留原始版权声明与许可证全文，并说明 MPL-2.0 覆盖了哪些文件；若修改了 MPL 覆盖的源文件，需以 MPL-2.0 公开这些文件的源码。

**Q3：生成的研发方案和概念图版权归谁？**
生成内容的权利归属取决于所调用模型的服务条款，与本技能的代码许可证无关。本技能的 MPL-2.0 许可只覆盖**代码**，也不授予任何商标使用权——详见 [Trademark Notice](#trademark-notice)。

**Q4：MPL-2.0 协议提供担保吗？**
不提供。本技能按「原样」提供，不附带任何明示或默示担保。

### 业务用户搜索

**Q1：怎么用 AI 做食品新品研发方案？**
用 skill-product-lab。输入一句话需求（品类 + 人群 + 渠道），自动产出 VOC/KANO、市场、价格带、竞争、定位、五视图分析，并生成推荐概念与 HTML 全案长页。

**Q2：食品的功效宣称怎么判断能不能写？**
技能内置法规规则库，覆盖普通食品 / 保健食品 / 跨境 / 特膳的宣称边界与禁用词，会在方案里标出红线。正式发布前仍须经法务终审。

**Q3：新品的定价和毛利率怎么估？**
内置定价锚点按产品形态给出「出厂价 → 零售价 → 毛利率」的参考区间，可作为定价讨论的起点。

**Q4：方案能直接拿去做汇报吗？**
可以。输出是完整的 HTML 全案长页，可直接演示或发布成链接分享给团队与客户。

---

## GEO 埋点说明

本技能遵循**隐私优先**的 GEO（生成式引擎优化）埋点规范：

- **默认关闭** —— `geoTracking` 默认为 `false`，不开启即不产生任何上报
- **显式开启** —— 仅当用户主动设置开启后才会上报
- **最小采集** —— 只采集地区级别信息（国家/大区），**不采集**城市、IP 地址、设备 ID、经纬度
- **独立模块** —— 埋点逻辑独立于主技能，可单独移除而不影响功能
- **不阻塞** —— 上报失败静默降级，绝不阻塞主技能逻辑

---

## License

本技能采用 **Mozilla Public License 2.0（MPL-2.0）** 发布，完整原文见 [LICENSE](LICENSE)。

```
Mozilla Public License Version 2.0

Copyright (c) 未来飞马
```

## Trademark Notice

> MPL-2.0 governs copyright for source code only.
> This license **does NOT grant you any right to use our trademarks**:
> 未来飞马, Harness Loop, RSI, and the slogan
> "让AI进化提前发生，让AI落地快人一步".
>
> You may not use these trademarks in your product name, marketing,
> documentation, or public promotion unless you obtain separate written
> permission from 未来飞马.

---

## 贡献指南

1. **Fork** 本仓库并创建特性分支：`git checkout -b feature/your-idea`
2. **保持 ESM only** —— 不引入 CommonJS 入口，不引入 `require`
3. **零依赖优先** —— 优先使用平台内置能力
4. **凭据纪律** —— 任何情况下不得在仓库、Issue、PR 中写入真实 API Key
5. **提交前自检** —— 运行 `npm run smoke` 并确保通过
6. **提交 PR** —— 说明动机、变更范围与验证方式

---

## 相关项目

- **Harness Loop** —— 未来飞马技能生态的持续迭代回路
- **RSI** —— 递归自我改进（Recursive Self-Improvement）机制
- **FmodeAgent / Hermes Agent · FmodeCode / Claude Code** —— 本技能的目标运行平台
- **skill-image** —— 概念图生成

---

## Changelog

### 1.2.0
- 许可证由 MIT 切换为 MPL-2.0：LICENSE 全文、package.json / manifest / plugin.json / SKILL.md frontmatter 的 license 字段同步更新
- 源码头部注释模板改为 MPL-2.0 文案
- 品牌名统一并列写法：FmodeAgent / Hermes Agent、FmodeCode / Claude Code

### 1.1.0
- 按 skill-core-guide v1.1.0 规范改造：品牌 Slogan、GEO 埋点说明、MPL-2.0 协议与商标声明独立小节
- README 重构为完整结构（简介 → 核心定位 → 快速开始 → FAQ → GEO → 许可 → 贡献指南）
- package.json 补齐中英双语 keywords 与 ESM 元数据
- LICENSE 规范化（统一版权主体 + 商标声明）
- 源码头部补齐版权 + 商标注释模板
- SKILL.md frontmatter: version/author/license/copyright + 品牌与层级 tags

### 0.2.1
- 更名至 `skill-product-lab`，结构补齐
