const fs = require('fs-extra');
const { join, basename } = require('path');

const config = require('../lib/config').default;
const { stylesToString } =  require('../lib/utils');

const OutPathCss = './css';
const SrcPathCss = './src/css';
const SrcPathGens = './lib/gens';

fs.emptyDirSync('./css');

function minCss(css) {
    return css.replace(/[ \n]/g,'').replace(/\/\*.*?\*\//g,'');
}

function importCss(css) {
    let ret = [];
    for(let line of css.split('\n')){
        let groups = line.match(/@import\sS*[\'\"](.*)[\'\"]/);
        if(groups){
            let file = join('node_modules', groups[1][0]==='~'?groups[1].slice(1):groups[1]);
            let css = fs.readFileSync(file).toString();
            ret.push(css);
        }else{
            ret.push(line);
        }
    }
    return ret.join('\n');
}

const csses = fs.readdirSync('./src/css');
csses.forEach(v=>{
    const name = basename(v, '.css');
    let css = fs.readFileSync(join(SrcPathCss, v)).toString();
    css = importCss(css);
    fs.writeFileSync(join(OutPathCss, name+'.css'), css);
    fs.writeFileSync(join(OutPathCss, name+'.min.css'), minCss(css));
})

const gens = fs.readdirSync(SrcPathGens);
gens.forEach(v=>{
    const name = basename(v, '.js');
    const gen = require(join('../lib/gens/', v)).default||require(join('../lib/gens/', v));
    let css = stylesToString(gen(config));
    fs.writeFileSync(join(OutPathCss, name+'.css'), css);
    fs.writeFileSync(join(OutPathCss, name+'.min.css'), minCss(css));
})
