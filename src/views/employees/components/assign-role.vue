<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { getRoleList } from '@/api/setting'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      default: false,
      type: Boolean
    },
    userId: {
      // 用户的ID，知道点击角色是谁的ID
      type: String,
      default: null
      // required: true
    }
  },
  data() {
    return {
      list: [], // 接收用户全部角色
      roleIds: [] // 接收该用户有的角色
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表信息，将所有角色赋值给list数组
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
      console.log('该员工所拥有的全部角色======>', rows)
    },
    // 获取员工详情信息，点击某个员工的角色时拿到该用户所拥有的角色
    // 参数本来应该是userId，但props传值是异步的，不能将userId传过来，所以直接写一个id
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
      console.log('该员工所拥有的角色======>', roleIds)
    },
    async btnOK() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('角色分配成功！')
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
