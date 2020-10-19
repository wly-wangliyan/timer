import { ErrorHandler } from '@angular/core';
import { environment } from '../environments/environment';
import * as Raven from 'raven-js';

export class SentryErrorHandler implements ErrorHandler {

  constructor() {
    switch (environment.version) {
      case 'd':
        Raven
          .config('https://8e0f80aa0d2b48bbaa1f6dad48ee9300@guard.uucin.com/47')
          .install();
        break;
      case 'r':
        Raven
          .config('https://3afba1c1e7bd463f8c69dd93c481dcb8@guard.uucin.com/48')
          .install();
        break;
      case 'y':
        Raven
          .config('https://d3e2b59e0df544fab6f8845a25326b39@guard.uucin.com/130')
          .install();
        break;
      case 'p':
        Raven
          .config('https://68134d9486c8426cae44d838f69ac0a8@guard.uucin.com/131')
          .install();
        break;
    }
  }

  handleError(err: any): void {
    if (environment.version === 'd' ||
      environment.version === 'r' ||
      environment.version === 'y' ||
      environment.version === 'p') {
      // 部署到服务器上的版本才生成日志
      Raven.captureException(err);
    }
    throw err;
  }
}
