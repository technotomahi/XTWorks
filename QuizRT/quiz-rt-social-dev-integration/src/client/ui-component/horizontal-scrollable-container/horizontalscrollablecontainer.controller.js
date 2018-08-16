import {getHorizontalScrollableContainerChallenges, getHorizontalScrollableContainerTopic} from "./horizontalscrollablecontainer.view"

export const createHorizontalScrollableTopic = (dataList, idKey) => {
  const hsTemplate = getHorizontalScrollableContainerTopic(dataList, idKey)
  return hsTemplate
}

export const createHorizontalScrollableChallenges = (dataList, idKey) => {
  const hsTemplate = getHorizontalScrollableContainerChallenges(dataList, idKey)
  return hsTemplate
}

