<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="full-demo"/>
    <div class="data-wrap">
      <div>
        <button @click="showAdd">新增</button>
        <button @click="getData">刷新</button>
      </div>
      <table>
        <tr>
          <th>id</th>
          <th>type</th>
          <th>title</th>
          <th>description</th>
          <th>occur_time</th>
          <th>url</th>
          <th>newsImg</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in newsData" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.occur_time }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.newsImg }}</td>
          <td>
            <button @click="showEdit(item)">编辑</button>
            <button @click="handleDelete(item.id)">删除</button>
          </td>
        </tr>
      </table>
      <div class="dialog-wrap" v-show="dialogVisible">
        <h3>{{ dialogTitle }}</h3>
        <p>
          <span>type：</span>
          <input v-model="detailForm.type" />
        </p>
        <p>
          <span>title</span>
          <input v-model="detailForm.title" />
        </p>
        <p>
          <span>description：</span>
          <input v-model="detailForm.description" />
        </p>
        <p>
          <span>occur_time：</span>
          <input v-model="detailForm.occur_time" />
        </p>
        <p>
          <span>url：</span>
          <input v-model="detailForm.url" />
        </p>
        <p>
          <span>newsImg：</span>
          <input v-model="detailForm.newsImg" />
        </p>
        <button @click="dialogVisible = false">取消</button>
        <button @click="handleSave">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      newsData: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogType: '',
      detailForm: {}
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('/api/news/queryAll')
        .then(res => {
          if (res.data.code === '200') {
            this.newsData = res.data.data;
          } else {
            this.newsData = [];
            alert('接口错误')
          }
        })
    },
    showAdd() {
      this.detailForm = {};
      this.dialogVisible = true;
      this.dialogTitle = '新增';
      this.dialogType = 'add';
    },
    showEdit(item) {
      this.detailForm = item;
      this.dialogVisible = true;
      this.dialogTitle = '修改';
      this.dialogType = 'edit';
    },
    handleSave() {
      if (this.dialogType === 'add') {
        this.$http.post('/api/news/add',this.detailForm)
          .then(res => {
            if (res.data.code === '200') {
              alert('新增成功');
              this.dialogVisible = false;
            } else {
              alert('新增失败')
            }
          })
          .then(() => {
            this.getData();
          })
      } else {
        this.$http.post('/api/news/update',this.detailForm)
          .then(res => {
            if (res.data.code === '200') {
              alert('修改成功');
              this.dialogVisible = false;
            } else {
              alert('修改失败')
            }
          })
          .then(() => {
            this.getData();
          })
      }
    },
    handleDelete(id) {
      if (confirm('确定删除')) {
        this.$http.delete(`/api/news/deleteNews?id=${id}`)
          .then(res => {
            if (res.data.code === '200') {
              alert('删除成功');
            } else {
              alert('删除失败')
            }
          })
          .then(() => {
            this.getData();
          })
      } else {
        alert('取消删除')
      }
    }
  }
}
</script>

<style scoped>
  .data-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  table,table th,table td {
    border: 1px solid #ccc;
  }
  .dialog-wrap {
    z-index: 10;
    background: #fff;
    position: absolute;
    margin-top: 10px;
    border: 1px dotted #ccc;
    width: 500px;
    height: 400px;
  }
</style>
