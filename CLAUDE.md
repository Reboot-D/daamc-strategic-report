# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个香港稳定币监管法规解读的Web应用项目，将复杂的法律条文转换为用户友好的在线界面。项目采用现代前端技术栈，提供清晰的条款解读和合规操作指引。

## 技术架构

### 核心技术栈
- **前端**: 原生 HTML/CSS/JavaScript (无框架依赖)
- **架构模式**: 单页应用 (SPA) 
- **数据管理**: 客户端 JavaScript 对象存储章节数据
- **样式方案**: 原生 CSS，采用响应式设计

### 项目结构
```
├── index.html          # 主应用入口和框架
├── app.js              # 核心应用逻辑和章节渲染
├── style.css           # 全局样式和组件样式  
├── chapters/           # 静态HTML章节文件 (备用)
├── docs/               # 项目文档
│   └── prd.md         # 产品需求文档
└── *.md                # 原始法律条文markdown文件
```

### 核心功能模块
- **导航系统** (`app.js:468-490`): 章节间导航和状态管理
- **内容渲染** (`app.js:384-465`): 动态章节内容渲染  
- **数据层** (`app.js:161-381`): 章节数据存储和检索
- **响应式布局** (`app.js:68-86`): 移动端适配

## 开发命令

### 本地开发
```bash
# 启动本地HTTP服务器 (推荐Python)
python -m http.server 8000

# 或使用Node.js
npx http-server

# 然后访问 http://localhost:8000
```

### 代码检查
```bash
# 检查JavaScript语法
node -c app.js

# 验证HTML结构
# 使用在线工具或IDE插件检查
```

### 部署验证
```bash
# 检查所有文件是否存在
ls -la *.html *.css *.js

# 验证章节文件完整性
ls -la *.md | wc -l  # 应该显示11个markdown文件
```

## BMad Method工作流程

本项目已集成BMad Method智能体工作流系统，提供结构化的开发流程：

### 核心命令
- `/bmad-orchestrator *help` - 启动BMad工作流指导系统，获取完整的智能体和任务列表
- `/bmad-orchestrator *agent` - 查看可用的专业智能体（分析师、产品经理、架构师、开发者、QA等）
- `/bmad-orchestrator *workflow` - 探索可用的工作流程选项

### 主要智能体
- `/analyst` - 市场研究、竞品分析、项目简报创建
- `/pm` - 产品需求文档(PRD)创建和管理
- `/architect` - 技术架构设计
- `/dev` - 开发实施
- `/qa` - 质量保证和测试
- `/po` - 产品负责人，文档协调和Epic/Story管理
- `/ux-expert` - 用户体验设计

## 文档结构

### 主要文档文件
- `1.md` - `9.md`: 九个主要章节，包含详细的法律条款解读
- `4a.md`, `4b.md`: 第4章的两个子部分 (客户尽职审查)
- `6a.md`, `6b.md`: 第6章的两个子部分 (记录保存)
- `structure.md`: 定义了项目的HTML实现结构，描述了如何将markdown内容转换为web界面
- `law-firm.md`: 附加的法律事务所相关内容

### 内容特点
- 每个文档都包含详细的"条款解读"、"概念说明"和"合规操作指引"
- 文档采用中文简体编写
- 内容专注于香港金管局发布的稳定币反洗钱指引
- 包含具体的法律条款编号和详细分析

### 复合章节
根据`structure.md`，以下章节需要合并处理：
- Chapter 4: 包含 `4a.md` + `4b.md` 内容
- Chapter 6: 包含 `6a.md` + `6b.md` 内容

## 项目目标

该项目旨在将复杂的法律监管文档转换为结构化的web界面，便于查阅和理解香港稳定币发行人的反洗钱合规要求。

## 关键开发注意事项

### 章节数据结构
- `app.js` 中的 `getChapterData()` 函数包含所有章节的硬编码数据
- 每个章节包含: `title`, `subtitle`, `description`, `articles[]`
- 每个条款包含: `number`, `content`, `interpretation`, `concepts`, `compliance[]`

### 前端架构要点
- **无构建工具**: 项目使用原生 HTML/CSS/JS，无需构建步骤
- **数据驱动**: 所有内容通过 JavaScript 对象动态渲染，便于维护
- **响应式优先**: CSS 采用移动优先的响应式设计
- **SEO考虑**: 虽为SPA，但可通过服务端渲染提升SEO (如需要)

### 工作流程建议

#### 法律文档处理
1. **文档修改**: 在修改任何 `.md` 文件时，需要注意保持中文表达的准确性和法律术语的专业性
2. **数据同步**: 修改markdown文件后，需要同步更新 `app.js` 中的对应数据
3. **结构维护**: 修改文档结构时需同步更新 `structure.md`
4. **内容一致性**: 确保所有章节的格式和结构保持一致

#### 前端开发流程
1. **本地预览**: 使用HTTP服务器进行本地开发和测试
2. **代码验证**: 定期检查JavaScript语法和HTML结构
3. **响应式测试**: 在不同设备尺寸下测试界面表现
4. **性能监控**: 确保页面加载时间在可接受范围内

### BMad开发流程
1. **项目启动**: 使用 `/bmad-orchestrator *help` 开始任何新的开发任务
2. **需求分析**: 使用 `/analyst` 进行市场研究和需求分析
3. **产品规划**: 使用 `/pm` 创建PRD文档
4. **架构设计**: 使用 `/architect` 进行技术架构规划
5. **开发实施**: 使用 `/dev` 进行具体开发工作
6. **质量保证**: 使用 `/qa` 进行测试和质量控制

## 文档路径约定

- 项目文档: `docs/prd.md`, `docs/architecture.md`
- 分片文档: `docs/epics/`, `docs/stories/`
- QA文档: `docs/qa/assessments/`, `docs/qa/gates/`
- BMad配置: `.bmad-core/` (通常不需要直接修改)

## 注意事项

- 所有法律文档内容涉及法律法规，修改时需特别谨慎
- 保持专业的法律术语翻译和表达准确性
- 文档编号和条款引用需保持准确性
- 使用BMad智能体时，所有命令都以 `*` 开头（如 `*help`, `*agent`, `*workflow`）