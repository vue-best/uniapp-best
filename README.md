<!--
 * @Author: wjc
 * @Date: 2024-05-27 17:21:43
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-28 10:23:11
 * @Description:
-->

## uniapp-best

hbuilderx 创建模板工程 + 第三方依赖支持。

使用 vscode 编辑，提交代码，hbuilderx 运行和构建。

### 名词解释

- node_modules： 第三方依赖库
- uni_modules：uni-app 插件市场依赖

### husky 配置

安装 husky

> nodejs >= 18

```bash
pnpm add husky@8.0.3 -D
```

配置 package.json

配置该脚本后，install 后会自动执行该命令

```json
script : { "prepare": "husky install" }
```

添加 git 钩子

```bash
npx husky add .husky/pre-commit "pnpm pre-commit"
```

安装 lint-staged

用于只检查暂存区的文件

```bash
pnpm add lint-staged -D
```

配置 lint-staged

```json
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx}": [
      "pnpm format",
      "pnpm lint"
    ],
    "*.{css,scss,vue,html}": [
      "pnpm format",
      "pnpm lint:style"
    ]
  }
```

安装 eslint 和配置

配置 lint 脚本命令

添加 husky commit 钩子

```bash
npx husky add .husky/pre-commit "npm run lint"
```

安装和配置 commitlint

添加 husky commit type校验 钩子

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $HUSKY_GIT_PARAMS"
```

问题1： husky 不生效？

> 找到项目的.git 文件，查看是否有hooks目录及文件，没有的话，手动安装husky；如有hooks目录，尝试删除该目录后卸载husky后重新安装，重新设置husky钩子函数
