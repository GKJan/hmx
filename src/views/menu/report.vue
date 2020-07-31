<template>
  <div class="content-container">
    <el-tabs type="card">
      <el-tab-pane label="报告列表">
        <table-panel
          ref="table1"
          :apiMethod="api.getDataPage"
          @handleSelectionChange="handleSelectionChange1"
        >
          <template #searchItem>
            <div class="search-item">
              <span>场次</span>
              <el-select v-model="listQuery1.name" placeholder="请选择场次">
                <el-option
                  v-for="item in selectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span>小朋友姓名</span>
              <el-input v-model="listQuery1.childName" placeholder="请输入小朋友姓名"></el-input>
            </div>
            <div class="search-item">
              <span>家长手机号</span>
              <el-input v-model="listQuery1.phone" placeholder="请输入家长手机号"></el-input>
            </div>
            <div class="search-item">
              <el-button type="primary" icon="el-icon-search" @click="$refs.table1.getList()">搜索</el-button>
            </div>
          </template>
          <template #operBtn>
            <input type="file" id="file" @change="handleImport">
            <a href="http://tc.huamengxing.com:8080/api/item/downloadFile"></a>
            <el-button type="success" icon="el-icon-plus" @click="addDialog = true">录入</el-button>
            <el-button type="warning" :disabled="btnDisabled" icon="el-icon-edit" @click="beforeEdit">编辑</el-button>
            <el-button type="danger" :disabled="btnDisabled" icon="el-icon-delete" @click="handleDel">删除</el-button>
            <el-button type="primary" :disabled="btnDisabled" icon="el-icon-document" @click="handleReport">分析报告</el-button>
            <el-button type="info" icon="el-icon-printer">导入</el-button>
            <el-button type="info" icon="el-icon-takeaway-box" @click="handleExport">导出</el-button>
            <el-button type="info" icon="el-icon-sort-down">下载导入模板</el-button>
          </template>
          <template #tableColumn>
            <el-table-column
              type="selection"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sportName"
              label="场次"
              align="center">
            </el-table-column>
            <el-table-column
              prop="xyType"
              label="学员类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              align="center">
            </el-table-column>
            <el-table-column
              prop="height"
              label="身高"
              align="center">
            </el-table-column>
            <el-table-column
              prop="resultHeight"
              label="预测身高"
              align="center">
            </el-table-column>
            <el-table-column
              prop="ibm"
              label="BMI"
              align="center">
            </el-table-column>
            <el-table-column
              prop="legs"
              label="下肢力量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="szLimb"
              label="上肢力量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="coordinate"
              label="协调性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="balance"
              label="平衡性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="flexibility"
              label="柔韧性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sensitives"
              label="灵敏性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="racket"
              label="拍球"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pass"
              label="传球"
              align="center">
            </el-table-column>
            <el-table-column
              prop="shoot"
              label="投篮"
              align="center">
            </el-table-column>
            <el-table-column
              prop="total"
              label="总分"
              align="center">
            </el-table-column>
          </template>
        </table-panel>
      </el-tab-pane>
      <el-tab-pane label="信息列表">
        <table-panel
          ref="table2"
          :apiMethod="api.getReportPage"
          @handleSelectionChange="handleSelectionChange2"
        >
          <template #searchItem>
            <div class="search-item">
              <span>小朋友姓名</span>
              <el-input v-model="listQuery2.childName" placeholder="请输入小朋友姓名"></el-input>
            </div>
            <div class="search-item">
              <el-button type="primary" icon="el-icon-search" @click="$refs.table2.getList()">搜索</el-button>
            </div>
          </template>
          <template #operBtn>
          </template>
          <template #tableColumn>
            <el-table-column
              type="index"
              label="序号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              label="性别"
              align="center">
              <template slot-scope="scope">{{ scope.row.sex === 1 ? '男' : '女' }}</template>
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生年月"
              align="center">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              align="center">
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="家长姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              align="center">
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校"
              align="center">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="测试日期"
              align="center">
            </el-table-column>
          </template>
        </table-panel>
      </el-tab-pane>
    </el-tabs>

    <el-dialog width="500px" title="录入数据" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场次" prop="sportId">
          <el-select v-model="form.sportId" placeholder="请选择场次">
            <el-option
              v-for="item in sessionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="校区" prop="school">
          <el-input v-model="form.school" disabled placeholder="请输入校区"></el-input>
        </el-form-item>
        <el-form-item label="学员类型" prop="xyType">
          <el-radio v-model="form.xyType" label="华蒙星学员"></el-radio>
          <el-radio v-model="form.xyType" label="非学员"></el-radio>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="学员身高(cm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入学员身高"></el-input>
        </el-form-item>
        <el-form-item label="学员体重(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入学员体重"></el-input>
        </el-form-item>
        <el-form-item label="父亲身高(cm)" prop="FHeight">
          <el-input v-model="form.FHeight" placeholder="请输入父亲身高"></el-input>
        </el-form-item>
        <el-form-item label="母亲身高(cm)" prop="MHeight">
          <el-input v-model="form.MHeight" placeholder="请输入母亲身高"></el-input>
        </el-form-item>
        <el-form-item label="立定跳远(cm)" prop="legs">
          <el-input v-model="form.legs" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="网球掷远(m)" prop="szLimb">
          <el-input v-model="form.szLimb" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="双脚连续跳(秒)" prop="coordinate">
          <el-input v-model="form.coordinate" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="走平衡木(秒)" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="坐位体前屈(cm)" prop="flexibility">
          <el-input v-model="form.flexibility" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="10米折返跑(秒)" prop="sensitives">
          <el-input v-model="form.sensitives" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拍球(次)">
          <el-input v-model="form.racket" placeholder="请输入拍球次数"></el-input>
        </el-form-item>
        <el-form-item label="传球(次)">
          <el-input v-model="form.pass" placeholder="请输入传球次数"></el-input>
        </el-form-item>
        <el-form-item label="投篮(次)">
          <el-input v-model="form.shoot" placeholder="请输入投篮次数"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="修改数据" :visible.sync="editDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input disabled v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="学员身高(cm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入学员身高"></el-input>
        </el-form-item>
        <el-form-item label="学员体重(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入学员体重"></el-input>
        </el-form-item>
        <el-form-item label="父亲身高(cm)" prop="FHeight">
          <el-input v-model="form.FHeight" placeholder="请输入父亲身高"></el-input>
        </el-form-item>
        <el-form-item label="母亲身高(cm)" prop="MHeight">
          <el-input v-model="form.MHeight" placeholder="请输入母亲身高"></el-input>
        </el-form-item>
        <el-form-item label="立定跳远(cm)" prop="legs">
          <el-input v-model="form.legs" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="网球掷远(m)" prop="szLimb">
          <el-input v-model="form.szLimb" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="双脚连续跳(秒)" prop="coordinate">
          <el-input v-model="form.coordinate" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="走平衡木(秒)" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="坐位体前屈(cm)" prop="flexibility">
          <el-input v-model="form.flexibility" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="10米折返跑(秒)" prop="sensitives">
          <el-input v-model="form.sensitives" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="拍球(次)">
          <el-input v-model="form.racket" placeholder="请输入拍球次数"></el-input>
        </el-form-item>
        <el-form-item label="传球(次)">
          <el-input v-model="form.pass" placeholder="请输入传球次数"></el-input>
        </el-form-item>
        <el-form-item label="投篮(次)">
          <el-input v-model="form.shoot" placeholder="请输入投篮次数"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TablePanel from '@/components/table'

export default {
  components: {
    TablePanel
  },
  data () {
    return {
      listQuery1: {},
      listQuery2: {},
      addDialog: false,
      editDialog: false,
      form: {
        // state: 1
      },
      rules: {
        sportId: [{ required: true, message: '请选择场次', trigger: 'change' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        school: [{ required: true, message: '请输入校区', trigger: 'blur' }],
        xyType: [{ required: true, message: '请选择学员类型', trigger: 'change' }],
        birth: [{ required: true, message: '请选择出生年月', trigger: 'change' }],
        parentName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入家长手机号', trigger: 'blur' }],
        height: [{ required: true, message: '请输入学员身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入学员体重', trigger: 'blur' }],
        FHeight: [{ required: true, message: '请输入父亲身高', trigger: 'blur' }],
        MHeight: [{ required: true, message: '请输入母亲身高', trigger: 'blur' }],
        legs: [{ required: true, message: '请输入', trigger: 'blur' }],
        szLimb: [{ required: true, message: '请输入', trigger: 'blur' }],
        coordinate: [{ required: true, message: '请输入', trigger: 'blur' }],
        balance: [{ required: true, message: '请输入', trigger: 'blur' }],
        flexibility: [{ required: true, message: '请输入', trigger: 'blur' }],
        sensitives: [{ required: true, message: '请输入', trigger: 'blur' }],
        racket: [{ required: true, message: '请输入', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入', trigger: 'blur' }],
        shoot: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      selectList1: [],
      selectList2: [],
      selectList: [],
      sessionList: []
    }
  },

  created () {
    this.getSessionList()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.form.school = userInfo.areaName
    this.api.getWxSessionList().then(res => {
      this.selectList = res.data
    })
  },

  mounted () {
    this.listQuery1 = this.$refs.table1.listQuery
    this.listQuery2 = this.$refs.table2.listQuery
  },

  computed: {
    btnDisabled () {
      if (this.selectList1.length === 1) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    getSessionList () {
      this.api.getSessionList().then(res => {
        this.sessionList = res.data
      })
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.addReport(this.form).then((res) => {
            if (res.success) {
              this.$message.success('添加成功')
              this.addDialog = false
              this.form = {}
              this.$refs.table1.getList()
            }
          })
        }
      })
    },

    beforeEdit () {
      this.editDialog = true
      this.api.getDetail({ id: this.selectList1[0].id }).then(res => {
        if (res.success) {
          const { id, name, parentName, phone, height, weight, legs, szLimb, coordinate, balance, flexibility, sensitives, racket, pass, shoot } = res.data
          this.form = { id, name, parentName, phone, height, weight, legs, szLimb, coordinate, balance, flexibility, sensitives, racket, pass, shoot }
          this.$set(this.form, 'birth', res.data.birthday)
          this.$set(this.form, 'FHeight', res.data.fHeight)
          this.$set(this.form, 'MHeight', res.data.mHeight)
        }
      })
    },

    handleEdit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.editData(this.form).then((res) => {
            if (res.success) {
              this.$message.success('修改成功')
              this.editDialog = false
              this.form = {}
              this.$refs.table1.getList()
            }
          })
        }
      })
    },

    handleDel () {
      this.$confirm('是否删除这条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.api.delData({ id: this.selectList1[0].id }).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.$refs.table1.listQuery.current = 1
            this.$refs.table1.getList()
          }
        })
      })
    },

    handleImport (e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      this.api.importReport(formData).then(res => {
        if (res.success) {
          this.$message.success('导入成功')
          this.$refs.table1.getList()
        }
      })
    },

    handleExport () {
      this.listQuery1.ascOrDesc = 'desc'
      this.api.exportData(this.listQuery1).then(res => {
        const link = document.createElement('a')
        let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = '报告列表' //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(error => {
        this.$message.error('导出失败，请联系管理员')
      })
    },

    handleReport () {
      this.$router.push({ path: '/report/detail', query: { id: this.selectList1[0].id }})
    },

    handleDown () {
      this.api.getTemplate().then(res => {
        console.log(res)
      })
    },

    handleSelectionChange1 (val) {
      this.selectList1 = val
    },
    handleSelectionChange2 (val) {
      this.selectList2 = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
