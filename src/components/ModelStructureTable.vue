<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
        Структуры моделей
      </h1>

      <table class="styled-table" >
        <thead>
          <tr>
              <th>Модель</th>
              <th>Параметр</th>
              <th>Заметка</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <model-structure-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name_model_name="item.name_model_name"
            :model_names="model_names"
            :name_parameter="item.name_parameter"
            :parameters="parameters"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>


      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить
      </button>

      <model-structure-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd"
          :model_names="model_names"
          :parameters="parameters"
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

import ModelStructureAddForm from './ModelStructureAddForm.vue';
import ModelStructureComponent from './ModelStructureComponent.vue';
export default {
  components: {
    ModelStructureComponent,
    ModelStructureAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
          model_names: [],
          parameters: [],
      };
  },
  methods: {
    async getModelNames() {
        try {
            const response = await this.$http.get("model-name/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.model_names = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getParameters() {
        try {
            const response = await this.$http.get("parameter/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.parameters = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getData() {
      await this.getModelNames();
      await this.getParameters();
      try {
              const response = await this.$http.get("model-structure/",
                  {headers: {authorization: `Bearer ${localStorage.access_token}`,},},
              );
              this.items = response.data;
          }
          catch (error) {
              console.log(error);
              console.error("Ошибка при загрузке данных:", error);
          }
      },

      async editData(id,name_model_name_id,name_parameter_id, note) {
          try {
              const response = await this.$http.put(`model-structure/${id}/`, {

                  model_name: name_model_name_id,
                  parameter: name_parameter_id,
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

      edit_item(id, new_model_name_id,new_parameter_id, new_note) {
        console.log('Editing item:', id, new_model_name_id,new_parameter_id, new_note);
        this.editData(id, new_model_name_id,new_parameter_id, new_note);
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
              await this.$http.delete("model-structure/" + id + '/', {
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
                  model_name: item.name_model_name,
                  parameter: item.name_parameter,
                  note: item.note,
              };

              await this.$http.post("model-structure/", newItem, {
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
