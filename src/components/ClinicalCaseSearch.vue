<template>
  <div class="search-container">
    <div class="sidebar">
      <h2 @click="toggleFilter('radiationTherapyType')" class="filter-title">
        Виды лучевой терапии <span class="toggle-arrow">{{ isFilterVisible.radiationTherapyType ? '▲' : '▼' }}</span>
      </h2>
      <div v-if="isFilterVisible.radiationTherapyType" class="checkbox-group">
        <div v-for="radiationTherapyTypeOption in radiationTherapyTypeOptions" :key="radiationTherapyTypeOption.id" class="checkbox-container">
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

      <button @click="toggleAdditionalFilters" class="filter-toggle-button">
        {{ showAdditionalFilters ? 'Скрыть фильтры' : 'Больше фильтров' }}
      </button>

      <div v-if="showAdditionalFilters">
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

        <h2 @click="toggleFilter('number_of_fractions')" class="filter-title">
          Количество фракций <span class="toggle-arrow">{{ isFilterVisible.number_of_fractions ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.number_of_fractions" class="checkbox-group">
          <div v-for="number_of_fractions in number_of_fractionsOptions" :key="number_of_fractions" class="checkbox-container">
            <label>
              <input type="checkbox" :value="number_of_fractions" v-model="selectedNumberOfFractions" />
              {{ number_of_fractions }}
            </label>
          </div>
        </div>

        <h2 @click="toggleFilter('single_dose')" class="filter-title">
          Разовая доза <span class="toggle-arrow">{{ isFilterVisible.single_dose ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.single_dose" class="checkbox-group">
          <div v-for="single_dose in single_doseOptions" :key="single_dose" class="checkbox-container">
            <label>
              <input type="checkbox" :value="single_dose" v-model="selectedSingleDose" />
              {{ single_dose }}
            </label>
          </div>
        </div>

        <h2 @click="toggleFilter('treatmentDuration')" class="filter-title">
          Длительность лечения (дней) <span class="toggle-arrow">{{ isFilterVisible.treatmentDuration ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.treatmentDuration" class="checkbox-group">
          <div v-for="duration in treatmentDurationOptions" :key="duration" class="checkbox-container">
            <label>
              <input type="checkbox" :value="duration" v-model="selectedTreatmentDuration" />
              {{ duration }}
            </label>
          </div>
        </div>

        <h2 @click="toggleFilter('source')" class="filter-title">
          Источники <span class="toggle-arrow">{{ isFilterVisible.source ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.source" class="checkbox-group">
          <div v-for="sourceOption in sourceOptions" :key="sourceOption.id" class="checkbox-container">
            {{ sourceOption.name }}
            <input type="checkbox" :value="sourceOption.id" v-model="selectedSources" />
          </div>
        </div>

        <!-- модель -->
        <h2 @click="toggleFilter('modelName')" class="filter-title">
          Модели <span class="toggle-arrow">{{ isFilterVisible.modelName ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.modelName" class="checkbox-group">
          <div v-for="modelOption in modelNameOptions" :key="modelOption.id" class="checkbox-container">
            {{ modelOption.name }}
            <input type="checkbox" :value="modelOption.id" v-model="selectedModelNames" />
          </div>
        </div>

        <!-- параметры -->
        <h2 @click="toggleFilter('parameter')" class="filter-title">
          Параметры <span class="toggle-arrow">{{ isFilterVisible.parameter ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.parameter" class="checkbox-group">
          <div v-for="paramOption in parameterOptions" :key="paramOption.id" class="checkbox-container">
            {{ paramOption.name }}
            <input type="checkbox" :value="paramOption.id" v-model="selectedParameters" />
          </div>
        </div>

        <!-- структуры моделей -->
        <h2 @click="toggleFilter('modelStructure')" class="filter-title">
          Структуры моделей <span class="toggle-arrow">{{ isFilterVisible.modelStructure ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.modelStructure" class="checkbox-group">
          <div v-for="msOption in modelStructureOptions" :key="msOption.id" class="checkbox-container">
            {{ msOption.name_model_name }} – {{ msOption.name_parameter }}
            <input type="checkbox" :value="msOption.id" v-model="selectedModelStructures" />
          </div>
        </div>

        <!-- DataSet -->
        <h2 @click="toggleFilter('dataSet')" class="filter-title">
          DataSet <span class="toggle-arrow">{{ isFilterVisible.dataSet ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.dataSet" class="checkbox-group">
          <div v-for="dsOption in dataSetOptions" :key="dsOption.id" class="checkbox-container">
            {{ dsOption.name_clinical_case }}
            <input type="checkbox" :value="dsOption.id" v-model="selectedDataSets" />
          </div>
        </div>

        <!-- результаты -->
        <h2 @click="toggleFilter('result')" class="filter-title">
          Результаты <span class="toggle-arrow">{{ isFilterVisible.result ? '▲' : '▼' }}</span>
        </h2>
        <div v-if="isFilterVisible.result" class="checkbox-group">
          <div v-for="resOption in resultOptions" :key="resOption.id" class="checkbox-container">
            {{ resOption.name_model_structure }} {{ resOption.name_parameter }}: {{ resOption.value }}
            <input type="checkbox" :value="resOption.id" v-model="selectedResults" />
          </div>
        </div>






      </div>

      <div class="filter-buttons">
        <button @click="search" class="search-button">Поиск</button>
        <button @click="resetFilters" class="reset-button">Сбросить фильтры</button>
      </div>
    </div>

    <div class="results">
      <h2>Результаты поиска</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Клинический случай</th>
            <th>Данные измерений</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ClinicalCase in clinicalCases" :key="ClinicalCase.id">
            <td>
              <div class="card-content">
                <p><strong>Тип лучевой терапии:</strong> {{ ClinicalCase.name_radiation_therapy_type }}</p>
                <p><strong>Локализация:</strong> {{ ClinicalCase.text_location }}</p>
                <p><strong>Гистология:</strong> {{ ClinicalCase.name_histology }}</p>
                <p><strong>Количество:</strong> {{ ClinicalCase.quantity }}</p>
                <p><strong>Количество фракций:</strong> {{ ClinicalCase.number_of_fractions }}</p>
                <p><strong>Разовая доза:</strong> {{ ClinicalCase.single_dose }}</p>
                <p><strong>Длительность лечения:</strong> {{ ClinicalCase.treatment_duration }} дней</p>

                <div v-if="ClinicalCase.complications && ClinicalCase.complications.length > 0" class="complications-section">
                  <h3>Осложнения:</h3>
                  <ul>
                    <li v-for="complication in ClinicalCase.complications" :key="complication.id">
                      {{ complication.name_complication }}
                    </li>
                  </ul>
                </div>
              </div>
            </td>

            <td>
              <table class="subtable">
                <thead>
                  <tr>
                    <th>Параметр</th>
                    <th>Единица</th>
                    <th>Модель</th>
                    <th>Значение</th>
                    <th>Источник</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="result in ClinicalCase.datasets_result" :key="result.id">
                    <td>{{ result.name_parameter }}</td>
                    <td>{{ result.name_unit }}</td>
                    <td>{{ result.name_model_structure }}</td>
                    <td>{{ result.value }} ({{ result.lower_value }} – {{ result.upper_value }})</td>
                    <td>{{ result.name_data_set }}</td>
                  </tr>
                </tbody>
              </table>
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
      showAdditionalFilters: false,
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
      number_of_fractionsOptions: [],
      single_doseOptions: [],
      treatmentDurationOptions: [],

      selectedModelNames: [],
      modelNameOptions: [],

      selectedParameters: [],
      parameterOptions: [],

      selectedUnits: [],
      unitOptions: [],

      selectedSources: [],
      sourceOptions: [],

      sourceFilter: [],
      modelNameFilter: [],
      parameterFilter: [],
      modelStructureFilter: [],
      dataSetFilter: [],
      resultFilter: [],


      modelStructureOptions: [],
      dataSetOptions: [],
      resultOptions: [],



      selectedModelStructures: [],
      selectedDataSets: [],
      selectedResults: [],

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
        number_of_fractions: false,
        single_dose: false,
        treatmentDuration: false,
        modelName: false,
        parameter: false,
        unit: false,

        source: false,
        modelStructure: false,
        dataSet: false,
        result: false
      },
    };
  },
  created() {
    this.fetchAllOptions();
  },
  methods: {
    toggleFilter(filter) {
      this.isFilterVisible[filter] = !this.isFilterVisible[filter];
    },
    toggleAdditionalFilters() {
      this.showAdditionalFilters = !this.showAdditionalFilters;
    },

    async fetchAllOptions() {
      try {
        await Promise.all([
          this.fetchAgeOptions(),
          this.fetchLocationOptions(),
          this.fetchSpecLocationOptions(),
          this.fetchGenderOptions(),
          this.fetchAgeMinOptions(),
          this.fetchAgeMaxOptions(),
          this.fetchQuantityOptions(),
          this.fetchDiagnosisOptions(),
          this.fetchComplicationOptions(),
          this.fetchStageOptions(),
          this.fetchRiskGroupOptions(),
          this.fetchRadiationTherapyTypeOptions(),
          this.fetchTumorOptions(),
          this.fetchNodeOptions(),
          this.fetchMetastasisOptions(),
          this.fetchHistologyOptions(),
          this.fetchGradeOptions(),
          this.fetchFractionOptions(),
          this.fetchDoseOptions(),
          this.fetchTreatmentDurationOptions(),
          this.fetchComplicationOptions(),
          this.fetchSources(),
          this.fetchModelNames(),
          this.fetchParameterOptions(),
          this.fetchModelStructures(),
          this.fetchDataSets(),
          this.fetchResults()


        ]);
      } catch (error) {
        console.error("Ошибка при загрузке опций:", error);
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

        this.radiationTherapyTypeOptions = response.data.filter(radiationTherapyType =>
          radiationTherapieTypesFromCases.includes(radiationTherapyType.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке опций радиационной терапии:", error);
      }
    },

    async fetchSpecLocationOptions() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const specLocationsFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const specLocation = ClinicalCase.spec_location;
          if (specLocation && !acc.includes(specLocation)) {
            acc.push(specLocation);
          }
          return acc;
        }, []);

        const response = await this.$http.get("spec-location/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.specLocationOptions = response.data.filter(specLocation =>
          specLocationsFromCases.includes(specLocation.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке уточненных локализаций:", error);
      }
    },

    async fetchLocationOptions() {
      try {
        const response = await this.$http.get("location/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });
        this.locationOptions = response.data;
      } catch (error) {
        console.error("Ошибка при загрузке местоположений:", error);
      }
    },

    async fetchAgeOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

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

    async fetchAgeMinOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
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
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const genders = response.data.reduce((acc, ClinicalCase) => {
          const gender = ClinicalCase.gender;
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
          headers: { authorization: `Bearer ${localStorage.access_token}` }
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
          headers: { authorization: `Bearer ${localStorage.access_token}` }
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
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const diagnosesFromCases = clinicalCasesResponse.data.reduce((acc, ClinicalCase) => {
          const diagnosis = ClinicalCase.diagnosis;
          if (diagnosis && !acc.includes(diagnosis)) {
            acc.push(diagnosis);
          }
          return acc;
        }, []);

        const response = await this.$http.get("diagnosis/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.diagnosisOptions = response.data.filter(diagnosis =>
          diagnosesFromCases.includes(diagnosis.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке диагнозов:", error);
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

        this.stageOptions = response.data.filter(stage =>
          stagesFromCases.includes(stage.id)
        );
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

        this.riskGroupOptions = response.data.filter(riskGroup =>
          riskGroupsFromCases.includes(riskGroup.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке опций групп риска:", error);
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

        this.tumorOptions = response.data.filter(tumor =>
          tumorsFromCases.includes(tumor.id)
        );
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

        this.nodeOptions = response.data.filter(node =>
          nodesFromCases.includes(node.id)
        );
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

        this.metastasisOptions = response.data.filter(metastasis =>
          metastasesFromCases.includes(metastasis.id)
        );
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

        this.histologyOptions = response.data.filter(histology =>
          histologiesFromCases.includes(histology.id)
        );
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

        this.gradeOptions = response.data.filter(grade =>
          gradesFromCases.includes(grade.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке опций градации:", error);
      }
    },

    async fetchFractionOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const number_of_fractionss = response.data.reduce((acc, ClinicalCase) => {
          const number_of_fractions = ClinicalCase.number_of_fractions;
          if (number_of_fractions && !acc.includes(number_of_fractions)) {
            acc.push(number_of_fractions);
          }
          return acc;
        }, []);

        this.number_of_fractionsOptions = number_of_fractionss;
      } catch (error) {
        console.error("Ошибка при загрузке опций количества фракций:", error);
      }
    },

    async fetchDoseOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const single_doses = response.data.reduce((acc, ClinicalCase) => {
          const single_dose = ClinicalCase.single_dose;
          if (single_dose && !acc.includes(single_dose)) {
            acc.push(single_dose);
          }
          return acc;
        }, []);

        this.single_doseOptions = single_doses;
      } catch (error) {
        console.error("Ошибка при загрузке опций разовой дозы:", error);
      }
    },

    async fetchTreatmentDurationOptions() {
      try {
        const response = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
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
    async fetchComplicationOptions() {
      try {

        const ccComplicationsResponse = await this.$http.get("сlinical-сase-сomplication/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });


        const complicationIds = [
          ...new Set(ccComplicationsResponse.data.map(ccc => ccc.complication))
        ];


        const complicationsResponse = await this.$http.get("complication/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });


        this.complicationOptions = complicationsResponse.data.filter(comp =>
          complicationIds.includes(comp.id)
        );
      } catch (error) {
        console.error("Ошибка при загрузке осложнений", error);
      }
    },

    async fetchSources() {
      try {
        const dataSetResponse = await this.$http.get("dataset/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const sourceIds = [
          ...new Set(dataSetResponse.data.map(ds => ds.source).filter(Boolean))
        ];

        const response = await this.$http.get("source/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.sourceOptions = response.data.filter(source =>
          sourceIds.includes(source.id)
        );
      } catch (err) {
        console.error("Ошибка загрузки источников:", err);
      }
    },

    async fetchParameterOptions() {
      try {
        const resultResponse = await this.$http.get("result/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const parameterIds = [
          ...new Set(resultResponse.data.map(r => r.model_structure?.parameter).filter(Boolean))
        ];

        const response = await this.$http.get("parameter/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.parameterOptions = response.data.filter(p =>
          parameterIds.includes(p.id)
        );
      } catch (err) {
        console.error("Ошибка загрузки параметров:", err);
      }
    },

    async fetchModelNames() {
      try {
        const resultResponse = await this.$http.get("result/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const modelNameIds = [
          ...new Set(resultResponse.data.map(r => r.model_structure?.model_name).filter(Boolean))
        ];

        const response = await this.$http.get("model-name/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.modelNameOptions = response.data.filter(mn =>
          modelNameIds.includes(mn.id)
        );
      } catch (err) {
        console.error("Ошибка загрузки моделей:", err);
      }
    },
    async fetchModelStructures() {
      try {
        const resultResponse = await this.$http.get("result/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const modelStructureIds = [
          ...new Set(resultResponse.data.map(r => r.model_structure).filter(Boolean))
        ];

        const response = await this.$http.get("model-structure/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.modelStructureOptions = response.data.filter(ms =>
          modelStructureIds.includes(ms.id)
        );
      } catch (err) {
        console.error("Ошибка загрузки структур моделей:", err);
      }
    },
    async fetchDataSets() {
      try {
        const resultResponse = await this.$http.get("result/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const dataSetIds = [
          ...new Set(resultResponse.data.map(r => r.data_set).filter(Boolean))
        ];

        const response = await this.$http.get("dataset/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.dataSetOptions = response.data.filter(ds =>
          dataSetIds.includes(ds.id)
        );
      } catch (err) {
        console.error("Ошибка загрузки DataSet:", err);
      }
    },
    async fetchResults() {
      try {
        const clinicalCasesResponse = await this.$http.get("clinical-case/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        const resultIds = clinicalCasesResponse.data.flatMap(cc =>
          cc.datasets_result.map(res => res.id)
        );

        const uniqueIds = [...new Set(resultIds)];

        const response = await this.$http.get("result/", {
          headers: { authorization: `Bearer ${localStorage.access_token}` }
        });

        this.resultOptions = response.data.filter(r => uniqueIds.includes(r.id));
      } catch (err) {
        console.error("Ошибка загрузки результатов:", err);
      }
    },

    resetFilters() {
      this.selectedLocations = [];
      this.selectedSpecLocations = [];
      this.selectedAges = [];
      this.selectedAgeMins = [];
      this.selectedAgeMaxs = [];
      this.selectedQuantitys = [];
      this.selectedGenders = [];
      this.selectedDiagnoses = [];
      this.selectedComplications = [];
      this.selectedStages = [];
      this.selectedRiskGroups = [];
      this.selectedRadiationTherapyTypes = [];
      this.selectedTumors = [];
      this.selectedNodes = [];
      this.selectedMetastases = [];
      this.selectedHistologies = [];
      this.selectedGrades = [];
      this.selectedNumberOfFractions = [];
      this.selectedSingleDose = [];
      this.selectedTreatmentDuration = [];
      this.selectedModelNames = [];
      this.selectedParameters = [];
      this.selectedSources = [];
      this.selectedModelNames = [];
      this.selectedSources = [];
      this.selectedModelStructures = [];
      this.selectedDataSets = [];
      this.selectedResults = [];


  Object.keys(this.isFilterVisible).forEach(key => {
    this.isFilterVisible[key] = false;
  });


  // this.clinicalCases = [];


  this.search();
},
async search() {
      try {
        const params = [];

        if (this.selectedRadiationTherapyTypes.length > 0) {
          params.push(`radiation_therapy_type=${this.selectedRadiationTherapyTypes.join(',')}`);
        }

        if (this.selectedLocations.length > 0) {
          params.push(`location=${this.selectedLocations.join(',')}`);
        }

        if (this.selectedSpecLocations.length > 0) {
          params.push(`spec_location=${this.selectedSpecLocations.join(',')}`);
        }

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

        if (this.selectedNumberOfFractions.length > 0) {
          params.push(`number_of_fractions=${this.selectedNumberOfFractions.join(',')}`);
        }

        if (this.selectedSingleDose.length > 0) {
          params.push(`single_dose=${this.selectedSingleDose.join(',')}`);
        }

        if (this.selectedTreatmentDuration.length > 0) {
          params.push(`treatment_duration=${this.selectedTreatmentDuration.join(',')}`);
        }

        if (this.selectedModelNames.length > 0) {
          params.push(`model_name=${this.selectedModelNames.join(',')}`);
        }

        if (this.selectedParameters.length > 0) {
          params.push(`parameter=${this.selectedParameters.join(',')}`);
        }

        if (this.selectedSources.length > 0) {
          params.push(`source=${this.selectedSources.join(',')}`);
        }

        if (this.selectedModelStructures.length > 0) {
          params.push(`model_structure=${this.selectedModelStructures.join(',')}`);
        }

        if (this.selectedDataSets.length > 0) {
          params.push(`dataset=${this.selectedDataSets.join(',')}`);
        }

        if (this.selectedResults.length > 0) {
          params.push(`result=${this.selectedResults.join(',')}`);
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
  gap: 20px;
  padding: 20px;
}

.sidebar {
  flex: 0 0 300px;
  padding: 15px;
  border-right: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.results {
  flex: 1;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-title {
  cursor: pointer;
  padding: 8px 12px;
  background-color: #e9e9e9;
  border-radius: 4px;
  margin: 5px 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-title:hover {
  background-color: #e0e0e0;
}

.checkbox-group {
  margin-bottom: 15px;
  padding: 0 10px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
}

.checkbox-container input[type="checkbox"] {
  margin-left: 10px;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.search-button, .reset-button, .filter-toggle-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-button {
  background-color: var(--green);
  color: white;
}

.search-button:hover {
  background-color: var(--dark-green);
}

.reset-button {
  background-color: #f44336;
  color: white;
}

.reset-button:hover {
  background-color: #d32f2f;
}

.filter-toggle-button {
  background-color: #e0e0e0;
  color: #333;
}

.filter-toggle-button:hover {
  background-color: #d0d0d0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 14px;
  color: #333;
}

.styled-table th, .styled-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  vertical-align: top;
}

.styled-table th {
  background-color: var(--green);
  color: #fff;
  font-weight: bold;
}

.card-content {
  padding: 10px;
}

.card-content p {
  margin: 5px 0;
  font-size: 13px;
}

.card-content p strong {
  color: #333;
}

.complications-section {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.complications-section h3 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
}

.complications-section ul {
  margin: 0;
  padding-left: 20px;
}

.complications-section li {
  font-size: 13px;
  margin-bottom: 3px;
}

.subtable {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.subtable th, .subtable td {
  padding: 6px 8px;
  border: 1px solid #ccc;
  text-align: left;
  background-color: #fafafa;
  color: #555;
}

.subtable th {
  background-color: #e9e9e9;
  font-weight: 600;
}

.styled-table td > .subtable {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

@media (max-width:  1200px) {
  .search-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
  }

  .sidebar {
    flex: 1;
    padding: 12px;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    max-height: none;
    overflow-y: visible;
    margin-bottom: 15px;
  }

  .results {
    flex: 1;
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    overflow-x: auto;
  }

  .filter-title {
    padding: 10px;
    font-size: 15px;
    margin: 8px 0;
  }

  .checkbox-group {
    margin-bottom: 12px;
    padding: 0 8px;
  }

  .checkbox-container {
    padding: 8px 0;
    font-size: 14px;
  }

  .filter-buttons {
    flex-direction: row;
    gap: 8px;
    margin-top: 12px;
  }

  .search-button,
  .reset-button,
  .filter-toggle-button {
    padding: 10px 15px;
    font-size: 15px;
    flex: 1;
    min-height: 44px; /* Минимальный размер для удобного касания */
  }

  .styled-table {
    font-size: 13px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .styled-table th,
  .styled-table td {
    padding: 8px;
    min-width: 100px;
  }

  .card-content {
    padding: 8px;
  }

  .card-content p {
    font-size: 14px;
    margin: 6px 0;
  }

  .complications-section {
    margin-top: 8px;
    padding: 8px;
  }

  .complications-section h3 {
    font-size: 15px;
  }

  .complications-section li {
    font-size: 14px;
  }

  .subtable {
    font-size: 12px;
  }

  .subtable th,
  .subtable td {
    padding: 4px 6px;
  }

  /* Анимация для фильтров */
  .filter-group {
    transition: all 0.3s ease;
    overflow: hidden;
  }
}
</style>



