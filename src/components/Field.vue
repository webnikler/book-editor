<template>
  <div class="form-group mb-0">
    <input class="form-control field__input" :class="{ 'is-invalid': validation.$error }"
           :type="type"
           v-model="model"
    />
    <div class="text-danger field__message" v-if="errors[0]">
      {{ errors[0] }}
    </div>
  </div>
</template>

<script>

import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class Field extends Vue {
  @Prop({ default: null }) value;

  @Prop({ default: () => ({}) }) messages;

  @Prop({ default: () => ({}) }) validation;

  @Prop({ default: 'text' }) type;

  touched = false;

  get model() {
    return this.type === 'date'
      ? moment(this.value).format('YYYY-MM-DD')
      : this.value;
  }

  set model(value) {
    const formattedValue = this.type === 'date'
      ? moment(value).valueOf()
      : value;

    this.$emit('update:value', formattedValue);

    if (!this.touched) {
      this.validation.$touch();
      this.touched = true;
    }
  }

  get errors() {
    return Object.keys(this.messages)
      .filter(key => !this.validation[key])
      .map(key => this.messages[key]);
  }
}

</script>

<style scoped lang="scss">
  .field {
    &__input {
      max-width: 300px;
    }
    &__message {
      font-size: 13px;
      line-height: 1.8;
    }
  }
</style>
