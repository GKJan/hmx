<template>
  <div class="content-container">
    <el-tabs type="card">
      <el-tab-pane label="报告列表">
        <table-panel
          ref="table1"
          :apiMethod="api.getBasketDataPage"
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
            <a :href="tempUrl"></a>
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
              prop="createBy"
              label="录入人"
              align="center">
            </el-table-column>
            <el-table-column
              prop="xyType"
              label="学员类型"
              align="center">
            </el-table-column>
            <el-table-column
              label="班级"
              align="center">
              <template slot-scope="scope">{{ scope.row.type == 1 ? '小班' : (scope.row.type == 2 ? '中班' : '大班') }}</template>
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
              prop="age"
              label="年龄"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              prop="height"
              label="身高"
              align="center">
            </el-table-column>
            <el-table-column
              prop="resultHeight"
              label="预测身高"
              align="center">
            </el-table-column> -->
            <el-table-column
              prop="rall"
              label="胯下绕/滚球"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dsDribble"
              label="原地单手运球"
              align="center">
            </el-table-column>
            <el-table-column
              prop="bat"
              label="直线/障碍运球"
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
          :apiMethod="api.getBasketReportPage"
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

    <el-dialog width="600px" title="录入数据" :visible.sync="addDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="155px">
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
        <el-form-item label="校区" prop="school">
          <el-input v-model="form.school" disabled placeholder="请输入校区"></el-input>
        </el-form-item>
        <el-form-item label="学员类型" prop="xyType">
          <el-radio v-model="form.xyType" label="华蒙星学员"></el-radio>
          <el-radio v-model="form.xyType" label="非学员"></el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="type">
          <el-radio v-model="form.type" :label="1">小班</el-radio>
          <el-radio v-model="form.type" :label="2">中班</el-radio>
          <el-radio v-model="form.type" :label="3">大班</el-radio>
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
        <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身高(cm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入身高"></el-input>
        </el-form-item>
        <el-form-item label="体重(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入体重"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="30秒胯下绕滚球" prop="rall">
          <el-input v-model="form.rall" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="30秒原地单手运球" prop="dsDribble">
          <el-input v-model="form.dsDribble" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="8米折返动感1+1拍球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 2" label="10米行进间直线运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 3" label="10米行进间绕障碍运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="传/抛球进圈" prop="pass">
          <el-input v-model="form.pass" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="原地投篮" prop="shoot">
          <el-input v-model="form.shoot" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="600px" title="修改数据" :visible.sync="editDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="155px">
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
        <el-form-item label="校区" prop="school">
          <el-input v-model="form.school" disabled placeholder="请输入校区"></el-input>
        </el-form-item>
        <el-form-item label="学员类型" prop="xyType">
          <el-radio v-model="form.xyType" label="华蒙星学员"></el-radio>
          <el-radio v-model="form.xyType" label="非学员"></el-radio>
        </el-form-item>
        <el-form-item label="班级" prop="type">
          <el-radio v-model="form.type" :label="1">小班</el-radio>
          <el-radio v-model="form.type" :label="2">中班</el-radio>
          <el-radio v-model="form.type" :label="3">大班</el-radio>
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
        <el-form-item label="出生年月" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出生年月"
            @change="handleChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身高(cm)" prop="height">
          <el-input v-model="form.height" placeholder="请输入身高"></el-input>
        </el-form-item>
        <el-form-item label="体重(kg)" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入体重"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="form.parentName" placeholder="请输入家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="家长手机号" prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="请输入家长手机号"></el-input>
        </el-form-item>
        <el-form-item label="30秒胯下绕滚球" prop="rall">
          <el-input v-model="form.rall" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="30秒原地单手运球" prop="dsDribble">
          <el-input v-model="form.dsDribble" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="8米折返动感1+1拍球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 2" label="10米行进间直线运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type == 3" label="10米行进间绕障碍运球" prop="bat">
          <el-input v-model="form.bat" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="传/抛球进圈" prop="pass">
          <el-input v-model="form.pass" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="原地投篮" prop="shoot">
          <el-input v-model="form.shoot" placeholder="请输入"></el-input>
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
      childAge: 0,
      tempUrl: '',
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
        height: [{ required: true, message: '请输入身高', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入体重', trigger: 'blur' }],
        school: [{ required: true, message: '请输入校区', trigger: 'blur' }],
        xyType: [{ required: true, message: '请选择学员类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择班级', trigger: 'change' }],
        parentName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入家长手机号', trigger: 'blur' }],
        rall: [{ required: true, message: '请输入', trigger: 'blur' }],
        dsDribble: [{ required: true, message: '请输入', trigger: 'blur' }],
        bat: [{ required: true, message: '请输入', trigger: 'blur' }],
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
    this.tempUrl = process.env.VUE_APP_baseApi + 'baskItem/downloadFile'
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

    handleChange (val) {
      this.childAge = this.jsGetAge(val)
    },
    
    jsGetAge (strBirthday) {       
      let returnAge
      let strBirthdayArr=strBirthday.split("-")
      let birthYear = strBirthdayArr[0]
      let birthMonth = strBirthdayArr[1]
      let birthDay = strBirthdayArr[2]
      let d = new Date()
      let nowYear = d.getFullYear()
      let nowMonth = d.getMonth() + 1
      let nowDay = d.getDate()
      if (nowYear === birthYear) {
        returnAge = 0 // 同年 则为0岁
      } else {
        let ageDiff = nowYear - birthYear // 年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            let dayDiff = nowDay - birthDay // 日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff 
            }
          } else {
            let monthDiff = nowMonth - birthMonth // 月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1
            } else {
              returnAge = ageDiff
            }
          }
        } else {
          returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge // 返回周岁年龄
    },

    handleAdd () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.addBasketReport(this.form).then((res) => {
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
      this.api.getBasketDetail({ id: this.selectList1[0].id }).then(res => {
        if (res.success) {
          const { id, sportId, school, xyType, type, name, sex, height, weight, parentName, phone, rall, dsDribble, bat, pass, shoot } = res.data
          this.form = { id, sportId, school, xyType, type, name, sex, height, weight, parentName, phone, rall, dsDribble, bat, pass, shoot }
          this.$set(this.form, 'birth', res.data.birthday)
        }
      })
    },

    handleEdit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.api.editBasketData(this.form).then((res) => {
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
        this.api.delBasketData({ id: this.selectList1[0].id }).then(res => {
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
      this.api.importBasketReport(formData).then(res => {
        if (res.success) {
          this.$message.success('导入成功')
          this.$refs.table1.getList()
        }
      })
    },

    handleExport () {
      this.listQuery1.ascOrDesc = 'desc'
      this.api.exportBasketData(this.listQuery1).then(res => {
        const link = document.createElement('a')
        let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = '报告列表(篮球)' //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(error => {
        this.$message.error('导出失败，请联系管理员')
      })
    },

    handleReport () {
      this.$router.push({ path: '/report/basketDetail', query: { id: this.selectList1[0].id }})
    },

    handleDown () {
      this.api.getBasketTemplate().then(res => {
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
