declare namespace FLearningAPI {
  import { UploadRawFile } from 'element-plus'

  // 任务信息
  type TaskInfo = {
    taskName: string
    modelID: string
    partyID: string // 任务隶属组织
    assignDateTime: string
    identity?: string // 表示自己是人物创建者还是接收人 [assigner, acceptor]
    currentNumber: number
    numberOfPeers: number
    state: string
    timeLimit: number
  }

  // 任务详情
  type TaskDetail = {
    taskName: string
    modelID: string
    modelName: string
    createTime: string
    assigner: {
      nickname: string
      avatarUrl: string
      participateDateTime: string
    }
    acceptors: {
      nickname: string
      avatarUrl: string
      partyID: string
      participateDateTime: string
    }[]
    state: string
    timeLimit: number
    description: string
  }

  // [Params]:任务创建
  type TaskAssignParams = {
    taskName: string
    modelName: string
    numberOfPeers: number // 不包括自己。。
    // timeLimit: number
    description: string
    trainFile: UploadRawFile
    evaluateFile: UploadRawFile
  }

  // [Return]:任务创建
  type Callback = {
    queryURL: string
  }

  // [Params]:任务接收
  type TaskAcceptParams = {
    modelID: string
    trainFile: UploadRawFile
    evaluateFile: UploadRawFile
  }

  // [Params]:任务训练
  type TaskTrainParams = {
    modelID: string
    modelAndEvaluation: any
  }
}
