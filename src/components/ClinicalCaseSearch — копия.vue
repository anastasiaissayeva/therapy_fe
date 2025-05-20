<template>
  <div class="search-container">
    <div class="sidebar">

      <h2 @click="toggleFilter('radiationTherapyType')" class="filter-title">
        Виды лучевой терапии <span class="toggle-arrow">{{ isFilterVisible.radiationTherapy ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.radiationTherapyType" class="checkbox-group">
        <div v-for="radiationTherapyTypeOption in radiationTherapyTypeOptions" :key="radiationTherapyTypeOption.id"
          class="checkbox-container">
          {{ radiationTherapyTypeOption.name }}
          <input type="checkbox" :value="radiationTherapyTypeOption.id" v-model="selectedRadiationTherapyTypes" />
        </div>
      </div>

      <h2 @click="toggleFilter('location')" class="filter-title">
        Локализация <span class="toggle-arrow">{{ isFilterVisible.location ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.location" class="checkbox-group">
        <div v-for="locationOption in locationOptions" :key="locationOption.id" class="checkbox-container">
          {{ locationOption.name }}
          <input type="checkbox" :value="locationOption.id" v-model="selectedLocations" />
        </div>
      </div>

      <h2 @click="toggleFilter('specLocation')" class="filter-title">
        Уточненная локализация <span class="toggle-arrow">{{ isFilterVisible.specLocation ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.specLocation" class="checkbox-group">
        <div v-for="specLocationOption in specLocationOptions" :key="specLocationOption.id" class="checkbox-container">
          {{ specLocationOption.name }}
          <input type="checkbox" :value="specLocationOption.id" v-model="selectedSpecLocations" />
        </div>
      </div>

      <h2 @click="toggleFilter('age')" class="filter-title">
        Возраст <span class="toggle-arrow">{{ isFilterVisible.age ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.age" class="checkbox-group">
        <div v-for="ageOption in ageOptions" :key="ageOption" class="checkbox-container">
          {{ ageOption }}
          <input type="checkbox" :value="ageOption" v-model="selectedAges" />
        </div>
      </div>

      <h2 @click="toggleFilter('age_min')" class="filter-title">
        Минимальный возраст <span class="toggle-arrow">{{ isFilterVisible.age_min ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.age_min" class="checkbox-group">
        <div v-for="age_minOption in age_minOptions" :key="age_minOption" class="checkbox-container">
          {{ age_minOption }}
          <input type="checkbox" :value="age_minOption" v-model="selectedAgeMins" />
        </div>
      </div>

      <h2 @click="toggleFilter('age_max')" class="filter-title">
        Максимальный возраст <span class="toggle-arrow">{{ isFilterVisible.age_max ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.age_max" class="checkbox-group">
        <div v-for="age_maxOption in age_maxOptions" :key="age_maxOption" class="checkbox-container">
          {{ age_maxOption }}
          <input type="checkbox" :value="age_maxOption" v-model="selectedAgeMaxs" />
        </div>
      </div>

      <h2 @click="toggleFilter('quantity')" class="filter-title">
        Количество <span class="toggle-arrow">{{ isFilterVisible.quantity ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.quantity" class="checkbox-group">
        <div v-for="quantityOption in quantityOptions" :key="quantityOption" class="checkbox-container">
          {{ quantityOption }}
          <input type="checkbox" :value="quantityOption" v-model="selectedQuantitys" />
        </div>
      </div>

      <h2 @click="toggleFilter('gender')" class="filter-title">
        Пол <span class="toggle-arrow">{{ isFilterVisible.gender ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.gender" class="checkbox-group">
        <div v-for="genderOption in genderOptions" :key="genderOption" class="checkbox-container">
          {{ genderOption }}
          <input type="checkbox" :value="genderOption" v-model="selectedGenders" />
        </div>
      </div>

      <h2 @click="toggleFilter('diagnosis')" class="filter-title">
        Диагнозы <span class="toggle-arrow">{{ isFilterVisible.diagnosis ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.diagnosis" class="checkbox-group">
        <div v-for="diagnosisOption in diagnosisOptions" :key="diagnosisOption.id" class="checkbox-container">
          {{ diagnosisOption.code }}
          <input type="checkbox" :value="diagnosisOption.id" v-model="selectedDiagnoses" />
        </div>
      </div>

      <h2 @click="toggleFilter('complication')" class="filter-title">
        Осложнения <span class="toggle-arrow">{{ isFilterVisible.complication ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.complication" class="checkbox-group">
        <div v-for="complicationOption in complicationOptions" :key="complicationOption.id" class="checkbox-container">
          {{ complicationOption.name }}
          <input type="checkbox" :value="complicationOption.id" v-model="selectedComplications" />
        </div>
      </div>

      <h2 @click="toggleFilter('stage')" class="filter-title">
        Стадии <span class="toggle-arrow">{{ isFilterVisible.stage ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.stage" class="checkbox-group">
        <div v-for="stageOption in stageOptions" :key="stageOption.id" class="checkbox-container">
          {{ stageOption.name }}
          <input type="checkbox" :value="stageOption.id" v-model="selectedStages" />
        </div>
      </div>

      <h2 @click="toggleFilter('riskGroup')" class="filter-title">
        Группы риска <span class="toggle-arrow">{{ isFilterVisible.riskGroup ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.riskGroup" class="checkbox-group">
        <div v-for="riskGroupOption in riskGroupOptions" :key="riskGroupOption.id" class="checkbox-container">
          {{ riskGroupOption.name }}
          <input type="checkbox" :value="riskGroupOption.id" v-model="selectedRiskGroups" />
        </div>
      </div>



      <h2 @click="toggleFilter('tumor')" class="filter-title">
        Опухоль <span class="toggle-arrow">{{ isFilterVisible.tumor ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.tumor" class="checkbox-group">
        <div v-for="tumorOption in tumorOptions" :key="tumorOption.id" class="checkbox-container">
          {{ tumorOption.name }}
          <input type="checkbox" :value="tumorOption.id" v-model="selectedTumors" />
        </div>
      </div>

      <h2 @click="toggleFilter('node')" class="filter-title">
        Узел <span class="toggle-arrow">{{ isFilterVisible.node ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.node" class="checkbox-group">
        <div v-for="nodeOption in nodeOptions" :key="nodeOption.id" class="checkbox-container">
          {{ nodeOption.name }}
          <input type="checkbox" :value="nodeOption.id" v-model="selectedNodes" />
        </div>
      </div>

      <h2 @click="toggleFilter('metastasis')" class="filter-title">
        Метастазы <span class="toggle-arrow">{{ isFilterVisible.metastasis ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.metastasis" class="checkbox-group">
        <div v-for="metastasisOption in metastasisOptions" :key="metastasisOption.id" class="checkbox-container">
          {{ metastasisOption.name }}
          <input type="checkbox" :value="metastasisOption.id" v-model="selectedMetastases" />
        </div>
      </div>

      <h2 @click="toggleFilter('histology')" class="filter-title">
        Гистология <span class="toggle-arrow">{{ isFilterVisible.histology ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.histology" class="checkbox-group">
        <div v-for="histologyOption in histologyOptions" :key="histologyOption.id" class="checkbox-container">
          {{ histologyOption.name }}
          <input type="checkbox" :value="histologyOption.id" v-model="selectedHistologies" />
        </div>
      </div>

      <h2 @click="toggleFilter('grade')" class="filter-title">
        Степень <span class="toggle-arrow">{{ isFilterVisible.grade ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.grade" class="checkbox-group">
        <div v-for="gradeOption in gradeOptions" :key="gradeOption.id" class="checkbox-container">
          {{ gradeOption.name }}
          <input type="checkbox" :value="gradeOption.id" v-model="selectedGrades" />
        </div>
      </div>

      <h2 @click="toggleFilter('fraction')" class="filter-title">
        Количество фракций <span class="toggle-arrow">{{ isFilterVisible.fraction ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.fraction" class="checkbox-group">
        <div v-for="fraction in fractionOptions" :key="fraction" class="checkbox-container">
          <label>
            <input type="checkbox" :value="fraction" v-model="selectedNumberOfFractions" />
            {{ fraction }}
          </label>
        </div>
      </div>

      <h2 @click="toggleFilter('dose')" class="filter-title">
        Разовую доза <span class="toggle-arrow">{{ isFilterVisible.dose ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.dose" class="checkbox-group">
        <div v-for="dose in doseOptions" :key="dose" class="checkbox-container">
          <label>
            <input type="checkbox" :value="dose" v-model="selectedSingleDose" />
            {{ dose }}
          </label>
        </div>
      </div>

      <h2 @click="toggleFilter('treatmentDuration')" class="filter-title">
        Длительность лечения (дней) <span class="toggle-arrow">{{ isFilterVisible.treatmentDuration ? '▲' : '▼'
        }}</span>
      </h2>
      <div v-if="isFilterVisible.treatmentDuration" class="checkbox-group">
        <div v-for="duration in treatmentDurationOptions" :key="duration" class="checkbox-container">
          <label>
            <input type="checkbox" :value="duration" v-model="selectedTreatmentDuration" />
            {{ duration }}
          </label>
        </div>
      </div>


      <button @click="search" class="search-button">Поиск</button>
    </div>

    <div class="results">
      <h2>Результаты поиска</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Клинический случай</th>
            <th>Источник</th>
            <th>URL источника</th>
            <th>Параметр</th>
            <th>Значение результата</th>
            <th>Нижнее значение</th>
            <th>Верхнее значение</th>
            <th>Структура модели</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ClinicalCase in clinicalCases" :key="ClinicalCase.id">
            <td>{{ ClinicalCase.clinical_case_text }}</td>
            <td>{{ ClinicalCase.datasets_source_name }}</td>
            <td>
              <a v-if="ClinicalCase.datasets_source_url" :href="ClinicalCase.datasets_source_url" target="_blank"
                rel="noopener noreferrer">
                {{ ClinicalCase.datasets_source_url }}
              </a>
            </td>
            <td>
              <ul>
                <li v-for="modelStructure in ClinicalCase.datasets_result_model_structure_parameter"
                  :key="modelStructure">{{ modelStructure }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="value in ClinicalCase.datasets_result_value" :key="value">{{ value }}</li>
              </ul>
            </td>

            <td>
              <ul>
                <li v-for="lowerValue in ClinicalCase.datasets_result_lower_value" :key="lowerValue">{{ lowerValue }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="upperValue in ClinicalCase.datasets_result_upper_value" :key="upperValue">{{ upperValue }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="modelStructure in ClinicalCase.datasets_result_model_structure_name" :key="modelStructure">{{
                  modelStructure }}</li>
              </ul>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clinicalCases: [],

      selectedLocations: [],
      locationOptions: [],

      selectedSpecLocations: [],
      specLocationOptions: [],

      selectedAges: [],
      ageOptions: [],

      selectedAgeMins: [],
      age_minOptions: [],

      selectedAgeMaxs: [],
      age_maxOptions: [],

      selectedQuantitys: [],
      quantityOptions: [],

      selectedGenders: [],
      genderOptions: [],

      selectedDiagnoses: [],
      diagnosisOptions: [],

      selectedComplications: [],
      complicationOptions: [],

      selectedStages: [],
      stageOptions: [],

      selectedRiskGroups: [],
      riskGroupOptions: [],

      selectedRadiationTherapyTypes: [],
      radiationTherapyTypeOptions: [],

      selectedTumors: [],
      tumorOptions: [],

      selectedNodes: [],
      nodeOptions: [],

      selectedMetastases: [],
      metastasisOptions: [],

      selectedHistologies: [],
      histologyOptions: [],

      selectedGrades: [],
      gradeOptions: [],

      selectedNumberOfFractions: [],
      selectedSingleDose: [],
      selectedTreatmentDuration: [],
      fractionOptions: [],
      doseOptions: [],
      treatmentDurationOptions: [],


      isFilterVisible: {
        age: false,
        age_min: false,
        age_max: false,
        quantity: false,
        gender: false,
        diagnosis: false,
        complication: false,
        stage: false,
        riskGroup: false,
        radiationTherapyType: false,
        tumor: false,
        node: false,
        metastasis: false,
        histology: false,
        grade: false,
        fraction: false,
        dose: false,
        treatmentDuration: false,
      },

    };
  },
  created() {
    this.fetchAgeOptions();
    this.fetchLocationOptions();
    this.fetchSpecLocationOptions();
    this.fetchGenderOptions();
    this.fetchAgeMinOptions();
    this.fetchAgeMaxOptions();
    this.fetchQuantityOptions();
    this.fetchDiagnosisOptions();
    this.fetchComplicationOptions();
    this.fetchStageOptions();
    this.fetchRiskGroupOptions();
    this.fetchRadiationTherapyTypeOptions();
    this.fetchTumorOptions();
    this.fetchNodeOptions();
    this.fetchMetastasisOptions();
    this.fetchHistologyOptions();
    this.fetchGradeOptions();
    this.fetchFractionOptions();
    this.fetchDoseOptions();
    this.fetchTreatmentDurationOptions();
  },
  methods: {
    toggleFilter(filter) {
      this.isFilterVisible[filter] = !this.isFilterVisible[filter];
    },


    async fetchAgeOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        // Извлечение уникальных , исключая пустые
        const ages = response.data.reduce((acc, ClinicalCase) => {
          const age = ClinicalCase.age;
          if (age && !acc.includes(age)) {
            acc.push(age);
          }
          return acc;
        }, []);

        this.ageOptions = ages;
      } catch (error) {
        console.error("Ошибка при загрузке возрастов:", error);
      }
    },
    async fetchLocationOptions() {
      try {
        const response = await this.$http.get("location/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        this.locationOptions = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке местоположений:", error);
      }
    },
    async fetchSpecLocationOptions() {
      try {
        const response = await this.$http.get("spec-location/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        this.specLocationOptions = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке уточненных локализаций:", error);
      }
    },

    async fetchAgeMinOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });


        const age_mins = response.data.reduce((acc, ClinicalCase) => {
          const age_min = ClinicalCase.age_min;
          if (age_min && !acc.includes(age_min)) {
            acc.push(age_min);
          }
          return acc;
        }, []);

        this.age_minOptions = age_mins;
      } catch (error) {
        console.error("Ошибка при загрузке возрастов:", error);
      }
    },

    async fetchGenderOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        const genders = response.data.reduce((acc, ClinicalCase) => {
          const gender = ClinicalCase.gender_display;
          if (gender && !acc.includes(gender)) {
            acc.push(gender);
          }
          return acc;
        }, []);

        this.genderOptions = genders;
      } catch (error) {
        console.error("Ошибка при загрузке пола:", error);
      }
    },

    async fetchAgeMaxOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        const age_maxs = response.data.reduce((acc, ClinicalCase) => {
          const age_max = ClinicalCase.age_max;
          if (age_max && !acc.includes(age_max)) {
            acc.push(age_max);
          }
          return acc;
        }, []);

        this.age_maxOptions = age_maxs;
      } catch (error) {
        console.error("Ошибка при загрузке максимальных возрастов:", error);
      }
    },

    async fetchQuantityOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });


        const quantitys = response.data.reduce((acc, ClinicalCase) => {
          const quantity = ClinicalCase.quantity;
          if (quantity && !acc.includes(quantity)) {
            acc.push(quantity);
          }
          return acc;
        }, []);

        this.quantityOptions = quantitys;
      } catch (error) {
        console.error("Ошибка при загрузке количества:", error);
      }
    },
    async fetchDiagnosisOptions() {
      try {
        // Сначала получаем клинические случаи
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        // Извлекаем диагнозы из клинических случаев
        const diagnosesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const diagnosis = ClinicalCase.diagnosis; // Предполагается, что диагноз хранится в поле 'diagnosis'
          if (diagnosis && !acc.includes(diagnosis)) {
            acc.push(diagnosis);
          }
          return acc;
        }, []);

        // Теперь получаем все доступные диагнозы
        const response = await this.$http.get("diagnosis/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        // Фильтруем диагнозы, оставляя только те, которые есть в клинических случаях
        this.diagnosisOptions = response.data.filter(diagnosis => diagnosesFromCases.includes(diagnosis.id));
      } catch (error) {
        console.error("Ошибка при загрузке диагнозов:", error);
      }
    },

    async fetchComplicationOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const complicationsFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const complication = ClinicalCase.complication;
          if (complication && !acc.includes(complication)) {
            acc.push(complication);
          }
          return acc;
        }, []);

        // Теперь получаем все доступные осложнения
        const response = await this.$http.get("complication/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        // Фильтруем осложнения
        this.complicationOptions = response.data.filter(complication => complicationsFromCases.includes(complication.id));
      } catch (error) {
        console.error("Ошибка при загрузке осложнений:", error);
      }
    },

    async fetchStageOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const stagesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const stage = ClinicalCase.stage;
          if (stage && !acc.includes(stage)) {
            acc.push(stage);
          }
          return acc;
        }, []);

        const response = await this.$http.get("stage/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.stageOptions = response.data.filter(stage => stagesFromCases.includes(stage.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций стадий:", error);
      }
    },

    async fetchRiskGroupOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const riskGroupsFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const riskGroup = ClinicalCase.risk_group;
          if (riskGroup && !acc.includes(riskGroup)) {
            acc.push(riskGroup);
          }
          return acc;
        }, []);

        const response = await this.$http.get("risk-group/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.riskGroupOptions = response.data.filter(riskGroup => riskGroupsFromCases.includes(riskGroup.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций групп риска:", error);
      }
    },

    async fetchRadiationTherapyTypeOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const radiationTherapieTypesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const radiationTherapyType = ClinicalCase.radiation_therapy_type;
          if (radiationTherapyType && !acc.includes(radiationTherapyType)) {
            acc.push(radiationTherapyType);
          }
          return acc;
        }, []);

        const response = await this.$http.get("radiation-therapy-type/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.radiationTherapyTypeOptions = response.data.filter(radiationTherapyType => radiationTherapieTypesFromCases.includes(radiationTherapyType.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций радиационной терапии:", error);
      }
    },

    async fetchTumorOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const tumorsFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const tumor = ClinicalCase.tumor;
          if (tumor && !acc.includes(tumor)) {
            acc.push(tumor);
          }
          return acc;
        }, []);

        const response = await this.$http.get("tumor/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.tumorOptions = response.data.filter(tumor => tumorsFromCases.includes(tumor.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций опухолей:", error);
      }
    },

    async fetchNodeOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const nodesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const node = ClinicalCase.node;
          if (node && !acc.includes(node)) {
            acc.push(node);
          }
          return acc;
        }, []);

        const response = await this.$http.get("node/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.nodeOptions = response.data.filter(node => nodesFromCases.includes(node.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций узлов:", error);
      }
    },

    async fetchMetastasisOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const metastasesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const metastasis = ClinicalCase.metastasis;
          if (metastasis && !acc.includes(metastasis)) {
            acc.push(metastasis);
          }
          return acc;
        }, []);

        const response = await this.$http.get("metastasis/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.metastasisOptions = response.data.filter(metastasis => metastasesFromCases.includes(metastasis.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций метастазов:", error);
      }
    },

    async fetchHistologyOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const histologiesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const histology = ClinicalCase.histology;
          if (histology && !acc.includes(histology)) {
            acc.push(histology);
          }
          return acc;
        }, []);

        const response = await this.$http.get("histology/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.histologyOptions = response.data.filter(histology => histologiesFromCases.includes(histology.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций гистологии:", error);
      }
    },

    async fetchGradeOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const gradesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const grade = ClinicalCase.grade;
          if (grade && !acc.includes(grade)) {
            acc.push(grade);
          }
          return acc;
        }, []);

        const response = await this.$http.get("grade/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.gradeOptions = response.data.filter(grade => gradesFromCases.includes(grade.id));
      } catch (error) {
        console.error("Ошибка при загрузке опций градации:", error);
      }
    },

    async fetchFractionOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        const fractions = response.data.reduce((acc, ClinicalCase) => {
          const fraction = ClinicalCase.fraction;
          if (fraction && !acc.includes(fraction)) {
            acc.push(fraction);
          }
          return acc;
        }, []);

        this.fractionOptions = fractions;
      } catch (error) {
        console.error("Ошибка при загрузке опций количества фракций:", error);
      }
    },

    async fetchDoseOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        const doses = response.data.reduce((acc, ClinicalCase) => {
          const dose = ClinicalCase.dose;
          if (dose && !acc.includes(dose)) {
            acc.push(dose);
          }
          return acc;
        }, []);

        this.doseOptions = doses;
      } catch (error) {
        console.error("Ошибка при загрузке опций разовой дозы:", error);
      }
    },

    async fetchTreatmentDurationOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          }
        });

        const durations = response.data.reduce((acc, ClinicalCase) => {
          const duration = ClinicalCase.treatment_duration;
          if (duration && !acc.includes(duration)) {
            acc.push(duration);
          }
          return acc;
        }, []);

        this.treatmentDurationOptions = durations;
      } catch (error) {
        console.error("Ошибка при загрузке опций длительности лечения:", error);
      }
    },

    async search() {
      try {

        const params = [];

        if (this.selectedAges.length > 0) {
          params.push(`age=${this.selectedAges.join(',')}`);
        }

        if (this.selectedAgeMins.length > 0) {
          params.push(`age_min=${this.selectedAgeMins.join(',')}`);
        }

        if (this.selectedAgeMaxs.length > 0) {
          params.push(`age_max=${this.selectedAgeMaxs.join(',')}`);
        }

        if (this.selectedQuantitys.length > 0) {
          params.push(`quantity=${this.selectedQuantitys.join(',')}`);
        }

        if (this.selectedGenders.length > 0) {
          const numericGenders = this.selectedGenders.map(gender => {
            switch (gender) {
              case 'Мужской':
                return 1;
              case 'Женский':
                return 2;
              case 'Другой':
                return 3;
              default:
                return 0;
            }
          });
          params.push(`gender=${numericGenders.join(',')}`);
        }

        if (this.selectedDiagnoses.length > 0) {
          params.push(`diagnosis=${this.selectedDiagnoses.join(',')}`);
        }

        if (this.selectedComplications.length > 0) {
          params.push(`complication=${this.selectedComplications.join(',')}`);
        }

        if (this.selectedStages.length > 0) {
          params.push(`stage=${this.selectedStages.join(',')}`);
        }

        if (this.selectedRiskGroups.length > 0) {
          params.push(`risk_group=${this.selectedRiskGroups.join(',')}`);
        }

        if (this.selectedRadiationTherapyTypes.length > 0) {
          params.push(`radiation_therapy_type=${this.selectedRadiationTherapyTypes.join(',')}`);
        }

        if (this.selectedTumors.length > 0) {
          params.push(`tumor=${this.selectedTumors.join(',')}`);
        }

        if (this.selectedNodes.length > 0) {
          params.push(`node=${this.selectedNodes.join(',')}`);
        }

        if (this.selectedMetastases.length > 0) {
          params.push(`metastasis=${this.selectedMetastases.join(',')}`);
        }

        if (this.selectedHistologies.length > 0) {
          params.push(`histology=${this.selectedHistologies.join(',')}`);
        }

        if (this.selectedGrades.length > 0) {
          params.push(`grade=${this.selectedGrades.join(',')}`);
        }

        // if (this.selectedNumberOfFractions) {
        //   params.push(`number_of_fractions=${this.selectedNumberOfFractions}`);
        // }

        // if (this.selectedSingleDose) {
        //   params.push(`single_dose=${this.selectedSingleDose}`);
        // }

        // if (this.selectedTreatmentDuration) {
        //   params.push(`treatment_duration=${this.selectedTreatmentDuration}`);
        // }

        if (this.selectedLocations.length > 0) {
          params.push(`location=${this.selectedLocations.join(',')}`);
        }

        if (this.selectedSpecLocations.length > 0) {
          params.push(`spec_location=${this.selectedSpecLocations.join(',')}`);
        }

        const queryString = params.length > 0 ? `?${params.join('&')}` : '';

        const response = await this.$http.get(`clinical-case/${queryString}`, {
          headers: {
            authorization: `Bearer ${localStorage.access_token}`
          },
        });


        this.clinicalCases = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }


  },
};
</script>

