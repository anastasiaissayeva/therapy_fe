<template>
  <div class="sidebar">
      <h1 class="sidebar-title">
        Набор данных
      </h1>

      <table class="styled-table" >
        <thead>
          <tr>
              <th>Результат</th>
              <th>Клинический случай</th>
              <th>Источник</th>
              <th>Заметка</th>
              <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <data-set-component
          v-for="item in items"
            :key="item.id"
            :id='item.id'
            :name_result="item.name_result"
            :name_сlinical_сase="item.name_сlinical_сase"
            :name_source="item.name_source"

            :results="results"
            :сlinical_сases="сlinical_сases"
            :sources="sources"
            :note="item.note"
            @edit_item="edit_item"
            @delete_item="confirmDelete(item.id)" />
        </tbody>


      </table>

      <button @click="toggleAddForm" class="add-button">
          Добавить
      </button>

      <data-set-add-form v-if="showAddForm"
          @add_item="addItem"
          @cancel_add="cancelAdd"
          :results="results"
          :сlinical_сases="сlinical_сases"
          :sources="sources"
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

import DataSetAddForm from './DataSetAddForm.vue';
import DataSetComponent from './DataSetComponent.vue';
export default {
  components: {
    DataSetComponent,
    DataSetAddForm,
  },
  data() {
      return {
          items: [],
          pendingDeleteId: null,
          deletedItem: null,
          showAddForm: false,
          results: [],
          сlinical_сases: [],
          sources: [],
      };
  },
  methods: {
    async getResults() {
        try {
            const response = await this.$http.get("result/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.results = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getClinical_сases() {
        try {
            const response = await this.$http.get("clinical-case/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.сlinical_сases = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getSources() {
        try {
            const response = await this.$http.get("source/", {
                headers: { authorization: `Bearer ${localStorage.access_token}` },
            });
            this.sources = response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async getData() {
      await this.getResults();
      await this.getClinical_сases();
      await this.getSources();
      try {
              const response = await this.$http.get("dataset/",
                  {headers: {authorization: `Bearer ${localStorage.access_token}`,},},
              );
              this.items = response.data;
          }
          catch (error) {
              console.log(error);
              console.error("Ошибка при загрузке данных:", error);
          }
      },

      async editData(id,name_result_id,name_сlinical_сase_id,name_source_id, note) {
          try {
              const response = await this.$http.put(`dataset/${id}/`, {
                  result:name_result_id,
                  сlinical_сase:name_сlinical_сase_id,
                  source:name_source_id,
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

      edit_item(id, new_result_id,new_сlinical_сase_id,new_source_id, new_note) {
        console.log('Editing item:', id, new_result_id,new_сlinical_сase_id,new_source_id, new_note);
        this.editData(id, new_result_id,new_сlinical_сase_id,new_source_id, new_note);
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
              await this.$http.delete("dataset/" + id + '/', {
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
                result: item.name_result,
                сlinical_сase: item.name_сlinical_сase,
                source: item.name_source,
                note: item.note,
              };

              await this.$http.post("dataset/", newItem, {
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
