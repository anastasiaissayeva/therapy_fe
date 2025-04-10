<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
          Группы риска
      </h1>

      <table class="styled-table" >
        <thead>
          <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <risk-group-component
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
          Добавить группу риска
      </button>

      <risk-group-add-form v-if="showAddForm"
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

import RiskGroupAddForm from './RiskGroupAddForm.vue';
import RiskGroupComponent from './RiskGroupComponent.vue';
export default {
  components: {
    RiskGroupComponent,
    RiskGroupAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
      };
  },
  methods: {

    async getData() {

      try {
              const response = await this.$http.get("risk-group/",
                  {headers: {authorization: `Bearer ${localStorage.access_token}`,},},
              );
              this.items = response.data;
          }
          catch (error) {
              console.log(error);
              console.error("Ошибка при загрузке данных:", error);
          }
      },

      async editData(id, name, note) {
          try {
              const response = await this.$http.put(`risk-group/${id}/`, {
                  name: name,
                  note: note
              }, {
                  headers: { authorization: `Bearer ${localStorage.access_token}` },
              });
              console.log('Response:', response.data);
              this.getData(); // Обновляем данные после редактирования
          } catch (error) {
              console.error('Error saving data:', error);
          }
      },

      edit_item(id, new_name, new_note) {
        this.editData(id, new_name,  new_note);
        this.refresh();
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
              await this.$http.delete("risk-group/" + id + '/', {
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

              await this.$http.post("risk-group/", newItem, {
                  headers: {
                      authorization: `Bearer ${localStorage.access_token}`,
                  },
              });
              this.getData(); // Обновляем список после добавления
              this.showAddForm = false;
          } catch (error) {
              console.error("Ошибка при добавлении:", error); // Логируем ошибку
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
  /* Установка ширины для столбцов */
.styled-table th:nth-child(1),
.styled-table td:nth-child(1) {
  width: 20%;
}

.styled-table th:nth-child(2),
.styled-table td:nth-child(2) {
  width: 70%;
}

.styled-table th:nth-child(3),
.styled-table td:nth-child(3) {
  width: 10%;
}


</style>
