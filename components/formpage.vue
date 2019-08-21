<template>
  <section class="hero background-image is-fullheight">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <div class="hero-body">
      <div class="container">
        <div class="header align-center">
          <img src="../assets/image/logo-braner.png" alt="brandlogo" class="img-brandlogo">
          <h3>ตอบแบบสอบถาม รับสติ๊กเกอร์ฟรี!</h3>
        </div>
        <form>
          <div class="form">
            <b-field
              label="ชื่อ-นามสกุล (Name-Surname)"
              :type="{'is-danger': errors.has('name')}"
              :message="errors.first('name')">
                <b-input v-validate="'required'" v-model="nameSurname" name="name"></b-input>
            </b-field>
            <b-field
              label="เบอร์โทรศัพท์มือถือ (Mobile Phone)"
              :type="{'is-danger': errors.has('tel')}"
              :message="errors.first('tel')">
                <b-input v-validate="'required|numeric|min:9'"  maxlength="10" v-model="tel" name="tel"></b-input>
            </b-field>
            <b-field
              label="อีเมล (Email)"
              :type="{'is-danger': errors.has('email')}"
              :message="errors.first('email')">
                <b-input v-validate="'required|email'" v-model="email" name="email"></b-input>
            </b-field>
            <b-field
              label="อาชีพ/ประเภทธุรกิจ (Job/Business Type)"
              :type="{'is-danger': errors.has('job')}"
              :message="errors.first('job')">
                <b-select v-validate="'required'" v-model="job" name="job" expanded>
                  <option
                    v-for="(dataJob, index) in dataJob"
                    :key="index"
                    :value="dataJob.jobss"
                  >{{ dataJob.jobss }}</option>
                </b-select>
            </b-field>
            <b-field
            label="จังหวัดที่อยู่/ที่ตั้งธุรกิจ (Province)"
            :type="{'is-danger': errors.has('province')}"
            :message="errors.first('province')">
                <b-autocomplete
                :data='filteredDataArray'
                :open-on-focus='true'
                v-validate="'required'"
                v-model="prov"
                name="province"
                @select="option => selected = option">
                  <template slot="empty">ไม่พบจังหวัดที่ค้นหา</template>
                </b-autocomplete>
            </b-field>
            <div class="align-center margin-t">
              <button class="btn-submit" @click.prevent="submit" type="submit">submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { prov } from '@/utils/province'
import { jobjs } from '@/utils/jobjson'
// import moment from 'moment'
export default {
  data () {
    return {
      isLoading: false,
      isFullPage: true,
      dataProv: prov,
      dataJob: jobjs,
      nameSurname: '',
      tel: '',
      email: '',
      job: '',
      prov: '',
      selected: ''
    }
  },
  methods: {
    async submit () {
      const checkboolean = await this.$validator.validateAll()
      if (checkboolean) {
        this.isLoading = true
        const checkData = await axios.post('https://us-central1-officemate-f2b0a.cloudfunctions.net/officemateAPI/testPost', {
          name: this.nameSurname,
          tel: this.tel,
          email: this.email,
          job: this.job,
          province: this.prov
        })
        this.clearInput()
        this.isLoading = false
        console.log('checkData', checkData)
        this.success()
      } else {
        this.fail()
      }
      console.log('checkboolean', checkboolean)
    },
    success () {
      this.$buefy.toast.open({
        message: 'Something happened correctly!',
        type: 'is-success'
      })
    },
    fail () {
      this.$buefy.toast.open({
        message: 'ไม่ผ่านอ่ะ',
        type: 'is-danger'
      })
    },
    clearInput () {
      this.nameSurname = ''
      this.tel = ''
      this.email = ''
      this.job = ''
      this.prov = ''
    }
  },
  computed: {
    filteredDataArray () {
      return this.dataProv.filter((option) => {
        return option
          .toLowerCase()
          .indexOf(this.prov.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
