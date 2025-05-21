<template>
  <div >
    <header class="app-header">

    <div class="header-content">
      <div class="project-info">
        <router-link :to="{ name: 'home' }">
          <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/1.png" class="project-image" />
        </router-link>
        <h1 class="app-title">Веб-приложение для оценки рисков лучевой терапии </h1>
      </div>
      <nav class="main-nav">
        <router-link to="#" class="nav-item" v-if="isLoggedIn" @click.prevent="toggleEditor">
          {{ showEditor ? 'Скрыть редактор БД' : 'Редактор БД' }}
        </router-link>
        <router-link to="/ClinicalCaseSearch" class="nav-item" v-if="isLoggedIn" @click.prevent="toggleSearch">
            {{ showSearch ? 'Скрыть поиск случаев' : 'Поиск случаев' }}
          </router-link>


        <user-component />
      </nav>
    </div>

  </header>
</div>


<div class="image-container">
    <img alt="ЛУЧЕВАЯ ТЕРАПИЯ" src="@/assets/55.png" width="100%" height="auto" />
    <div class="overlay-text">Прогнозирование вероятного результата лучевой терапии</div>
    <div class="overlay-text1"> Оцените риски нежелательного воздействия на критические органы и ткани с учетом
      индивидуальных особенностей пациентов</div>


    <div class="container" v-if="!isLoggedIn">
      <p class="welcome-message">
        Для получения доступа к данным,
      </p>
      <div class="auth-section">
        <router-link :to="{ name: 'login' }" class="auth-link">пожалуйста, авторизуйтесь</router-link>

      </div>
    </div>
  </div>


  <!-- Контейнер для поиска клинических случаев -->
  <div class="container-nav" v-if="isLoggedIn && showSearch">
      <div class="content">
        <router-view name="additional" />
      </div>
    </div>


  <router-view name="user"></router-view>


  <div class="app-content" v-if="isLoggedIn && showEditor">
    <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
    <aside class="sidebar-nav" :class="{ active: showMobileMenu }">

      <h3 class="sidebar-title">Редактор БД</h3>
      <nav class="db-nav"  >
        <router-link to="/clinical-case" class="nav-item">Клинические случаи</router-link>
        <router-link id="rad-type-nav" to="/radtypelist" class="nav-item">Виды лучевой терапии</router-link>
        <router-link to="/locationlist" class="nav-item">Виды локализаций</router-link>
        <router-link to="/speclocationlist" class="nav-item">Уточненные локализации</router-link>
        <router-link to="/diagnosis" class="nav-item">Диагнозы МКБ-10</router-link>
        <router-link to="/stage" class="nav-item">Стадии</router-link>
        <router-link to="/riskgroup" class="nav-item">Группы риска</router-link>
        <router-link to="/complication" class="nav-item">Осложнения</router-link>
        <router-link to="/histology" class="nav-item">Гистологическая классификация</router-link>
        <router-link to="/grade" class="nav-item">Классификация по степени злокачественности</router-link>
        <router-link to="/tumor" class="nav-item">Tumor(Опухоль)</router-link>
        <router-link to="/node" class="nav-item">Node(Узел)</router-link>
        <router-link to="/metastasis" class="nav-item">Metastasis(Метастазы)</router-link>
        <router-link to="/unit" class="nav-item">Единицы измерения</router-link>
        <router-link to="/parameter" class="nav-item">Параметры</router-link>
        <router-link to="/model-name" class="nav-item">Модели</router-link>
        <router-link to="/model-structure" class="nav-item">Структуры моделей</router-link>

        <router-link to="/source" class="nav-item">Источники</router-link>

      </nav>
    </aside>
    <div class="content">
      <router-view />
    </div>
  </div>

</template>

<script>
import UserComponent from './components/UserComponent.vue';

export default {
  data() {
    return {
      showEditor: false,
      showSearch: false,
      showMobileMenu: false
    }
  },
  components: {
    UserComponent,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor;
      // Если открываем редактор, закрываем поиск
      if (this.showEditor) {
        this.showSearch = false;
      }
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      // Если открываем поиск, закрываем редактор
      if (this.showSearch) {
        this.showEditor = false;
      }
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }
}
</script>

