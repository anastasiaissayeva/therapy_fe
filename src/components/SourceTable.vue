<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
        Источники
      </h1>
      <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
      <table class="styled-table" >
        <thead>
          <tr>
              <th  @click="sort('name')">Название источника</th>
              <th @click="sort('full_name')">Полное название источника</th>
              <th @click="sort('url')">Ссылка на источник</th>
              <th @click="sort('name')">Доп. информация</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <source-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name="item.name"
            :full_name="item.full_name"
            :url="item.url"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>


      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить
      </button>

      <source-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd"

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

import SourceAddForm from './SourceAddForm.vue';
import SourceComponent from './SourceComponent.vue';
export default {
  components: {
    SourceComponent,
    SourceAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
          searchQuery: '',sortKey: '',sortOrder: 'asc',

      };
  },
  methods: {

    async getData() {
      try {
        const params = new URLSearchParams();

        if (this.searchQuery) {
            params.append('search', this.searchQuery);
          }
          if (this.sortKey) {
            params.append('ordering', (this.sortOrder === 'desc' ? '-' : '') + this.sortKey);
          }
        const response = await this.$http.get(`source/?${params.toString()}`,
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

      async editData(id, name, full_name, url, note) {
          try {
              const response = await this.$http.put(`source/${id}/`, {
                  name: name,
                  full_name: full_name,
                  url: url,
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

      edit_item(id, new_name, new_full_name, new_url, new_note) {
        console.log('Editing item:', id, new_name, new_full_name, new_url, new_note);
        this.editData(id, new_name, new_full_name, new_url, new_note);
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
              await this.$http.delete("source/" + id + '/', {
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
                  ...(item.name !== "" && { name: item.name }),
                  ...(item.full_name !== "" && { full_name: item.full_name }),
                  ...(item.url !== "" && { url: item.url }),
                  ...(item.note !== "" && { value: item.note }),
              };

              await this.$http.post("source/", newItem, {
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
