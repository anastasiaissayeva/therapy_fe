<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
        Осложнения
      </h1>

      <table class="styled-table" >
        <thead>
          <tr>
              <th>Название осложнения</th>
              <th>Альтернативное название осложнения</th>
              <th>Уточненная локализация</th>
              <th>Доп. информация</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <complication-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name="item.name"
            :alt_name="item.alt_name"
            :name_location="item.name_location"
            :locations="locations"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>


      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить вид осложнений
      </button>

      <complication-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd"
          :locations="locations"
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

import ComplicationAddForm from './ComplicationAddForm.vue';
import ComplicationComponent from './ComplicationComponent.vue';
export default {
  components: {
    ComplicationComponent,
    ComplicationAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
          locations: [],
      };
  },
  methods: {
    async getLocations() {
        try {
            const response = await this.$http.get("spec-location/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.locations = response.data; // Сохраняем локализации
        } catch (error) {
            console.log(error);
            console.error("Ошибка при загрузке локализаций:", error);
        }
    },
    async getData() {
      await this.getLocations();
      try {
              const response = await this.$http.get("complication/",
                  {headers: {authorization: `Bearer ${localStorage.access_token}`,},},
              );
              this.items = response.data;
          }
          catch (error) {
              console.log(error);
              console.error("Ошибка при загрузке данных:", error);
          }
      },

      async editData(id, name, alt_name, spec_location_id, note) {
        try {
        const response = await this.$http.put(`complication/${id}/`, {
            name: name,
            alt_name: alt_name,
            spec_location: spec_location_id,
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

      edit_item(id, new_name, alt_name, new_location_id, new_note) {
          this.editData(id, new_name, alt_name, new_location_id, new_note);
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
              await this.$http.delete("complication/" + id + '/', {
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
                  alt_name: item.alt_name,
                  spec_location: item.spec_location,
                  note: item.note,
              };

              await this.$http.post("complication/", newItem, {
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
.styled-table th:nth-child(1), /* Название */
.styled-table td:nth-child(1) {
  width: 30%; /* Ширина для столбца "Название" */
}

.styled-table th:nth-child(2), /* Локализация */
.styled-table td:nth-child(2) {
  width: 30%; /* Ширина для столбца "Локализация" */
}

.styled-table th:nth-child(3), /* Заметка */
.styled-table td:nth-child(3) {
  width: 40%; /* Ширина для столбца "Заметка" */
}

.styled-table th:nth-child(4), /* Действия */
.styled-table td:nth-child(4) {
  width: 10%; /* Ширина для столбца "Действия" - маленькая */
}
</style>
