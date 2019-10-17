<template>
  <div class="addAtlas">
    <div class="height-45 px-3 title">
      <i class="iconfont iconfanhui text-20 fl" @click="returnLast"></i>
      <span class="text-18 font-weight-bold">添加图集</span>
    </div>
    <div class="text-left full-width" style="background-color: #F6F6F6;height: calc(100vh - 45px);">
      <el-form ref="event" :model="event" label-width="80px">
        <el-form-item label="事件类型" prop="type" :required="true">
          <cube-button @click="showSelect()" class="text-right" :class="event.type === '请选择'?'':'active'">
            {{typeValue}}
            <i class="el-select__caret el-input__icon el-icon-arrow-right"></i>
          </cube-button>
        </el-form-item>
        <el-form-item label="事件日期" prop="createTime" :required="true">
          <cube-button @click="showDatePicker()" class="text-right" :class="event.createTime === '请选择'?'':'active'">
            {{dateValue}}
            <i class="el-select__caret el-input__icon el-icon-arrow-right"></i>
          </cube-button>
        </el-form-item>
        <el-form-item label="事件标题" prop="title" :required="true">
          <el-input v-model="event.title" placeholder="请输入事件标题"></el-input>
        </el-form-item>
        <el-form-item label="上传图片"></el-form-item>
        <el-upload class="upload-demo px-4 pb-4 pt-2 bg-white"
                   ref="upload"
                   :action="upLoadUrl"
                   multiple
                   list-type="picture-card"
                   name="file"
                   :before-upload="beforeUpload"
                   :on-progress="handleProgress"
                   :on-success="handleSuccess"
                   :on-remove="handleRemove"
                   :on-error="handleError">
          <i class="el-icon-plus" ></i>
        </el-upload>
      </el-form>
      <div style="position: fixed;bottom: 0" class="full-width px-4">
        <el-button type="primary" class="full-width height-45 text-20"  @click="submitAddForm('event')"><strong>提 交</strong></el-button>
      </div>
    </div>

   <!--<p> 事件日期-->
     <!--事件标题-->
     <!--上传图片</p>-->
    <!--lalala<input type="file" accept="image/*">-->
  </div>
</template>

<script>
  export const BASE_URL = process.env.VUE_APP_BASE_URL;
  import { createManager } from '~api/index';
  import * as JSOG from 'jsog';
  import _ from 'lodash';
  export default {
    name: "addAtlas",
    data() {
      return {
        typeValue: '请选择',
        dateValue: '请选择',
        event: {
          title: '', // 事件名称
          createTime: '请选择', // 事件时间
          files: [], // 事件图片
          type: '请选择',
          deleteFlag: 0
        },
        isUpLoading: false,
        formInvalid: false,
        upLoadUrl: `${BASE_URL}/api/fileInfoes?upload`,
      }
    },
    methods: {
      returnLast() {
        this.$router.go(-1)
      },
      showSelect() {
        const column1 = [{ text: '施工记录', value: '101001'}, { text: '工程质量', value: '101002' },
          { text: '工程安全', value: '101003' }];
        if (!this.picker) {
          this.picker = this.$createPicker({
            title: '事件类型',
            data: [column1],
            onSelect: this.selectHandle
          })
        }
        this.picker.show()
      },
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.typeValue = selectedText[0];
        this.event.type = selectedVal[0];

      },
      showDatePicker() {
        if (!this.datePicker) {
          this.datePicker = this.$createDatePicker({
            title: '事件日期',
            min: new Date(2008, 7, 8),
            max: new Date(),
            value: new Date(),
            onSelect: this.selectDate
          })
        }
        this.datePicker.show()
      },
      selectDate(date) {
        this.dateValue = new Date(date).format("yyyy-MM-dd");
        this.event.createTime = new Date(date).format("yyyy-MM-dd hh:mm:ss");
      },
      beforeUpload(file) {
        const isImg = (file.type === 'image/jpg') || (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/bmp');
        const isOut = (file.size / Math.pow(1024, 2)) < 100;
        if (!isImg) {
          this.$message.error('请上传jpg,jpeg,png,bmp文件!');
        }
        if (!isOut) {
          this.$message.error('上传图片不得超过100M');
        }
        return isImg && isOut;
      },
      handleProgress() {
        this.isUpLoading = true;
      },
      handleSuccess(res, file, fileList) {
        let newFile = {
          fileType: 2,
          fileIndex: 1,
          fileStatus: 1,
          fileName: file.response.fileName,
          fileRelativeAddress: file.response.fileRelativeAddress,
          fileExt: file.response.suffixName,
          fileSize: file.size,
          outType: 136007,
          deleteFlag: 0,
          fileThumbAddress: file.response.fileThumbAddress,
          filePreviewAddress: file.response.fileRelativeAddress
        };
        this.event.files.push(newFile);
        if (this.event.files.length === fileList.length) {
          this.isUpLoading = false;
        }
      },
      handleRemove: function (file, fileList) {
        if (file.status !== 'uploading') {
          const index = _.findIndex(this.event.files, {fileName: file.name});
          if (index > -1) {
            this.event.files.splice(index, 1);
          }
        }
        if (this.event.files.length === fileList.length) {
          this.isUpLoading = false;
        }
      },
      handleError() {
        this.$message({
          showClose: true,
          message: '上传失败，服务器错误',
          type: 'error'
        });
      },
      submitAddForm() {
        let boolean = this.ruleForm();
        if (boolean) {
          createManager(this.event).then(() => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.go(-1)
          });
        } else {
          this.$message({
            message: '请填写必填信息',
            type: 'error'
          });
        }
      },
      ruleForm() {
        return this.event.type !== '请选择' && this.event.createTime !== '请选择' && this.event.title !== '';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addAtlas {
    .title {
      line-height: 45px;
      border-bottom: 1px solid #EEEEEE;
    }
    /deep/ {
      .el-form-item {
        padding: 0 20px;
        background-color: white;
        border-bottom: 1px solid #EEEEEE;
        border-top: 1px solid #EEEEEE;
      }
      .el-form-item__label {
        font-weight: 800 !important;
      }
      .el-form-item:nth-child(2) {
        margin: 0 !important;
        border-bottom: none !important;
      }
      .cube-btn {
        background: white;
        color: #c0c4cc;
        font-size: inherit;
        padding: 0 ;
      }
      .el-upload--picture-card, .el-upload-list--picture-card .el-upload-list__item {
        width: calc((100% - 24px)/ 4) !important;
        height: calc((100vw - 44px)/ 4) !important;
      }
      .el-upload--picture-card {
        background-color: #F6F6F6;
        line-height: calc((100vw - 24px)/ 4) !important;
      }
      .el-upload-list--picture-card .el-upload-list__item:nth-child(4n+0) {
        margin-right: 0 !important;
      }
      .active {
        color: black;
      }
      .el-form-item:nth-child(4) {
        margin-bottom: 0 !important;
        border-bottom: none !important;
      }
      .cube-upload {
        background: white;
        padding: 0 20px;
      }
      .cube-upload-def {
        margin-right: 0;
      }
      .el-input__inner {
        border-radius: 0px;
        border: none;
        text-align: right;
      }
      .el-form-item__error {
        display: none;
      }
    }
  }
</style>
