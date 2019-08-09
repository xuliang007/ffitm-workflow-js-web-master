// 本地
const url = 'http://localhost:8080';
//集团测试环境
//const url = 'http://10.128.91.107:7005';
//const url = 'http://10.128.28.47:8280';
//开发环境
//const url = 'http://192.168.7.122:8080';
//福州环境
//const url = 'http://192.168.7.175:7005';
module.exports = {
  '/common': {
    target: url,
    changeOrigin: true,
      pathRewrite: {
      '^/common': '/common'
    }
  },
  '/securityCheck': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/securityCheck': '/securityCheck'
    }
  },
  '/saveAttach': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/saveAttach': '/saveAttach'
    }
  },
  '/attach': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/attach': '/attach'
    }
  },
  '/form': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/form': '/form'
    }
  },
  '/flow': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/flow': '/flow'
    }
  },
  '/busiCompoent': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/busiCompoent': '/busiCompoent'
    }
  },
  '/organization': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/organization': '/organization'
    }
  },
  '/app': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/app': '/app'
    }
  },
  '/vendor': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/vendor': '/vendor'
    }
  },
  '/ueditor': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/ueditor': '/ueditor'
    }
  },
  '/flowRelation': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/flowRelation': '/flowRelation'
    }
  },
  '/scFormFlowAction': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/scFormFlowAction': '/scFormFlowAction'
    }
  },
  '/jtitsmForm': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/jtitsmForm': '/jtitsmForm'
    }
  },
  '/jsForm': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/jsForm': '/jsForm'
    }
  },
  '/security': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/security': '/security'
    }
  },
  '/tache': {
    target: url,
    changeOrigin: true,
    pathRewrite: {
      '^/tache': '/tache'
    }
  }
};
