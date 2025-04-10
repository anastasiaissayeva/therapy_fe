<template>
  <div>
    {{ item.name }} {{newName }} {{ tmp }}
    <form @submit.prevent="saveData">
      <div>
        <div>
          <label>Уточненная локализация</label>
          <input
            type="text"
            placeholder="Введите уточненную локализацию"
            :key="tmp"
            v-model.lazy.trim="newName"
          />
        </div>
        <div>
          <label>Обобщенная локализация</label>
          <select v-model="newLocation" :key="tmp">
            <spec-location-variants name="location" :selected="this.item.location" />
          </select>
        </div>
        <button type="submit">Подтвердить</button>
        <button @click="goBack">Вернуться к списку</button>
      </div>
    </form>
  </div>
</template>

<script>
import SpecLocationVariants from "./SpecLocationVariants.vue";
export default {
  components: { SpecLocationVariants },
  props: {
    item: { type: Object },
  },
  data() {
  return {
    newName: this.item.name,
    newLocation: this.item.location,
    tmp: 0,
  };
},

  methods: {
    saveData() {
      this.$emit("edit-item", this.newName, this.newLocation);
    },
    goBack() {
      this.$router.push("/speclocationtable");
    },
  },
};
</script>
