<template>
    <div class="login">
        <b-jumbotron bg-variant="info"
                     header="Vue.js Chat"
                     lead="Powered by Chatkit SDK and Bootstrap-Vue"
                     text-variant="white">
        </b-jumbotron>

        <p> For mor information visit website</p>
        <b-btn target="_blank" href="https://pusher.com/chatkit">More info</b-btn>
        <b-container>
            <b-row>
                <b-col lg="4" md="3"></b-col>
                <b-col lg="4" md="6">
                    <LoginForm />
                </b-col>
                <b-col lg="4" md="3"></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>
