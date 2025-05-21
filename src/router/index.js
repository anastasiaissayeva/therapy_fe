import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import LogOutForm  from '@/components/LogOutForm.vue'
import RadTypeList from '@/components/RadTypeList.vue'
import LocationList from '@/components/LocationList.vue'
import SpecLocationList from '@/components/SpecLocationList.vue'
import DiagnosisTable from '@/components/DiagnosisTable.vue'
import StageTable from '@/components/StageTable.vue'
import RiskGroupTable from '@/components/RiskGroupTable.vue'
import ComplicationTable from '@/components/ComplicationTable.vue'
import HistologyTable from '@/components/HistologyTable.vue'
import GradeTable from '@/components/GradeTable.vue'
import TumorTable from '@/components/TumorTable.vue'
import NodeTable from '@/components/NodeTable.vue'
import MetastasisTable from '@/components/MetastasisTable.vue'
import ClinicalCaseTable from '@/components/ClinicalCaseTable.vue'
import UnitTable from '@/components/UnitTable.vue'
import ParameterTable from '@/components/ParameterTable.vue'
import ModelNameTable from '@/components/ModelNameTable.vue'
import ModelStructureTable from '@/components/ModelStructureTable.vue'
import ResultTable from '@/components/ResultTable.vue'
import SourceTable from '@/components/SourceTable.vue'
import DataSetTable from '@/components/DataSetTable.vue'
import ClinicalCaseSearch from '@/components/ClinicalCaseSearch.vue'
import DataSetsTable from '@/components/DataSetsTable.vue'

// import SpecLocationDetails from '@/components/SpecLocationDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },

      {
        path: '/login',
        name: 'login',
        components: {
          user: LoginForm
        }
    },
    {
      path: '/logout',
      name: 'logout',
      components: {
        user: LogOutForm 
      }
    },
    {
      path: '/radtypelist',
      name: 'radtypelist',
      component: RadTypeList,
    },
    {
      path: '/locationlist',
      name: 'locationlist',
      component: LocationList,
    },
    {
      path: '/speclocationlist',
      name: 'speclocationlist',
      component: SpecLocationList
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: DiagnosisTable
    },
    {
      path: '/stage',
      name: 'stage',
      component: StageTable
    },
    {
      path: '/riskgroup',
      name: 'riskgroup',
      component: RiskGroupTable
    },
    {
      path: '/complication',
      name: 'complication',
      component: ComplicationTable
    },
    {
      path: '/histology',
      name: 'histology',
      component: HistologyTable
    },
    {
      path: '/grade',
      name: 'grade',
      component: GradeTable
    },
    {
      path: '/tumor',
      name: 'tumor',
      component: TumorTable
    },

    {
      path: '/node',
      name: 'node',
      component: NodeTable
    },
    {
      path: '/metastasis',
      name: 'metastasis',
      component: MetastasisTable

    },
    {
      path: '/clinical-case',
      name: 'clinical-case',
      component: ClinicalCaseTable

    },
    {
      path: '/unit',
      name: 'unit',
      component: UnitTable

    },
    {
      path: '/Parameter',
      name: 'parameter',
      component: ParameterTable

    },
    {
      path: '/model-name',
      name: 'model-name',
      component: ModelNameTable

    },
    {
      path: '/model-structure',
      name: 'model-structure',
      component: ModelStructureTable

    },
    {
      path: '/result',
      name: 'result',
      component: ResultTable

    },
    {
      path: '/source',
      name: 'source',
      component: SourceTable

    },
    {
      path: '/data-set',
      name: 'data-set',
      component: DataSetTable

    },
    {
      path: '/data-sets',
      name: 'data-sets',
      components: {
        data_base:DataSetsTable
      }
    },

    {
      path: '/ClinicalCaseSearch',
      name: 'ClinicalCaseSearch',
      components: {
        additional: ClinicalCaseSearch
    }


    },
    // {
    //   path: '/speclocationdetails/:id',
    //   name: 'speclocationdetails',
    //   component: SpecLocationDetails,
    //   props: true
    // },
  ],
})

export default router
