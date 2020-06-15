<template>
  <div class="menu-container">
    <el-tree
      :data="data"
      node-key="label"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            增加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog width="500px" title="增加菜单" :visible.sync="dialogAdd">
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAppend">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="500px" title="编辑菜单" :visible.sync="dialogEdit">
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    const data = [{
      id: 1,
      label: '菜单管理1',
      path: '/menu',
      children: [],
      icon: ''
    },
    {
      id: 2,
      label: '菜单管理2',
      path: '/menu',
      children: [
        {
          id: 3,
          label: '菜单管理2-1',
          path: '/menu',
          icon: ''
        }
      ],
      icon: ''
    }];
    return {
      data: data,
      dialogAdd: false,
      dialogEdit: false,
      form: {},
      selectData: {}
    }
  },

  methods: {
    append(data) {
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      this.form = {}
      this.dialogAdd = true
      this.selectData = data
    },

    handleAppend () {
      const newChild = { label: this.form.label, path: this.form.path, icon: this.form.icon, children: [] }
      if (!this.selectData.children) {
        this.$set(this.selectData, 'children', [])
      }
      this.selectData.children.push(newChild)
      this.dialogAdd = false
      this.$message.success('增加成功')
    },

    edit (data) {
      this.dialogEdit = true
      this.form = data
      this.selectData = data
    },

    handleEdit () {
      this.selectData = this.form
      this.dialogEdit = false
      this.$message.success('编辑成功')
    },

    remove(node, data) {
      this.$confirm('确认删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style lang="scss">
.menu-container {
  .el-tree-node__content:hover {
    background-color: #ecf5ff;
  }
}
</style>