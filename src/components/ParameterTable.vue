<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
        Параметры
      </h1>
      <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
      <table class="styled-table" >
        <thead>
          <tr>
              <th @click="sort('name')">Параметр</th>
              <th @click="sort('full_name')">Полное название параметра</th>
              <th @click="sort('unit')">Ед. изм.</th>
              <th @click="sort('note')">Заметка</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <parameter-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name="item.name"
            :full_name="item.full_name"
            :name_unit="item.name_unit"
            :units="units"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>


      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить
      </button>

      <parameter-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd"
          :units="units"
          />

      <div v-if="pendingDeleteId !== null" class="confirmation">
          <div class="confirmation-content">
              <p>Вы уверены, что хотите удалить этот элемент?</p>
              <div class="confirmation-buttons">
                  <button @click="deleteConfirmed" class="confirm-button">Да, удалить</button>
                  <button @click="cancelDelete" class="cancel-button">Отмена</button>
              </div>
          </div>
      </div>



  </div>
</template>

<script>

import ParameterAddForm from './ParameterAddForm.vue';
import ParameterComponent from './ParameterComponent.vue';
export default {
  components: {
    ParameterComponent,
    ParameterAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
          units: [],
          searchQuery: '',sortKey: '',sortOrder: 'asc',
      };
  },
  methods: {
    async getUnits() {
      try {
          const response = await this.$http.get("unit/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.units = response.data;
          } catch (error) {
            console.log(error);
        }

    },
    async getData() {
      await this.getUnits();

        try {
          const params = new URLSearchParams();

        if (this.searchQuery) {
            params.append('search', this.searchQuery);
          }
          if (this.sortKey) {
            params.append('ordering', (this.sortOrder === 'desc' ? '-' : '') + this.sortKey);
          }
        const response = await this.$http.get(`parameter/?${params.toString()}`,
                  {headers: {authorization: `Bearer ${localStorage.access_token}`,},},
              );
              this.items = response.data;
          }
          catch (error) {
              console.log(error);
              console.error("Ошибка при загрузке данных:", error);
          }
      },
      onSearchChange() {
        this.getData();
      },
      sort(key) {
          if (this.sortKey === key) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
          } else {
            this.sortKey = key;
            this.sortOrder = 'asc';
          }
          this.getData();
        },

      async editData(id, name, full_name, name_unit_id, note) {
          try {
              const response = await this.$http.put(`parameter/${id}/`, {
                  name: name,
                  full_name: full_name,
                  unit: name_unit_id,
                  note: note
              }, {
                  headers: { authorization: `Bearer ${localStorage.access_token}` },
              });
              console.log('Response:', response.data);
              this.getData();
          } catch (error) {
              console.error('Error saving data:', error);
          }
      },

      edit_item(id, new_name, new_full_name, new_name_unit_id, new_note) {
        console.log('Editing item:', id, new_name, new_full_name, new_name_unit_id, new_note);
        this.editData(id, new_name, new_full_name, new_name_unit_id, new_note);
        this.refresh();
      },

      refresh() {
          setTimeout(() => { this.getData(); }, 500);
      },

      confirmDelete(id) {
          this.pendingDeleteId = id;
      },
      deleteConfirmed() {
          if (this.pendingDeleteId !== null) {
              this.deleteData(this.pendingDeleteId);
              this.pendingDeleteId = null;
          }
      },
      cancelDelete() {
          this.pendingDeleteId = null;
      },
      async deleteData(id) {
          try {
              this.deletedItem = this.items.find(item => item.id === id);
              await this.$http.delete("parameter/" + id + '/', {
                  headers: {
                      authorization: `Bearer ${localStorage.access_token}`,
                  },
              });

              this.getData();
              this.showUndoButton = true;
          } catch (error) {
              console.log(error);
              console.error("Ошибка при удалении данных:", error);
          }
      },
      delete_item(id) {
          console.log('Удаление элемента с id:', id);
          this.deleteData(id);
      },
      restoreDeletedItem() {
          if (this.deletedItem) {

              this.items.push(this.deletedItem);
              this.deletedItem = null;
              this.showUndoButton = false;
          }

      },


      async addItem(item) {

          try {
              const newItem = {
                  name: item.name,
                  full_name: item.full_name,
                  unit: item.name_unit,
                  note: item.note,
              };

              await this.$http.post("parameter/", newItem, {
                  headers: {
                      authorization: `Bearer ${localStorage.access_token}`,
                  },
              });
              this.getData();
              this.showAddForm = false;
          } catch (error) {
              console.error("Ошибка при добавлении:", error);
          }
      },
      cancelAdd() {
          this.showAddForm = false;
      },
      toggleAddForm() {
          this.showAddForm = !this.showAddForm;
      },
      mounted() {
          this.getData();
      },



  },
  created() {
      this.getData()
  },
  computed: {
      logged_out: function () {
          return localStorage.access_token == null
      }
  }


};
</script>

<style scoped>

.styled-table th:nth-child(1),
.styled-table td:nth-child(1) {
  width: 30%;
}

.styled-table th:nth-child(2),
.styled-table td:nth-child(2) {
  width: 30%;
}

.styled-table th:nth-child(3),
.styled-table td:nth-child(3) {
  width: 40%;
}

.styled-table th:nth-child(4),
.styled-table td:nth-child(4) {
  width: 10%;
}
</style>
