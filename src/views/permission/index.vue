<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <el-button slot="after" type="primary" size="small" @click="addPermission(1, '0')">添加权限</el-button>
      </page-tools>
      <!-- row-key作为树形节点，定义一个唯一标识符 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <!-- type为1 的时候在根页面添加权限，type=2的时候在子页面添加权限 -->
            <el-button v-if="row.type===1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="showText" :visible="showDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="permissionForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { updatePermission, addPermission, getPermissionDetail, delPermission, getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '1' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 获取权限列表以树形结构渲染到页面上
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    },
    // 添加权限
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
      console.log('添加权限的formData=======>', this.formData)
    },
    // 删除权限
    async delPermission(id) {
      try {
        await this.$confirm('确定删除该数据吗？')
        await delPermission(id)
        // console.log('删除权限的结果=====>', result)
        // 删除之后需要重新拉取列表信息
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    btnOK() {
      this.$refs.permissionForm.validate().then(() => {
        if (this.formData.id) {
          // 有Id为编辑权限
          return updatePermission(this.formData)
        }
        // 无id 为新增权限，返回新增权限
        return addPermission(this.formData)
      }).then(() => {
        if (this.formData.id) {
          this.$message.success('编辑权限成功')
        } else {
          this.$message.success('添加权限成功')
        }
        // 重新拉取数据
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '1' // 开启
      }
      this.$refs.permissionForm.resetFields()
      this.showDialog = false
    },
    async editPermission(id) {
      // 编辑权限时先让数据回写
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
      console.log('编辑的formData=======>', this.formData)
    }
  }

}
</script>

<style>
</style>
