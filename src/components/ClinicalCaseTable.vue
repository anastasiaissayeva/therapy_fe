<template>
  <div class="sidebar">
    <h1 class="sidebar-title">Клинические случаи</h1>

    <div class="card-container">
      <clinical-case-component
          v-for="item in items" :key="item.id" :id="item.id" :age="item.age"
          :age_min="item.age_min" :age_max="item.age_max" :quantity="item.quantity"
          :gender_display="item.gender_display" :name_diagnosis="item.name_diagnosis"
          :refined_diagnosis="item.refined_diagnosis" :name_location="item.name_location"
          :name_complication="item.name_complication" :name_stage="item.name_stage"
          :name_risk_group="item.name_risk_group" :name_radiation_therapy_type="item.name_radiation_therapy_type"
          :name_tumor="item.name_tumor" :name_node="item.name_node" :name_metastasis="item.name_metastasis"
          :name_histology="item.name_histology" :name_grade="item.name_grade"
          :number_of_fractions="item.number_of_fractions" :single_dose="item.single_dose"
          :treatment_duration="item.treatment_duration" :note="item.note" :diagnosis_arr="diagnosis_arr"
          :spec_location_arr="spec_location_arr" :complication_arr="complication_arr" :stage_arr="stage_arr"
          :risk_group_arr="risk_group_arr" :radiation_therapy_type_arr="radiation_therapy_type_arr"
          :tumor_arr="tumor_arr" :node_arr="node_arr" :metastasis_arr="metastasis_arr" :histology_arr="histology_arr"
          :grade_arr="grade_arr" @edit_item="edit_item" @delete_item="confirmDelete(item.id)"
          :text_location="item.text_location" :text_diagnosis="item.text_diagnosis" :text_complication="item.text_complication" :text_stage="item.text_stage" :text_risk_group="item.text_risk_group" :text_radiation_therapy_type="item.text_radiation_therapy_type" :text_tumor="item.text_tumor" :text_node="item.text_node" :text_metastasis="item.text_metastasis" :text_histology="item.text_histology" :text_grade="item.text_grade"
      />
    </div>

    <button @click="toggleAddForm" class="add-button">
      Добавить вид локализаций
    </button>

    <clinical-case-add-form v-if="showAddForm" @add_item="addItem" @cancel_add="cancelAdd"
      :diagnosis_arr="diagnosis_arr" :spec_location_arr="spec_location_arr" :complication_arr="complication_arr"
      :stage_arr="stage_arr" :risk_group_arr="risk_group_arr" :radiation_therapy_type_arr="radiation_therapy_type_arr"
      :tumor_arr="tumor_arr" :node_arr="node_arr" :metastasis_arr="metastasis_arr" :histology_arr="histology_arr"
      :grade_arr="grade_arr" />

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

