const config = {
  // 继承自 '@commitlint/config-conventional' 的规则
  extends: ['@commitlint/config-conventional'],

  /**
   * @example
   * type(scope): subject
   *
   * body
   */
  // 自定义规则
  rules: {
    // 提交信息的正文部分前应该总是有一个空行
    'body-leading-blank': [1, 'always'],

    // 正文的每一行不应超过100个字符
    'body-max-line-length': [2, 'always', 100],

    // // 正文不应该为空
    // 'body-empty': [2, 'never'],

    // 标题行的最大长度限制为100个字符
    'header-max-length': [2, 'always', 100],

    // 主题(subject)不应为空
    'subject-empty': [2, 'never'],

    // // 范围(scope)不应为空
    // 'scope-empty': [2, 'never'],

    // 类型(type)不应为空
    'type-empty': [2, 'never'],

    // 类型(type)必须是以下枚举中的一个
    'type-enum': [
      2,
      'always',
      [
        'build', // 影响构建系统或外部依赖项的更改（例如：gulp、broccoli、npm）
        'chore', // 其他不修改src或测试文件的更改
        'ci', // 持续集成的更改（例如：Travis、Circle、Jenkins）
        'docs', // 只改动了文档
        'feat', // 新特性
        'fix', // 修复bug
        'perf', // 改进性能的代码更改
        'refactor', // 既不修复bug也不添加特性的代码更改
        'revert', // 撤销先前的提交
        'style', // 不影响代码含义的更改（空格、格式化、缺少分号等）
        'test', // 添加缺失的测试或更正现有测试
        'translation', // 翻译相关的更改
        'security', // 与安全相关的更改
        'changeset', // 与变更记录相关的更改
      ],
    ],
  },
}

export default config
