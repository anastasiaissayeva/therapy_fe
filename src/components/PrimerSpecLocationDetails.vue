<template>
  <div>
      <h1>Информация о локализациях</h1>
      <span>
          {{ item }}
      </span>
      <spec-location-edit-form :item="item" :key="item.id" @edit-item="editItem" />
  </div>
</template>

<script>
import SpecLocationEditForm from "./SpecLocationEditForm.vue";
export default {
components: { SpecLocationEditForm },
props: {
  id: {
    type: String,
    required: true,
  },
},
data() {
  return { item: {} };
},
methods: {
  async getData() {
    try {
      const response = await this.$http.get("spec-location/" + this.id + "/",
                  {
                      headers: {
                          authorization: `Bearer ${localStorage.access_token}`,
                      },
                  },
              );
      this.item = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  async editItem(name, location) {
      try {
        await this.$http.put("spec-location/" + this.id + "/",
        {name: name, location: location, note: this.item.note, },
        {headers: {authorization: `Bearer ${localStorage.access_token}`,}},
        );
      } catch (error) {
        console.log(error);
      }
    },
},
created() {
  this.getData();
},
};
</script>
