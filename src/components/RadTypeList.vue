<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
          Виды лучевой терапии
      </h1>
      <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
      <table class="styled-table" >
        <thead>
          <tr>
              <th @click="sort('name')">Название</th>
              <th @click="sort('note')">Заметка</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <rad-type-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name="item.name"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>
      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить вид лучевой терапии
      </button>

      <rad-type-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd" />

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

import RadTypeAddForm from './RadTypeAddForm.vue';
import RadTypeComponent from './RadTypeComponent.vue';
export default {
  components: {
    RadTypeComponent,
    RadTypeAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null, // Состояние для отслеживания элемента, ожидающего удаления
          deletedItem: null,
          showAddForm: false,
          searchQuery: '',
          sortKey: '',
          sortOrder: 'asc',

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

            const response = await this.$http.get(`radiation-therapy-type/?${params.toString()}`,
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
      async editData(id, name,note) {
          try {
              await this.$http.put(`radiation-therapy-type/${id}/`, {
                  name: name,
                  note: note
              },
                  {
                      headers: { authorization: `Bearer ${localStorage.access_token}`, }
                  },);
          }
          catch (error) {
              console.log(error);
          }
      },

      edit_item(id, new_name,new_note) {

          this.editData(id, new_name,new_note)
          this.refresh()
      },
      refresh() {
          setTimeout(() => { this.getData(); }, 500);
      },

      confirmDelete(id) {
          this.pendingDeleteId = id; // Устанавливаем id элемента, который нужно удалить
      },
      deleteConfirmed() {
          if (this.pendingDeleteId !== null) {
              this.deleteData(this.pendingDeleteId); // Удаляем элемент
              this.pendingDeleteId = null; // Сбрасываем состояние
          }
      },
      cancelDelete() {
          this.pendingDeleteId = null; // Сбрасываем состояние
      },
      async deleteData(id) {
          try {
              this.deletedItem = this.items.find(item => item.id === id);
              await this.$http.delete("radiation-therapy-type/" + id + '/', {
                  headers: {
                      authorization: `Bearer ${localStorage.access_token}`,
                  },
              });

              this.getData(); // Обновляем список после удаления
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
              this.deletedItem = null; // Сбрасываем удаленный элемент
              this.showUndoButton = false; // Скрываем кнопку отмены
          }

      },


      async addItem(item) {
          try {
              const newItem = {
                  name: item.name,
                  note: item.note,
              };

              await this.$http.post("radiation-therapy-type/", newItem, {
                  headers: {
                      authorization: `Bearer ${localStorage.access_token}`,
                  },
              });
              this.getData(); // Обновляем список после добавления
              this.showAddForm = false;
          } catch (error) {
              console.error("Ошибка при добавлении:", error);
          }
      },
      cancelAdd() {
          this.showAddForm = false; // Скрываем форму при отмене добавления
      },
      toggleAddForm() {
          this.showAddForm = !this.showAddForm; // Переключаем видимость формы
      },
      mounted() {
          this.getData(); // Получаем данные при монтировании компонента
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
    width: 60%;
  }

  .styled-table th:nth-child(4),
  .styled-table td:nth-child(4) {
    width: 10%;
  }
</style>