import ClinicalCaseAddForm from './ClinicalCaseAddForm.vue';
import ClinicalCaseComponent from './ClinicalCaseComponent.vue';
export default {
  components: {
    ClinicalCaseComponent,
    ClinicalCaseAddForm,
  },
  data() {
    return {
      items: [],
      pendingDeleteId: null,
      deletedItem: null,
      showAddForm: false,
      diagnosis_arr: [],
      spec_location_arr: [],
      complication_arr: [],
      stage_arr: [],
      risk_group_arr: [],
      radiation_therapy_type_arr: [],
      tumor_arr: [],
      node_arr: [],
      metastasis_arr: [],
      histology_arr: [],
      grade_arr: [],
    };
  },
  methods: {
    async getDiagnosis() {
      try {
        const response = await this.$http.get("diagnosis/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.diagnosis_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке диагнозов:", error);
      }
    },

    async getSpecLocation() {
      try {
        const response = await this.$http.get("spec-location/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.spec_location_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке уточненных локализаций:", error);
      }
    },

    async getComplication() {
      try {
        const response = await this.$http.get("complication/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.complication_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке осложнений:", error);
      }
    },

    async getStage() {
      try {
        const response = await this.$http.get("stage/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.stage_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке стадий:", error);
      }
    },

    async getRiskGroup() {
      try {
        const response = await this.$http.get("risk-group/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.risk_group_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке групп риска:", error);
      }
    },

    async getRadiationTherapyType() {
      try {
        const response = await this.$http.get("radiation-therapy-type/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.radiation_therapy_type_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке типов радиационной терапии:", error);
      }
    },

    async getTumor() {
      try {
        const response = await this.$http.get("tumor/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.tumor_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке опухолей:", error);
      }
    },

    async getNode() {
      try {
        const response = await this.$http.get("node/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.node_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке узлов:", error);
      }
    },

    async getMetastasis() {
      try {
        const response = await this.$http.get("metastasis/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.metastasis_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке метастазов:", error);
      }
    },

    async getHistology() {
      try {
        const response = await this.$http.get("histology/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.histology_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке гистологии:", error);
      }
    },

    async getGrade() {
      try {
        const response = await this.$http.get("grade/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        this.grade_arr = response.data;
      } catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке градаций:", error);
      }
    },
    async getData() {
      await this.getDiagnosis();
      await this.getSpecLocation();
      await this.getComplication();
      await this.getStage();
      await this.getRiskGroup();
      await this.getRadiationTherapyType();
      await this.getTumor();
      await this.getNode();
      await this.getMetastasis();
      await this.getHistology();
      await this.getGrade();
      try {
        const response = await this.$http.get("clinical-case/",
          { headers: { authorization: `Bearer ${localStorage.access_token}`, }, },
        );
        this.items = response.data;
      }
      catch (error) {
        console.log(error);
        console.error("Ошибка при загрузке данных:", error);
      }
    },

    async editData(id, age, age_min, age_max, quantity, gender_display, diagnosis, refined_diagnosis, name_location, name_complication, name_stage, name_risk_group, name_radiation_therapy_type, name_tumor, name_node, name_metastasis, name_histology, name_grade, number_of_fractions, single_dose, treatment_duration, note) {

      const dataToSend = {
        age,
        age_min,
        age_max,
        quantity,
        gender: gender_display,
        diagnosis,
        refined_diagnosis,
        spec_location: name_location,
        complication: name_complication,
        stage: name_stage,
        risk_group: name_risk_group,
        radiation_therapy_type: name_radiation_therapy_type,
        tumor: name_tumor,
        node: name_node,
        metastasis: name_metastasis,
        histology: name_histology,
        grade: name_grade,
        number_of_fractions,
        single_dose,
        treatment_duration,
        note
      };

      console.log("Отправляемые данные для редактирования:", dataToSend);

      try {
        const response = await this.$http.put(`clinical-case/${id}/`, dataToSend, {
          headers: { authorization: `Bearer ${localStorage.access_token}` },
        });
        console.log('Response:', response.data);
        this.getData();
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error.response ? error.response.data : error);
      }
    },
    edit_item(id, new_age, new_age_min, new_age_max, new_quantity, new_gender_display, new_diagnosis, new_refined_diagnosis, new_name_location, new_name_complication, new_name_stage, new_name_risk_group, new_name_radiation_therapy_type, new_name_tumor, new_name_node, new_name_metastasis, new_name_histology, new_name_grade, new_number_of_fractions, new_single_dose, new_treatment_duration, new_note) {

      this.editData(id, new_age, new_age_min, new_age_max, new_quantity, new_gender_display, new_diagnosis, new_refined_diagnosis, new_name_location, new_name_complication, new_name_stage, new_name_risk_group, new_name_radiation_therapy_type, new_name_tumor, new_name_node, new_name_metastasis, new_name_histology, new_name_grade, new_number_of_fractions, new_single_dose, new_treatment_duration, new_note);
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
        await this.$http.delete("clinical-case/" + id + '/', {
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
            quantity: item.quantity || 1,
            spec_location: item.spec_location || null,
            radiation_therapy_type: item.radiation_therapy_type || null,

            ...(item.age !== null && { age: item.age }),
            ...(item.age_min !== null && { age_min: item.age_min }),
            ...(item.age_max !== null && { age_max: item.age_max }),
            ...(item.complication !== null && { complication: item.complication }),
            ...(item.diagnosis !== null && { diagnosis: item.diagnosis }),
            ...(item.gender !== null && { gender: item.gender_display }),
            ...(item.grade !== null && { grade: item.grade }),
            ...(item.histology !== null && { histology: item.histology }),
            ...(item.metastasis !== null && { metastasis: item.metastasis }),
            ...(item.node !== null && { node: item.node }),
            ...(item.number_of_fractions !== null && { number_of_fractions: item.number_of_fractions }),
            ...(item.refined_diagnosis !== null && { refined_diagnosis: item.refined_diagnosis }),
            ...(item.risk_group !== null && { risk_group: item.risk_group }),
            ...(item.single_dose !== null && { single_dose: item.single_dose }),
            ...(item.stage !== null && { stage: item.stage }),
            ...(item.treatment_duration !== null && { treatment_duration: item.treatment_duration }),
            ...(item.tumor !== null && { tumor: item.tumor }),
            note: item.note || ''
          };

        await this.$http.post("clinical-case/", newItem, {
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  z-index: 1;
}

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
