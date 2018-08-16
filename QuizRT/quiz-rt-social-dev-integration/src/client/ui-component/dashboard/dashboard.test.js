import { createStore } from 'redux';
import {dashboardReducer} from "../dashboard/dashboard.redux"
const chai = require('chai');
const should = chai.should();

describe('Dashboard', function() {
  const initialState = {}
  const store = createStore(dashboardReducer, initialState);

  it('Should have item for GET_TopicData', function() {
   
    // console.log('store.getState()', store.getState());
    const topics= {
      "test001": {
        "topicText": "Politics",
        "topicUrl": "",
        "topicImage": "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png",
        "createdDate": "11/11/2018",
        "createdBy": 1,
        "modifiedBy": 1,
        "modifiedDate": "11/11/2018",
        "published": true,
        "follow": true,
      }
    }

   
   
    store.dispatch({
      type: 'GET_TopicData',
      dataItem: {"Topics" : topics}
    });

    console.log('store.getState()', store.getState());

    store.getState().should.have.property('TopicList');

    // store.getState().items[1].should.have.property('id');
    // store.getState().items[1].should.have.property('text').and.equal('New item');
    // store.getState().items[1].should.have.property('isComplete').and.equal(false);

    // store.getState().items[0].should.have.property('text').and.equal(initialState.items[0].text);
    // store.getState().items[0].should.have.property('isComplete').and.equal(initialState.items[0].isComplete);
    // store.getState().items[0].should.have.property('id').and.equal(initialState.items[0].id);
  })

  it('Should have item for GET_ChallengeData', function() {
    const challenges= {
      "test001": {
        "topicText": "Politics",
        "topicUrl": "",
        "topicImage": "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png",
        "createdDate": "11/11/2018",
        "createdBy": 1,
        "modifiedBy": 1,
        "modifiedDate": "11/11/2018",
        "published": true,
        "follow": true,
      }
    }
    
    //{"Created_By": "quiz.socialrt@gmail.com", "challengeId": 1, "challengeName": "myChall Cricket", "questions": [], "topicName": "Cricket"}

   
    store.dispatch({
      type: 'GET_ChallengeData',
      dataItem: {"ChallegeList" : challenges}
    });

    console.log('store.getState()', store.getState());

    store.getState().should.have.property('TopicList');

    // store.getState().items[1].should.have.property('id');
    // store.getState().items[1].should.have.property('text').and.equal('New item');
    // store.getState().items[1].should.have.property('isComplete').and.equal(false);

    // store.getState().items[0].should.have.property('text').and.equal(initialState.items[0].text);
    // store.getState().items[0].should.have.property('isComplete').and.equal(initialState.items[0].isComplete);
    // store.getState().items[0].should.have.property('id').and.equal(initialState.items[0].id);
  });
});