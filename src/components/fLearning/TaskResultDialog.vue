<template>
  <el-dialog
    v-model="globalStateStore.taskResultDialogVisible"
    title="任务详情"
    width="50%"
    fullscreen
  >
    <div class="task-result">
      <h2>{{ props.modelInfo.modelName }}</h2>
      <div class="task-result-tab">
        <el-button-group>
          <el-button
            v-for="tabLabel in tabLabels"
            :key="tabLabel"
            class="tab-item"
            :class="tabLabel === activeTab ? 'active-tab-item' : ''"
            @click="activeTab = tabLabel"
          >
            {{ tabLabel }}
          </el-button>
        </el-button-group>
        <div style="flex: 1" />
        <el-button
          :icon="Download"
          class="download-btn"
          size="large"
          @click="handleDownloadModel"
        >
          Download
        </el-button>
      </div>

      <el-divider />

      <model-output
        v-if="activeTab === 'model output' && modelInfo"
        :model-info="modelInfo"
      />
      <data-output v-if="activeTab === 'data output'" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import DataOutput from '@/components/fLearning/TaskResult/DataOutput.vue'
import ModelOutput from '@/components/fLearning/TaskResult/ModelOutput.vue'
import { ref } from 'vue'
import { downloadModel } from '@/api/fLearning'
import { Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import useGlobalStateStore from '@/store/modules/globalState'
import { errorCatcher } from '@/utils/handlers'
import { download } from '@/utils/download'

const props = defineProps<{ task: FLearningAPI.TaskInfo; modelInfo: any }>()

const globalStateStore = useGlobalStateStore()
const tabLabels = ['model output', 'data output']
const activeTab = ref('model output')

// 模型下载
const handleDownloadModel = async () => {
  ElMessageBox.confirm('是否确认下载模型文件？', '提示', {
    confirmButtonText: '确认,立即下载',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const data = await downloadModel(props.task.modelID)
        ElMessage.success('操作成功，下载即将开始')
        download(data, '模型结果.json')
      } catch (err) {
        errorCatcher(err)
      }
    })
    .catch(() => {})
}
</script>

<script lang="ts">
export default {
  name: 'TaskResultDialog',
}
</script>

<style scoped lang="scss">
.task-result {
  padding: 0 30px;
  background-color: white;

  .task-result-tab {
    display: flex;
    margin-bottom: 30px;

    .tab-item {
      height: 100%;
      padding: 0 20px;
      font-weight: bold;
      border-radius: 2px;
      background-color: #eee;
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: var(--sys-blue);
      }

      &.active-tab-item {
        color: #fff;
        background-color: var(--sys-blue);
      }
    }

    .download-btn {
      font-weight: bold;
      border: 2px solid black;
      color: var(--sys-blue);
      background-color: #fff;
      &:hover {
        background-color: pink;
      }
    }
  }
}
</style>
