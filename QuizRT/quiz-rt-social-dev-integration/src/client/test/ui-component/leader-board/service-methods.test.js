import {serviceCall} from './../../../ui-component/leader-board/service-methods'
const chai = require('chai');
const should = chai.should();

describe('Service Test', function() {
 context('Validate', function() {
   it('should fail for an invalid topic id', function() {     
     return  serviceCall(`https://game-engine-beta.herokuapp.com/api/topics/99999`)
       .catch(error => error.should.be.an('error').and.not.be.null);
   });
 });
});