<style>


.search-container {
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1400px;
}

.container-nav {
  display: flex;
}

.content {
  flex: 1;
  background-color: #f4f4f4;
  overflow-y: auto;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  padding: 20px;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.project-info {
  display: flex;
  align-items: center;
}

.project-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

h1 {
  color: var(--green);
  margin: 0;
  font-weight: bold;
  font-family: 'Component', sans-serif;
  font-size: 30px;
}

nav {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
}


.image-container {
  position: relative;
}

.overlay-text,
.overlay-text1 {
  position: absolute;
  left: 2%;
  font-family: 'Component', sans-serif;
}

.overlay-text {
  top: 20%;
  right: 48%;
  transform: translateY(-50%);
  color: var(--green);
  font-size: 2.8vw;
  font-weight: bold;

}

.overlay-text1 {
  top: 47%;
  right: 48%;
  transform: translateY(-50%);
  color: var(--black);
  font-size: 1.5vw;
  font-weight: 300;


}

.container {
  position: absolute;
  bottom: 5%;
  left: 2%;
  text-align: center;
  font-size: 1rem;
  padding: 10px;
  background-color: var(--green);
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  z-index: 10;
  font-family: 'Component', sans-serif;
}



.welcome-message {
  margin-top: 10px;
  font-size: 1.125rem;

  color: #ffffff;
  font-family: 'Component', sans-serif;
}

.auth-section {
  margin-top: 10px;
}

.auth-link {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  transition: color 0.3s;
  font-family: 'Component', sans-serif;
}

.auth-link:hover {
  color: var(--black);
}
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--fon);
}


.app-header {
  background-color: var(--white);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}

.logo-image {
  width: 50px;
  height: auto;
}

.app-title {
  color: var(--green);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  color: var(--black);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--green);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--green);
  transition: width 0.3s;
}

.nav-item:hover::after {
  width: 100%;
}

.user-component {
  margin-left: 1rem;
}




.app-content {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  gap: 2rem;
}

.sidebar-nav {

  background-color: var(--white);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

}

.sidebar-title {
  color: var(--green);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light-greeen);
}

.db-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}



.db-nav-item {
  color: var(--black);
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.db-nav-item:hover {
  background-color: var(--light-greeen);
  color: var(--green);
}



/* Адаптивность */
@media (max-width: 768px) {
  /* Шапка */
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .project-info {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .app-title {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70vw;
  }

  .main-nav {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
  }

  .nav-item {
    font-size: 0.9rem;
    padding: 0.3rem 0;
  }

  /* Тексты поверх изображения */
  .overlay-text {
    font-size: 80%;
    top: 15%;
  }

  .overlay-text1 {
    font-size: 70%;
    top: 50%;
  }

  .container {
    max-width: 90%;
    left: 5%;
    bottom: 10%;
    padding: 8px;
  }

  /* Редактор БД */
  .app-content {
    flex-direction: column;
    padding: 0;
  }

  .sidebar-nav {
    position: static;
    width: 100%;
    padding: 10px;
    max-height: none;
    box-shadow: none;
    border-radius: 0;
  }

  .content {
    padding: 10px;
  }

  /* Поиск случаев */
  .search-container, .container-nav {
    margin: 10px;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .project-image {
    width: 40px;
  }

  .nav-item {
    font-size: 0.8rem;
  }

  .welcome-message {
    font-size: 1rem;
  }

  .auth-link {
    font-size: 0.9rem;
  }

  /* Меню редактора */
  .sidebar-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .db-nav {
    gap: 0.5rem;
  }

  .nav-item {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }
}

/* Дополнительные улучшения для мобильных */
/* Гамбургер-меню для редактора БД */
.mobile-menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--green);
    margin-right: 10px;
  }

  .sidebar-nav {
    display: none;
  }

  .sidebar-nav.active {
    display: block;
  }
}

/* Улучшение касаний */
.nav-item, .auth-link, .db-nav a {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Оптимизация анимаций */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Оптимизация для iOS */
@supports (-webkit-touch-callout: none) {
  .sidebar-nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}



</style>
