/*
 * @Author: wjc
 * @Date: 2024-05-29 17:32:17
 * @LastEditors: wjc
 * @LastEditTime: 2024-06-05 17:39:01
 * @Description:
 */
module.exports = {
  root: true,
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml'],
  rules: {
    'prettier/prettier': true,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],
    'color-function-notation': ['legacy', { ignore: ['with-var-inside'] }],
    // 这里使用正则表达式允许选择器中出现短横线和下划线。
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$',
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'deep', 'global'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'include', 'extend'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'slotted'],
      },
    ],
  },
}
