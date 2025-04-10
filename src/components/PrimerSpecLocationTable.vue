<template>
  <div>
    <h1>Список домашних животных</h1>
    <table>
      <thead>
        <tr>
          <th>Уточненная локализация</th>
          <th>Локализация</th>
          <th>Заметки</th>
        </tr>
      </thead>
            <spec-location-component
                v-for="item in items"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :name_location="item.name_location"
                :note="item.note"
        />
    </table>
  </div>
</template>

<script>
import SpecLocationComponent from "./SpecLocationComponent.vue";
export default {
  components: {
    SpecLocationComponent,
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get("spec-location/",
                  {
                      headers: {
                          authorization: `Bearer ${localStorage.access_token}`,
                      },
                  },
              );

        this.items = response.data;
      }

      catch (error) {
        console.log(error);
      }
    },

  },
  created() {
    this.getData();
  },
};
</script>

<style>
table {
  border-radius: 3px;
  background-color: #ffffff;
}
td {
    min-width: 200px;
    padding: 10px 20px;
    background-color: #C2B6FE;
}
tr {
    background-color: #fff;
}
th {
    background-color: #ffffff;
}
</style>
