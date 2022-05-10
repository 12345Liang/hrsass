<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-select placeholder="请输入内容">
        <el-option>
          <el-tree :data="projectList" :props="defaultProps" />
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectList: [
        { projectName: 1, children: { projectName: 11 }},
        { projectName: 2 }
      ],
      defaultProps: {
        label: 'label',
        children: 'children'
      }
    }
  }
}
</script>

<style>

</style>
