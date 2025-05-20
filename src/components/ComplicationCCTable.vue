<template>
  <div class="sidebar">
    <h1 class="sidebar-title">
      Осложнения
    </h1>
    <input v-model="searchQuery" @input="onSearchChange" placeholder="Поиск..." />
    <table class="styled-table">
      <thead>
        <tr>
          <th @click="sort('complication')">Осложнение</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <ComplicationCCComponent v-for="item in items" :key="item.id" :id='item.id'
          :name_complication="item.name_complication" :clinical_case_id="selected_clinical_case_id"
          :complications="complications" :complication="item.complication" @edit_item="edit_item"
          @delete_item="confirmDelete(item.id)" />
      </tbody>


    </table>

    <button @click="toggleAddForm" class="add-button">
      Добавить
    </button>

    <ComplicationCCAddForm v-if="showAddForm" @add_item="addItem" @cancel_add="cancelAdd"
      :clinical_case_id="selected_clinical_case_id" :clinical_cases="clinical_cases" :complications="complications" />

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

import ComplicationCCAddForm from './ComplicationCCAddForm.vue';
import ComplicationCCComponent from './ComplicationCCComponent.vue';
export default {
  components: {
    ComplicationCCComponent,
    ComplicationCCAddForm,
  },
  props: {
    selected_clinical_case_id: {
      type: Number,
      required: false
    },

  },
  data() {
    return {
      items: [],
      pendingDeleteId: null,
      deletedItem: null,
      showAddForm: false,

      clinical_cases: [],
      complications: [],
      searchQuery: '', sortKey: '', sortOrder: 'asc',
    };
  },
  methods: {

    // async getClinical_сases() {
    //     try {
    //         const response = await this.$http.get("clinical-case/", {
    //             headers: { authorization: `Bearer ${localStorage.access_token}` },
    //         });
    //         this.clinical_cases = response.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    async getСomplications() {
      try {
        const response = await this.$http.get("complication/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.complications = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {

      // await this.getClinical_сases();
      await this.getСomplications();
      try {
        const params = new URLSearchParams();

        if (this.searchQuery) {
          params.append('search', this.searchQuery);
        }
        if (this.sortKey) {
          params.append('ordering', (this.sortOrder === 'desc' ? '-' : '') + this.sortKey);
        }
        if (this.selected_clinical_case_id) {
          params.append('clinical_case', this.selected_clinical_case_id);
        }
        const response = await this.$http.get(`сlinical-сase-сomplication/?${params.toString()}`,
          { headers: { authorization: `Bearer ${localStorage.access_token}`, }, },
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

    async editData(id, name_clinical_case_id, complication, note) {
      try {
        const response = await this.$http.put(`сlinical-сase-сomplication/${id}/`, {

          clinical_case: name_clinical_case_id,
          complication: complication,
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

    edit_item(id, new_clinical_case_id, new_complication_id) {
      console.log('Editing item:', id, new_clinical_case_id, new_complication_id,);
      this.editData(id, new_clinical_case_id, new_complication_id,);
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

          clinical_case: this.selected_clinical_case_id,
          complication: item.name_complication,

        };

        await this.$http.post("сlinical-сase-сomplication/", newItem, {
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
  width: 80%;
}

.styled-table th:nth-child(2),
.styled-table td:nth-child(2) {
  width: 10%;
}

.styled-table th:nth-child(3),
.styled-table td:nth-child(3) {
  width: 10%;
}
</style>
