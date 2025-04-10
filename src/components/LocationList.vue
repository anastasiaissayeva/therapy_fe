<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
          Виды локализаций
      </h1>
      <ul>
          <location-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name="item.name"
            :short_name="item.short_name"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />

      </ul>
      <button @click="toggleAddForm" class="add-button">
          Добавить вид локализаций
      </button>
      <location-add-form v-if="showAddForm"
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

import LocationAddForm from './LocationAddForm.vue';
import LocationComponent from './LocationComponent.vue';
export default {
  components: {
    LocationComponent,
    LocationAddForm,
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
              const response = await this.$http.get("location/",
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

      async editData(id, name,short_name,note) {
          try {
              await this.$http.put(`location/${id}/`, {
                  name: name,
                  short_name: short_name,
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

      edit_item(id, new_name,new_short_name,new_note) {

          this.editData(id, new_name,new_short_name,new_note)
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
              await this.$http.delete("location/" + id + '/', {
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
                  short_name: item.short_name,
                  note: item.note,
              };

              await this.$http.post("location/", newItem, {
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

</style>
