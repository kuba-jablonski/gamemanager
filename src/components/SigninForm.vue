<template>
  <v-card>
    <v-card-text class="font-weight-bold ">
      <v-btn @click="$emit('onFormChange')" small text>
        create a new account
      </v-btn>
    </v-card-text>
    <v-card-title class="mb-6 d-flex justify-center"
      ><h2>Sign In</h2></v-card-title
    >
    <v-card-text>
      <v-form>
        <v-text-field label="Username" required outlined></v-text-field>
        <v-text-field label="Password" required outlined></v-text-field>
        <div class="d-flex justify-center"></div>
        <v-btn depressed large>
          Submit
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