<style scoped>
.search-container {
  display: flex;
}

.sidebar {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
  background-color: #f9f9f9;
  /* Светлый фон для боковой панели */
  min-width: calc(41ch);
}

.results {
  flex: 5;
  /* Занимает частей от общего пространства */
  padding: 10px;
  /* Уменьшаем отступы */
}

.search-button {
  margin-top: 10px;
  /* Отступ сверху для кнопки */
  padding: 8px 12px;
  /* Уменьшаем отступы внутри кнопки */
  background-color: var(--green);
  /* Цвет фона кнопки */
  color: white;
  /* Цвет текста кнопки */
  border: none;
  /* Убираем рамку */
  border-radius: 5px;
  /* Закругленные углы */
  cursor: pointer;
  /* Курсор в виде указателя при наведении */
  font-size: 14px;
  /* Уменьшаем размер шрифта для кнопки */
}

.search-button:hover {
  background-color: var(--dark-green);
  /* Темнее при наведении */
}

.checkbox-container {
  display: flex;
  /* Используем flexbox */
  align-items: center;
  /* Выравниваем по центру по вертикали */
  margin-bottom: 5px;
  /* Уменьшаем отступ между чекбоксами */

}

.checkbox-container input[type="checkbox"] {
  margin-left: 10px;
  /* Уменьшаем отступ между текстом и чекбоксом */
}

.age-text {
  margin-right: 5px;
  /* Уменьшаем отступ между текстом и чекбоксом */
  font-size: 14px;
  /* Уменьшаем размер шрифта для текста возраста */
}

.results ul {
  list-style-type: none;
  /* Убираем маркеры списка */
  padding: 0;
  /* Убираем отступы списка */
}

.results li {
  padding: 10px;
  /* Отступы для элементов списка */
  border-bottom: 1px solid #eee;
  /* линия между элементами */
}

.results li:last-child {
  border-bottom: none;
  /* Убираем линию у последнего элемента */
}

h2 {
  color: var(--black);
  /* Цвет заголовков */
  font-size: 100%;
}
</style>
