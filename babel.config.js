const path = require('path')

const fixResolvePath = (projectDir) => (sourcePath, currentFile, opts) => {
    const resolver = require('babel-plugin-module-resolver')
    const ret = resolver.resolvePath(sourcePath, currentFile, opts)
    if (!sourcePath.startsWith('src')) return ret
    const basePath = path.join(projectDir, '../')
    const currentFileEndPath = currentFile.substring(basePath.length)
    const currentProject = currentFileEndPath.split(path.sep)[0]
    const correctResolvedPath = path.join(basePath, currentProject, `./${sourcePath}`)

    return correctResolvedPath
}

const projectDir = path.resolve(__dirname)

const presets = [
    [
        '@babel/env',
        {
            targets: {
                firefox: '50',
            },
            // Для корректного взаимодействия es5 и es6 классов исключаем транспиляцию классов
            exclude: ['@babel/plugin-transform-classes'],
        },
    ],
]

const plugins = [
    [
        'module-resolver',
        {
            cwd: 'babelrc',
            root: ['./'],
            resolvePath: fixResolvePath(projectDir),
        },
    ],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
]

module.exports = {
    presets,
    plugins,
}
