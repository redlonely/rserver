export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
    },
    prompt: {
        useEmoji: true,
        emojiAlign: 'center',
        alias: { fd: 'docs: fix typos' },
        // prettier-ignore
        messages: {
            type                : '选择你要提交的类型 :',
            scope               : '选择一个提交范围（可选）:',
            customScope         : '请输入自定义的提交范围 :',
            subject             : '填写简短精炼的变更描述 :\n',
            body                : '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
            breaking            : '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
            footerPrefixesSelect: '选择关联issue前缀（可选）:',
            customFooterPrefix  : '输入自定义issue前缀 :',
            footer              : '列举关联issue (可选) 例如: #31, #I3244 :\n',
            generatingByAI      : '正在通过 AI 生成你的提交简短描述...',
            generatedSelectByAI : '选择一个 AI 生成的简短描述:',
            confirmCommit       : '是否提交或修改commit ?'
        },
        // prettier-ignore
        types: [
            { value: '特性', emoji:"", name: '特性:     新增功能', emoji: '✨' },
            { value: '修复', emoji:"", name: '修复:     修复缺陷', emoji: '🐞' },
            { value: '文档', emoji:"", name: '文档:     文档变更', emoji: '📚' },
            { value: '格式', emoji:"", name: '格式:     代码格式（不影响功能，例如空格、分号等格式修正）' , emoji: '🎨' },
            { value: '重构', emoji:"", name: '重构:     代码重构（不包括 bug 修复、功能新增）' , emoji: '🛠' },
            { value: '性能', emoji:"", name: '性能:     性能优化' , emoji: '⚡️' },
            { value: '测试', emoji:"", name: '测试:     添加疏漏测试或已有测试改动', emoji: '🚨' },
            { value: '构建', emoji:"", name: '构建:     构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',    emoji: '🛠' },
            { value: '集成', emoji:"", name: '集成:     修改 CI 配置、脚本' , emoji: '⚙️' },
            { value: '回退', emoji:"", name: '回退:     回滚 commit', emoji: '⏪' },
            { value: '其他', emoji:"", name: '其他:     对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: '🛠' }
        ]
    }
};
