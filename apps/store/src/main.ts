import { setRemoteDefinitions } from '@virtual-store/load-remote-module';
import('./bootstrap');

fetch('/assets/module-federation.manifest.json')
  .then((res) => {
    console.log(1);
    return res.json();
  })
  .then((definitions) => {
    console.log(2);
    console.log(definitions);
    return setRemoteDefinitions(definitions);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
