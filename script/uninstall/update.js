const fs = require('fs-extra')
const handlebars = require('handlebars')
const { resolve } = require('path')
const path = require('path');
const url = path.resolve('./packages');
/**
 * 清空指定文件下的所有文件
 * @param path 
 */
const emptyFile = (path) => {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        emptyFile(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}
// 读取 packages/list.json 并更新
const listJsonTplReplacer = (name) => {
  const listFilePath = '../../packages/list.json'
  const listFileTpl = fs.readFileSync(resolve(__dirname, listFilePath), 'utf-8')
  const listFileContent = JSON.parse(listFileTpl)
  const arr = listFileContent.filter(item => item.compName != name)
  const newListFileContentFile = JSON.stringify(arr)
  console.log(newListFileContentFile)
  fs.writeFile(resolve(__dirname, listFilePath), newListFileContentFile, err => {
    if (err) console.log(err)
  })
  return arr
}

// 更新 router.ts
const routerTplReplacer = (listFileContent) => {
  const routerFileFrom = './.template/router.ts.tpl'
  const routerFileTo = '../../src/router.ts'
  const routerFileTpl = fs.readFileSync(resolve(__dirname, routerFileFrom), 'utf-8')
  const routerMeta = {
    routes: listFileContent.map(comp => {
      return `{
    title: '${comp.compZhName}',
    name: '${comp.compName}',
    path: '/components/${comp.compName}',
    component: () => import('packages/${comp.compName}/docs/README.md'),
  }`
    })
  }
  const routerFileContent = handlebars.compile(routerFileTpl, { noEscape: true })(routerMeta)
  fs.outputFile(resolve(__dirname, routerFileTo), routerFileContent, err => {
    if (err) console.log(err)
  })
}

// 更新 install.ts
const installTsTplReplacer = (listFileContent) => {
  const installFileFrom = './.template/install.ts.tpl'
  const installFileTo = '../../packages/index.ts' // 这里没有写错，别慌
  const installFileTpl = fs.readFileSync(resolve(__dirname, installFileFrom), 'utf-8')
  const installMeta = {
    importPlugins: listFileContent.map(({ compName }) => `import { ${compName}Plugin } from './${compName}';`).join('\n'),
    installPlugins: listFileContent.map(({ compName }) => `${compName}Plugin.install?.(app);`).join('\n    '),
    exportPlugins: listFileContent.map(({ compName }) => `export * from './${compName}'`).join('\n'),
  }
  const installFileContent = handlebars.compile(installFileTpl, { noEscape: true })(installMeta)
  fs.outputFile(resolve(__dirname, installFileTo), installFileContent, err => {
    if (err) console.log(err)
  })
}

module.exports = (name) => {
  emptyFile(path.join(url, name))//删除文件
  const listFileContent = listJsonTplReplacer(name)//更新json
  routerTplReplacer(listFileContent)
  installTsTplReplacer(listFileContent)
  console.log("删除成功")

}
