// import "./boot/Store"
// import "./boot/reducer"
// import $ from "jquery"
import {Store} from "./boot/Store"
import "./styles/scss/main.scss"
import {} from "../../node_modules/material-design-lite/material.min"

// import CreateChallengeController from "./ui-component/challenge/controller/CreateChallengeController"
import {createLoader} from "./ui-component/loader/loader.controller"
import {createSnackBar} from "./ui-component/snackbar/snackbar.controller"
import {createHeader} from "./ui-component/header/header.controller"
import {createFooter} from "./ui-component/footer/footer.controller"
import {createMenu} from "./ui-component/menu/menu.controller"
import {createMainContainer} from "./ui-component/main/main.controlller"
import {createPopularTopicSection, createFavoriteTopicSection, createChallengesSection, createMyChallengesSection} from "./ui-component/dashboard/dashboard.controller"
import {createTopicmodal} from "./ui-component/topic-modal/topic-modal.controller"
import {createNextQuestion, createChallenge, saveChallengeDetails, goToPrevQuestion} from "./ui-component/challenge/CreateChallenge/controller/CreateChallengeController"
import {createShareChallengesSection, ShareChallengesWithSelectedFriendsSection} from "./ui-component/challenge/ShareChallenges/controller/shareChallenges.controller"
import {createUserLogin} from "./ui-component/login-page/login.controller"
import {createTopics} from "./ui-component/topics/topic-controller"
import {callCreateChallenge, callShareChallenge} from "../client/ui-component/challenge/CreateChallenge/view/CreateChallengeView"

import "./ui-component/Friends/controller"
import "./ui-component/Friends/reducer"
import "./ui-component/Friends/service"
import "./ui-component/Friends/view"
import {app} from "firebase"
var Material = require("exports-loader?componentHandler&MaterialRipple!material-design-lite/material.js")

createLoader()
createSnackBar()

// Login Page

// createUserLogin()

console.log("inside app")
console.log(Material)

$("body").on("click", "#create", createNextQuestion)
$("body").on("click", "#prevQuestion", goToPrevQuestion)
$("body").on("click", "#nextQuestion", createNextQuestion)
$("body").on("click", "#save", saveChallengeDetails)
$("body").on("click", "#createChallenge", callCreateChallenge)

module.exports = app

