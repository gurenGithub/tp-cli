#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()
const request = require('request')

program
  .version('0.0.1')
  .description('TP(MVVM framework)应用模板工程的cli')
program
  .command('init [project] [tpl]')
  .action(function (project, tpl) {
    console.log(project,tpl);
    //return 
    request.get(
      'https://raw.githubusercontent.com/gurenGithub/tp-cli/master/template.json',
      function (err, response, body) {
        let template = JSON.parse(body);
        console.log(template,project,tpl);
        if (tpl && project) {
          let pwd = shell.pwd()
          let url =template[tpl] ;
          if(!url){
            log.error(`正确命令例子：tp-cli init myproject h5 ${tpl}`);
            return
          }
          log.info(`正在${url}拉取模板代码 ...`)
          clone(url, pwd + `/${project}`, null, function () {
            shell.rm('-rf', pwd + `/${project}/.git`)
            log.info('模板工程建立完成')
          })
        } else {
          log.error('正确命令例子：tp-cli init myproject h5')
        }
      });

    // console.log(result)
    // log.info('目前tp-cli支持amd和webpack两种模板，示例：san init myproject --amd | --webpack')
    /*if (tpl && project) {
        let pwd = shell.pwd()
        let url;
        if(tpl == '--amd'){
            url = `https://github.com/woodstream/san-mui-with-amd.git`;
        }else{
            url = `https://github.com/woodstream/san-mui-with-webpack.git`;
        }
        log.info(`正在${url}拉取模板代码 ...`)
        clone(url, pwd + `/${project}`, null, function() {
            shell.rm('-rf', pwd + `/${project}/.git`)
            log.info('模板工程建立完成')
        })
    } else {
        log.error('正确命令例子：san-cli init myproject --amd')
    }*/
  })
program.parse(process.argv)
