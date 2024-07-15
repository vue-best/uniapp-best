/*
 * @Author: wjc
 * @Date: 2024-05-27 11:42:28
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-05 09:28:49
 * @Description:
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 构造工具、外部依赖（webpack、npm）
        'chore', // 对构建或者辅助工具的更改，例如生成文档
        'ci', // 修改项目继续集成流程（Travis，Jenkins，GitLab CI，Circle等）
        'docs', // 文档
        'feat', // 新功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 既不是修复 bug 也不是添加新功能的代码更改
        'revert', // 回退
        'style', // 代码风格（不影响代码含义）
        'test', // 测试
        'wip', // 开发中
      ],
    ],
  },
}
