var request = require("supertest")
const app = require("../../server/server")

describe("Testing Server API calls", function() {
  it("Fetching all challenges", function(done) {
    request(app)
      .get("/api/allChallenges")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Fetching all friends of a user", function(done) {
    request(app)
      .get("/api/friends")
      .query({userName: "quiz.socialrt@gmail.com"})
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Get all pending friend requests", function(done) {
    request(app)
      .get("/api/friends/pendingReq")
      .query({userName: "quiz.socialrt@gmail.com"})
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Search Friends with friend name", function(done) {
    request(app)
      .get("/api/friends/search")
      .query({value: "vinita"})
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Fetching all Topics List", function(done) {
    request(app)
      .get("/api/topics/gettopics")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Fetching all User Details", function(done) {
    request(app)
      .get("/api/getUserDetail")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Fetching all challenges for a User", function(done) {
    request(app)
      .get("/api/userChallenges")
      .query({userID: "16"})
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })

  it("Fetching challenges list by topic name", function(done) {
    request(app)
      .get("/api/getChallengesByTopic")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})
