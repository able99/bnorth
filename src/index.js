import { Config, MainEntry } from './bnorth';

//========================
// hook
//========================


//==============================
// App Life Cycle
//==============================



//========================
// main
//========================
MainEntry.config = function(result) {
  Config.Url.base = 'http://your-website/';
  Config.Url.api = 'api/';
  
  return Promise.resolve(Config);
}
MainEntry.start();

