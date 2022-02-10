const inquirer = require('inquirer')
const fs = require('fs');
const path = require('path');
const url = path.resolve('./packages');
const update = require('./update')

/**
 * 获取制定文件下文件夹
 * @param {} p 
 * @param {*} label 
 * @param {*} list 
 * @returns 
 */
const getDir = (path) => {
  const stat = fs.readdirSync(path);
  return stat.filter((item) => item.indexOf('.') === -1)
}

console.log()


inquirer.prompt([{
  type: 'list',
  name: 'key',
  message: '请选择卸载哪个',
  choices: getDir(url)
}]).then((answers) => {
  const { key } = answers
  // console.log(key)
  update(key)

})
