'use strict';

require('should');

describe('Application init process', () => {
  
  it('is green', () => {
    let a = true;
    a.should.be.ok();
  });

  it('is initializable', () => {
    let lumenode = require('../index').getInstance();

    lumenode.should.be.ok();
  });

  it('is singleton', () => {
    let lumenode = require('../index').getInstance();
    let lumenode2 = require('../index').getInstance();

    lumenode.should.be.equal(lumenode2);
  });

  it('exposes system classes', () => {
    let lumenode = require('../index');

    lumenode.Kernel.should.be.ok();
    lumenode.ExceptionHandler.should.be.ok();
    lumenode.ServiceProvider.should.be.ok();
    lumenode.Exception.should.be.ok();
  });

  it('exports correct instances', () => {
    let lumenode = require('../index');

    let lumenKernel = new lumenode.Kernel;
    let lumenExceptionHandler = new lumenode.ExceptionHandler;
    let lumenServiceProvider = new lumenode.ServiceProvider;
    let lumenException = new lumenode.Exception;

    let Kernel = require('../http/Kernel');
    let ServiceProvider = require('../ServiceProvider');
    let Exception = require('../exceptions/Exception');
    let ExceptionHandler = require('../exceptions/ExceptionHandler');

    lumenKernel.should.be.instanceOf(Kernel);
    lumenExceptionHandler.should.be.instanceOf(ExceptionHandler);
    lumenServiceProvider.should.be.instanceOf(ServiceProvider);
    lumenException.should.be.instanceOf(Exception);
  });

});