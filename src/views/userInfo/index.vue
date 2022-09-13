<template>
  <el-row :gutter="12">
    <el-col :span="2" :offset="0">
      <el-avatar :src="userInfo.avatar_big" shape="square" :size="150">Avatar</el-avatar>
    </el-col>
    <el-col :span="8">
      <el-form label-position="right" label-width="140px" :model="userInfo" size="small" disabled style="width: 100%">
        <el-form-item label="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="en_name">
          <el-input v-model="userInfo.en_name"></el-input>
        </el-form-item>
        <el-form-item label="enterprise_email">
          <el-input v-model="userInfo.enterprise_email"></el-input>
        </el-form-item>
        <el-form-item label="open_id">
          <el-input v-model="userInfo.open_id"></el-input>
        </el-form-item>
        <el-form-item label="tenant_key">
          <el-input v-model="userInfo.tenant_key"></el-input>
        </el-form-item>
        <el-form-item label="union_id">
          <el-input v-model="userInfo.union_id"></el-input>
        </el-form-item>
        <el-form-item label="user_id">
          <el-input v-model="userInfo.user_id"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

  </el-row>
</template>

<script>
import {getInfo} from "@/api/user";

export default {
  name: "index",
  data() {
    return {
      userInfo: {}
    }
  },
  async mounted() {
    const result = await getInfo()
    console.log("userinfo", result.data)
    this.userInfo = result.data
  }
}
</script>

<style scoped>

</style>
